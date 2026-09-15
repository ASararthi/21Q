/*
  21Q — app logic
  ================
  QUESTIONS comes from questions.js (loaded before this file).

  Concepts tracked, kept deliberately separate:
    - reachedIndex        -> PROGRESS: furthest question index ever reached.
    - statuses[i]          -> STATUS of question i: "answered" or "skipped".
    - liveIndex             -> the current "frontier" question awaiting a status.
    - detourIndex           -> non-null while browsing PAST questions (Prev / History).
                               Browsing a detour never changes reachedIndex, statuses,
                               or milestones — it's a temporary look back.

  Milestones fire every 10th question REACHED (not answered), regardless of
  whether questions along the way were skipped.
*/

(function () {
  "use strict";

  var STORAGE_KEY = "21q.state.v1";
  var MILESTONE_INTERVAL = 10; // celebrate at 10, 20, 30 questions reached

  /* ---------------------------------------------------------
     State
  --------------------------------------------------------- */
  var defaultState = function () {
    return {
      reachedIndex: -1,   // -1 = nothing reached yet
      statuses: {},        // { "0": "answered", "1": "skipped", ... }
      milestonesShown: []  // counts (e.g. 10, 20) already celebrated
    };
  };

  var state = defaultState();

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      var parsed = JSON.parse(raw);
      return {
        reachedIndex: typeof parsed.reachedIndex === "number" ? parsed.reachedIndex : -1,
        statuses: parsed.statuses || {},
        milestonesShown: parsed.milestonesShown || []
      };
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* localStorage unavailable — app still works, just won't resume next visit */
    }
  }

  function resetState() {
    state = defaultState();
    saveState();
  }

  /* The index to show when the user presses Begin / Continue.
     If the furthest question was reached but never given a status
     (page closed mid-question), resume on that SAME question. */
  function resumeIndex() {
    if (state.reachedIndex === -1) return 0;
    var hasStatus = Object.prototype.hasOwnProperty.call(state.statuses, String(state.reachedIndex));
    return hasStatus ? state.reachedIndex + 1 : state.reachedIndex;
  }

  /* ---------------------------------------------------------
     DOM refs
  --------------------------------------------------------- */
  var screens = {
    landing: document.getElementById("screen-landing"),
    question: document.getElementById("screen-question"),
    milestone: document.getElementById("screen-milestone"),
    ending: document.getElementById("screen-ending")
  };

  var els = {
    startBtn: document.getElementById("btn-start"),
    questionInner: document.querySelector(".question-inner"),
    qcardNumber: document.getElementById("qcard-number"),
    qcardTag: document.getElementById("qcard-tag"),
    questionText: document.getElementById("question-text"),
    prevBtn: document.getElementById("btn-prev"),
    skipBtn: document.getElementById("btn-skip"),
    nextBtn: document.getElementById("btn-next"),
    sheetBackdrop: document.getElementById("sheet-backdrop"),
    historySheet: document.getElementById("history-sheet"),
    sheetList: document.getElementById("sheet-list"),
    milestoneNumber: document.getElementById("milestone-number"),
    milestoneCaption: document.getElementById("milestone-caption"),
    milestoneContinue: document.getElementById("btn-milestone-continue"),
    restartBtn: document.getElementById("btn-restart"),
    sky: document.getElementById("sky")
  };

  var liveIndex = null;     // current unresolved frontier question
  var detourIndex = null;   // non-null while browsing history
  var pendingMilestoneThen = null;

  function currentDisplayIndex() {
    return detourIndex !== null ? detourIndex : liveIndex;
  }

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      if (!screens[key]) return;
      screens[key].classList.toggle("is-active", key === name);
    });
  }

  /* ---------------------------------------------------------
     Starfield
  --------------------------------------------------------- */
  function buildStars() {
    if (!els.sky) return;
    var count = window.innerWidth < 600 ? 55 : 90;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var star = document.createElement("span");
      star.className = "star";
      var size = (Math.random() * 2 + 1).toFixed(2);
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = (Math.random() * 100).toFixed(2) + "vw";
      star.style.top = (Math.random() * 100).toFixed(2) + "vh";
      star.style.setProperty("--dur", (4 + Math.random() * 5).toFixed(2) + "s");
      star.style.setProperty("--delay", (Math.random() * 6).toFixed(2) + "s");
      star.style.setProperty("--max-op", (0.4 + Math.random() * 0.6).toFixed(2));
      frag.appendChild(star);
    }
    els.sky.appendChild(frag);
  }

  /* ---------------------------------------------------------
     Landing
  --------------------------------------------------------- */
  function renderLanding() {
    els.startBtn.textContent = state.reachedIndex === -1 ? "Begin" : "Continue";
    showScreen("landing");
  }

  /* ---------------------------------------------------------
     Card rendering (shared by live + detour)
  --------------------------------------------------------- */
  function renderCard(index, animate) {
    var count = index + 1; // 1-based, human-friendly, never the total
    els.qcardNumber.textContent = String(count);
    els.questionText.textContent = QUESTIONS[index];

    var status = state.statuses[String(index)];
    if (status) {
      els.qcardTag.textContent = status === "answered" ? "Answered" : "Skipped";
      els.qcardTag.className = "qcard-tag is-visible " +
        (status === "answered" ? "qcard-tag--answered" : "qcard-tag--skipped");
    } else {
      els.qcardTag.textContent = "";
      els.qcardTag.className = "qcard-tag";
    }

    if (animate) {
      els.questionText.classList.remove("is-entering");
      void els.questionText.offsetWidth; // restart animation
      els.questionText.classList.add("is-entering");
    }
    if (els.questionInner) els.questionInner.classList.remove("is-leaving");

    updateButtonStates();
  }

  function updateButtonStates() {
    var idx = currentDisplayIndex();
    els.prevBtn.disabled = idx <= 0;
    els.skipBtn.disabled = detourIndex !== null; // Skip only resolves the live question
  }

  /* ---------------------------------------------------------
     Live progression (progress + milestones live here)
  --------------------------------------------------------- */
  function showLive(index, animate) {
    if (index >= QUESTIONS.length) {
      showScreen("ending");
      return;
    }

    var isNewlyReached = index > state.reachedIndex;
    detourIndex = null;
    liveIndex = index;

    if (isNewlyReached) {
      state.reachedIndex = index;
      saveState();
    }

    var count = index + 1;
    var doRender = function () {
      showScreen("question");
      renderCard(index, animate !== false);
    };

    if (isNewlyReached && shouldCelebrate(count)) {
      celebrateMilestone(count, doRender);
    } else {
      doRender();
    }
  }

  function shouldCelebrate(count) {
    return count > 0 &&
      count % MILESTONE_INTERVAL === 0 &&
      state.milestonesShown.indexOf(count) === -1;
  }

  var milestoneCaptions = [
    "questions in, and still talking.",
    "questions into this conversation.",
    "questions shared between you."
  ];

  function celebrateMilestone(count, then) {
    state.milestonesShown.push(count);
    saveState();
    pendingMilestoneThen = then;
    els.milestoneNumber.textContent = String(count);
    var caption = milestoneCaptions[Math.floor(Math.random() * milestoneCaptions.length)];
    els.milestoneCaption.textContent = caption;
    showScreen("milestone");
  }

  function resolveLiveAndAdvance(status) {
    if (detourIndex !== null || liveIndex === null) return;
    state.statuses[String(liveIndex)] = status;
    saveState();

    if (els.questionInner) els.questionInner.classList.add("is-leaving");
    window.setTimeout(function () {
      showLive(liveIndex + 1, true);
    }, 220);
  }

  /* ---------------------------------------------------------
     Detour navigation (Prev / History — never touches progress)
  --------------------------------------------------------- */
  function enterOrMoveDetour(targetIndex) {
    if (targetIndex < 0) return;
    if (targetIndex >= liveIndex) {
      // Stepped back up to (or past) the live frontier — return to it.
      showLive(liveIndex, true);
      return;
    }
    detourIndex = targetIndex;
    showScreen("question");
    renderCard(targetIndex, true);
  }

  function handlePrev() {
    openHistory();
  }

  function handleNext() {
    if (detourIndex !== null) {
      enterOrMoveDetour(detourIndex + 1);
    } else {
      resolveLiveAndAdvance("answered");
    }
  }

  function handleSkip() {
    if (detourIndex !== null) return; // disabled visually too
    resolveLiveAndAdvance("skipped");
  }

  /* ---------------------------------------------------------
     History bottom sheet
  --------------------------------------------------------- */
  function renderHistoryList() {
    els.sheetList.innerHTML = "";
    if (state.reachedIndex < 0) {
      var empty = document.createElement("p");
      empty.className = "sheet-empty";
      empty.textContent = "Nothing reached yet.";
      els.sheetList.appendChild(empty);
      return;
    }

    var frag = document.createDocumentFragment();
    for (var i = 0; i <= state.reachedIndex; i++) {
      (function (index) {
        var row = document.createElement("button");
        row.type = "button";
        row.className = "sheet-row" + (index === currentDisplayIndex() ? " is-current" : "");

        var num = document.createElement("span");
        num.className = "sheet-row__number";
        num.textContent = String(index + 1);

        var text = document.createElement("span");
        text.className = "sheet-row__text";
        text.textContent = QUESTIONS[index];

        var status = document.createElement("span");
        var st = state.statuses[String(index)];
        status.className = "sheet-row__status" + (st === "answered" ? " sheet-row__status--answered" : "");
        status.textContent = st === "answered" ? "Answered" : st === "skipped" ? "Skipped" : "Current";

        row.appendChild(num);
        row.appendChild(text);
        row.appendChild(status);

        row.addEventListener("click", function () {
          closeHistory();
          if (index === liveIndex) {
            showLive(liveIndex, true);
          } else {
            enterOrMoveDetour(index);
          }
        });

        frag.appendChild(row);
      })(i);
    }
    els.sheetList.appendChild(frag);
  }

  function openHistory() {
    renderHistoryList();
    els.sheetBackdrop.classList.add("is-open");
    els.historySheet.classList.add("is-open");
  }

  function closeHistory() {
    els.sheetBackdrop.classList.remove("is-open");
    els.historySheet.classList.remove("is-open");
  }

  function isHistoryOpen() {
    return els.historySheet.classList.contains("is-open");
  }

  /* ---------------------------------------------------------
     Events
  --------------------------------------------------------- */
  els.startBtn.addEventListener("click", function () {
    showLive(resumeIndex(), true);
  });

  els.nextBtn.addEventListener("click", handleNext);
  els.skipBtn.addEventListener("click", handleSkip);
  els.prevBtn.addEventListener("click", handlePrev);

  els.sheetBackdrop.addEventListener("click", closeHistory);

  els.milestoneContinue.addEventListener("click", function () {
    var then = pendingMilestoneThen;
    pendingMilestoneThen = null;
    if (then) then();
  });

  els.restartBtn.addEventListener("click", function () {
    resetState();
    liveIndex = null;
    detourIndex = null;
    renderLanding();
  });

  document.addEventListener("keydown", function (e) {
    if (isHistoryOpen()) {
      if (e.key === "Escape") closeHistory();
      return;
    }
    if (!screens.question.classList.contains("is-active")) return;
    if (e.key === "ArrowRight" || e.key === "Enter") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key.toLowerCase() === "s") {
      handleSkip();
    }
  });

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  function init() {
    state = loadState();
    buildStars();
    renderLanding();
  }

  init();
})();
