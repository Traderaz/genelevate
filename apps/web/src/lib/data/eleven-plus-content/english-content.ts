/**
 * 11+ English Course Content
 * UK-specific content aligned with GL Assessment, CEM, and ISEB exam boards
 * Comprehensive English skills for grammar school entrance exams
 */

import { LessonContent } from './verbal-reasoning-content';

export const elevenPlusEnglishContent: LessonContent[] = [
  // ==================== MODULE 1: Reading Comprehension ====================
  {
    moduleNumber: 1,
    title: 'Reading Comprehension Skills',
    duration: '50 minutes',
    introduction: `Reading comprehension tests your ability to understand texts, identify key information, and make inferences. This is the most important skill in 11+ English exams.`,
    keyPoints: [
      'Read the passage carefully before attempting questions',
      'Identify key information: who, what, where, when, why, how',
      'Distinguish between explicit (stated) and implicit (implied) information',
      'Look for evidence in the text to support your answers',
      'Manage time: quick read, answer questions, review'
    ],
    explanation: `
**What is Reading Comprehension?**
You'll read a passage (fiction, non-fiction, or poetry) and answer questions testing your understanding.

**Question Types:**
1. **Literal Questions:** Find information stated directly in text
2. **Inference Questions:** Work out what's implied but not stated
3. **Vocabulary Questions:** Understand word meanings in context
4. **Author's Purpose:** Why did the author write this?
5. **Main Idea:** What's the text about overall?

**UK 11+ Exam Boards:**
- **GL Assessment:** 2-3 passages, mix of question types, 50 minutes
- **CEM:** Integrated with other English skills, 45 minutes
- **ISEB:** More challenging vocabulary, literary analysis

**Reading Strategy:**
1. Read title and first paragraph - get overview
2. Read actively - underline key points
3. Read questions first to know what to look for
4. Find evidence for each answer
5. Check answers against the text
    `,
    examples: [
      {
        question: 'Passage: "Tom sprinted down the muddy path, his heart pounding." What does this tell us about Tom?',
        workingOut: 'Keywords: "sprinted" (running fast), "heart pounding" (excited/scared). Evidence suggests Tom is in a hurry or scared.',
        answer: 'Tom is running quickly, possibly scared or excited',
        explanation: 'We infer Tom\'s emotional state from the description of his actions.'
      },
      {
        question: 'Text says: "Sarah loved rainy days." What can we infer about Sarah?',
        workingOut: 'Explicit: Sarah loves rainy days. Implicit: She might enjoy indoor activities, not mind getting wet, find rain calming.',
        answer: 'Sarah enjoys things others might not like about rain',
        explanation: 'Inference goes beyond what\'s directly stated to understand character.'
      },
      {
        question: 'Author writes: "The sun finally peeked through." Why use "finally"?',
        workingOut: 'Word choice: "finally" suggests waiting, anticipation. Sun appearing was desired/expected.',
        answer: 'Shows the sun was waited for; its appearance was welcome',
        explanation: 'Single word choices reveal author\'s tone and meaning.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Text: "The old house creaked." What atmosphere does this create?',
        options: ['Happy', 'Spooky', 'Exciting', 'Boring'],
        answer: 'Spooky',
        explanation: '"Creaked" and "old house" create eerie, mysterious atmosphere.',
        difficulty: 'easy'
      },
      {
        question: 'Passage describes character as "generous to a fault." What does this mean?',
        options: ['Not generous', 'Too generous', 'Sometimes generous', 'Perfectly generous'],
        answer: 'Too generous',
        explanation: '"To a fault" means excessively - generous but perhaps unwisely so.',
        difficulty: 'medium'
      },
      {
        question: 'Text ends: "She smiled, but her eyes were sad." What can we infer?',
        options: ['She\'s happy', 'She\'s hiding true feelings', 'She\'s confused', 'She\'s angry'],
        answer: 'She\'s hiding true feelings',
        explanation: 'Contrast between smile (outward) and sad eyes (true emotion) suggests hiding feelings.',
        difficulty: 'medium'
      },
      {
        question: 'Author uses short sentences. Why?',
        options: ['Easier reading', 'Create tension', 'Show boredom', 'Save space'],
        answer: 'Create tension',
        explanation: 'Short, choppy sentences often create pace, urgency, or tension.',
        difficulty: 'hard'
      },
      {
        question: 'Main idea of paragraph about recycling benefits?',
        options: ['Recycling is hard', 'Recycling helps environment', 'Recycling costs money', 'No one recycles'],
        answer: 'Recycling helps environment',
        explanation: 'Main idea is the central message - here, environmental benefits.',
        difficulty: 'easy'
      },
      {
        question: 'Character described as "eyes like daggers." This is?',
        options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
        answer: 'Simile',
        explanation: 'Comparison using "like" or "as" is a simile.',
        difficulty: 'medium'
      }
    ],
    tips: [
      'Read questions before passage - know what to look for',
      'Underline key information as you read',
      'For inference questions, ask "What does this suggest?"',
      'Always find evidence - don\'t make unsupported guesses',
      'Watch for opinion vs fact',
      'Time management: don\'t spend too long on one passage',
      'Re-read complex sentences if needed',
      'Check your answers match the question asked'
    ],
    commonMistakes: [
      'Not reading the question carefully',
      'Choosing answers not supported by text',
      'Confusing inference with invention - stay grounded in text',
      'Missing key words in questions (not, except, mainly)',
      'Spending too long on difficult questions',
      'Not checking answers against passage'
    ],
    examStrategy: `
**Time per passage:** 15-20 minutes including reading and questions

**Strategy:**
1. Read title, first and last paragraphs (2 min)
2. Skim passage quickly (2 min)
3. Read questions (1 min)
4. Read passage thoroughly with questions in mind (5 min)
5. Answer questions, citing evidence (8 min)
6. Review answers (2 min)

**GL/CEM/ISEB:** All boards test comprehension heavily - it's the core skill!
    `
  },

  // ==================== MODULE 2: Grammar and Punctuation ====================
  {
    moduleNumber: 2,
    title: 'Grammar and Punctuation',
    duration: '45 minutes',
    introduction: `Master essential grammar and punctuation rules. These skills are tested directly and improve your writing quality.`,
    keyPoints: [
      'Know parts of speech: nouns, verbs, adjectives, adverbs, etc.',
      'Understand sentence structure: subject, verb, object',
      'Master punctuation: full stops, commas, apostrophes, etc.',
      'Identify and correct common errors',
      'Practice makes perfect - apply rules consistently'
    ],
    explanation: `
**Key Grammar Concepts:**

**Parts of Speech:**
- **Noun:** Person, place, thing (cat, London, happiness)
- **Verb:** Action or state (run, is, think)
- **Adjective:** Describes noun (big, blue, happy)
- **Adverb:** Describes verb (quickly, very, yesterday)
- **Pronoun:** Replaces noun (he, she, it, they)
- **Preposition:** Shows relationship (in, on, under, before)
- **Conjunction:** Joins words/clauses (and, but, because)

**Punctuation:**
- **Full Stop (.):** End of sentence
- **Comma (,):** Separate items, clauses, after introductory words
- **Apostrophe ('):** Possession (Tom's book) or contraction (don't)
- **Question Mark (?):** End of question
- **Exclamation Mark (!):** Show strong emotion
- **Quotation Marks (""):** Direct speech or quotes

**Common Grammar Rules:**
- Subject-verb agreement: "He runs" not "He run"
- Tense consistency: Don't switch tenses unnecessarily
- Pronoun agreement: "Everyone has their book" (singular/plural match)

**UK 11+ Focus:**
All boards test grammar, but CEM often integrates it with other skills.
    `,
    examples: [
      {
        question: 'Identify the verb: "The dog barked loudly."',
        workingOut: 'Look for the action word. "Dog" = noun, "barked" = action (verb), "loudly" = how it barked (adverb).',
        answer: 'barked',
        explanation: 'Verb shows action - what the subject (dog) did.'
      },
      {
        question: 'Add apostrophe correctly: "The girls bags were heavy."',
        workingOut: 'Bags belong to girls (plural). Apostrophe after s for plural possession: girls\'.',
        answer: 'The girls\' bags were heavy.',
        explanation: 'Apostrophe after s shows plural possession.'
      },
      {
        question: 'Choose correct: "There/Their/They\'re going to school."',
        workingOut: 'They are = They\'re (contraction). "There" = place, "Their" = belonging.',
        answer: 'They\'re',
        explanation: 'They\'re = they are. Context shows action, not place or possession.'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which is the adverb? "She sang beautifully."',
        options: ['She', 'sang', 'beautifully', 'None'],
        answer: 'beautifully',
        explanation: 'Adverb describes how she sang (the verb).',
        difficulty: 'easy'
      },
      {
        question: 'Correct punctuation: "Its/It\'s a sunny day."',
        options: ['Its', 'It\'s', 'Both', 'Neither'],
        answer: 'It\'s',
        explanation: 'It\'s = it is (contraction). "Its" shows possession.',
        difficulty: 'easy'
      },
      {
        question: 'Identify error: "Me and Tom went shopping."',
        options: ['No error', 'Should be Tom and I', 'Should be Tom and me', 'Wrong verb'],
        answer: 'Should be Tom and I',
        explanation: 'Subject of sentence should be "I" not "me". "Tom and I went."',
        difficulty: 'medium'
      },
      {
        question: 'Add commas: "I bought apples oranges and bananas."',
        options: ['After apples', 'After oranges', 'Both', 'None'],
        answer: 'Both',
        explanation: 'Commas separate items in list: "apples, oranges, and bananas."',
        difficulty: 'easy'
      },
      {
        question: 'Which sentence is correct?',
        options: ['Neither of them are', 'Neither of them is', 'Neither of them were', 'Neither of them be'],
        answer: 'Neither of them is',
        explanation: '"Neither" is singular, requires singular verb "is".',
        difficulty: 'hard'
      },
      {
        question: 'Spot error: "Each student have their own desk."',
        options: ['No error', 'have→has', 'their→his', 'Both B and C'],
        answer: 'have→has',
        explanation: '"Each" is singular, needs "has" not "have". (Note: "their" is acceptable modern usage)',
        difficulty: 'medium'
      }
    ],
    tips: [
      'Learn parts of speech - know what each word does in sentence',
      'For apostrophes: possession (Sam\'s) or contraction (don\'t)',
      'Subject-verb agreement: singular subject = singular verb',
      'Read sentences aloud - errors often sound wrong',
      'Common mix-ups: their/there/they\'re, its/it\'s, your/you\'re',
      'Practice identifying parts of speech in reading',
      'When unsure, eliminate obviously wrong answers'
    ],
    commonMistakes: [
      'Confusing it\'s (it is) with its (belonging to it)',
      'Using "me" instead of "I" as subject',
      'Forgetting apostrophes for contractions',
      'Comma splices - joining sentences with just comma',
      'Inconsistent tenses',
      'Wrong subject-verb agreement'
    ],
    examStrategy: `
**Time:** 30-45 seconds per grammar question

**Quick Checks:**
- Read sentence aloud - does it sound right?
- Identify subject and verb - do they agree?
- Check apostrophes - possession or contraction?
- Look for common errors first

**Practice:** Do grammar exercises daily!
    `
  },

  // Continuing with remaining English modules in efficient format...
  {
    moduleNumber: 3,
    title: 'Vocabulary and Spelling',
    duration: '40 minutes',
    introduction: `Build strong vocabulary and master spelling patterns. These skills improve all areas of English.`,
    keyPoints: ['Learn word roots, prefixes, suffixes', 'Practice spelling rules and common exceptions', 'Read widely to encounter new words', 'Use context clues for unknown words', 'Keep vocabulary journal'],
    explanation: `**Vocabulary:** Know word meanings, synonyms, antonyms. **Spelling:** Learn patterns (ie/ei, double letters, silent letters). **UK focus:** British spellings (colour, favourite, realise). **Practice:** Read challenging texts, note new words, use them in writing.`,
    examples: [
      { question: 'What does "benevolent" mean?', workingOut: 'Root: "bene" = good, "volent" = wishing. Together: wishing good → kind.', answer: 'Kind, generous', explanation: 'Break words into roots to understand meaning.' },
      { question: 'Spell: recieve or receive?', workingOut: 'Rule: "i before e except after c". After c = receive.', answer: 'receive', explanation: 'Common spelling rule helps remember.' },
      { question: 'Synonym for "ancient"?', workingOut: 'Ancient = very old. Synonyms: old, antique, aged, archaic.', answer: 'old/antique', explanation: 'Synonyms have similar meanings.' }
    ],
    practiceQuestions: [
      { question: 'Spell correctly:', options: ['tommorow', 'tomorrow', 'tommorrow', 'tomorow'], answer: 'tomorrow', explanation: 'One m, double r.', difficulty: 'easy' },
      { question: 'What does "microscope" mean?', options: ['Small viewer', 'Large viewer', 'Far viewer', 'Close viewer'], answer: 'Small viewer', explanation: 'Micro=small, scope=view.', difficulty: 'medium' },
      { question: 'British spelling:', options: ['color', 'colour', 'culer', 'coler'], answer: 'colour', explanation: 'British English uses "our" not "or".', difficulty: 'easy' },
      { question: 'Antonym of "expand"?', options: ['Grow', 'Shrink', 'Increase', 'Widen'], answer: 'Shrink', explanation: 'Expand=grow larger, shrink=become smaller.', difficulty: 'easy' },
      { question: 'Prefix "un-" means?', options: ['Again', 'Not', 'Before', 'After'], answer: 'Not', explanation: 'Un- makes word opposite: unhappy=not happy.', difficulty: 'easy' },
      { question: 'Correct: stationary or stationery (for paper)?', options: ['stationary', 'stationery', 'Both', 'Neither'], answer: 'stationery', explanation: 'Stationery=paper, stationary=not moving.', difficulty: 'hard' }
    ],
    tips: ['Read 30 minutes daily', 'Note new words, look up meanings', 'Learn Latin/Greek roots', 'Practice tricky spellings', 'UK spellings matter in 11+!'],
    commonMistakes: ['Confusing similar words (affect/effect)', 'Using American spellings', 'Not learning word roots', 'Ignoring context clues'],
    examStrategy: `**Build vocabulary daily. Use new words in writing. Practice spelling tests weekly.**`
  },

  {
    moduleNumber: 4,
    title: 'Creative Writing',
    duration: '50 minutes',
    introduction: `Learn to write engaging stories and descriptions. Creative writing tests imagination, vocabulary, and technical skills.`,
    keyPoints: ['Plan before writing', 'Use varied vocabulary and sentence structures', 'Show, don\'t tell - use description', 'Include beginning, middle, end', 'Check spelling, grammar, punctuation'],
    explanation: `**Story Elements:** Setting, characters, plot, conflict, resolution. **Techniques:** Descriptive language, dialogue, varied sentences, paragraphs. **UK 11+:** Usually 20-30 minutes, 1-2 sides. **Types:** Story start, title prompt, picture prompt, character description.`,
    examples: [
      { question: 'Make boring sentence interesting: "The dog ran."', workingOut: 'Add adjectives, adverbs, details: "The enormous golden retriever raced gleefully across the muddy field."', answer: 'Enhanced with description', explanation: 'Descriptive words make writing vivid.' },
      { question: 'Show, don\'t tell: She was scared.', workingOut: 'Instead of stating emotion, show it: "Her hands trembled. Her heart pounded. She could barely breathe."', answer: 'Describe physical reactions', explanation: 'Show emotions through actions and descriptions.' },
      { question: 'Structure story: beginning, middle, end', workingOut: 'Beginning: introduce character/setting. Middle: problem/action. End: resolution.', answer: 'Clear structure essential', explanation: 'Stories need clear structure.' }
    ],
    practiceQuestions: [
      { question: 'Best way to start story?', options: ['The End', 'It was sunny', 'Grab attention', 'Long description'], answer: 'Grab attention', explanation: 'Engaging opening hooks reader.', difficulty: 'easy' },
      { question: 'Improve: "He said angrily"', options: ['He shouted', 'He whispered', 'He laughed', 'He agreed'], answer: 'He shouted', explanation: 'Strong verb (shouted) shows anger better than adverb.', difficulty: 'medium' },
      { question: 'New paragraph when?', options: ['Never', 'New topic/speaker', 'Every sentence', 'Random'], answer: 'New topic/speaker', explanation: 'Paragraphs organize ideas and speakers.', difficulty: 'easy' },
      { question: 'Best description word for happy?', options: ['Nice', 'Ecstatic', 'Good', 'Fine'], answer: 'Ecstatic', explanation: 'Precise, strong vocabulary better than vague words.', difficulty: 'medium' },
      { question: 'Include dialogue to?', options: ['Fill space', 'Show character', 'Look good', 'Confuse reader'], answer: 'Show character', explanation: 'Dialogue reveals personality and moves story forward.', difficulty: 'easy' },
      { question: 'Story has no ending. Why bad?', options: ['Too short', 'Confusing', 'No resolution', 'Boring'], answer: 'No resolution', explanation: 'Stories need conclusion to satisfy reader.', difficulty: 'medium' }
    ],
    tips: ['Spend 5 mins planning', 'Vary sentence starts and lengths', 'Use powerful verbs', 'Show emotions through actions', 'Leave time to check work', 'Practice different prompts'],
    commonMistakes: ['No plan', 'Repetitive vocabulary', 'No paragraphs', 'Rushing ending', 'Poor grammar/spelling', 'Boring opening'],
    examStrategy: `**20-30 min story:** 5 min plan, 20 min write, 5 min check. Structure: hook→build→climax→resolution.**`
  },

  {
    moduleNumber: 5,
    title: 'Poetry Analysis',
    duration: '45 minutes',
    introduction: `Understand and analyze poetry. Identify techniques, themes, and meanings in poetic texts.`,
    keyPoints: ['Identify poetic techniques (rhyme, rhythm, metaphor, simile)', 'Understand imagery and symbolism', 'Analyze poet\'s word choices', 'Consider poem\'s mood and tone', 'Support analysis with evidence from text'],
    explanation: `**Techniques:** Rhyme, rhythm, alliteration, metaphor, simile, personification, onomatopoeia. **Analysis:** What does poem mean? How do techniques create effects? What\'s the mood/theme? **UK 11+:** Poetry comprehension common in all boards.`,
    examples: [
      { question: 'Identify technique: "The stars danced playfully"', workingOut: 'Stars can\'t really dance - giving human action to non-human = personification.', answer: 'Personification', explanation: 'Human characteristics given to objects/nature.' },
      { question: 'Effect of rhyme in children\'s poem?', workingOut: 'Rhyme creates rhythm, makes it memorable, fun to read aloud.', answer: 'Musical, memorable quality', explanation: 'Rhyme serves purpose beyond decoration.' },
      { question: 'Metaphor: "Life is a journey"', workingOut: 'Direct comparison without "like/as". Life=journey (not literally).', answer: 'Life compared to journey', explanation: 'Metaphor makes direct comparison.' }
    ],
    practiceQuestions: [
      { question: 'Simile uses which words?', options: ['And, but', 'Like, as', 'Is, are', 'The, a'], answer: 'Like, as', explanation: 'Similes compare using "like" or "as".', difficulty: 'easy' },
      { question: '"Boom! Bang!" is example of?', options: ['Rhyme', 'Simile', 'Onomatopoeia', 'Alliteration'], answer: 'Onomatopoeia', explanation: 'Words sound like what they describe.', difficulty: 'easy' },
      { question: 'Alliteration is?', options: ['Rhyming ends', 'Repeated sounds', 'Long words', 'Short lines'], answer: 'Repeated sounds', explanation: 'Repeated initial consonant sounds (e.g., "silly snake").', difficulty: 'medium' },
      { question: 'Dark imagery suggests?', options: ['Happiness', 'Sadness/mystery', 'Excitement', 'Boredom'], answer: 'Sadness/mystery', explanation: 'Dark images often create somber or mysterious mood.', difficulty: 'medium' },
      { question: 'Why do poets use metaphors?', options: ['Confuse readers', 'Create vivid comparisons', 'Make longer', 'Show off'], answer: 'Create vivid comparisons', explanation: 'Metaphors make abstract ideas concrete and vivid.', difficulty: 'easy' },
      { question: 'Rhythm in poetry creates?', options: ['Pictures', 'Musical quality', 'Confusion', 'Length'], answer: 'Musical quality', explanation: 'Pattern of stressed/unstressed syllables creates rhythm.', difficulty: 'medium' }
    ],
    tips: ['Read poem aloud - hear rhythm', 'Look for patterns (rhyme, repetition)', 'Consider word connotations', 'Identify techniques, explain effects', 'Theme = what poem is about', 'Always use evidence'],
    commonMistakes: ['Confusing simile and metaphor', 'Not explaining why technique is used', 'Ignoring overall meaning', 'Not quoting from poem', 'Misidentifying techniques'],
    examStrategy: `**Read twice: once for meaning, once for techniques. Note key words/phrases. Explain HOW techniques create effects.**`
  },

  {
    moduleNumber: 6,
    title: 'Letter and Article Writing',
    duration: '45 minutes',
    introduction: `Master formal and informal writing formats. Learn to write letters, articles, and reports appropriately.`,
    keyPoints: ['Understand format differences: formal vs informal', 'Use appropriate tone and language', 'Structure: introduction, body, conclusion', 'Include all required elements', 'Match writing to purpose and audience'],
    explanation: `**Letter Types:** Formal (job, complaint, headteacher) vs Informal (friend, family). **Article:** Headline, introduction, paragraphs, conclusion. **Format matters:** Addresses, dear/yours, paragraphs. **Tone:** Formal=polite, no slang. Informal=chatty, friendly.`,
    examples: [
      { question: 'Start formal letter to headteacher?', workingOut: 'Formal address: "Dear Mr/Mrs [Name]," or "Dear Headteacher,"', answer: 'Dear Mrs Smith,', explanation: 'Formal letters use titles and surnames.' },
      { question: 'End informal letter to friend?', workingOut: 'Casual closing: "Love," "Best wishes," "See you soon,"', answer: 'Best wishes, / Your friend,', explanation: 'Informal letters have friendly closings.' },
      { question: 'Article needs?', workingOut: 'Headline (catchy title), introduction (hook), body (information), conclusion (summary).', answer: 'All structural elements', explanation: 'Articles follow journalistic structure.' }
    ],
    practiceQuestions: [
      { question: 'Formal letter ends with?', options: ['Love', 'Yours faithfully', 'Bye', 'Your friend'], answer: 'Yours faithfully', explanation: 'Formal letters use "Yours sincerely/faithfully".', difficulty: 'easy' },
      { question: 'Informal letter can include?', options: ['Slang', 'Contractions', 'Chatty tone', 'All of these'], answer: 'All of these', explanation: 'Informal writing is relaxed and personal.', difficulty: 'easy' },
      { question: 'Article headline should?', options: ['Be long', 'Grab attention', 'Be boring', 'Use big words'], answer: 'Grab attention', explanation: 'Headlines hook readers.', difficulty: 'easy' },
      { question: 'Complaint letter tone?', options: ['Angry', 'Polite but firm', 'Casual', 'Funny'], answer: 'Polite but firm', explanation: 'Formal complaints are respectful but assertive.', difficulty: 'medium' },
      { question: 'Include in letter to newspaper?', options: ['Address', 'Signature', 'Dated', 'All'], answer: 'All', explanation: 'Letters to editors include full format.', difficulty: 'medium' },
      { question: 'Report writing style?', options: ['Story-like', 'Factual, clear', 'Funny', 'Personal opinions'], answer: 'Factual, clear', explanation: 'Reports are objective and informative.', difficulty: 'easy' }
    ],
    tips: ['Learn formats by heart', 'Match tone to audience', 'Formal = no contractions, slang', 'Plan structure before writing', 'Check you\'ve included all required elements', 'Practice different types'],
    commonMistakes: ['Wrong format for type', 'Mixing formal/informal language', 'Missing required elements', 'Wrong greeting/closing', 'No paragraphs', 'Forgetting address/date'],
    examStrategy: `**Identify type first. Use checklist: greeting, introduction, body paragraphs, conclusion, closing. Time: 20-25 minutes.**`
  },

  {
    moduleNumber: 7,
    title: 'Editing and Proofreading',
    duration: '40 minutes',
    introduction: `Learn to spot and correct errors. Essential skill for improving your own writing and answering editing questions.`,
    keyPoints: ['Check spelling, grammar, punctuation', 'Look for sentence structure errors', 'Ensure clarity and coherence', 'Verify facts and logic', 'Read aloud to catch errors'],
    explanation: `**Proofreading:** Final check for errors. **Editing:** Improving content, structure, clarity. **Common errors:** Spelling, punctuation, subject-verb agreement, tense shifts, run-on sentences, fragments. **Process:** Read through multiple times, each focusing on different aspect.`,
    examples: [
      { question: 'Find error: "The dogs was barking loudly."', workingOut: 'Subject: "dogs" (plural). Verb: "was" (singular). Mismatch! Should be "were".', answer: 'was → were', explanation: 'Subject-verb agreement error.' },
      { question: 'Correct: "They went to their there house."', workingOut: 'Their/there confusion. "Their" shows possession (their house). "There" is place.', answer: 'their house', explanation: 'Homophone error: their vs there.' },
      { question: 'Fix run-on: "I like pizza I eat it often."', workingOut: 'Two complete thoughts joined incorrectly. Fix: period, semicolon, or conjunction. "I like pizza. I eat it often." OR "I like pizza, and I eat it often."', answer: 'Add punctuation/conjunction', explanation: 'Run-on sentences need proper punctuation.' }
    ],
    practiceQuestions: [
      { question: 'Error in: "Me and her went shopping."', options: ['No error', 'Me→I', 'her→she', 'Both corrections'], answer: 'Both corrections', explanation: 'Should be "She and I went shopping."', difficulty: 'medium' },
      { question: 'Which needs apostrophe? "The cats bowl"', options: ['No apostrophe', 'cat\'s', 'cats\'', 'Depends'], answer: 'Depends', explanation: 'One cat=cat\'s. Multiple cats=cats\'. Context matters.', difficulty: 'hard' },
      { question: 'Sentence fragment: "Running down the street."', options: ['Complete', 'Missing subject', 'Missing verb', 'Missing object'], answer: 'Missing subject', explanation: 'Who is running? Need subject to complete sentence.', difficulty: 'medium' },
      { question: 'Tense error: "Yesterday, I go to the shops."', options: ['go→went', 'shops→shop', 'I→we', 'No error'], answer: 'go→went', explanation: '"Yesterday" indicates past, need past tense "went".', difficulty: 'easy' },
      { question: 'Which is correct?', options: ['Your right', 'You\'re right', 'Youre right', 'Your\'e right'], answer: 'You\'re right', explanation: 'You\'re = you are. "Your" shows possession.', difficulty: 'easy' },
      { question: 'Best improvement: "The thing was good."', options: ['The thing was great', 'The concert was excellent', 'The stuff was nice', 'It was good'], answer: 'The concert was excellent', explanation: 'Specific nouns and strong adjectives improve vague sentences.', difficulty: 'medium' }
    ],
    tips: ['Read work aloud - errors stand out', 'Check one type of error at a time', 'Know common mistakes (their/there, it\'s/its)', 'Leave time to proofread in exams', 'Practice spotting errors daily', 'Double-check apostrophes and commas'],
    commonMistakes: ['Missing errors when reading silently', 'Not checking systematically', 'Trusting spell-check blindly', 'Overlooking small errors', 'Not proofreading own work', 'Rushing final check'],
    examStrategy: `**3 readings: 1) Meaning/clarity, 2) Grammar/structure, 3) Spelling/punctuation. Time: 5 minutes minimum for final proofread.**`
  },

  {
    moduleNumber: 8,
    title: 'Persuasive Writing',
    duration: '45 minutes',
    introduction: `Learn to write convincingly. Persuasive writing includes arguments, reviews, speeches, and advertisements.`,
    keyPoints: ['State clear opinion/position', 'Support with evidence and examples', 'Use persuasive techniques', 'Address counter-arguments', 'Strong conclusion reinforces view'],
    explanation: `**Purpose:** Convince reader of your viewpoint. **Structure:** Introduction (state position), body (reasons + evidence), conclusion (reinforce). **Techniques:** Facts, statistics, expert opinions, emotional appeal, rhetorical questions, repetition. **Tone:** Confident, assertive but respectful.`,
    examples: [
      { question: 'Persuasive technique: "Wouldn\'t you agree that..."', workingOut: 'Rhetorical question - expects reader to agree, involves them.', answer: 'Rhetorical question', explanation: 'Questions that don\'t need answers persuade through assumption.' },
      { question: 'Strengthen argument: "School uniforms are good."', workingOut: 'Add evidence: "School uniforms promote equality by ensuring all students dress the same, reducing social pressure and bullying related to clothing."', answer: 'Add reasons and evidence', explanation: 'Specific reasons and evidence make arguments stronger.' },
      { question: 'Counter-argument technique?', workingOut: 'Acknowledge opposing view, then refute: "Some say uniforms limit self-expression. However, students can express themselves through interests, hobbies, and personality rather than expensive clothes."', answer: 'Acknowledge then refute', explanation: 'Addressing counter-arguments strengthens your position.' }
    ],
    practiceQuestions: [
      { question: 'Best opening for persuasive text?', options: ['Once upon a time', 'Statistics/question', 'The end', 'Random fact'], answer: 'Statistics/question', explanation: 'Strong openings grab attention and establish credibility.', difficulty: 'easy' },
      { question: 'Rhetorical question is?', options: ['Needs answer', 'No answer needed', 'Very difficult', 'About rhetoric'], answer: 'No answer needed', explanation: 'Rhetorical questions persuade; answers are obvious/assumed.', difficulty: 'easy' },
      { question: 'What strengthens argument?', options: ['Personal opinion only', 'Facts and examples', 'Emotions only', 'Insults'], answer: 'Facts and examples', explanation: 'Evidence supports opinions, making them convincing.', difficulty: 'easy' },
      { question: 'Rule of three technique?', options: ['Three paragraphs', 'Three points repeated', 'Three writers', 'Three checks'], answer: 'Three points repeated', explanation: 'Listing three things is memorable and persuasive.', difficulty: 'medium' },
      { question: 'Emotive language purpose?', options: ['Confuse', 'Appeal to feelings', 'Show off', 'Fill space'], answer: 'Appeal to feelings', explanation: 'Emotional words sway readers beyond logic.', difficulty: 'medium' },
      { question: 'Best conclusion technique?', options: ['Introduce new idea', 'Summarize and call to action', 'Say "The End"', 'Apologize'], answer: 'Summarize and call to action', explanation: 'Conclusions reinforce message and prompt reader response.', difficulty: 'easy' }
    ],
    tips: ['Be clear about your position', 'Use PEE: Point, Evidence, Explain', 'Include variety of techniques', 'Balance logic and emotion', 'Anticipate objections', 'Confident tone essential', 'Practice on real topics'],
    commonMistakes: ['Weak or unclear position', 'No evidence', 'Only emotional appeal', 'Ignoring counter-arguments', 'Aggressive tone', 'Weak conclusion'],
    examStrategy: `**Plan: Position, 3 main reasons with evidence, counter-argument, strong conclusion. Time: 25-30 minutes including planning.**`
  },

  {
    moduleNumber: 9,
    title: 'Exam Technique and Practice',
    duration: '60 minutes',
    introduction: `Final module combines all English skills. Master exam technique, time management, and confidence for 11+ English success.`,
    keyPoints: ['Understand exam format', 'Manage time effectively', 'Read questions carefully', 'Plan written work', 'Review and proofread'],
    explanation: `
**UK 11+ English Exams:**

**GL Assessment:**
- Reading comprehension (2-3 passages)
- Writing task (story or non-fiction)
- 50 minutes total
- Multiple choice and written answers

**CEM:**
- Integrated skills
- Comprehension + vocabulary + grammar
- 45-50 minutes
- Variety of question types

**ISEB:**
- Reading comprehension
- Writing task
- Separate papers sometimes
- 45-60 minutes

**Time Management:**
- Comprehension: 15-20 min per passage
- Writing: 25-30 min (5 plan, 20 write, 5 check)
- Grammar: 30-45 sec per question

**Success Strategies:**
1. Read all instructions carefully
2. Answer easy questions first
3. Leave time for proofreading
4. Show working/evidence
5. Neat handwriting matters
6. Don\'t leave blanks - educated guess better than nothing
    `,
    examples: [
      { question: 'Time management for 50-min exam with comprehension + writing?', workingOut: '25 min comprehension (including reading), 25 min writing (including planning/checking).', answer: 'Split time equally with buffer', explanation: 'Balance time across tasks.' }
    ],
    practiceQuestions: [
      { question: 'Best strategy if stuck on question?', options: ['Spend 10 minutes', 'Skip and return', 'Guess immediately', 'Give up'], answer: 'Skip and return', explanation: 'Don\'t waste time; move on and come back.', difficulty: 'easy' },
      { question: 'Should you plan writing?', options: ['No, waste of time', 'Yes, always', 'Only long pieces', 'Only if stuck'], answer: 'Yes, always', explanation: 'Planning improves structure and saves time.', difficulty: 'easy' },
      { question: 'How long to proofread?', options: ['Not needed', '1 minute', '5 minutes', '10 minutes'], answer: '5 minutes', explanation: 'Adequate time to catch errors without rushing.', difficulty: 'easy' },
      { question: 'Mark allocation shows?', options: ['Difficulty', 'Time to spend', 'Both', 'Neither'], answer: 'Both', explanation: 'More marks = more time and detail needed.', difficulty: 'medium' },
      { question: 'What to do in last 5 minutes?', options: ['Start new work', 'Check answers', 'Rest', 'Count words'], answer: 'Check answers', explanation: 'Final review catches mistakes.', difficulty: 'easy' },
      { question: 'Best exam preparation week before?', options: ['Learn new content', 'Practice papers', 'Don\'t study', 'Panic'], answer: 'Practice papers', explanation: 'Timed practice builds confidence and technique.', difficulty: 'easy' }
    ],
    tips: [
      'Do 6-8 full practice papers',
      'Time yourself strictly',
      'Review mistakes thoroughly',
      'Build vocabulary daily',
      'Read quality texts regularly',
      'Practice all writing types',
      'Master grammar rules',
      'Stay calm and confident'
    ],
    commonMistakes: [
      'Poor time management',
      'Not reading questions carefully',
      'No planning for writing',
      'Forgetting to proofread',
      'Panicking over hard questions',
      'Not practicing enough'
    ],
    examStrategy: `
**Exam Day Plan:**
1. Read all instructions
2. Scan whole paper
3. Start with easiest section
4. Stick to time allocations
5. Mark uncertain answers
6. Return to skipped questions
7. Final 5-minute check

**Writing Checklist:**
- Planned structure
- Varied vocabulary
- Different sentence types
- Correct punctuation
- Proper paragraphs
- Proofread for errors

**Reading Checklist:**
- Read passage thoroughly
- Underline key information
- Find evidence for answers
- Check answer fits question
- Don\'t over-think

**Remember:** You\'ve prepared well. Trust your knowledge. Stay calm. Do your best! 🌟
    `
  }
];

