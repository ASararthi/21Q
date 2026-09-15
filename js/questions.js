/*
  21Q — question data file
  =========================

  This is the ONLY file you need to touch to add, remove, or reorder questions.

  RULES:
  - QUESTIONS is a plain list of strings, in the exact order they should appear.
  - The app will always show them in this order — top to bottom, no shuffling.
  - To add a question, add a new line with your question in quotes, followed by a comma.
  - To reorder questions, just move the lines around.
  - To remove a question, delete its line.
  - Keep each question wrapped in double quotes "like this".
  - If your question itself contains a double quote ("), put a backslash before it,
    like this: "She said \"why not?\" — what would you have said?"

  That's it. Save the file and reload the page.
*/

const QUESTIONS = [
  "What's your biggest kitchen fail?",
  "Have you ever sent a text message to the wrong person?",
  "What is the most embarrassing thing that happened to you in school?",
  "What is your signature dance move?",
  "What is one thing you absolutely refuse to share?",
  "If you could make one rule that everyone had to follow for a day, what would it be?",
  "What's a holiday that doesn't exist that you'd like to create?",
  "If I were a pair of shoes, what kind would I be?",
  "Would you rather be a hobbit or an elf for 24 hours?",
  "What mythical creature would improve the world most if it existed?",
  "What's the craziest thing you've ever done?",
  "If you could have an unlimited supply of one thing, what would it be?",
  "Do you like people-watching, and can you come up with a story about them?",
  "What's the most hilarious childhood memory you can think of?",
  "After you survive the apocalypse, what will your job be?",
  "If you had to become an inanimate object for a year, what would you choose to be?",
  "You're about to get into a fight. What song comes on as your soundtrack?",
  "What set of completely random items could you buy that would make the cashier the most uncomfortable?",
  "What movie completely changes its plot when you change one letter in its title?",
  "Would you rather shoot spaghetti out of your fingers or sneeze meatballs?",
  "What's one experience that has shaped who you are today?",
  "What's something you've always wanted to do but haven't yet?",
  "What's one lesson you've learned the hard way?",
  "What's something you wish people understood about you?",
  "What's a passion or interest you've never pursued but wish you had?",
  "How do you balance your personal desires with your responsibilities?",
  "What's a mistake you've made that taught you something important?",
  "What's something you've learned about yourself recently?",
  "What's a book, movie, or experience that has genuinely impacted you?",
  "What's one thing you're proud of but don't often share with people?",
  "How do you stay true to yourself when people expect you to conform?",
  "What's something you've learned from a past relationship?",
  "What's a dream or aspiration you've let go of, and why?",
  "What's a significant turning point in your life?",
  "What's a lesson you've learned from a particularly difficult experience?",
  "What's something you want to be remembered for?",
  "What's a value or belief you've questioned or changed over time?",
  "What's the most memorable moment we've shared together, and why was it special to you?",
  "Is there something you've always wanted to tell me but haven't yet?",
  "How do you think we can get better at resolving conflicts when they happen?",
  "Is there something from your past that you'd like to talk about more with me?",
  "What makes you feel most secure in our relationship?",
  "How do you show love and affection?",
  "What do you appreciate most about me?",
  "What makes you feel unappreciated or ignored?",
  "What's the toughest moment we've faced as a couple, and how did you feel about it?",
  "What do you think is the most important thing we need to work on in this relationship?",
  "How can we feel more emotionally connected?",
  "What are your hopes for our future together?",
  "What do you think sets this relationship apart from your past relationships?",
  "What's the biggest lesson you've learned from being with me?",
  "How do you deal with jealousy in a relationship?",
  "What can make you feel more loved and appreciated?",
  "What's a completely useless skill you're weirdly good at?",
  "What's a hill you would die on even if everyone disagreed with you?",
  "What's the weirdest phase you went through as a kid?",
  "What was your most questionable fashion choice growing up?",
  "What's something you were convinced was true when you were little?",
  "What's the dumbest thing you've ever gotten genuinely excited about?",
  "What's a very specific thing that instantly makes your day better?",
  "What's a random smell that brings back a specific memory?",
  "What's something you do that you don't think is weird but other people probably do?",
  "What's the most chaotic thing you've ever done with your friends?",
  "What's the funniest excuse you've ever used to get out of something?",
  "What's the strangest compliment you've ever received?",
  "What's the weirdest dream you remember having?",
  "What's a completely random thing you find attractive in people?",
  "What's an opinion you have that would probably start an argument at dinner?",
  "If you had to give a TED Talk with zero preparation, what topic could you somehow talk about for an hour?",
  "If you could instantly become amazing at one completely random skill, what would you choose?",
  "If you had to live inside one video game for a month, which one would you pick?",
  "If you could swap lives with any fictional character for a week, who would you choose?",
  "If you could have one completely useless superpower, what would it be?",
  "If you had to survive a zombie apocalypse with three people you know, who are you picking?",
  "If you could erase one annoying everyday inconvenience from existence, what would it be?",
  "If you had unlimited money for 24 hours but couldn't keep anything you bought (after the 24 hours), what would you do?",
  "If you could teleport anywhere right now for exactly one hour, where would you go?",
  "If you could witness one historical event in person, which would you choose?",
  "If you could know the complete truth about one mystery in the world, what would you choose?",
  "If you could relive one ordinary day from your childhood, which day would you pick?",
  "If you could wake up tomorrow with one person's talent, whose would you steal?",
  "If your life had a narrator, who would you want voicing it?",
  "If you had to spend a year living in one fictional universe, which one would you survive in?",
  "What's a completely irrational fear you had as a child?",
  "What's something you used to hate but secretly like now?",
  "What's something everyone seems to love that you just don't understand?",
  "What's something you think is massively overrated?",
  "What's something you think is underrated?",
  "What's a food combination you love that other people would probably judge?",
  "What's the most embarrassing song you secretly know all the words to?",
  "What's a song that immediately transports you back to a specific time in your life?",
  "What's a movie you could watch an unreasonable number of times?",
  "What's a fictional character you think you'd actually get along with?",
  "What's a fictional character you absolutely couldn't stand in real life?",
  "What's a random fact you know that you've never had a reason to bring up?",
  "What's the most useless piece of information your brain refuses to forget?",
  "What's something you've always wanted to try just because it looks fun?",
  "What's something you'd do immediately if you knew nobody would judge you?",
  "What's the most spontaneous thing you'd actually be willing to do?",
  "What's a place you've always been curious about?",
  "What's something you think you'd be terrible at but would still try?",
  "What's a childhood dream you completely forgot about?",
  "What's one thing you think your younger self would be surprised to know about you now?",
  "What's something you wish you could experience again for the first time?",
  "What's a tiny memory you have that probably means nothing to anyone else but you remember perfectly?",
  "What's the funniest misunderstanding you've ever had?",
  "What's the strangest coincidence that's ever happened to you?",
  "What's the most ridiculous argument you've ever had with someone?",
  "What's something you've done purely because you were curious?",
  "What's a random thing that instantly makes you nostalgic?",
  "What's one thing you think you'd be famous for if you were famous?",
  "If you had to open a completely ridiculous business, what would it sell?",
  "If your personality had a warning label, what would it say?",
  "If you came with an instruction manual, what would the first page say?",
  "If someone made a documentary about your life, what would the most embarrassing episode be?",
  "If aliens landed tomorrow and you had to explain humanity to them, what would you show them first?",
  "If you could add one completely unnecessary feature to humans, what would it be?",
  "If you had to choose a new name for yourself, what would you pick?",
  "If you could make one ridiculous law that everyone had to follow, what would it be?",
  "If we were stuck in a random country with no money and no phones, what do you think we'd do first?",
  "If you had to be famous for something incredibly stupid, what would you want it to be?",
  "What would your perfect completely unproductive day look like?",
  "What's something you could rant about for way longer than anyone would expect?",
  "What's a random topic you wish people would ask you about more?",
  "What's something about yourself that took you a long time to figure out?",
  "What's a part of your personality you think has stayed exactly the same since childhood?",
  "What's something you think you've changed your mind about more than once?",
  "What's a decision you've made that seemed insignificant at the time but ended up mattering a lot?",
  "What's something you think people tend to misunderstand about you when they first meet you?",
  "What's your most embarrassing story?",
  "How many countries can you name in one minute?",
  "What's your dream job?",

  "Do you believe in any conspiracy theories?",

  "What's your favorite smell?",
  "Is it ever justifiable to break the law for a cause you believe in?",
  "Is it ethical to spend a large amount of money on pets when people are starving?",
  "Should people be allowed to sell their organs in a regulated market?",
  "Is it morally acceptable to use animals for medical research if it could lead to cures for serious diseases?",

  "Should privacy ever be sacrificed for security?",

  "Is it ethical for companies to collect data about their users' online activities?",

  "Can war ever be justified as a means to maintain peace?",

  "Is it ethical to genetically modify human embryos to prevent diseases?",

  "Should wealthy nations be required to share their resources with poorer countries?",

  "Is capital punishment an acceptable form of justice?",

  "Should voting be mandatory for all eligible citizens?",

  "Is it ethical to clone extinct or endangered species?",

  "Should artificial intelligence have rights?",

  "Is it ethical to prioritize human lives over other species in a crisis?",

  "What's the strangest place you've ever fallen asleep?",

  "What's the dumbest injury you've ever gotten?",

  "If you were invisible for a day, what's the first thing you'd do?",

  "What's the weirdest thing you've ever licked on a dare?",

  "Have you ever talked to yourself in the mirror for too long?",

  "If animals could talk, which one do you think would be the rudest?",

  "Would you wear socks with sandals for $100?",

  "Would you wear the same outfit every day for a year?",

  "What's a compliment you've never forgotten?",

  "What's your favorite struggle meal?",

  "What's your go-to karaoke song?",

  "What's a weird family tradition you have?",

  "What's a piece of advice you give to other people but struggle to follow yourself?",

  "What are some completely arbitrary rules you have for yourself?",

  "Have you ever committed a crime?",

  "What's the most awkward thing you've ever done in an elevator?",

  "What's a silly superstition you believe in?",

  "Have you ever lost something valuable and never told anyone?",

  "What's the most cringe-worthy thing you've ever posted online?",

  "What's the most annoying thing someone has done to you while texting?",

  "What's the most spontaneous trip you've ever taken?",

  "What's something you absolutely refuse to share?"
];
