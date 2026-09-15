# 21Q

A small, quiet website that does one thing: it shows one question at a time, in order, so two people can talk about it. There's nothing to type into the site, no accounts, no scoring — just questions and conversation.

## Running it

Open `index.html` in any browser. That's the whole app — no build step, no server, no dependencies beyond one Google Fonts link.

If you want to host it, upload the folder as-is to any static host (GitHub Pages, Netlify, a plain web server, etc.) — `index.html` is the entry point.

## Adding your own questions

Open `js/questions.js`. You'll see a single list called `QUESTIONS`:

```js
const QUESTIONS = [
  "What's something you believed as a child that you now find funny?",
  "If you could relive one ordinary day from your life, which would it be?",
  // ...
];
```

- Questions appear in **exactly** this order, every time — never shuffled.
- To add a question, add a new line in quotes, followed by a comma.
- To reorder, move the lines.
- To remove one, delete its line.
- Save the file, reload the page — that's it.

## How progress works

Two different things are tracked, and they're kept deliberately separate:

- **Progress** — how far someone has gotten (which question they've *reached*). This is what drives the milestone moments (every 10th question reached — 10, 20, 30… — quietly celebrated, regardless of whether questions along the way were answered or skipped).
- **Status** — whether a specific question was actually talked through (**Next**) or passed on (**Skip**). Skipping still counts as having reached that question — it just isn't marked as discussed.

The total number of questions in the list is never shown anywhere in the interface, so the experience doesn't feel like a countdown — it just feels like an ongoing conversation. Progress is saved in the browser (via `localStorage`), so closing the tab and coming back later resumes where things left off. "Begin again from the start" on the closing screen is the only way to reset.

## Navigating the question screen

- **Next** marks the current question as discussed and moves forward.
- **Skip** marks it as skipped and moves forward. It's only active on the live, unresolved question — once you're looking back through history, Skip is disabled, since a past question already has a settled status.
- **Prev** steps back into already-reached questions. This is a *detour*: browsing backward never changes your progress, never rewrites a status, and never re-triggers a milestone. Pressing **Next** enough times from inside a detour carries you back up to the live question, right where you left off.
- **History** opens a bottom sheet listing every question reached so far, each tagged Answered / Skipped / Current. Tapping any row jumps straight into a detour at that question (or back to live, if you tap the current one).

## Files

```
21Q/
├── index.html        the four screens: landing, question, milestone, ending
├── css/style.css      all styling
├── js/questions.js    <- edit this to manage questions
└── js/app.js          sequencing, progress/status logic, persistence
```
