import { LessonContent } from './verbal-reasoning-content';

/**
 * 11+ Vocabulary Building Programme Content
 * SIMPLIFIED for 10/11-year-olds - bite-sized, fun, visual
 * Goal: Learn key vocabulary through games, stories, and practice
 * Approach: Simple, clear, engaging - like a vocabulary adventure!
 */

export const vocabularyBuildingContent: LessonContent[] = [
  // ==================== MODULE 1: SUPER WORD ROOTS ====================
  {
    moduleNumber: 1,
    title: 'Super Word Roots',
    duration: '15 minutes',
    introduction: `🎮 Want to learn a vocabulary CHEAT CODE? 

Learn ONE word part = Understand 20+ words! 

It's like unlocking a treasure chest! 🗝️💎

Let's learn 5 SUPER POWERFUL word roots today!`,
    keyPoints: [
      '🔑 Word roots = vocabulary cheat codes!',
      '🎯 1 root = 20+ words you can understand',
      '🧩 Roots are word building blocks',
      '💡 Use roots to guess new words',
      '🏆 Easy way to boost vocabulary FAST!',
      '🎮 It\'s like leveling up in a game!'
    ],
    explanation: `
**🎯 YOUR 5 SUPER ROOTS**

Learn these 5 and unlock 100+ words!

---

**ROOT 1: PORT 🎒**
**Means:** CARRY

**Words:**
✅ **TRANS**PORT = carry ACROSS
✅ **IM**PORT = carry IN  
✅ **EX**PORT = carry OUT
✅ **PORT**ABLE = can be CARRIED
✅ RE**PORT** = carry back (info)

💡 **Remember:** Carry your backPACK to the PORT!

---

**ROOT 2: DICT 📢**
**Means:** SAY

**Words:**
✅ PRE**DICT** = SAY before
✅ **DICT**IONARY = book that SAYS meanings
✅ **DICT**ATE = SAY out loud

💡 **Remember:** DICT-ionary SAYS what words mean!

---

**ROOT 3: SPECT 👀**
**Means:** SEE/LOOK

**Words:**
✅ **SPECT**ATOR = person who LOOKS
✅ IN**SPECT** = LOOK closely
✅ **SPEC**TACLES = glasses for SEEING

💡 **Remember:** SPECtacles help you SEE!

---

**ROOT 4: SCRIB ✍️**
**Means:** WRITE

**Words:**
✅ **SCRIB**BLE = WRITE quickly
✅ DE**SCRIBE** = WRITE details
✅ **SCRIPT** = WRITTEN text

💡 **Remember:** Movie SCRIPT is WRITTEN!

---

**ROOT 5: VIS 👁️**
**Means:** SEE

**Words:**
✅ **VIS**IBLE = can be SEEN
✅ IN**VIS**IBLE = can't be SEEN
✅ **VIS**IT = go to SEE
✅ **VID**EO = moving pictures you SEE

💡 **Remember:** VIDeo lets you SEE!

---

**🎮 HOW TO USE IN EXAMS**

**See a hard word?**

**Step 1:** Find the root
**Step 2:** Remember what it means
**Step 3:** Guess the word!

**Example:** PORTABLE
- PORT = carry ✓
- -ABLE = can be ✓
- **Answer:** Can be carried!

---

**✨ YOUR MISSION THIS WEEK**

1. Learn these 5 roots
2. Spot them in books
3. Tell someone about them!

**You just unlocked 25+ words!** 🏆
    `,
    examples: [
      {
        question: 'You see the word "PORTABLE" in a question. You don\'t know it, but you remember PORT = carry, and -ABLE = able to. What does portable mean?',
        workingOut: `Step 1: Identify the root: PORT
Step 2: Remember: PORT = carry
Step 3: Identify the suffix: -ABLE
Step 4: Remember: -ABLE = able to
Step 5: Put it together: "able to be carried"
Step 6: Think of examples: portable phone, portable speaker - things you can carry around!
Answer: Something that can be moved or carried easily`,
        answer: 'Able to be carried/moved easily',
        explanation: 'By knowing the root PORT (carry) and suffix -ABLE (able to), you can figure out that PORTABLE means something that can be carried around - like a laptop or portable speaker!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: If DICT means "say/speak", what does PREDICT mean?',
        options: ['Say before (foretell)', 'Say again', 'Say loudly', 'Say after'],
        answer: 'Say before (foretell)',
        explanation: 'PRE- means "before" and DICT means "say". So PREDICT = say before = tell what will happen in the future!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: If SCRIB means "write", what does DESCRIBE mean?',
        options: ['Write down details about', 'Erase writing', 'Read writing', 'Copy writing'],
        answer: 'Write down details about',
        explanation: 'DE- means "down" and SCRIB means "write". When you DESCRIBE something, you write down (or tell) all the details about it!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: If SPECT means "see/look", what does SPECTATOR mean?',
        options: ['Person who watches', 'Person who plays', 'Person who writes', 'Person who speaks'],
        answer: 'Person who watches',
        explanation: 'SPECT means "see/look" and -ATOR means "person who". A SPECTATOR is a person who watches (like at a football match!)',
        difficulty: 'easy'
      },
      {
        question: 'Q4: If VIS means "see" and IN- means "not", what does INVISIBLE mean?',
        options: ['Not able to be seen', 'Very visible', 'See inside', 'Looking in'],
        answer: 'Not able to be seen',
        explanation: 'IN- = not, VIS = see, -BLE = able to. Put together: not able to be seen = INVISIBLE (like Harry Potter\'s cloak!)',
        difficulty: 'medium'
      },
      {
        question: 'Q5: If AUD means "hear" and -IBLE means "able to", what does AUDIBLE mean?',
        options: ['Able to be heard', 'Able to see', 'Able to speak', 'Able to write'],
        answer: 'Able to be heard',
        explanation: 'AUD = hear, -IBLE = able to. AUDIBLE means "able to be heard" - loud enough to hear!',
        difficulty: 'medium'
      },
      {
        question: 'Q6: If RUPT means "break" and DIS- means "apart", what does DISRUPT mean?',
        options: ['Break apart/disturb', 'Put together', 'Make quiet', 'Fix something'],
        answer: 'Break apart/disturb',
        explanation: 'DIS- = apart, RUPT = break. DISRUPT means to break apart or disturb (like when someone disrupts a class by being noisy!)',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Make flashcards for each root - draw pictures to help remember!',
      'Look for word roots when reading - you\'ll see them EVERYWHERE!',
      'Learn roots in families (all the words with PORT, all with DICT, etc.).',
      'Make up silly sentences using all the words with one root.',
      'Play "word detective" - spot roots in signs, labels, books!',
      'Teach word roots to a younger sibling - teaching helps you remember!',
      'Keep a "Root Journal" - collect words with the roots you know.',
      'When you learn a new word in class, check if it has a root you know!'
    ],
    commonMistakes: [
      'Trying to learn too many roots at once - start with 5-10, then add more!',
      'Not looking for roots in real reading - practice makes perfect!',
      'Forgetting that some words have more than one root.',
      'Giving up if you can\'t figure out a word immediately - it takes practice!',
      'Not making connections between words with the same root.',
      'Only studying roots, not using them in real exam practice.'
    ],
    examStrategy: `
**Your Word Roots Exam Strategy:**

**This Week:**
- Master the 10 roots from this module
- Make flashcards or posters
- Find 5 words for each root in your reading
- Practice breaking down unknown words

**Daily Practice:**
- Review your root flashcards (5 minutes)
- Spot 3 words with roots you know
- Break down 1 unknown word using roots

**In the Exam:**

**When you see an unknown word:**
1. Don\'t panic!
2. Break it into pieces (prefix-root-suffix)
3. Identify any roots you know
4. Use the root to guess the meaning
5. Check if it makes sense in context
6. Make your best answer!

**Example in Action:**

**Word:** TRANSPORTATION
**Break down:**
- TRANS = across ✓
- PORT = carry ✓
- -ATION = the act of ✓
**Meaning:** The act of carrying across (moving things!)

**Quick Root Review Before Exam:**

Remember these power roots:
- DICT = say
- SCRIB = write
- SPECT = see
- PORT = carry
- GRAPH = write/draw
- RUPT = break
- VIS = see
- AUD = hear
- BENE = good
- MAL = bad

**Pro Tip:** Even knowing SOME of a word\'s meaning helps you eliminate wrong answers in multiple choice!

**Your Root Power:**
Every root you learn = 5-20 new words you can understand!
Learn 20 roots = 100-400 words! 
That\'s vocabulary superpowers! 💪🌟

**Tonight\'s Challenge:**
Pick your favorite root from today. Find 10 words that use it. Write them down. Tomorrow, use one in a sentence! 📝✨
    `
  }

  ,

  // ==================== MODULE 2: WORD BUILDERS (PREFIXES) ====================
  {
    moduleNumber: 2,
    title: 'Word Builders (Prefixes)',
    duration: '15 minutes',
    introduction: `🧱 Prefixes are like LEGO blocks you stick on the FRONT of words!

Add UN- and HAPPY becomes UNHAPPY!
Add RE- and DO becomes REDO!

Learn 5 super prefixes today! 🚀`,
    keyPoints: [
      '🎯 Prefix = added to word START',
      '🔄 Changes the meaning!',
      '⚡ 5 prefixes = 50+ words!',
      '🎮 Mix and match like LEGO!',
      '🏆 Super easy way to learn words!',
      '💡 Use in exams to guess words!'
    ],
    explanation: `
**🎯 YOUR 5 SUPER PREFIXES**

---

**PREFIX 1: UN- 🔄**
**Means:** NOT / OPPOSITE

**Words:**
✅ UN + HAPPY = **UNHAPPY** (not happy)
✅ UN + LOCK = **UNLOCK** (opposite of lock)
✅ UN + ABLE = **UNABLE** (not able)
✅ UN + KIND = **UNKIND** (not kind)

💡 **Easy!** UN = NOT!

---

**PREFIX 2: RE- ↩️**
**Means:** AGAIN / BACK

**Words:**
✅ RE + DO = **REDO** (do AGAIN)
✅ RE + TURN = **RETURN** (come BACK)
✅ RE + PLAY = **REPLAY** (play AGAIN)
✅ RE + FILL = **REFILL** (fill AGAIN)

💡 **Easy!** RE = AGAIN!

---

**PREFIX 3: PRE- ⏪**
**Means:** BEFORE

**Words:**
✅ PRE + VIEW = **PREVIEW** (see BEFORE)
✅ PRE + HEAT = **PREHEAT** (heat BEFORE)
✅ PRE + PAID = **PREPAID** (paid BEFORE)

💡 **Easy!** PRE = BEFORE!

---

**PREFIX 4: DIS- ❌**
**Means:** NOT / OPPOSITE

**Words:**
✅ DIS + LIKE = **DISLIKE** (NOT like)
✅ DIS + AGREE = **DISAGREE** (NOT agree)
✅ DIS + APPEAR = **DISAPPEAR** (go away)

💡 **Easy!** DIS = NOT!

---

**PREFIX 5: MIS- ⚠️**
**Means:** WRONG / BAD

**Words:**
✅ MIS + SPELL = **MISSPELL** (spell WRONG)
✅ MIS + TAKE = **MISTAKE** (do WRONG)
✅ MIS + UNDERSTAND = **MISUNDERSTAND** (understand WRONG)

💡 **Easy!** MIS = WRONG!

---

**🎮 GAME TIME!**

Make new words!

UN + FAIR = ?
RE + START = ?
PRE + ORDER = ?
DIS + CONNECT = ?
MIS + BEHAVE = ?

**You just learned 25+ words!** 🏆
    `,
    examples: [],
    practiceQuestions: [
      {question: 'Q1: UN + HAPPY = ?', options: ['UNHAPPY (not happy)', 'REHAPPY', 'PREHAPPY', 'DISHAPPY'], answer: 'UNHAPPY (not happy)', explanation: 'UN means NOT. UNHAPPY = not happy!', difficulty: 'easy'},
      {question: 'Q2: RE + DO = ?', options: ['UNDO', 'REDO (do again)', 'PREDO', 'DISDO'], answer: 'REDO (do again)', explanation: 'RE means AGAIN. REDO = do again!', difficulty: 'easy'},
      {question: 'Q3: PRE + VIEW = ?', options: ['UNVIEW', 'REVIEW', 'PREVIEW (see before)', 'DISVIEW'], answer: 'PREVIEW (see before)', explanation: 'PRE means BEFORE. PREVIEW = see before!', difficulty: 'easy'},
      {question: 'Q4: DIS + LIKE = ?', options: ['UNLIKE', 'RELIKE', 'PRELIKE', 'DISLIKE (not like)'], answer: 'DISLIKE (not like)', explanation: 'DIS means NOT. DISLIKE = not like!', difficulty: 'medium'},
      {question: 'Q5: MIS + SPELL = ?', options: ['UNSPELL', 'RESPELL', 'PRESPELL', 'MISSPELL (spell wrong)'], answer: 'MISSPELL (spell wrong)', explanation: 'MIS means WRONG. MISSPELL = spell wrong!', difficulty: 'medium'},
      {question: 'Q6: What does DISAGREE mean?', options: ['Agree again', 'Not agree', 'Agree before', 'Agree wrong'], answer: 'Not agree', explanation: 'DIS = NOT, so DISAGREE = not agree (have different opinion)!', difficulty: 'hard'}
    ],
    tips: ['Play the prefix game!', 'Add prefixes to words you know!', 'Make silly words for fun!', 'Spot prefixes in books!', 'Teach them to friends!'],
    commonMistakes: ['Forgetting what each prefix means.', 'Mixing up UN and DIS (both mean not!).', 'Not checking if word sounds right.'],
    examStrategy: `**See unknown word? Break it!**
Example: UNHAPPY
- UN = NOT ✓
- HAPPY = joyful ✓
- Answer: NOT joyful = sad!`
  },

  {
    moduleNumber: 3,
    title: 'Word Endings (Suffixes)',
    duration: '15 minutes',
    introduction: `🎯 Suffixes stick on the END of words!

Add -FUL and CARE becomes CAREFUL!
Add -LESS and CARE becomes CARELESS!

Learn 5 super suffixes! ⭐`,
    keyPoints: ['🎯 Suffix = added to word END', '🔄 Changes word type!', '⚡ 5 suffixes = 50+ words!', '🎮 Build words like LEGO!', '💡 Use in exams!'],
    explanation: `
**🎯 YOUR 5 SUPER SUFFIXES**

**SUFFIX 1: -FUL 🌟**
**Means:** FULL OF

**CARE + FUL = CAREFUL** (full of care)
**HELP + FUL = HELPFUL** (full of help)
**BEAUTY + FUL = BEAUTIFUL** (full of beauty)

**SUFFIX 2: -LESS ❌**
**Means:** WITHOUT

**CARE + LESS = CARELESS** (without care)
**HELP + LESS = HELPLESS** (without help)
**HOPE + LESS = HOPELESS** (without hope)

**SUFFIX 3: -LY ⚡**
**Means:** IN A ___ WAY

**QUICK + LY = QUICKLY** (in a quick way)
**SLOW + LY = SLOWLY** (in a slow way)
**HAPPY + LY = HAPPILY** (in a happy way)

**SUFFIX 4: -ABLE ✅**
**Means:** CAN BE

**READ + ABLE = READABLE** (can be read)
**MOVE + ABLE = MOVEABLE** (can be moved)
**ENJOY + ABLE = ENJOYABLE** (can be enjoyed)

**SUFFIX 5: -ER 👤**
**Means:** PERSON WHO

**TEACH + ER = TEACHER** (person who teaches)
**PLAY + ER = PLAYER** (person who plays)
**WRITE + ER = WRITER** (person who writes)
    `,
    examples: [],
    practiceQuestions: [
      {question: 'Q1: CARE + FUL = ?', options: ['CAREFUL (full of care)', 'CARELESS', 'CARER', 'CARING'], answer: 'CAREFUL (full of care)', explanation: '-FUL = full of. CAREFUL = full of care!', difficulty: 'easy'},
      {question: 'Q2: HOPE + LESS = ?', options: ['HOPEFUL', 'HOPELESS (without hope)', 'HOPER', 'HOPING'], answer: 'HOPELESS (without hope)', explanation: '-LESS = without. HOPELESS = without hope!', difficulty: 'easy'},
      {question: 'Q3: QUICK + LY = ?', options: ['QUICKFUL', 'QUICKLESS', 'QUICKLY (in quick way)', 'QUICKER'], answer: 'QUICKLY (in quick way)', explanation: '-LY = in a ___ way. QUICKLY = in a quick way!', difficulty: 'easy'},
      {question: 'Q4: READ + ABLE = ?', options: ['READER', 'READABLE (can be read)', 'READING', 'READFUL'], answer: 'READABLE (can be read)', explanation: '-ABLE = can be. READABLE = can be read!', difficulty: 'medium'},
      {question: 'Q5: TEACH + ER = ?', options: ['TEACHFUL', 'TEACHLESS', 'TEACHER (person who teaches)', 'TEACHING'], answer: 'TEACHER (person who teaches)', explanation: '-ER = person who. TEACHER = person who teaches!', difficulty: 'medium'},
      {question: 'Q6: What\'s opposite of CAREFUL?', options: ['CAREFREE', 'CARELESS', 'CARING', 'CARINGLY'], answer: 'CARELESS', explanation: 'CAREFUL (with care) opposite is CARELESS (without care)!', difficulty: 'hard'}
    ],
    tips: ['Spot -FUL and -LESS are opposites!', 'Add suffixes to words you know!', 'Listen for them in speech!', 'Use them in writing!'],
    commonMistakes: ['Mixing up -FUL and -LESS.', 'Spelling changes (beauty → beautiful).', 'Using wrong suffix for word type.'],
    examStrategy: `**Spot the suffix!**
BEAUTIFUL:
- BEAUTY = pretty ✓
- -FUL = full of ✓
- Answer: Full of beauty!`
  }
];

// Export the content
export default vocabularyBuildingContent;

