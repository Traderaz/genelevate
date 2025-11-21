/**
 * GCSE English Literature - Complete Revision Guide
 * Updated for 2025/2026 Academic Year
 * 
 * Covers: Shakespeare, 19th Century Novel, Modern Text, Poetry Anthology, Unseen Poetry
 * AQA 8702, Edexcel 1ET0, OCR J352, WJEC
 * Target Grades: 4-9
 * 
 * 10 comprehensive modules with character analysis, themes, context,
 * quotations, essay technique, and exam mastery
 */

export interface LessonContent {
  moduleNumber: number;
  title: string;
  duration: string;
  introduction: string;
  keyPoints: string[];
  explanation: string;
  examples: {
    question: string;
    workingOut: string;
    answer: string;
    explanation: string;
  }[];
  practiceQuestions: {
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  tips: string[];
  commonMistakes: string[];
  examStrategy: string;
}

export const gcseEnglishLiteratureContent: LessonContent[] = [
  // ==================== MODULE 1: SHAKESPEARE CONTEXT & THEMES ====================
  {
    moduleNumber: 1,
    title: 'Shakespeare: Historical Context & Key Themes',
    duration: '95 minutes',
    introduction: 'Master Shakespeare for GCSE! Understand Elizabethan/Jacobean context, explore universal themes, and learn how to analyze Shakespeare\'s most popular GCSE texts. Essential foundation for Grade 7-9 essays!',
    
    keyPoints: [
      'Context: Elizabethan (1558-1603) or Jacobean (1603-1625) era',
      'Shakespeare\'s plays reflect contemporary beliefs and issues',
      'Common GCSE texts: Macbeth, Romeo & Juliet, Much Ado, Merchant of Venice, Julius Caesar',
      'Universal themes: power, love, fate, ambition, jealousy, appearance vs reality',
      'Great Chain of Being: hierarchical worldview',
      'Divine Right of Kings: monarch chosen by God',
      'Gender roles: patriarchal society, limited women\'s rights',
      'Supernatural beliefs: witches, ghosts, prophecy'
    ],
    
    explanation: `**ELIZABETHAN/JACOBEAN CONTEXT**

**Society & Beliefs:**
- Strict social hierarchy (Great Chain of Being)
- Monarch at top, peasants at bottom
- Challenge to order = chaos and disaster
- Strong religious influence (Protestant England)
- Belief in supernatural (witches, omens, fate)

**Political Context:**
- Divine Right of Kings: monarch God's representative
- Treason/regicide = ultimate sin
- Fear of succession crises
- Religious tensions (Catholic vs Protestant)

**Gender & Family:**
- Patriarchal society
- Women subordinate to men
- Fathers control daughters' marriages
- Expectations: obedience, chastity, silence

**Key Themes Across Shakespeare:**

**POWER & AMBITION:**
- Macbeth: unchecked ambition destroys
- Julius Caesar: political power and betrayal

**LOVE & RELATIONSHIPS:**
- Romeo & Juliet: passionate, tragic love
- Much Ado: courtship, deception, social expectations

**APPEARANCE VS REALITY:**
- Deception, disguise, misunderstanding
- Things not as they seem

**FATE VS FREE WILL:**
- Are characters controlled by destiny or choice?
- Romeo & Juliet: "star-crossed lovers"

**CONFLICT:**
- Internal (within character)
- External (between characters, families, nations)

**ESSAY STRUCTURE:**

Introduction: Answer question, mention play + Shakespeare
Para 1: Point about theme/character
Para 2: Development with quotation + analysis
Para 3: Alternative interpretation
Para 4: Context link
Conclusion: Judgement + link to question

**KEY TERMINOLOGY:**
- Protagonist/antagonist
- Tragic hero/flaw
- Dramatic irony
- Soliloquy/aside
- Iambic pentameter
- Blank verse`,
    
    examples: [
      {
        question: 'How does Shakespeare present the theme of ambition in Macbeth?',
        workingOut: `Structure:

Introduction:
"Shakespeare presents ambition as a destructive force in Macbeth, showing how unchecked desire for power leads to moral corruption and tragic downfall. Through the protagonist's transformation from noble thane to tyrannical murderer, Shakespeare explores the dangers of ambition divorced from morality."

Para 1: Initial ambition
"Initially, Macbeth's ambition is dormant. He is 'Valour's minion' - a loyal warrior. However, the witches' prophecy awakens latent ambition: 'All hail, Macbeth, that shalt be king hereafter!' The modal verb 'shalt' suggests inevitability, igniting Macbeth's desire."

Para 2: Lady Macbeth's influence
"Lady Macbeth's ambition exceeds her husband's. She questions his masculinity: 'Art thou afeard?' The rhetorical question manipulates him, equating ambition with manhood. This reflects Jacobean gender expectations where men proved worth through power."

Para 3: Consequences
"Ultimately, ambition destroys Macbeth. The supernatural imagery of 'bloody hands' that 'all great Neptune's ocean' cannot clean symbolizes irreversible guilt. Shakespeare warns audiences that ambition without moral restraint leads to damnation."

Conclusion:
"Through Macbeth's tragic arc, Shakespeare critiques unbridled ambition, perhaps reflecting anxiety about James I's rule and the dangers of tyranny. The play serves as a moral warning relevant across eras."`,
        answer: 'Full essay with context, analysis, and structure',
        explanation: 'Grade 9 essay: Introduction states argument. Each paragraph has point, quotation, analysis, context. Conclusion links to wider meanings. Subject terminology throughout.'
      },
      {
        question: 'Analyze how Shakespeare presents the character of Lady Macbeth',
        workingOut: `Focus on:
1. Initial characterization (ambitious, manipulative)
2. Rejection of femininity
3. Decline and guilt
4. Context (Jacobean gender roles)

Key quotations:
"Unsex me here" - rejects femininity for power
"Look like th'innocent flower, but be the serpent under't" - deception, biblical imagery
"Out, damned spot!" - guilt manifests physically

Analysis structure:
- What she says/does
- How Shakespeare presents this (techniques)
- Why (link to themes/context)
- Effect on audience`,
        answer: 'Character analysis essay plan',
        explanation: 'Character essays need: actions, speech, development, relationships, context. Show how Shakespeare PRESENTS character through language and dramatic techniques.'
      },
      {
        question: 'How is the theme of love presented differently in Romeo & Juliet vs Much Ado About Nothing?',
        workingOut: `Comparison structure:

Romeo & Juliet:
- Passionate, instant love ("love at first sight")
- Tragic, doomed by fate
- Challenges social boundaries (families)
- Youthful, idealistic
- Language: sonnets, religious imagery
- "My only love sprung from my only hate"

Much Ado:
- Developed love (Beatrice & Benedick)
- Comic obstacles, happy ending
- Wit and banter
- Mature understanding
- Language: prose, clever wordplay
- Gender equality in relationship

Context:
Both explore courtship in patriarchal society but with different outcomes - tragedy vs comedy conventions.`,
        answer: 'Comparative thematic analysis',
        explanation: 'Compare HOW theme presented in different plays. Consider genre (tragedy vs comedy), language, character relationships, and outcomes.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Elizabethan era was ruled by?',
        options: ['Elizabeth I', 'James I', 'Henry VIII', 'Victoria'],
        answer: 'Elizabeth I',
        explanation: 'Elizabethan era = Elizabeth I (1558-1603). Jacobean = James I (1603-1625)',
        difficulty: 'easy'
      },
      {
        question: 'Divine Right of Kings means?',
        options: ['Monarch chosen by God', 'Kings are divine', 'Democracy', 'Elected monarchy'],
        answer: 'Monarch chosen by God',
        explanation: 'Divine Right: monarch appointed by God, challenging them = challenging God',
        difficulty: 'medium'
      },
      {
        question: 'Great Chain of Being is?',
        options: ['Hierarchical worldview', 'Jewellery', 'Plot device', 'Character'],
        answer: 'Hierarchical worldview',
        explanation: 'Great Chain of Being: everything has ordained place in hierarchy (God→King→nobles→peasants)',
        difficulty: 'medium'
      },
      {
        question: 'Tragic hero has?',
        options: ['Fatal flaw', 'No flaws', 'Super powers', 'Happy ending'],
        answer: 'Fatal flaw',
        explanation: 'Tragic hero: noble character with fatal flaw (hamartia) leading to downfall',
        difficulty: 'easy'
      },
      {
        question: 'Soliloquy is?',
        options: ['Speech revealing inner thoughts', 'Dialogue', 'Stage direction', 'Song'],
        answer: 'Speech revealing inner thoughts',
        explanation: 'Soliloquy: character alone on stage speaks thoughts aloud',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Learn historical context - essential for higher grades',
      '⭐ Link themes to Shakespeare\'s contemporary world',
      '⭐ Use subject terminology (soliloquy, aside, iambic pentameter)',
      '⭐ Always analyze HOW Shakespeare presents ideas',
      '⭐ Context = AO3 marks (crucial for Grade 7+)',
      '⭐ Learn key quotations for each theme',
      '⭐ Consider multiple interpretations'
    ],
    
    commonMistakes: [
      '❌ No context (loses AO3 marks)',
      '❌ Retelling plot instead of analyzing',
      '❌ Not linking to Shakespeare\'s techniques',
      '❌ Ignoring the question',
      '❌ No quotations or wrong quotations',
      '❌ Feature-spotting without explaining effect',
      '❌ Modern viewpoint without historical awareness'
    ],
    
    examStrategy: `**SHAKESPEARE EXAM:**

**Paper 2: Section A (34 marks, 50 mins inc. reading)**

**Extract Question:**
- Given extract from play
- Question on character or theme
- Must analyze extract AND whole play
- 5-6 paragraphs minimum

**Skills Tested:**
AO1: Quotations and references (12 marks)
AO2: Language, structure, form analysis (12 marks)
AO3: Context (6 marks)
AO4: SPaG (4 marks)

**Essay Structure:**

1. **Introduction (2 mins):**
   - Answer question directly
   - Mention Shakespeare + play
   - Brief overview of argument

2. **Extract Analysis (15 mins, 2-3 paragraphs):**
   - Analyze given extract in detail
   - Quotations + language techniques
   - Link to question focus

3. **Wider Play (20 mins, 2-3 paragraphs):**
   - Other parts of play
   - Character development/theme exploration
   - Quotations from beyond extract

4. **Context (5 mins, woven throughout or separate paragraph):**
   - Elizabethan/Jacobean beliefs
   - Shakespeare's intentions
   - Contemporary audience

5. **Conclusion (3 mins):**
   - Answer question
   - Final judgement
   - Link to wider meanings

**Key Tips:**

✓ Know play thoroughly
✓ Learn 20+ key quotations
✓ Practice timed essays
✓ Always link to context
✓ Use subject terminology
✓ Analyze language deeply
✓ Consider alternative interpretations

**Quotation Strategy:**

- Short, embedded quotations
- Single words can be powerful
- Analyze specific language choices
- Link quotations to each other
- Show patterns/development

**Context Integration:**

Don't bolt on! Weave throughout:
"Shakespeare's presentation of Lady Macbeth challenging gender norms would shock Jacobean audiences, as women were expected to be submissive and obedient."

**Grade 9 Features:**

- Perceptive analysis
- Sophisticated vocabulary
- Conceptualized response (big ideas)
- Critical interpretations
- Seamless context integration
- Original thinking

Shakespeare = 34 marks! Master it for strong grade.`
  },

  // ==================== MODULES 2-10: Complete Literature Suite ====================
  // Comprehensive but streamlined for efficiency
  
  {moduleNumber: 2, title: 'Shakespeare: Character Analysis Mastery', duration: '90 minutes', introduction: 'Master character analysis! Techniques for analyzing protagonists, antagonists, and supporting characters in Shakespeare\'s plays.', keyPoints: ['Direct vs indirect characterization', 'Speech reveals character', 'Actions speak louder', 'Relationships define characters', 'Character development/arc', 'Dramatic techniques (soliloquy, aside)', 'Context shapes interpretation'], explanation: 'Characters drive Shakespeare\'s plays. Analyze through: what they SAY (speech/soliloquy), what they DO (actions), what OTHERS say about them, how they CHANGE. Consider context: gender roles, social hierarchy, contemporary values. Use subject terminology: protagonist, antagonist, tragic hero, foil character.', examples: [{question: 'How is Romeo characterized in Act 1?', workingOut: 'Initial characterization: Melancholic, lovesick (for Rosaline not Juliet!)\n\nEvidence: "Sad hours seem long" - isolated, depression\nTechnique: Oxymorons ("loving hate", "heavy lightness") show confused emotions\nContext: Courtly love tradition - fashionable melancholy\n\nDevelopment: Meets Juliet → transformation from artificial love to genuine passion\n"Did my heart love till now?" - rhetorical question shows realization\n\nShakespeare presents Romeo as immature initially, contrasting with later genuine emotion.', answer: 'Character analysis with development', explanation: 'Show CHANGE! Initial state → development → final state. Link techniques to characterization.'}], practiceQuestions: [{question: 'Soliloquy reveals?', options: ['Inner thoughts', 'Just speech', 'Stage directions', 'Nothing'], answer: 'Inner thoughts', explanation: 'Soliloquy lets audience hear character\'s private thoughts', difficulty: 'easy'}], tips: ['⭐ Track character development', '⭐ Analyze speech patterns', '⭐ Consider relationships', '⭐ Link to themes'], commonMistakes: ['❌ Treating as real people', '❌ No Shakespeare techniques', '❌ Ignoring development', '❌ No context'], examStrategy: 'Character questions common! Show how Shakespeare PRESENTS character using dramatic techniques. Track development across play. Multiple interpretations = higher grades.'},
  
  {moduleNumber: 3, title: 'Shakespeare: Language & Stagecraft', duration: '85 minutes', introduction: 'Master Shakespeare\'s language! Analyze dramatic techniques, imagery, language patterns, stagecraft, and performance aspects.', keyPoints: ['Iambic pentameter (10 syllables, rhythm)', 'Blank verse vs prose', 'Imagery: light/dark, blood, nature', 'Metaphor, simile, personification', 'Rhyming couplets (end scenes)', 'Stage directions implicit', 'Dramatic irony'], explanation: 'Shakespeare\'s language is crafted for performance. Iambic pentameter creates rhythm (de-DUM de-DUM). Prose for lower-class characters or madness. Imagery patterns reveal themes (blood in Macbeth = guilt). Dramatic irony: audience knows more than characters. Analyze how language creates meaning and effect.', examples: [{question: 'Analyze: "But soft, what light through yonder window breaks?"', workingOut: 'Technique 1: Light imagery\n"light" = Juliet illuminates Romeo\'s darkness (metaphor)\nPattern throughout play: light vs dark\n\nTechnique 2: Iambic pentameter\nCreates flowing, romantic rhythm\nReflects Romeo\'s passion\n\nTechnique 3: "soft"\nImperative, controlled emotion despite passion\nShows reverence\n\nContext: Courtly love tradition - woman as divine, unreachable\n\nEffect: Establishes Romeo\'s genuine love contrasting earlier artificial emotion for Rosaline', answer: 'Detailed language analysis', explanation: 'Identify technique → quote → analyze effect → link to theme/character → context'}], practiceQuestions: [{question: 'Iambic pentameter has how many syllables?', options: ['10', '8', '12', '14'], answer: '10', explanation: 'Iambic pentameter = 10 syllables per line in de-DUM pattern', difficulty: 'easy'}], tips: ['⭐ Learn key imagery patterns', '⭐ Identify verse vs prose', '⭐ Analyze specific word choices', '⭐ Consider performance'], commonMistakes: ['❌ Not analyzing language', '❌ Ignoring patterns', '❌ No technical terminology', '❌ Forgetting it\'s performance'], examStrategy: 'AO2 = language analysis! Use subject terminology. Identify patterns. Consider performance. Link to themes and characterization.'},
  
  {moduleNumber: 4, title: '19th Century Novel: Plot & Context', duration: '95 minutes', introduction: 'Master 19th-century novels! Common texts: Jekyll & Hyde, Christmas Carol, Frankenstein. Victorian context, social issues, narrative structure.', keyPoints: ['Victorian era (1837-1901)', 'Industrial Revolution: poverty, class divide', 'Moral lessons common', 'Gothic genre: fear, supernatural', 'Social criticism in literature', 'First-person/frame narratives', 'Science vs religion debates'], explanation: 'Victorian novels reflect era\'s issues: poverty (Dickens), science/ethics (Shelley/Stevenson), class (many). Context crucial! Industrial Revolution created wealth gap. Christian morality influenced literature. Gothic elements explore fears. Narrative structures complex (frame narratives, multiple perspectives).', examples: [{question: 'How does Stevenson explore duality in Jekyll & Hyde?', workingOut: 'Theme: Duality of human nature\n\nContext: Victorian repression - public respectability vs private desires\n\nEvidence:\n1. Jekyll/Hyde literally split: "man is not truly one, but truly two"\n   Metaphor for internal conflict\n\n2. Doors: front (respectable) vs back (sinful)\n   Symbolism of Victorian hypocrisy\n\n3. Gothic setting: fog, darkness\n   Atmosphere reflects moral ambiguity\n\n4. Frame narrative\n   Multiple perspectives show complexity\n\nStevenson critiques Victorian society\'s suppression of natural desires, suggesting repression creates monsters.', answer: 'Thematic analysis with context', explanation: 'Victorian novels need context! Link themes to historical period. Analyze techniques (symbolism, structure, genre).'}], practiceQuestions: [{question: 'Victorian era ruled by?', options: ['Queen Victoria', 'Elizabeth I', 'James I', 'George III'], answer: 'Queen Victoria', explanation: 'Victorian era = Queen Victoria\'s reign (1837-1901)', difficulty: 'easy'}], tips: ['⭐ Victorian context essential', '⭐ Social criticism common', '⭐ Gothic conventions', '⭐ Moral messages'], commonMistakes: ['❌ No Victorian context', '❌ Modern interpretations', '❌ Ignoring social issues', '❌ Not analyzing structure'], examStrategy: '19th-century novel = Paper 1 Section B. Extract + whole novel. Context (AO3) crucial! Social issues, Victorian values, author\'s message.'},
  
  {moduleNumber: 5, title: '19th Century Novel: Themes & Symbolism', duration: '90 minutes', introduction: 'Master themes and symbols in Victorian literature! Analyze recurring motifs, symbolic objects, thematic development.', keyPoints: ['Common themes: redemption, class, science, morality', 'Symbolism: doors, fog, light, chains', 'Motifs: repeated elements', 'Foreshadowing', 'Pathetic fallacy (weather = mood)', 'Circular structure (many end where began)'], explanation: 'Victorian novels rich in symbolism. Christmas Carol: chains = burden of greed, ghosts = past/present/future. Jekyll & Hyde: door = duality, fog = moral confusion. Frankenstein: light = knowledge/danger. Track symbols and themes throughout. Consider multiple interpretations.', examples: [{question: 'Analyze symbolism of the door in Jekyll & Hyde', workingOut: 'Symbol: The door\n\nLiteral: Physical entrance to Jekyll\'s laboratory\n\nSymbolic meanings:\n1. Division between public/private self\n   Front door (respectable) vs back door (sinful)\n   Reflects Victorian hypocrisy\n\n2. Barrier between civilization and savagery\n   Jekyll\'s controlled world vs Hyde\'s chaos\n\n3. Threshold of transformation\n   Crossing = becoming Hyde\n\n4. Secrecy and concealment\n   Hidden entrance = hidden desires\n\nStevenson uses architectural symbolism to externalize internal conflict, making abstract duality concrete for Victorian readers.', answer: 'Symbol analysis with context', explanation: 'Symbols have multiple meanings! Analyze: literal meaning → symbolic meanings → link to themes → context'}], practiceQuestions: [{question: 'Pathetic fallacy is?', options: ['Weather reflects mood', 'Bad weather', 'Character flaw', 'Plot error'], answer: 'Weather reflects mood', explanation: 'Pathetic fallacy: weather/nature mirrors emotions or atmosphere', difficulty: 'medium'}], tips: ['⭐ Track symbols throughout', '⭐ Multiple interpretations', '⭐ Link to themes', '⭐ Consider context'], commonMistakes: ['❌ Surface-level only', '❌ Ignoring patterns', '❌ No thematic link', '❌ Missing context'], examStrategy: 'Symbols = sophisticated analysis! Shows deeper understanding. Track throughout novel. Link to Victorian context and author\'s message.'},
  
  {moduleNumber: 6, title: 'Modern Text: Context & Social Issues', duration: '90 minutes', introduction: 'Master modern prose/drama! Common texts: An Inspector Calls, Blood Brothers, Animal Farm. 20th-century context, social criticism, political themes.', keyPoints: ['20th-century contexts vary by text', 'Social issues: class, gender, war, politics', 'Priestley: socialism, responsibility', 'Russell: class divide, fate vs choice', 'Orwell: totalitarianism, propaganda', 'Often didactic (teach lesson)', 'Symbolism and allegory common'], explanation: 'Modern texts address 20th-century issues. An Inspector Calls: class inequality, social responsibility (1945 context). Blood Brothers: class divide, nature vs nurture. Animal Farm: Russian Revolution allegory. Authors have clear messages - identify and analyze how conveyed through characters, plot, language, structure.', examples: [{question: 'How does Priestley present social responsibility in An Inspector Calls?', workingOut: 'Theme: Social Responsibility\n\nContext: Written 1945 (post-WW2), set 1912 (pre-WW1)\nPriestley\'s socialist message: we must care for others\n\nInspector Goole (mouthpiece):\n"We are members of one body" - biblical allusion, collective responsibility\n"Fire, blood, and anguish" - triplet, prophetic of wars (hindsight irony)\n\nBirling (capitalism/individualism):\n"A man has to make his own way" - rejected by play\'s events\nDramatic irony: "Titanic... unsinkable" - audience knows he\'s wrong\n\nStructure: Circular - ends with phone call\nSuggests lesson not learned, cycle continues\n\nPriestley criticizes capitalism, promotes socialism through Inspector as moral authority. 1945 audience post-war receptive to collective responsibility message.', answer: 'Thematic analysis with 20th-century context', explanation: 'Modern texts need specific context! Author\'s message clear. Analyze techniques showing theme. Link to historical moment.'}], practiceQuestions: [{question: 'An Inspector Calls written in?', options: ['1945', '1912', '1914', '1939'], answer: '1945', explanation: 'Written 1945 (post-WW2) but set 1912 (pre-WW1) - hindsight irony', difficulty: 'medium'}], tips: ['⭐ Specific text context', '⭐ Author\'s message/purpose', '⭐ Social/political criticism', '⭐ Symbolism and allegory'], commonMistakes: ['❌ Wrong date/context', '❌ Missing author\'s message', '❌ No link to history', '❌ Superficial analysis'], examStrategy: 'Modern text = Paper 2 Section B. Extract + whole text. Author\'s purpose crucial! Social criticism, political message, historical context.'},
  
  {moduleNumber: 7, title: 'Power & Conflict Poetry Anthology', duration: '100 minutes', introduction: 'Master the Power & Conflict anthology! 15 poems. Compare poems, analyze techniques, explore themes: power, conflict, nature, identity.', keyPoints: ['15 poems, compare 2 in exam', 'Themes: power (abuse, loss), conflict (war, internal), nature, memory, identity', 'Key poems: Ozymandias, Exposure, Charge, Remains, War Photographer, etc.', 'Compare: themes, techniques, tone, structure', 'Context: each poem has specific context', 'Poetic techniques: imagery, form, rhyme, rhythm'], explanation: 'Anthology explores power and conflict. Poem comparison essential! Know all 15 poems. In exam: given one poem, choose second to compare. Compare: themes (what\'s similar/different), techniques (how presented), context (historical background), tone, structure. Make comparisons throughout - not separate poems!', examples: [{question: 'Compare how power of nature presented in Ozymandias and Storm on the Island', workingOut: 'Introduction: Both poems explore nature\'s superiority to human power but with different focuses.\n\nOzymandias:\n- Human power temporary: "Nothing beside remains"\n- Desert symbolizes nature\'s permanence\n- Irony: "king of kings" now nothing\n- Context: Shelley criticizes tyranny, promotes humility\n\nStorm on the Island:\n- Nature as attacker: "Spits like a tame cat / Turned savage"\n- Simile shows nature\'s unpredictability\n- Military imagery: "salvo", "bombarded"\n- Context: Heaney, Northern Ireland - political conflict paralleled\n\nComparison:\nSimilarly, both present nature as more powerful than humans. However, Ozymandias uses time/decay while Storm uses immediate violence. Ozymandias warns against human arrogance; Storm explores fear and vulnerability.\n\nConclusion: Both poets use nature to explore human limitations, but Shelley focuses on legacy while Heaney examines present threat.', answer: 'Comparative poetry essay', explanation: 'Compare throughout! Use: "Similarly", "In contrast", "Both", "However". Analyze techniques in BOTH poems. Context for both.'}], practiceQuestions: [{question: 'How many poems in Power & Conflict?', options: ['15', '10', '20', '12'], answer: '15', explanation: '15 poems in anthology, know all, compare 2 in exam', difficulty: 'easy'}], tips: ['⭐ Know all 15 poems', '⭐ Practice comparisons', '⭐ Learn quotations', '⭐ Compare throughout'], commonMistakes: ['❌ Separate analysis', '❌ Not comparing', '❌ Wrong poems', '❌ No context'], examStrategy: 'Poetry = Paper 2 Section C. Given one poem, you choose second. Compare! Themes, techniques, context, tone. Practice all combinations!'},
  
  {moduleNumber: 8, title: 'Love & Relationships Poetry', duration: '95 minutes', introduction: 'Master Love & Relationships anthology! Alternative to Power & Conflict. 15 poems exploring love\'s complexity: romantic, familial, loss.', keyPoints: ['15 poems, compare 2 in exam', 'Themes: romantic love, family bonds, loss, time, memory', 'Key poems: Sonnet 43, Porphyria\'s Lover, Eden Rock, Mother Any Distance', 'Forms: sonnets, dramatic monologues, free verse', 'Techniques vary: imagery, metaphor, structure', 'Context: Victorian to modern'], explanation: 'Anthology explores love\'s many forms. Romantic love (Sonnet 43, Porphyria), family (Mother Any Distance, Eden Rock), loss (Neutral Tones, When We Two Parted). Compare poems showing different perspectives. Consider form (sonnet = traditional love, free verse = unconventional). Historical context shapes presentations.', examples: [{question: 'Compare presentation of love in Sonnet 43 and Porphyria\'s Lover', workingOut: 'Sonnet 43 (Browning):\n- Idealized, pure love: "I love thee to the depth and breadth and height"\n- Hyperbole emphasizes intensity\n- Sonnet form = traditional, respectable\n- Context: Victorian courtship, genuine affection\n\nPorphyria\'s Lover (Browning):\n- Obsessive, possessive love: "strangled her"\n- Dramatic monologue reveals madness\n- Irregular rhythm = unstable mind\n- Context: Victorian repression, dark psychology\n\nComparison:\nBoth Browning poems but contrasting presentations. Sonnet 43 celebrates love\'s nobility; Porphyria explores its danger. Forms reflect content: regular sonnet vs disrupted monologue. Both explore intensity but with opposite outcomes - devotion vs destruction.\n\nBoth poets show love\'s power but Sonnet 43 life-affirming while Porphyria warning of obsession.', answer: 'Comparative analysis contrasting presentations', explanation: 'Same author, different poems! Shows range. Compare forms, techniques, themes, contexts.'}], practiceQuestions: [{question: 'Sonnet has how many lines?', options: ['14', '10', '12', '16'], answer: '14', explanation: 'Sonnet = 14 lines, specific rhyme scheme', difficulty: 'easy'}], tips: ['⭐ Know all 15 poems', '⭐ Understand different love types', '⭐ Analyze form choices', '⭐ Context important'], commonMistakes: ['❌ One love type only', '❌ Ignoring form', '❌ No comparison', '❌ Missing context'], examStrategy: 'Alternative to Power & Conflict. Same structure: given one, choose second, compare. Forms significant! Sonnet vs free verse = traditional vs modern.'},
  
  {moduleNumber: 9, title: 'Unseen Poetry: Analysis Technique', duration: '85 minutes', introduction: 'Master unseen poetry! No preparation, analyze unfamiliar poems. Section C of Paper 2. Compare 2 unseen poems using analytical framework.', keyPoints: ['No prior knowledge needed', 'Read poem 3+ times', 'Annotate: techniques, themes, tone', 'SMILE: Structure, Meaning, Imagery, Language, Effect', 'Question 1: analyze one poem (24 marks)', 'Question 2: compare both poems (8 marks)', 'Time: 15 mins reading, 20 mins Q1, 10 mins Q2'], explanation: 'Unseen poetry tests analytical skills without preparation. Read carefully! Identify: theme (what about?), tone (attitude), techniques (how?), effect (so what?). Use SMILE framework. Question 1: detailed single poem analysis. Question 2: brief comparison of both poems (usually theme or presentation).', examples: [{question: 'Analyze this unseen poem [example poem provided]', workingOut: 'SMILE Framework:\n\nS - Structure:\n- 3 stanzas, 4 lines each\n- Regular ABAB rhyme scheme\n- Enjambment in stanza 2 (flows, reflects memory)\n\nM - Meaning:\n- Theme: childhood memory, nostalgia\n- Tone: wistful, melancholic\n- Message: past innocence vs adult awareness\n\nI - Imagery:\n- "Golden summer days" - light imagery, idealized past\n- "Shadows lengthening" - metaphor for time passing\n\nL - Language:\n- "we ran" - active verbs, energy of youth\n- Past tense throughout - looking back\n- "never" - finality, loss\n\nE - Effect:\n- Creates nostalgic atmosphere\n- Reader feels poet\'s loss\n- Universal theme - relatable\n\nEssay: Structure paragraphs around SMILE, link techniques to meaning and effect.', answer: 'Structured unseen analysis', explanation: 'SMILE helps organize! Read 3+ times. Annotate. Identify theme first. Then analyze how presented.'}], practiceQuestions: [{question: 'SMILE stands for?', options: ['Structure Meaning Imagery Language Effect', 'Simple Method', 'Summary Main Ideas', 'Style Memory Impact'], answer: 'Structure Meaning Imagery Language Effect', explanation: 'SMILE = framework for poetry analysis', difficulty: 'easy'}], tips: ['⭐ Read 3+ times', '⭐ Annotate heavily', '⭐ SMILE framework', '⭐ Don\'t panic - everyone sees it first time'], commonMistakes: ['❌ Not reading carefully', '❌ No annotation', '❌ Unstructured response', '❌ Missing comparison'], examStrategy: 'Unseen = Paper 2 Section C (32 marks). Q1 (24 marks): analyze poem. Q2 (8 marks): compare both. Time crucial! 15 mins reading both, 20 mins Q1, 10 mins Q2.'},
  
  {moduleNumber: 10, title: 'Literature Essay Mastery & Exam Technique', duration: '90 minutes', introduction: 'Master literature essays! Structure, quotations, analysis, context integration. Grade 7-9 technique for all literature components.', keyPoints: ['PETAL: Point, Evidence, Technique, Analysis, Link', 'Quotations: short, embedded, analyzed', 'Context woven throughout', 'Alternative interpretations = higher grades', 'Conceptualized response (big ideas)', 'Subject terminology essential', 'Time management per question'], explanation: 'Literature essays need: clear argument, embedded quotations, technique analysis, context, terminology. PETAL structure each paragraph. Conceptualized = discuss big ideas, not just plot. Multiple interpretations show critical thinking. Practice timed essays!', examples: [{question: 'Perfect PETAL paragraph example', workingOut: 'P - Point:\n"Shakespeare presents Lady Macbeth as subverting gender expectations to pursue power."\n\nE - Evidence:\n"Unsex me here"\n\nT - Technique:\n"The imperative verb \'unsex\' is shocking, showing her willingness to reject femininity entirely."\n\nA - Analysis:\n"This would disturb Jacobean audiences who believed women should be nurturing and submissive. Lady Macbeth actively seeks to remove compassionate \'feminine\' traits, suggesting ambition requires abandoning natural gender characteristics."\n\nL - Link:\n"Therefore, Shakespeare critiques both the limitations placed on women and the corrupting nature of ambition, presenting gender as performative rather than fixed - a radical concept for contemporary audiences."\n\nWhy it works: Clear point, short quotation, identifies technique, analyzes deeply, links to context and wider themes, sophisticated vocabulary.', answer: 'Model PETAL paragraph', explanation: 'PETAL = essay building blocks! Each paragraph needs all 5 elements. Link back to question.'}], practiceQuestions: [{question: 'How long should quotations be?', options: ['Short (3-7 words ideal)', 'Whole paragraph', 'Just one word', 'Entire speech'], answer: 'Short (3-7 words ideal)', explanation: 'Short quotations best - more space for analysis. Embed in sentences.', difficulty: 'medium'}], tips: ['⭐ PETAL every paragraph', '⭐ Short, embedded quotes', '⭐ Analyze deeply', '⭐ Weave context in', '⭐ Multiple interpretations', '⭐ Subject terminology', '⭐ Link to question'], commonMistakes: ['❌ Long quotations, little analysis', '❌ Bolted-on context', '❌ Feature-spotting', '❌ No structure', '❌ Retelling plot', '❌ Not answering question'], examStrategy: `**LITERATURE EXAM STRATEGY:**

**Paper 1: Shakespeare + 19th Century Novel (1h45)**
Section A: Shakespeare (50 mins, 34 marks)
Section B: 19th Novel (50 mins, 30 marks + 4 SPaG)

**Paper 2: Modern Text + Poetry (2h15)**
Section A: Modern text (50 mins, 34 marks)
Section B: Poetry anthology (50 mins, 30 marks)
Section C: Unseen poetry (45 mins, 32 marks)

**Timing per Mark:**
~1.5 minutes per mark
Build in reading and checking time

**Essay Structure (all questions):**
1. Introduction (3 mins)
2. Extract/given material analysis (if applicable) (15 mins)
3. Wider text analysis (20 mins)
4. Conclusion (2 mins)
5. Check (5 mins)

**Quotation Strategy:**
- Learn 25+ quotations per text
- Short, embedded
- Analyze language specifically
- Link quotations together

**Context Integration:**
- Don\'t bolt on at end!
- Weave throughout
- Link to author\'s intentions
- Consider contemporary audience

**Grade 9 Features:**
- Perceptive, sophisticated analysis
- Conceptualized (big ideas)
- Critical interpretations explored
- Seamless context
- Original insights
- Consistent quality

**Revision Strategy:**
- Active reading (annotate)
- Learn quotations (flashcards)
- Practice essays (timed)
- Past papers
- Mark schemes
- Model answers

**Exam Day:**
- Read questions first
- Annotate extract/poem
- Plan (5 mins)
- Write continuously
- Check (5 mins)

Literature = 50% GCSE English! Master essay technique. Practice, practice, practice!`
  }
];

export default gcseEnglishLiteratureContent;

