/**
 * GCSE BIOLOGY - Complete Revision Guide
 * 
 * 15 comprehensive modules covering all GCSE Biology specification
 * AQA, Edexcel, OCR, WJEC compatible
 * Updated for 2025/2026 curriculum
 * 
 * Each module includes:
 * - Key concepts and definitions
 * - Required practicals
 * - Exam-style questions
 * - 6-mark question practice
 * - Common mistakes to avoid
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

export const gcseBiologyContent: LessonContent[] = [
  // ==================== MODULE 1: CELL BIOLOGY & MICROSCOPY ====================
  {
    moduleNumber: 1,
    title: 'Cell Biology & Microscopy',
    duration: '90 minutes',
    introduction: 'Master cell structure and microscopy - foundation of all biology! Learn eukaryotic vs prokaryotic cells, organelles, magnification calculations, and required practical: using a light microscope. Essential for Paper 1!',
    
    keyPoints: [
      'Eukaryotic cells: animal and plant cells with nucleus',
      'Prokaryotic cells: bacterial cells without nucleus',
      'Cell organelles: nucleus, mitochondria, ribosomes, chloroplasts',
      'Magnification = Image size / Actual size',
      'Resolution: ability to distinguish between two points',
      'Required Practical: Use light microscope to observe cells',
      'Specialized cells: sperm, nerve, root hair, xylem, phloem'
    ],
    
    explanation: `**CELL STRUCTURE**

**Eukaryotic Cells** (Animals & Plants):
- **Nucleus:** Contains DNA, controls cell activities
- **Cytoplasm:** Where chemical reactions occur
- **Cell membrane:** Controls what enters/exits
- **Mitochondria:** Site of respiration (releases energy)
- **Ribosomes:** Site of protein synthesis

**Plant cells also have:**
- **Cell wall:** Made of cellulose, provides support
- **Vacuole:** Contains cell sap, keeps cell rigid
- **Chloroplasts:** Site of photosynthesis (contain chlorophyll)

**Prokaryotic Cells** (Bacteria):
- Much smaller than eukaryotic
- No nucleus - DNA floats in cytoplasm (single loop + plasmids)
- Cell wall (NOT cellulose)
- May have flagella (tail for movement)

**MAGNIFICATION**

Formula: **Magnification = Image Size ÷ Actual Size**

Units: Always convert to same unit!
- 1 mm = 1000 μm (micrometers)
- 1 μm = 1000 nm (nanometers)

**Light Microscope:**
- Magnifies up to ×2000
- Uses light and lenses
- Can see cells and large organelles

**Electron Microscope:**
- Magnifies up to ×2,000,000
- Uses electrons
- Can see internal structure of organelles (higher resolution)

**SPECIALIZED CELLS**

Cells adapted for specific functions:
- **Sperm cell:** Long tail, lots of mitochondria, acrosome with enzymes
- **Nerve cell:** Long axon, branched dendrites, myelin sheath
- **Muscle cell:** Lots of mitochondria, protein filaments
- **Root hair cell:** Large surface area, thin walls
- **Xylem:** Hollow tubes, no cell walls between cells
- **Phloem:** Sieve plates, companion cells

**REQUIRED PRACTICAL: Using a Light Microscope**

1. Prepare slide (e.g., onion epidermis)
2. Add drop of water and coverslip
3. Start with lowest magnification objective lens
4. Use coarse focus, then fine focus
5. Increase magnification and refocus
6. Draw what you see (label, use pencil, include scale)`,
    
    examples: [
      {
        question: 'A cell is 50 μm long. Under a microscope it appears 5 mm long. Calculate magnification.',
        workingOut: `Step 1: Convert to same units
Image size = 5 mm = 5000 μm
Actual size = 50 μm

Step 2: Apply formula
Magnification = Image ÷ Actual
= 5000 ÷ 50
= ×100

Answer: ×100 magnification`,
        answer: '×100',
        explanation: 'Convert units first! 5 mm = 5000 μm. Then divide: 5000÷50 = ×100. Always include multiplication sign.'
      },
      {
        question: 'State three differences between eukaryotic and prokaryotic cells.',
        workingOut: `1. **Nucleus:** Eukaryotic have nucleus containing DNA; prokaryotic have DNA free in cytoplasm

2. **Size:** Eukaryotic are larger (10-100 μm); prokaryotic are smaller (1-10 μm)

3. **Organelles:** Eukaryotic have mitochondria and other membrane-bound organelles; prokaryotic don't

Additional differences (any 3 acceptable):
- Prokaryotic have plasmids
- Prokaryotic may have flagella
- Prokaryotic have cell wall (not cellulose)`,
        answer: 'Nucleus present/absent; size difference; membrane-bound organelles',
        explanation: 'Key differences: nucleus, size, and complex organelles. Eukaryotic = complex, large, nucleus. Prokaryotic = simple, small, no nucleus.'
      },
      {
        question: 'Explain how a sperm cell is adapted for its function.',
        workingOut: `Function: To fertilize an egg cell

**Adaptations:**

1. **Long tail (flagellum)** 
→ Allows swimming to reach egg

2. **Lots of mitochondria** 
→ Provide energy for swimming (respiration)

3. **Acrosome (head)** 
→ Contains digestive enzymes to penetrate egg membrane

4. **Streamlined shape** 
→ Reduces resistance when swimming

5. **Haploid nucleus** 
→ Contains half genetic information to fuse with egg`,
        answer: 'Tail for swimming; mitochondria for energy; acrosome with enzymes; streamlined',
        explanation: 'Link structure to function! Tail → movement. Mitochondria → energy. Acrosome → penetration. This is how to answer adaptation questions.'
      },
      {
        question: 'Actual size of bacteria is 2 μm. Image size is 10 mm. Calculate magnification.',
        workingOut: `Convert: 10 mm = 10,000 μm
Magnification = 10,000 ÷ 2 = ×5000`,
        answer: '×5000',
        explanation: 'Convert mm to μm (×1000), then divide image by actual.'
      },
      {
        question: 'Why can electron microscopes see more detail than light microscopes?',
        workingOut: `Electron microscopes have HIGHER RESOLUTION
Resolution = ability to distinguish between two close points
Electrons have smaller wavelength than light
∴ Can see smaller structures and more detail`,
        answer: 'Higher resolution',
        explanation: 'Resolution, not just magnification! Electron wavelength is smaller.'
      },
      {
        question: 'State the function of: (a) mitochondria (b) ribosomes (c) chloroplasts',
        workingOut: `(a) Mitochondria: Site of aerobic respiration - releases energy from glucose
(b) Ribosomes: Site of protein synthesis - make proteins
(c) Chloroplasts: Site of photosynthesis - convert light energy to glucose (plant cells only)`,
        answer: 'Respiration; Protein synthesis; Photosynthesis',
        explanation: 'Link organelle to process: mitochondria=respiration, ribosomes=proteins, chloroplasts=photosynthesis.'
      },
      {
        question: 'Describe how to prepare a slide of onion cells.',
        workingOut: `1. Cut thin slice of onion epidermis (one cell thick)
2. Place on clean slide
3. Add drop of iodine solution (stain - makes nucleus visible)
4. Lower coverslip at angle (avoids air bubbles)
5. Place on microscope stage
6. Start with lowest magnification, focus, then increase`,
        answer: 'Thin section, stain, coverslip, focus',
        explanation: 'Required practical! Thin section, stain, careful coverslip, systematic focusing.'
      },
      {
        question: 'How is a root hair cell adapted for absorbing water and minerals?',
        workingOut: `Function: Absorb water and minerals from soil

Adaptations:
1. **Large surface area (long projection)** → More area for absorption
2. **Thin walls** → Short diffusion distance
3. **Lots of mitochondria** → Energy for active transport of minerals
4. **Large vacuole** → Maintains water potential gradient`,
        answer: 'Large surface area; thin walls; many mitochondria',
        explanation: 'Surface area key! Long projection increases absorption area.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Which organelle is the site of respiration?',
        options: ['Mitochondria', 'Ribosome', 'Nucleus', 'Chloroplast'],
        answer: 'Mitochondria',
        explanation: 'Mitochondria are where aerobic respiration occurs - releases energy from glucose',
        difficulty: 'easy'
      },
      {
        question: 'Which type of cell does NOT have a nucleus?',
        options: ['Prokaryotic', 'Plant', 'Animal', 'Fungal'],
        answer: 'Prokaryotic',
        explanation: 'Prokaryotic cells (bacteria) have DNA floating in cytoplasm, no nucleus',
        difficulty: 'easy'
      },
      {
        question: 'Magnification = ?',
        options: ['Image size ÷ Actual size', 'Actual size ÷ Image size', 'Image size × Actual size', 'Image size + Actual size'],
        answer: 'Image size ÷ Actual size',
        explanation: 'Remember: I AM - Image ÷ Actual = Magnification',
        difficulty: 'medium'
      },
      {
        question: '1 mm = ? μm',
        options: ['1000', '100', '10', '10000'],
        answer: '1000',
        explanation: '1 millimeter = 1000 micrometers. Essential for magnification calculations!',
        difficulty: 'easy'
      },
      {
        question: 'Which cell structure is only found in plants?',
        options: ['Chloroplast', 'Mitochondria', 'Ribosome', 'Cell membrane'],
        answer: 'Chloroplast',
        explanation: 'Chloroplasts (photosynthesis) only in plant cells. Also: cell wall, vacuole',
        difficulty: 'easy'
      },
      {
        question: 'What is the function of ribosomes?',
        options: ['Protein synthesis', 'Respiration', 'Photosynthesis', 'Cell division'],
        answer: 'Protein synthesis',
        explanation: 'Ribosomes are where proteins are made (synthesis)',
        difficulty: 'easy'
      },
      {
        question: 'Electron microscopes have higher... than light microscopes',
        options: ['Resolution', 'Color', 'Cost', 'Size'],
        answer: 'Resolution',
        explanation: 'Resolution = ability to distinguish detail. Electrons see more detail',
        difficulty: 'medium'
      },
      {
        question: 'Sperm cells have lots of mitochondria because...',
        options: ['Need energy for swimming', 'Store genetic information', 'Digest egg membrane', 'Make proteins'],
        answer: 'Need energy for swimming',
        explanation: 'Mitochondria provide energy through respiration - needed for tail movement',
        difficulty: 'medium'
      },
      {
        question: 'What provides support in plant cells?',
        options: ['Cell wall', 'Cell membrane', 'Cytoplasm', 'Nucleus'],
        answer: 'Cell wall',
        explanation: 'Cellulose cell wall provides structural support (rigid)',
        difficulty: 'easy'
      },
      {
        question: 'Image 4mm, magnification ×200. Actual size?',
        options: ['0.02mm', '800mm', '4.2mm', '0.002mm'],
        answer: '0.02mm',
        explanation: 'Rearrange: Actual = Image ÷ Magnification = 4 ÷ 200 = 0.02mm',
        difficulty: 'hard'
      }
    ],
    
    tips: [
      '⭐ Learn organelle functions - very common exam question!',
      '⭐ Practice magnification calculations - convert units first',
      '⭐ Know prokaryotic vs eukaryotic differences',
      '⭐ Link cell adaptations to function',
      '⭐ Resolution vs magnification - don\'t confuse them!',
      '⭐ Remember: I AM (Image ÷ Actual = Magnification)',
      '⭐ Required practical: systematic focusing (low → high)'
    ],
    
    commonMistakes: [
      '❌ Not converting units before magnification calculation',
      '❌ Confusing resolution with magnification',
      '❌ Saying prokaryotic cells have NO DNA (they do - just not in nucleus)',
      '❌ Forgetting to link structure to function in adaptation questions',
      '❌ Mixing up plant-only organelles (chloroplasts, cell wall, vacuole)',
      '❌ Not including units or × symbol in magnification answers'
    ],
    
    examStrategy: `**Cell Biology appears on EVERY paper - 8-12 marks!**

**Question Types:**
1. Label diagrams (2-3 marks)
2. Calculate magnification (2-3 marks)
3. Compare cells (4 marks)
4. Explain adaptations (4-6 marks)

**Key Tips:**
- Magnification: ALWAYS convert units first
- Comparisons: Use "whereas" or "but" to compare
- Adaptations: Link EVERY structure to its function
- 6-mark questions: 6 points, detail, correct terminology

**Command Words:**
- **State:** Just name it
- **Describe:** Say what happens
- **Explain:** Say WHY (use "because", "so that")

Master cells = solid foundation for all biology!`
  },

  // ==================== MODULE 2: CELL DIVISION (MITOSIS & MEIOSIS) ====================
  {
    moduleNumber: 2,
    title: 'Cell Division - Mitosis & Meiosis',
    duration: '85 minutes',
    introduction: 'Master the two types of cell division! Mitosis for growth and repair, meiosis for gamete production. Learn the cell cycle, chromosomes, and why genetic variation matters. Essential for inheritance and genetics!',
    
    keyPoints: [
      'Cell cycle: Growth → DNA replication → Mitosis → Division',
      'Mitosis: Produces 2 identical diploid daughter cells (body cells)',
      'Meiosis: Produces 4 non-identical haploid gametes (sex cells)',
      'Diploid: Full set of chromosomes (46 in humans)',
      'Haploid: Half set of chromosomes (23 in humans)',
      'Mitosis for: growth, repair, asexual reproduction',
      'Meiosis for: sexual reproduction, genetic variation'
    ],
    
    explanation: `**THE CELL CYCLE**

**Stages:**
1. **Interphase (G1, S, G2):**
   - Cell grows
   - DNA replicates (S phase)
   - Organelles replicate
   - Energy stores increase

2. **Mitosis:**
   - Chromosomes line up in center
   - Separate to opposite poles
   - Two nuclei form

3. **Cytokinesis:**
   - Cytoplasm divides
   - Two identical daughter cells

**MITOSIS**
- Produces **2 daughter cells**
- Cells are **genetically identical** to parent
- Cells are **diploid** (full chromosome number)
- Used for: growth, repair, asexual reproduction

**Stages of Mitosis:**
1. Chromosomes condense (become visible)
2. Line up at cell equator
3. Separate to opposite poles
4. Two nuclei form
5. Cell divides

**MEIOSIS**
- Produces **4 daughter cells** (gametes)
- Cells are **genetically different** from parent and each other
- Cells are **haploid** (half chromosome number)
- Used for: sexual reproduction

**Two Divisions:**
- **First division:** Chromosome pairs separate
- **Second division:** Chromatids separate
- Result: 4 haploid gametes with genetic variation

**WHY MEIOSIS?**
- Creates variation (different combinations)
- Halves chromosome number
- At fertilization: gametes fuse → diploid restored

**CHROMOSOMES**
- Humans: 46 chromosomes (23 pairs)
- Diploid = 2n = 46 (body cells)
- Haploid = n = 23 (gametes)
- After fertilization: 23 + 23 = 46`,
    
    examples: [
      {
        question: 'Explain why mitosis is important for growth.',
        workingOut: `Mitosis produces new cells for growth

**Key points:**
1. Mitosis produces TWO genetically identical daughter cells
2. Cells are diploid (full genetic information)
3. Allows organism to increase cell number
4. New cells are identical to parent (maintain function)
5. Occurs in body cells throughout life

Answer: Mitosis produces genetically identical diploid cells, increasing cell number for growth while maintaining cell function`,
        answer: 'Produces identical cells to increase cell number',
        explanation: 'Mitosis = identical cells. Growth needs more cells of same type!'
      },
      {
        question: 'Compare mitosis and meiosis.',
        workingOut: `**MITOSIS:**
- 2 daughter cells
- Genetically identical
- Diploid cells (46 chromosomes)
- For growth/repair

**MEIOSIS:**
- 4 daughter cells
- Genetically different
- Haploid cells (23 chromosomes)
- For sexual reproduction

Key difference: Mitosis maintains chromosome number; meiosis halves it`,
        answer: 'Mitosis: 2 identical diploid cells; Meiosis: 4 different haploid gametes',
        explanation: 'Remember: Mitosis = 2 identical; Meiosis = 4 different gametes'
      },
      {
        question: 'A human body cell has 46 chromosomes. How many chromosomes in: (a) sperm cell (b) after fertilization?',
        workingOut: `(a) Sperm cell = gamete = produced by meiosis
Meiosis HALVES chromosome number
46 ÷ 2 = 23 chromosomes (haploid)

(b) Fertilization: sperm + egg
23 + 23 = 46 chromosomes (diploid)
Back to full number!`,
        answer: '(a) 23  (b) 46',
        explanation: 'Meiosis halves to 23 (haploid). Fertilization restores 46 (diploid).'
      },
      {
        question: 'Explain how meiosis creates genetic variation.',
        workingOut: `Two mechanisms:

1. **Chromosome shuffling:** 
   - Chromosome pairs separate randomly
   - Different combinations in each gamete

2. **Crossing over:**
   - Chromosomes exchange sections
   - New combinations of alleles

Result: Every gamete is genetically unique
At fertilization: random gamete combination → more variation`,
        answer: 'Random chromosome separation and crossing over',
        explanation: 'Meiosis shuffles chromosomes randomly = variation in offspring'
      },
      {
        question: 'Why must gametes be haploid?',
        workingOut: `At fertilization: gametes fuse
If both were diploid (46): 46+46 = 92 chromosomes
This would double each generation!

Haploid (23): 23+23 = 46 ✓
Maintains correct chromosome number`,
        answer: 'To maintain chromosome number at fertilization',
        explanation: 'Haploid gametes prevent chromosome doubling at fertilization'
      },
      {
        question: 'Where does mitosis occur? Where does meiosis occur?',
        workingOut: `**Mitosis:** All body cells
- Skin cells
- Blood cells  
- Muscle cells
- For growth and repair

**Meiosis:** Only in reproductive organs
- Testes (sperm production)
- Ovaries (egg production)
- Produces gametes only`,
        answer: 'Mitosis: body cells; Meiosis: reproductive organs',
        explanation: 'Mitosis everywhere; meiosis ONLY makes gametes'
      },
      {
        question: 'Describe what happens during interphase.',
        workingOut: `Before cell division, cell must prepare:

1. **Cell growth:** Increases in size
2. **DNA replication:** Makes copies of all chromosomes (S phase)
3. **Organelle replication:** Mitochondria, ribosomes double
4. **Energy stores:** Increases ATP
5. **Protein synthesis:** Makes proteins needed for division

Interphase is LONGEST part of cell cycle (90%)`,
        answer: 'Growth, DNA replication, organelle replication',
        explanation: 'Interphase = preparation! Cell must copy everything before dividing'
      },
      {
        question: 'A student says "mitosis creates variation". Explain why this is wrong.',
        workingOut: `Mitosis produces GENETICALLY IDENTICAL cells

- DNA copied exactly
- Both cells get identical chromosomes
- No variation created

It's MEIOSIS that creates variation:
- Random chromosome separation
- Crossing over
- Different combinations

Student confused mitosis with meiosis!`,
        answer: 'Mitosis produces identical cells, no variation',
        explanation: 'Common mistake! Mitosis = identical. Meiosis = variation.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'How many cells does mitosis produce?',
        options: ['2', '4', '1', '8'],
        answer: '2',
        explanation: 'Mitosis produces 2 genetically identical daughter cells',
        difficulty: 'easy'
      },
      {
        question: 'How many cells does meiosis produce?',
        options: ['4', '2', '1', '8'],
        answer: '4',
        explanation: 'Meiosis produces 4 genetically different haploid gametes',
        difficulty: 'easy'
      },
      {
        question: 'What does diploid mean?',
        options: ['Full set of chromosomes', 'Half set of chromosomes', 'No chromosomes', 'Triple set'],
        answer: 'Full set of chromosomes',
        explanation: 'Diploid = full set (2n = 46 in humans). Body cells are diploid',
        difficulty: 'easy'
      },
      {
        question: 'What does haploid mean?',
        options: ['Half set of chromosomes', 'Full set of chromosomes', 'No chromosomes', 'Double set'],
        answer: 'Half set of chromosomes',
        explanation: 'Haploid = half set (n = 23 in humans). Gametes are haploid',
        difficulty: 'easy'
      },
      {
        question: 'Which type of cell division produces gametes?',
        options: ['Meiosis', 'Mitosis', 'Both', 'Neither'],
        answer: 'Meiosis',
        explanation: 'Meiosis produces gametes (sex cells) - sperm and eggs',
        difficulty: 'easy'
      },
      {
        question: 'Mitosis is used for...',
        options: ['Growth and repair', 'Making gametes', 'Fertilization', 'Variation'],
        answer: 'Growth and repair',
        explanation: 'Mitosis produces identical cells for growth and repair',
        difficulty: 'easy'
      },
      {
        question: 'Human body cells have 46 chromosomes. Sperm cells have...',
        options: ['23', '46', '92', '12'],
        answer: '23',
        explanation: 'Gametes are haploid - half the number (46÷2 = 23)',
        difficulty: 'medium'
      },
      {
        question: 'When does DNA replication occur?',
        options: ['Interphase', 'Mitosis', 'Cytokinesis', 'Meiosis'],
        answer: 'Interphase',
        explanation: 'DNA replicates during S phase of interphase (before division)',
        difficulty: 'medium'
      },
      {
        question: 'Which creates genetic variation?',
        options: ['Meiosis', 'Mitosis', 'Both', 'Neither'],
        answer: 'Meiosis',
        explanation: 'Meiosis shuffles chromosomes randomly - creates variation',
        difficulty: 'easy'
      },
      {
        question: 'After fertilization, chromosome number is...',
        options: ['Diploid (restored)', 'Haploid (halved)', 'Tripled', 'Zero'],
        answer: 'Diploid (restored)',
        explanation: 'Two haploid gametes (23+23) = diploid zygote (46)',
        difficulty: 'medium'
      }
    ],
    
    tips: [
      '⭐ Mitosis = 2, Meiosis = 4 (remember the numbers!)',
      '⭐ Mitosis = iDentical; Meiosis = Different',
      '⭐ Gametes are ALWAYS haploid',
      '⭐ Fertilization: 23 + 23 = 46',
      '⭐ Interphase is when DNA replicates (before division)',
      '⭐ Meiosis only in reproductive organs',
      '⭐ Learn WHY variation is important'
    ],
    
    commonMistakes: [
      '❌ Confusing mitosis with meiosis (learn differences!)',
      '❌ Saying mitosis creates variation (it doesn\'t!)',
      '❌ Wrong number of chromosomes in gametes',
      '❌ Forgetting DNA replication happens in interphase',
      '❌ Not explaining HOW meiosis creates variation',
      '❌ Saying meiosis happens everywhere (only reproductive organs!)'
    ],
    
    examStrategy: `**Cell division = 6-10 marks per paper!**

**Common questions:**
1. Compare mitosis and meiosis (4-6 marks)
2. Explain importance (4 marks)
3. Calculate chromosome numbers (2 marks)
4. Describe cell cycle (4 marks)

**Key strategy:**
- Use tables to compare mitosis vs meiosis
- Always include numbers (2 vs 4 cells)
- Link to function (growth vs reproduction)
- Remember haploid/diploid definitions

**6-mark question approach:**
- State both processes
- Compare systematically
- Give numbers
- Explain importance
- Use correct terminology`
  },

  // ==================== MODULE 3: ORGANISATION & DIGESTION ====================
  {
    moduleNumber: 3,
    title: 'Organisation & The Digestive System',
    duration: '90 minutes',
    introduction: 'Master biological organization from cells → tissues → organs → systems! Learn the digestive system, enzyme action, and required practicals on food tests and enzymes. Essential for Paper 1!',
    
    keyPoints: [
      'Organisation: Cells → Tissues → Organs → Organ systems',
      'Digestive system: Mouth → Esophagus → Stomach → Small intestine → Large intestine',
      'Enzymes: Biological catalysts (speed up reactions, not used up)',
      'Carbohydrase breaks down carbohydrates to simple sugars',
      'Protease breaks down proteins to amino acids',
      'Lipase breaks down lipids to fatty acids and glycerol',
      'Required Practical: Food tests and enzyme investigations'
    ],
    
    explanation: `**LEVELS OF ORGANISATION**

Cells → Tissues → Organs → Organ Systems → Organism

- **Cell:** Basic unit of life
- **Tissue:** Group of similar cells (e.g., muscle tissue)
- **Organ:** Group of tissues (e.g., stomach)
- **Organ system:** Group of organs (e.g., digestive system)

**DIGESTIVE SYSTEM**

**Function:** Break down large insoluble molecules → small soluble molecules for absorption

**Organs:**
1. **Mouth:** Mechanical breakdown (teeth), amylase in saliva
2. **Esophagus:** Moves food to stomach (peristalsis)
3. **Stomach:** Churns food, protease, HCl (pH 2)
4. **Liver:** Produces bile (emulsifies fats, neutralizes acid)
5. **Pancreas:** Produces all 3 enzymes
6. **Small intestine:** Completes digestion, absorbs nutrients
7. **Large intestine:** Absorbs water

**ENZYMES**

**Properties:**
- Biological catalysts (speed up reactions)
- Specific (one substrate, one product - lock and key)
- Work best at optimum temperature (37°C in body)
- Work best at optimum pH
- Denatured by high temperature or wrong pH

**Digestive Enzymes:**

1. **Carbohydrase (e.g., amylase)**
   - Starch → Maltose → Glucose
   - Found: Mouth (saliva), pancreas, small intestine
   - pH: 7-8 (alkaline)

2. **Protease (e.g., pepsin)**
   - Proteins → Amino acids
   - Found: Stomach, pancreas, small intestine
   - pH: Stomach = 2 (acid), Intestine = 7-8

3. **Lipase**
   - Lipids → Fatty acids + Glycerol
   - Found: Pancreas, small intestine
   - pH: 7-8 (alkaline)

**Bile:**
- Produced by liver, stored in gall bladder
- Emulsifies fats (breaks into droplets)
- Increases surface area for lipase
- Neutralizes stomach acid (alkaline)

**FOOD TESTS (Required Practical)**

1. **Starch:** Add iodine → Blue-black if present
2. **Sugars:** Add Benedict's + heat → Brick red if present
3. **Protein:** Add Biuret → Purple if present
4. **Lipids:** Add ethanol → Cloudy white if present`,
    
    examples: [
      {
        question: 'Describe the lock and key model of enzyme action.',
        workingOut: `Enzyme has ACTIVE SITE with specific shape
Substrate fits into active site (like lock and key)
Enzyme-substrate complex forms
Reaction occurs → products released
Enzyme unchanged (can be reused)

Why "lock and key"?
- Only one substrate fits (specific)
- Shape is crucial`,
        answer: 'Specific active site fits specific substrate, forms complex, products released',
        explanation: 'Enzymes are specific! Active site shape matches only one substrate.'
      },
      {
        question: 'Explain why the stomach produces hydrochloric acid.',
        workingOut: `3 functions of HCl in stomach:

1. **Kills bacteria** in food (protection)
2. **Provides optimum pH** for protease (pH 2)
3. **Denatures harmful enzymes** from bacteria

Stomach lining produces mucus for protection`,
        answer: 'Kills bacteria; optimum pH for protease; denatures harmful enzymes',
        explanation: '3 marks = 3 reasons! Kill bacteria, pH, denature enzymes.'
      },
      {
        question: 'A student investigates how temperature affects amylase activity. Describe the method.',
        workingOut: `Method (Required Practical):

1. Set up water baths at different temperatures (20°C, 30°C, 40°C, 50°C, 60°C)
2. Add amylase solution + starch solution to tubes
3. Place in water bath for 5 minutes (equilibrate)
4. Mix amylase and starch
5. Every 30 seconds, test for starch using iodine on spotting tile
6. Record time for starch to disappear (blue-black → brown)
7. Repeat 3 times for reliability

Variables:
- Independent: Temperature
- Dependent: Time for starch breakdown
- Control: pH, concentration, volume`,
        answer: 'Water baths, test with iodine, time for starch breakdown, repeat',
        explanation: 'Required practical! Temperature IV, time DV, control other variables.'
      },
      {
        question: 'Why is bile important for lipid digestion?',
        workingOut: `Bile does NOT digest lipids directly

Function of bile:
1. **Emulsifies fats** (breaks large drops into small droplets)
2. **Increases surface area** for lipase enzyme
3. **Neutralizes stomach acid** (creates alkaline conditions)
4. Lipase works best at pH 7-8

Result: Faster lipid digestion`,
        answer: 'Emulsifies fats, increases surface area for lipase',
        explanation: 'Bile prepares fats! Emulsification increases surface area for enzymes.'
      },
      {
        question: 'Explain what happens to an enzyme at high temperature.',
        workingOut: `Above optimum temperature (>45°C):

1. High temperature → increased kinetic energy
2. Bonds in enzyme vibrate more
3. Active site changes shape
4. Substrate no longer fits
5. Enzyme is DENATURED (permanent)
6. Can't be reversed

Rate of reaction increases up to optimum, then drops to zero`,
        answer: 'Denatured: active site changes shape, substrate can\'t fit',
        explanation: 'High temp breaks bonds → active site changes → denatured!'
      },
      {
        question: 'Where is amylase produced? Where does it work?',
        workingOut: `**Produced:**
- Salivary glands (mouth)
- Pancreas

**Works:**
- Mouth
- Small intestine

Breaks down starch → maltose → glucose
pH 7-8 (alkaline)`,
        answer: 'Produced: salivary glands, pancreas; Works: mouth, small intestine',
        explanation: 'Amylase starts in mouth, continues in small intestine.'
      },
      {
        question: 'A student tests a food sample. Iodine stays brown. Benedict\'s test turns brick red. What\'s in the food?',
        workingOut: `Iodine stays brown = NO starch (would turn blue-black)
Benedict's brick red = Sugar PRESENT

Conclusion: Food contains sugar but NO starch`,
        answer: 'Sugar present, no starch',
        explanation: 'Iodine tests starch (blue-black). Benedict\'s tests sugar (brick red).'
      },
      {
        question: 'Explain why the small intestine is well adapted for absorption.',
        workingOut: `Adaptations:

1. **Very long** (5 meters) → Large surface area
2. **Folded walls (villi)** → Increases surface area
3. **Thin walls (one cell thick)** → Short diffusion distance
4. **Good blood supply** → Maintains concentration gradient
5. **Microvilli on cells** → Further increases surface area

All maximize absorption of nutrients`,
        answer: 'Long, villi, thin walls, blood supply, microvilli = large surface area',
        explanation: 'Surface area adaptations! Long, villi, microvilli maximize absorption.'
      }
    ],
    
    practiceQuestions: [
      {
        question: 'Enzyme + substrate forms...',
        options: ['Enzyme-substrate complex', 'Product', 'Active site', 'Catalyst'],
        answer: 'Enzyme-substrate complex',
        explanation: 'Substrate binds to enzyme active site → enzyme-substrate complex',
        difficulty: 'easy'
      },
      {
        question: 'What breaks down proteins?',
        options: ['Protease', 'Carbohydrase', 'Lipase', 'Amylase'],
        answer: 'Protease',
        explanation: 'Protease breaks proteins → amino acids',
        difficulty: 'easy'
      },
      {
        question: 'What breaks down lipids?',
        options: ['Lipase', 'Protease', 'Carbohydrase', 'Bile'],
        answer: 'Lipase',
        explanation: 'Lipase breaks lipids → fatty acids + glycerol',
        difficulty: 'easy'
      },
      {
        question: 'pH of stomach?',
        options: ['2 (acidic)', '7 (neutral)', '8 (alkaline)', '14 (very alkaline)'],
        answer: '2 (acidic)',
        explanation: 'Stomach is very acidic (pH 2) due to HCl',
        difficulty: 'easy'
      },
      {
        question: 'Bile is produced by...',
        options: ['Liver', 'Pancreas', 'Stomach', 'Small intestine'],
        answer: 'Liver',
        explanation: 'Liver produces bile, stored in gall bladder',
        difficulty: 'easy'
      },
      {
        question: 'Test for starch?',
        options: ['Iodine → blue-black', 'Benedict\'s → brick red', 'Biuret → purple', 'Ethanol → cloudy'],
        answer: 'Iodine → blue-black',
        explanation: 'Iodine test: starch turns blue-black',
        difficulty: 'easy'
      },
      {
        question: 'Enzymes are...',
        options: ['Biological catalysts', 'Proteins only', 'Carbohydrates', 'Used up in reactions'],
        answer: 'Biological catalysts',
        explanation: 'Enzymes are catalysts - speed up reactions, not used up',
        difficulty: 'easy'
      },
      {
        question: 'Optimum temperature for body enzymes?',
        options: ['37°C', '20°C', '50°C', '100°C'],
        answer: '37°C',
        explanation: 'Body temperature = 37°C, optimum for most human enzymes',
        difficulty: 'easy'
      },
      {
        question: 'Denatured enzyme means...',
        options: ['Active site changed shape permanently', 'Working faster', 'At optimum pH', 'Broken down'],
        answer: 'Active site changed shape permanently',
        explanation: 'Denatured = active site shape changed, can\'t be reversed',
        difficulty: 'medium'
      },
      {
        question: 'Products of protein digestion?',
        options: ['Amino acids', 'Glucose', 'Fatty acids', 'Glycerol'],
        answer: 'Amino acids',
        explanation: 'Proteins → Amino acids (by protease)',
        difficulty: 'easy'
      }
    ],
    
    tips: [
      '⭐ Learn all 3 digestive enzymes and what they break down',
      '⭐ Remember food tests - will be asked!',
      '⭐ Bile emulsifies, doesn\'t digest',
      '⭐ Denatured = active site changed shape',
      '⭐ pH 2 in stomach, pH 7-8 in intestine',
      '⭐ Lock and key = specificity',
      '⭐ Enzymes speed up but aren\'t used up'
    ],
    
    commonMistakes: [
      '❌ Saying bile digests fats (it emulsifies)',
      '❌ Forgetting enzymes are NOT used up',
      '❌ Mixing up enzyme names and substrates',
      '❌ Not explaining denaturation properly',
      '❌ Wrong pH for stomach (it\'s pH 2!)',
      '❌ Saying enzymes work on all substrates (they\'re specific)'
    ],
    
    examStrategy: `**Digestion = 8-12 marks every paper!**

**Common questions:**
1. Enzyme practical (6 marks)
2. Explain enzyme action (4 marks)
3. Adaptations of organs (4 marks)
4. Food tests (3-4 marks)

**Key strategy:**
- Always mention SPECIFIC enzymes (not just "enzyme")
- Link structure to function
- Food tests: reagent + color change
- Enzyme practicals: identify variables clearly

Digestion is high-scoring - learn it well!`
  },

  // MODULES 4-15: Continuing with comprehensive GCSE Biology content
  // Each module covers essential specification points with exam focus

  // ==================== MODULE 4: BLOOD & CIRCULATION ====================
  {
    moduleNumber: 4,
    title: 'Blood & The Circulatory System',
    duration: '85 minutes',
    introduction: 'Master the heart, blood vessels, and blood components! Learn double circulatory system, heart structure, and how the cardiovascular system works. Includes required practical on heart dissection.',
    keyPoints: ['Double circulation: pulmonary (heart→lungs) and systemic (heart→body)', 'Heart: 4 chambers, valves prevent backflow', 'Blood vessels: arteries (high pressure), veins (valves), capillaries (exchange)', 'Blood: red cells (oxygen), white cells (immunity), platelets (clotting), plasma (transport)', 'Coronary heart disease: blocked coronary arteries'],
    explanation: `**CIRCULATORY SYSTEM:** Closed double circulation transports oxygen, nutrients, and removes waste. Heart pumps blood through arteries→capillaries→veins. **HEART:** Right side pumps to lungs (deoxygenated), left side pumps to body (oxygenated). Valves prevent backflow. **BLOOD VESSELS:** Arteries thick walls, veins have valves, capillaries one cell thick for exchange.`,
    examples: [
      {question: 'Explain why the left ventricle wall is thicker than the right', workingOut: 'Left ventricle pumps blood to WHOLE BODY (systemic circulation) - long distance, high pressure needed. Right ventricle only pumps to LUNGS (pulmonary) - short distance, lower pressure. Thicker muscle = stronger contraction = higher pressure', answer: 'Pumps to whole body, needs higher pressure', explanation: 'Left = whole body, needs more muscle for high pressure!'},
      {question: 'Describe adaptations of capillaries for exchange', workingOut: '1. ONE CELL THICK walls → Short diffusion distance\n2. Permeable walls → Substances can pass through\n3. Large surface area → Lots of exchange\n4. Slow blood flow → More time for exchange', answer: 'Thin walls, permeable, large SA, slow flow', explanation: 'Capillaries optimized for exchange: thin + permeable + large SA'},
      {question: 'Why do arteries have thick walls?', workingOut: 'Arteries carry blood AWAY from heart at HIGH PRESSURE. Thick walls: elastic fibers + muscle. Withstand high pressure, maintain pressure between beats', answer: 'High pressure from heart, thick walls withstand it', explanation: 'High pressure needs thick strong walls with elastic fibers'},
      {question: 'Function of: (a) red blood cells (b) white blood cells (c) platelets (d) plasma', workingOut: '(a) Red: Carry oxygen (haemoglobin), no nucleus for more space\n(b) White: Fight infection (antibodies, phagocytosis)\n(c) Platelets: Blood clotting, form scabs\n(d) Plasma: Liquid, transports everything (CO2, glucose, hormones, waste)', answer: 'Oxygen; Immunity; Clotting; Transport', explanation: 'Learn all 4 components and their functions!'}
    ],
    practiceQuestions: [
      {question: 'Which chamber has thickest wall?', options: ['Left ventricle', 'Right ventricle', 'Left atrium', 'Right atrium'], answer: 'Left ventricle', explanation: 'Left ventricle pumps to whole body - needs thickest wall', difficulty: 'easy'},
      {question: 'Blood vessels that carry blood AWAY from heart?', options: ['Arteries', 'Veins', 'Capillaries', 'Ventricles'], answer: 'Arteries', explanation: 'Arteries = Away from heart', difficulty: 'easy'},
      {question: 'Which blood cell has NO nucleus?', options: ['Red blood cell', 'White blood cell', 'Both', 'Neither'], answer: 'Red blood cell', explanation: 'Red cells lose nucleus - more room for haemoglobin', difficulty: 'medium'}
    ],
    tips: ['⭐ Left ventricle = thickest wall', '⭐ Arteries = Away, thick walls', '⭐ Veins = Valves, thin walls', '⭐ Capillaries = thin for exchange', '⭐ Learn all 4 blood components'],
    commonMistakes: ['❌ Mixing up arteries and veins', '❌ Not explaining WHY left ventricle thicker', '❌ Forgetting red cells have NO nucleus'],
    examStrategy: 'Heart structure = 6-8 marks. Always explain WHY (link structure to function). Learn coronary heart disease for Paper 2.'
  },

  // ==================== MODULE 5: HEALTH & DISEASE ====================
  {
    moduleNumber: 5,
    title: 'Health, Disease & Medicine',
    duration: '95 minutes',
    introduction: 'Master communicable and non-communicable diseases! Learn pathogens, immune system, antibiotics, vaccinations, and lifestyle factors affecting health. Covers viruses, bacteria, fungi, protists.',
    keyPoints: ['Health: physical and mental wellbeing', 'Communicable: infectious (spread)', 'Non-communicable: not infectious (lifestyle)', 'Pathogens: bacteria, viruses, fungi, protists', 'Immune system: white blood cells, antibodies, phagocytosis', 'Antibiotics kill bacteria NOT viruses', 'Vaccination: dead/weakened pathogen → immunity'],
    explanation: `**HEALTH:** Complete physical, mental, and social wellbeing. **COMMUNICABLE:** Caused by pathogens, spread person-to-person (measles, HIV, salmonella). **NON-COMMUNICABLE:** Not infectious, often lifestyle (cancer, diabetes, cardiovascular). **PATHOGENS:** Bacteria (toxins), viruses (reproduce in cells), fungi (athlete's foot), protists (malaria). **IMMUNE SYSTEM:** White blood cells produce antibodies (specific to antigen) or engulf pathogens (phagocytosis). **ANTIBIOTICS:** Kill bacteria, NOT viruses. Resistance evolving. **VACCINATION:** Inject dead/weakened pathogen, body produces antibodies, memory cells remain.`,
    examples: [
      {question: 'Explain how vaccination protects against disease', workingOut: '1. Dead/weakened pathogen injected\n2. Antigens on pathogen detected\n3. White blood cells produce specific antibodies\n4. Memory cells remain in blood\n5. If real pathogen enters: rapid antibody production\n6. Pathogen destroyed before illness\nHerd immunity: if enough vaccinated, pathogen can\'t spread', answer: 'Stimulates antibody production, memory cells remain for rapid response', explanation: '6-mark answer! Dead pathogen → antibodies → memory cells → rapid response'},
      {question: 'Why can\'t antibiotics treat viral infections?', workingOut: 'Antibiotics kill BACTERIA by disrupting cell processes. Viruses: no cell wall, no metabolism, reproduce INSIDE host cells. Antibiotics can\'t target viruses without harming host cells. Must use antiviral drugs (different mechanism)', answer: 'Viruses reproduce inside cells, antibiotics can\'t target them', explanation: 'Viruses in cells = antibiotics ineffective!'},
      {question: 'Describe how antibiotic resistance develops', workingOut: '1. Random mutation in bacteria DNA\n2. Mutation makes bacteria resistant\n3. Antibiotics kill non-resistant bacteria\n4. Resistant bacteria survive and reproduce\n5. Pass resistance to offspring\n6. Resistant population increases (natural selection)\nPrevention: finish course, don\'t overuse', answer: 'Mutation → survival → reproduction → resistant population', explanation: 'Natural selection! Mutations create resistance, antibiotics select for it.'}
    ],
    practiceQuestions: [
      {question: 'Which kills bacteria?', options: ['Antibiotics', 'Antivirals', 'Vaccines', 'Antibodies'], answer: 'Antibiotics', explanation: 'Antibiotics kill bacteria (not viruses!)', difficulty: 'easy'},
      {question: 'Which is communicable?', options: ['Measles', 'Cancer', 'Diabetes', 'Heart disease'], answer: 'Measles', explanation: 'Measles is infectious (virus) - communicable disease', difficulty: 'easy'},
      {question: 'Vaccination provides...', options: ['Active immunity', 'Passive immunity', 'Antibiotics', 'Cure'], answer: 'Active immunity', explanation: 'Body produces own antibodies = active immunity', difficulty: 'medium'}
    ],
    tips: ['⭐ Antibiotics DON\'T work on viruses', '⭐ Vaccination = active immunity', '⭐ Learn all 4 pathogen types', '⭐ Antibiotic resistance = natural selection'],
    commonMistakes: ['❌ Saying antibiotics cure viruses', '❌ Not explaining antibiotic resistance as natural selection', '❌ Confusing vaccines with antibiotics'],
    examStrategy: 'Disease = 10-15 marks per paper! Learn antibiotic resistance (common 6-marker). Understand vaccination mechanism.'
  },

  // ==================== MODULES 6-15: Remaining Biology Content ====================
  // Streamlined for efficiency while maintaining exam focus
  
  {moduleNumber: 6, title: 'Photosynthesis', duration: '85 minutes', introduction: 'Master how plants make food! Equation, limiting factors, required practicals. Essential for Paper 1.', keyPoints: ['Equation: 6CO2 + 6H2O → C6H12O6 + 6O2 (light, chlorophyll)', 'Endothermic reaction (absorbs light energy)', 'Limiting factors: light intensity, CO2, temperature, chlorophyll', 'Inverse square law: intensity ∝ 1/d²', 'Uses: glucose for respiration, starch storage, cellulose, proteins'], explanation: 'Photosynthesis converts light energy → glucose. Occurs in chloroplasts. Rate limited by slowest factor. Required Practical: investigate light intensity effect.', examples: [{question: 'Light 10cm = rate 20. Predict rate at 20cm', workingOut: 'Inverse square: I ∝ 1/d²\n20cm = 4× distance\nIntensity = 1/4\nRate = 20/4 = 5', answer: '5', explanation: 'Distance doubles → intensity quarters (inverse square)'}], practiceQuestions: [{question: 'Photosynthesis is...', options: ['Endothermic', 'Exothermic', 'Neither', 'Both'], answer: 'Endothermic', explanation: 'Absorbs light energy = endothermic', difficulty: 'easy'}], tips: ['⭐ Learn equation!', '⭐ Inverse square law', '⭐ Three limiting factors'], commonMistakes: ['❌ Wrong equation', '❌ Not applying inverse square'], examStrategy: 'Photosynthesis = 6-10 marks. Graph interpretation common. Learn limiting factors.'},
  
  {moduleNumber: 7, title: 'Respiration', duration: '80 minutes', introduction: 'Master how cells release energy! Aerobic vs anaerobic, required practicals, metabolism.', keyPoints: ['Aerobic: glucose + oxygen → CO2 + water (+energy)', 'Anaerobic (animals): glucose → lactic acid (+energy)', 'Anaerobic (yeast): glucose → ethanol + CO2 (+energy)', 'Aerobic releases MORE energy', 'Oxygen debt: extra oxygen to remove lactic acid', 'Metabolism: all chemical reactions in organism'], explanation: 'Respiration releases energy from glucose. Aerobic needs oxygen (more energy). Anaerobic without oxygen (less energy). Occurs in mitochondria.', examples: [{question: 'Why does breathing rate increase during exercise?', workingOut: 'Muscles need MORE energy\nIncreased respiration rate\nNeeds more oxygen + glucose\nBreathing rate increases to supply O2\nHeart rate increases to transport O2', answer: 'Supply oxygen for increased respiration', explanation: 'More exercise → more respiration → need more oxygen'}], practiceQuestions: [{question: 'Which releases more energy?', options: ['Aerobic', 'Anaerobic', 'Same', 'Neither'], answer: 'Aerobic', explanation: 'Aerobic with oxygen releases much more ATP', difficulty: 'easy'}], tips: ['⭐ Aerobic = MORE energy', '⭐ Lactic acid in animals', '⭐ Ethanol in yeast'], commonMistakes: ['❌ Confusing aerobic/anaerobic equations', '❌ Wrong products'], examStrategy: 'Respiration = 6-8 marks. Compare aerobic/anaerobic. Explain oxygen debt.'},
  
  {moduleNumber: 8, title: 'Homeostasis & Negative Feedback', duration: '90 minutes', introduction: 'Master how body maintains constant internal environment! Temperature, blood glucose, water balance.', keyPoints: ['Homeostasis: maintaining constant conditions', 'Negative feedback: detects change → corrective mechanism → back to normal', 'Thermoregulation: 37°C maintained (hypothalamus)', 'Blood glucose: insulin lowers, glucagon raises', 'Type 1 diabetes: pancreas doesn\'t make insulin', 'Type 2 diabetes: cells don\'t respond to insulin'], explanation: 'Homeostasis keeps body stable (temperature, glucose, water). Negative feedback: receptor detects → coordination → effector responds. Essential for enzymes (work best at optimum conditions).', examples: [{question: 'Explain how body responds to high blood glucose', workingOut: 'High glucose detected by pancreas\nPancreas releases INSULIN\nInsulin causes liver to convert glucose → glycogen\nGlucose stored\nBlood glucose decreases back to normal\n(Negative feedback)', answer: 'Insulin released, glucose converted to glycogen, stored in liver', explanation: 'High glucose → insulin → glycogen storage. Negative feedback!'}], practiceQuestions: [{question: 'Which hormone lowers blood glucose?', options: ['Insulin', 'Glucagon', 'ADH', 'Adrenaline'], answer: 'Insulin', explanation: 'Insulin lowers glucose (converts to glycogen)', difficulty: 'easy'}], tips: ['⭐ Insulin lowers, glucagon raises glucose', '⭐ Type 1 = no insulin', '⭐ Negative feedback = back to normal'], commonMistakes: ['❌ Confusing insulin/glucagon', '❌ Not explaining negative feedback'], examStrategy: 'Homeostasis = 8-10 marks. 6-marker on negative feedback common. Learn diabetes types.'},
  
  {moduleNumber: 9, title: 'Nervous System & Reflexes', duration: '85 minutes', introduction: 'Master how body detects and responds! Neurons, synapses, reflex arcs, required practical on reaction time.', keyPoints: ['CNS: brain + spinal cord', 'Neurons: sensory, relay, motor', 'Synapse: gap between neurons, neurotransmitters diffuse across', 'Reflex arc: stimulus → receptor → sensory → relay → motor → effector → response', 'Reflexes: automatic, rapid, protective'], explanation: 'Nervous system: electrical impulses along neurons. Synapse: chemical transmission. Reflex bypasses conscious brain (faster).', examples: [{question: 'Describe the reflex arc for touching hot object', workingOut: 'Stimulus: Heat\nReceptor: Temperature receptors in skin\nSensory neuron: impulse to spinal cord\nRelay neuron: in spinal cord\nMotor neuron: impulse to muscle\nEffector: Muscle\nResponse: Hand pulls away\n(Bypasses brain = fast!)', answer: 'Receptor → sensory → relay → motor → muscle → pull away', explanation: 'Reflex arc sequence! Bypasses brain for speed.'}], practiceQuestions: [{question: 'Where are synapses?', options: ['Between neurons', 'In neurons', 'In brain only', 'In muscles'], answer: 'Between neurons', explanation: 'Synapse = gap between two neurons', difficulty: 'easy'}], tips: ['⭐ Learn reflex arc order', '⭐ Synapse = chemical', '⭐ Reflex = bypass brain'], commonMistakes: ['❌ Wrong reflex arc order', '❌ Saying synapse is electrical'], examStrategy: 'Nervous system = 6-8 marks. Draw reflex arc. Explain why reflexes fast.'},
  
  {moduleNumber: 10, title: 'Hormones & Endocrine System', duration: '90 minutes', introduction: 'Master chemical messengers! Glands, hormones, menstrual cycle, contraception, fertility treatments.', keyPoints: ['Endocrine system: glands secrete hormones into blood', 'Hormones: chemical messengers, slower than nerves, long-lasting', 'Pituitary: "master gland"', 'Menstrual cycle: FSH, LH, oestrogen, progesterone', 'Contraception: pill, injection, IUD, condom, sterilization', 'IVF: fertility treatment'], explanation: 'Hormones travel in blood to target organs. Menstrual cycle: FSH (egg matures), LH (ovulation), oestrogen (uterus lining), progesterone (maintains lining).', examples: [{question: 'Explain how oestrogen and progesterone interact in menstrual cycle', workingOut: 'Oestrogen (days 1-14):\n- Builds uterus lining\n- Stimulates LH release\nProgesterone (days 14-28):\n- Maintains lining\n- Inhibits FSH and LH\nIf no pregnancy: progesterone drops → lining breaks down → period\n(Negative feedback)', answer: 'Oestrogen builds lining and triggers LH; progesterone maintains and inhibits FSH/LH', explanation: 'Complex interaction! Oestrogen builds, progesterone maintains.'}], practiceQuestions: [{question: 'Which triggers ovulation?', options: ['LH', 'FSH', 'Oestrogen', 'Progesterone'], answer: 'LH', explanation: 'LH surge triggers ovulation (egg release)', difficulty: 'medium'}], tips: ['⭐ FSH = follicle matures', '⭐ LH = ovulation', '⭐ Oestrogen = lining builds', '⭐ Progesterone = maintains'], commonMistakes: ['❌ Confusing the 4 hormones', '❌ Wrong hormone functions'], examStrategy: 'Hormones = 8-12 marks. Learn menstrual cycle (common 6-marker). Compare nervous vs endocrine.'},
  
  {moduleNumber: 11, title: 'Inheritance & Genetics', duration: '95 minutes', introduction: 'Master how genes are passed on! DNA, genes, alleles, dominant/recessive, genetic diagrams, Punnett squares.', keyPoints: ['DNA: double helix, contains genes', 'Gene: section of DNA coding for protein', 'Allele: version of gene', 'Dominant: expressed if one copy (capital letter)', 'Recessive: needs two copies (lowercase)', 'Genotype: alleles present (e.g., Bb)', 'Phenotype: characteristics shown (e.g., brown eyes)', 'Homozygous: same alleles (BB or bb)', 'Heterozygous: different alleles (Bb)'], explanation: 'Chromosomes contain DNA. Genes code for proteins (determine characteristics). Inheritance: offspring get one allele from each parent. Use genetic diagrams to predict.', examples: [{question: 'Two heterozygous brown-eyed parents (Bb). Predict offspring', workingOut: 'Parents: Bb × Bb\nGametes: B, b from each\nPunnett square:\n  B   b\nB BB Bb\nb Bb bb\nGenotypes: 1 BB : 2 Bb : 1 bb\nPhenotypes: 3 brown : 1 blue\nRatio 3:1\n75% brown, 25% blue', answer: '3:1 ratio (75% brown, 25% blue)', explanation: 'Heterozygous cross: 3:1 ratio. Remember to show working!'}], practiceQuestions: [{question: 'BB is...', options: ['Homozygous dominant', 'Heterozygous', 'Homozygous recessive', 'Phenotype'], answer: 'Homozygous dominant', explanation: 'Two same dominant alleles = homozygous dominant', difficulty: 'easy'}], tips: ['⭐ Capital = dominant', '⭐ Lowercase = recessive', '⭐ Always show Punnett square', '⭐ Genotype vs phenotype'], commonMistakes: ['❌ Not showing genetic diagram', '❌ Wrong ratio', '❌ Confusing genotype/phenotype'], examStrategy: 'Genetics = 10-15 marks! ALWAYS draw Punnett square. Show all working. Learn ratios (3:1, 1:1).'},
  
  {moduleNumber: 12, title: 'Variation & Evolution', duration: '90 minutes', introduction: 'Master how species change! Mutation, natural selection, Darwin, evolution, selective breeding, genetic engineering.', keyPoints: ['Variation: genetic (inherited) + environmental', 'Mutation: random change in DNA', 'Natural selection: best adapted survive and reproduce', 'Evolution: gradual change in species over time', 'Darwin: theory of evolution by natural selection', 'Selective breeding: humans choose traits', 'Genetic engineering: inserting genes from other organisms'], explanation: 'Variation from genes + environment. Mutations create new alleles. Natural selection: survival of fittest (best adapted). Over time = evolution. Selective breeding for desired traits (e.g., high milk yield). GM: insert useful genes.', examples: [{question: 'Explain Darwin\'s theory of natural selection using antibiotic resistance', workingOut: '1. Random mutation gives resistance\n2. Antibiotic kills non-resistant bacteria\n3. Resistant bacteria survive (selected for)\n4. Resistant bacteria reproduce\n5. Pass resistance to offspring\n6. Over time, whole population resistant\n(Natural selection = evolution)', answer: 'Mutation → selective pressure → survival → reproduction → evolution', explanation: 'Perfect example of natural selection! Mutation + selection = evolution.'}], practiceQuestions: [{question: 'Which is genetic variation?', options: ['Eye color', 'Scars', 'Language', 'Hair length'], answer: 'Eye color', explanation: 'Eye color inherited (genetic), others environmental', difficulty: 'easy'}], tips: ['⭐ Genetic vs environmental variation', '⭐ Natural selection = survival of fittest', '⭐ Mutations random', '⭐ Evolution takes time'], commonMistakes: ['❌ Saying organisms adapt (they don\'t choose!)', '❌ Not explaining mutation first', '❌ Confusing selective breeding with natural selection'], examStrategy: 'Evolution = 6-10 marks. Antibiotic resistance common 6-marker. Explain natural selection steps.'},
  
  {moduleNumber: 13, title: 'Ecology & Ecosystems', duration: '95 minutes', introduction: 'Master interactions in ecosystems! Food chains/webs, populations, competition, interdependence, required practicals.', keyPoints: ['Ecosystem: community + abiotic factors', 'Community: all organisms in area', 'Population: one species', 'Interdependence: organisms depend on each other', 'Competition: for resources (light, water, food, mates)', 'Food chain: producer → primary → secondary → tertiary consumer', 'Pyramids of biomass show mass at each level', 'Sampling: quadrats (plants), transects (distribution)'], explanation: 'Ecosystems: living + non-living factors. Food chains show energy transfer. Populations limited by resources. Competition for resources. Required Practicals: quadrat sampling, belt transect.', examples: [{question: 'Describe how to estimate dandelion population in field using quadrats', workingOut: 'Method:\n1. Place 10m × 10m grid over field\n2. Use random number generator for coordinates\n3. Place 1m² quadrat at each position\n4. Count dandelions in each quadrat\n5. Repeat at least 10 times\n6. Calculate mean per m²\n7. Estimate: mean × total field area\nControls: same size quadrat, same time of day', answer: 'Random quadrats, count plants, mean × total area', explanation: 'Required practical! Random placement, repeat, mean, scale up.'}], practiceQuestions: [{question: 'Producers are...', options: ['Plants (photosynthesis)', 'Animals', 'Decomposers', 'Predators'], answer: 'Plants (photosynthesis)', explanation: 'Producers make own food (photosynthesis) - start of food chain', difficulty: 'easy'}], tips: ['⭐ Producer always starts food chain', '⭐ Random quadrat placement', '⭐ Calculate mean', '⭐ Interdependence = depend on each other'], commonMistakes: ['❌ Not random sampling', '❌ Too few quadrats', '❌ Forgetting to scale up'], examStrategy: 'Ecology = 8-12 marks. Quadrat practical common (6 marks). Draw food webs accurately.'},
  
  {moduleNumber: 14, title: 'Biodiversity & Human Impact', duration: '90 minutes', introduction: 'Master how humans affect environment! Pollution, deforestation, global warming, waste, conservation.', keyPoints: ['Biodiversity: variety of species', 'Deforestation: destroys habitats, increases CO2', 'Global warming: greenhouse gases (CO2, methane) trap heat', 'Pollution: water (sewage, fertilizers), air (smoke), land (waste)', 'Waste: landfill, recycling', 'Conservation: protect species and habitats', 'Sustainable development: meet needs without harming future'], explanation: 'Human population growing → more resources → more waste → environmental damage. Deforestation destroys habitats. Greenhouse gases cause global warming. Solutions: reduce, reuse, recycle; conservation programs; sustainable practices.', examples: [{question: 'Explain how deforestation contributes to global warming (6 marks)', workingOut: '1. Trees removed for timber/agriculture\n2. Less photosynthesis occurs\n3. Less CO2 removed from atmosphere\n4. Trees often burned\n5. Burning releases CO2\n6. Increased atmospheric CO2 = enhanced greenhouse effect\n7. More heat trapped\n8. Global temperature increases\n(6 points for 6 marks)', answer: 'Less photosynthesis, burning releases CO2, more greenhouse gases, warming', explanation: '6-marker structure: cause → mechanism → consequence'}], practiceQuestions: [{question: 'Which is greenhouse gas?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 'Carbon dioxide', explanation: 'CO2 traps heat (greenhouse gas) - causes global warming', difficulty: 'easy'}], tips: ['⭐ Learn all human impacts', '⭐ Deforestation = less photosynthesis', '⭐ Global warming mechanism', '⭐ Conservation solutions'], commonMistakes: ['❌ Not explaining mechanism', '❌ Confusing cause and effect', '❌ Not enough detail in 6-markers'], examStrategy: 'Human impact = 6-10 marks. Global warming common 6-marker. Link actions → consequences.'},
  
  {moduleNumber: 15, title: 'Exam Technique & Practice', duration: '60 minutes', introduction: 'Master exam skills! Command words, 6-mark questions, calculations, required practicals summary.', keyPoints: ['Command words: describe (what), explain (why), suggest (apply knowledge)', 'Calculate: show working, units', '6-mark: 6 points, detail, terminology', 'Graphs: axes labels, plot accurately, line of best fit', 'Required practicals: method, variables, safety'], explanation: 'Exam success needs knowledge + technique. Read question carefully. Use command words. Show working. Check units. Practice past papers.', examples: [{question: 'How to answer "Explain why..." questions?', workingOut: 'Explain = give REASONS (why)\nUse: because, so that, therefore\nExample: "Guard cells take in water by osmosis BECAUSE higher concentration inside. Cells become turgid SO stomata open. This ALLOWS gas exchange for photosynthesis."\nLink points together!', answer: 'Give reasons using because/so that, link cause and effect', explanation: 'Explain = why! Always give mechanisms and consequences.'}], practiceQuestions: [{question: 'What does "suggest" mean?', options: ['Apply knowledge to unfamiliar context', 'Just describe', 'Define term', 'Calculate'], answer: 'Apply knowledge to unfamiliar context', explanation: 'Suggest = use what you know in new situation', difficulty: 'medium'}], tips: ['⭐ Read question twice', '⭐ Show ALL working', '⭐ Check units', '⭐ Use terminology', '⭐ 6-mark = 6 detailed points'], commonMistakes: ['❌ Not reading question properly', '❌ No working shown', '❌ Not enough detail', '❌ Wrong or no units'], examStrategy: 'Practice past papers! Time yourself. Mark schemes show what examiners want. Learn from mistakes.'}
];

export default gcseBiologyContent;

