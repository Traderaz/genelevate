/**
 * A-Level Biology - Complete Learning Content
 * Updated for 2025/2026 Academic Year
 * Covers: AQA 7402, Edexcel 9BN0, OCR A H420, OCR B H422, WJEC
 * Target Grades: A-Star to E
 */

import { LessonContent } from '../eleven-plus-content/verbal-reasoning-content';

const aLevelBiologyContent: LessonContent[] = [
  // MODULE 1: Biological Molecules
  {
    moduleNumber: 1,
    title: 'Biological Molecules',
    duration: '120 minutes',
    introduction: 'Explore the chemistry of life: carbohydrates, lipids, proteins, and nucleic acids. Foundation of all A-Level Biology!',
    keyPoints: [
      'Carbohydrates: monosaccharides, disaccharides, polysaccharides',
      'Lipids: triglycerides and phospholipids',
      'Proteins: structure (primary, secondary, tertiary, quaternary)',
      'Enzymes: catalysts with active sites',
      'DNA and RNA structure and function',
      'Water as a solvent - hydrogen bonding'
    ],
    explanation: 'Biological molecules are the building blocks of life. Understanding their structure and function is essential for all biology topics.',
    examples: [
      {question: 'Describe the structure of a triglyceride', workingOut: '3 fatty acids + 1 glycerol\nEster bonds formed by condensation\nHydrophobic', answer: 'Three fatty acids bonded to glycerol via ester bonds', explanation: 'Condensation reaction forms ester bonds'},
      {question: 'Name the bond between amino acids', workingOut: 'Peptide bond\nFormed by condensation reaction\nBetween COOH and NH2 groups', answer: 'Peptide bond', explanation: 'Condensation between carboxyl and amino groups'},
      {question: 'What are the base pairs in DNA?', workingOut: 'A-T (2 hydrogen bonds)\nC-G (3 hydrogen bonds)\nComplementary', answer: 'Adenine-Thymine, Cytosine-Guanine', explanation: 'Complementary base pairing via hydrogen bonds'}
    ],
    practiceQuestions: [
      {question: 'Which bond links glucose monomers?', options: ['Glycosidic', 'Peptide', 'Ester', 'Hydrogen'], answer: 'Glycosidic', explanation: 'Condensation forms glycosidic bonds', difficulty: 'easy'},
      {question: 'Enzyme specificity due to?', options: ['Active site shape', 'Temperature', 'pH', 'Substrate'], answer: 'Active site shape', explanation: 'Complementary active site', difficulty: 'medium'},
      {question: 'Primary structure of protein?', options: ['Amino acid sequence', 'Alpha helix', 'Hydrogen bonds', 'Tertiary'], answer: 'Amino acid sequence', explanation: 'Order of amino acids', difficulty: 'easy'}
    ],
    tips: ['⭐ Learn structures and bonds', '⭐ Practice drawing diagrams', '⭐ Understand enzyme kinetics'],
    commonMistakes: ['❌ Confusing DNA and RNA', '❌ Wrong bond types', '❌ Forgetting water molecules in condensation'],
    examStrategy: 'Biological molecules: 15-20 marks per paper. Draw clear diagrams and label bonds!'
  },

  // MODULE 2: Cells
  {
    moduleNumber: 2,
    title: 'Cells',
    duration: '110 minutes',
    introduction: 'Cell structure, organelles, prokaryotic vs eukaryotic, cell division',
    keyPoints: ['Organelles and functions', 'Prokaryotic vs eukaryotic', 'Mitosis and meiosis', 'Cell cycle', 'Microscopy'],
    explanation: 'Cells are the fundamental units of life. Understanding cell structure and division is crucial.',
    examples: [{question: 'Mitosis stages?', workingOut: 'PMAT: Prophase, Metaphase, Anaphase, Telophase', answer: 'PMAT', explanation: 'Chromosomes separate'}],
    practiceQuestions: [{question: 'Which has no nucleus?', options: ['Prokaryote', 'Eukaryote', 'Plant cell', 'Animal cell'], answer: 'Prokaryote', explanation: 'Prokaryotes lack nucleus', difficulty: 'easy'}],
    tips: ['⭐ Learn organelle functions', '⭐ Practice mitosis/meiosis diagrams'],
    commonMistakes: ['❌ Confusing mitosis and meiosis', '❌ Wrong organelle functions'],
    examStrategy: 'Cells: 12-18 marks. Draw and label accurately!'
  },

  // MODULE 3: Exchange and Transport
  {
    moduleNumber: 3,
    title: 'Exchange and Transport',
    duration: '115 minutes',
    introduction: 'Gas exchange, transport systems in plants and animals, mass transport',
    keyPoints: ['Surface area to volume ratio', 'Lungs and gas exchange', 'Heart and circulation', 'Xylem and phloem', 'Fick\'s law'],
    explanation: 'Organisms need efficient exchange and transport systems to supply cells with nutrients and remove waste.',
    examples: [{question: 'Ficks law formula?', workingOut: 'Rate ∝ (Surface Area × Concentration Difference) / Thickness', answer: 'SA × ΔC / Thickness', explanation: 'Diffusion rate factors'}],
    practiceQuestions: [{question: 'Xylem transports?', options: ['Water and minerals', 'Sugars', 'Oxygen', 'Proteins'], answer: 'Water and minerals', explanation: 'Xylem for water transport', difficulty: 'easy'}],
    tips: ['⭐ Learn transport structures', '⭐ Understand SA:V ratio'],
    commonMistakes: ['❌ Confusing xylem and phloem', '❌ Wrong blood vessel types'],
    examStrategy: 'Exchange: 10-15 marks per paper!'
  },

  // MODULE 4: Genetic Information
  {
    moduleNumber: 4,
    title: 'Genetic Information',
    duration: '125 minutes',
    introduction: 'DNA replication, protein synthesis, gene expression, mutations',
    keyPoints: ['DNA replication - semi-conservative', 'Transcription and translation', 'mRNA, tRNA, rRNA', 'Gene mutations', 'Genetic code'],
    explanation: 'Genetic information flows from DNA to RNA to protein - the central dogma of molecular biology.',
    examples: [
      {question: 'Describe semi-conservative DNA replication', workingOut: 'Step 1: Helicase unwinds helix\nBreaks H-bonds, strands separate\n\nStep 2: DNA polymerase adds nucleotides\nEach strand = template\nComplementary pairing: A-T, G-C\n5\' to 3\' direction\n\nStep 3: Two identical DNA\nEach has one old + one new strand\n\nMeselson-Stahl proved this!', answer: 'Each new DNA has one old and one new strand', explanation: 'Semi = half, each molecule keeps one original strand'},
      {question: 'Describe transcription', workingOut: 'Step 1: RNA polymerase binds promoter\nHelicase unwinds DNA\n\nStep 2: mRNA synthesis\nTemplate strand read 3\'→5\'\nmRNA built 5\'→3\'\nBase pairing: DNA A→RNA U, T→A, C→G, G→C\n\nStep 3: Termination\nReaches terminator, mRNA released\n\nLocation: Nucleus\nProduct: mRNA', answer: 'DNA copied to mRNA by RNA polymerase', explanation: 'U replaces T in RNA'},
      {question: 'Describe translation', workingOut: 'Step 1: Initiation\nmRNA binds ribosome\nStart codon AUG\ntRNA brings methionine\n\nStep 2: Elongation\ntRNA anticodon matches codon\nAmino acid added\nPeptide bond forms\nRibosome moves\n\nStep 3: Termination\nStop codon (UAA/UAG/UGA)\nPolypeptide released\n\nLocation: Ribosome\nProduct: Protein', answer: 'mRNA code translated to protein at ribosome', explanation: 'Codons → amino acids → protein'},
      {question: 'DNA TAC GGC ATT codes for what mRNA?', workingOut: 'Complementary pairing:\n\nDNA: 3\'-TAC GGC ATT-5\'\n        ↓   ↓   ↓\nmRNA: 5\'-AUG CCG UAA-3\'\n\nRules:\nT→A, A→U, C→G, G→C\n\nAUG = start (Met)\nUAA = stop', answer: 'AUG CCG UAA', explanation: 'Complementary pairing, U replaces T in RNA'}
    ],
    practiceQuestions: [{question: 'Which enzyme in DNA replication?', options: ['DNA polymerase', 'RNA polymerase', 'Helicase', 'All'], answer: 'All', explanation: 'Multiple enzymes involved', difficulty: 'medium'}],
    tips: ['⭐ Learn all stages clearly', '⭐ Practice codon questions'],
    commonMistakes: ['❌ Confusing transcription and translation', '❌ Wrong base pairing'],
    examStrategy: 'Genetic info: 15-20 marks!'
  },

  // MODULE 5: Genetic Diversity
  {
    moduleNumber: 5,
    title: 'Genetic Diversity',
    duration: '105 minutes',
    introduction: 'Meiosis, genetic variation, inheritance, natural selection, evolution',
    keyPoints: ['Meiosis creates variation', 'Independent segregation', 'Crossing over', 'Inheritance patterns', 'Natural selection'],
    explanation: 'Genetic diversity is crucial for evolution and adaptation.',
    examples: [{question: 'How does meiosis create variation?', workingOut: 'Independent segregation\nCrossing over\nRandom fusion', answer: 'Independent segregation and crossing over', explanation: 'Two sources of variation'}],
    practiceQuestions: [{question: 'Meiosis produces how many cells?', options: ['4', '2', '1', '8'], answer: '4', explanation: 'Four haploid cells', difficulty: 'easy'}],
    tips: ['⭐ Understand meiosis stages', '⭐ Practice genetic crosses'],
    commonMistakes: ['❌ Confusing meiosis I and II', '❌ Wrong gamete ratios'],
    examStrategy: 'Genetic diversity: 10-15 marks!'
  },

  // MODULES 6-15: Completing efficiently
  {moduleNumber: 6, title: 'Control Systems', duration: '110 min', introduction: 'Homeostasis, nervous system, hormones, thermoregulation, osmoregulation', keyPoints: ['Negative feedback', 'Neurons and synapses', 'Endocrine system', 'ADH and kidneys', 'Temperature regulation'], explanation: 'Control systems maintain stable internal environment', examples: [{question: 'Negative feedback example?', workingOut: 'Temperature regulation\nDetector → Coordinator → Effector', answer: 'Thermoregulation', explanation: 'Maintains body temperature'}], practiceQuestions: [{question: 'Synapse neurotransmitter?', options: ['Acetylcholine', 'Insulin', 'ADH', 'Glucose'], answer: 'Acetylcholine', explanation: 'Chemical messenger', difficulty: 'medium'}], tips: ['⭐ Learn feedback loops', '⭐ Understand hormone action'], commonMistakes: ['❌ Confusing positive and negative feedback'], examStrategy: 'Control systems: 12-18 marks!'},
  
  {moduleNumber: 7, title: 'Genetics and Evolution', duration: '120 min', introduction: 'Inheritance, Hardy-Weinberg, selection, speciation', keyPoints: ['Monohybrid crosses', 'Dihybrid crosses', 'Hardy-Weinberg equilibrium', 'Types of selection', 'Speciation'], explanation: 'Population genetics and evolutionary mechanisms', examples: [{question: 'Hardy-Weinberg equation?', workingOut: 'p² + 2pq + q² = 1', answer: 'p² + 2pq + q² = 1', explanation: 'Genotype frequencies'}], practiceQuestions: [{question: 'Heterozygote genotype?', options: ['Aa', 'AA', 'aa', 'aA'], answer: 'Aa', explanation: 'Two different alleles', difficulty: 'easy'}], tips: ['⭐ Practice genetic crosses', '⭐ Learn selection types'], commonMistakes: ['❌ Wrong gamete formation'], examStrategy: 'Genetics: 15-20 marks!'},
  
  {moduleNumber: 8, title: 'Response to Environment', duration: '100 min', introduction: 'Plant responses, tropisms, animal behavior, innate and learned', keyPoints: ['Plant growth regulators', 'Tropisms (photo, geo)', 'Innate behavior', 'Learned behavior', 'Simple reflexes'], explanation: 'Organisms respond to environmental stimuli', examples: [{question: 'Auxin role?', workingOut: 'Plant hormone\nCell elongation\nPhototropism', answer: 'Promotes cell elongation', explanation: 'Causes shoot growth'}], practiceQuestions: [{question: 'Phototropism is?', options: ['Growth towards light', 'Growth towards gravity', 'Random growth', 'No growth'], answer: 'Growth towards light', explanation: 'Photo = light', difficulty: 'easy'}], tips: ['⭐ Learn plant hormones', '⭐ Understand reflex arcs'], commonMistakes: ['❌ Confusing tropisms'], examStrategy: 'Responses: 8-12 marks!'},
  
  {moduleNumber: 9, title: 'Photosynthesis', duration: '125 min', introduction: 'Light-dependent and light-independent reactions, limiting factors', keyPoints: ['Chloroplast structure', 'Light-dependent: photolysis, photophosphorylation', 'Calvin cycle', 'Limiting factors', 'C3 and C4 plants'], explanation: 'Photosynthesis converts light energy to chemical energy', examples: [
    {question: 'Describe the light-dependent reaction in detail', workingOut: 'Location: Thylakoid membranes\n\nStep 1: Light absorption\n- Chlorophyll absorbs light\n- Electrons excited to higher energy level\n- Electron excited from photosystem II\n\nStep 2: Photolysis of water\n2H₂O → 4H⁺ + 4e⁻ + O₂\n- Water split by light\n- Replaces lost electrons\n- Oxygen released (waste product)\n\nStep 3: Electron transport chain\n- Excited electrons pass along carriers\n- Energy released\n- Pumps H⁺ into thylakoid space\n- Creates proton gradient\n\nStep 4: Photophosphorylation\n- H⁺ diffuse through ATP synthase\n- ADP + Pi → ATP\n- Chemiosmosis\n\nStep 5: NADP reduction\n- Electrons reach photosystem I\n- Re-excited by more light\n- Reduce NADP\n- NADP + 2H⁺ + 2e⁻ → reduced NADP\n\nProducts: ATP, reduced NADP, O₂', answer: 'ATP, reduced NADP, O₂', explanation: 'Light-dependent: photolysis, ETC, chemiosmosis'},
    {question: 'Describe the Calvin cycle (light-independent reaction)', workingOut: 'Location: Stroma of chloroplast\n\nStep 1: Carbon fixation\n- CO₂ combines with RuBP (5C)\n- Enzyme: RuBisCO\n- Forms unstable 6C compound\n- Immediately splits into 2 × GP (3C)\n\nStep 2: Reduction\n- GP reduced to TP (triose phosphate)\n- Uses: ATP and reduced NADP\n- From light-dependent reaction\n- ATP provides energy\n- Reduced NADP provides H atoms\n\nStep 3: Regeneration of RuBP\n- Most TP used to regenerate RuBP\n- Uses more ATP\n- Allows cycle to continue\n- 5 × TP (3C) → 3 × RuBP (5C)\n\nStep 4: Synthesis of glucose\n- Some TP used to make glucose\n- 2 × TP → 1 × glucose\n- Or other organic molecules\n\nFor every 6CO₂ fixed:\n- 1 glucose produced\n- 18 ATP used\n- 12 reduced NADP used', answer: 'CO₂ + RuBP → GP → TP → glucose', explanation: 'Calvin cycle: fixation, reduction, regeneration'},
    {question: 'Explain limiting factors in photosynthesis with a graph', workingOut: 'Limiting factor: factor that restricts rate\n\nFactor 1: Light intensity\n- Low light: rate increases with light\n- High light: plateaus (CO₂ becomes limiting)\n- Graph: curve then plateau\n\nFactor 2: CO₂ concentration\n- Low CO₂: rate increases with CO₂\n- High CO₂: plateaus (light becomes limiting)\n- Graph: curve then plateau\n\nFactor 3: Temperature\n- Low temp: rate increases (kinetic energy)\n- Optimum: maximum rate (25-35°C)\n- High temp: rate decreases (enzymes denature)\n- Graph: curve up then sharp drop\n\nLaw of limiting factors:\n- Rate determined by factor in shortest supply\n- Only one factor limiting at a time\n- Changing non-limiting factor has no effect\n\nGreenhouse application:\n- Increase CO₂ (to 1000 ppm)\n- Increase light (artificial)\n- Control temperature (heaters)\n- Maximize crop yield', answer: 'Light, CO₂, temperature limit rate', explanation: 'Factor in shortest supply limits rate'},
    {question: 'Compare C3 and C4 plants', workingOut: 'C3 Plants (most plants):\n- First product is GP (3C compound)\n- CO₂ fixed by RuBisCO directly\n- Calvin cycle in mesophyll cells\n- Efficient in temperate climates\n- Examples: wheat, rice, trees\n- Problem: photorespiration in hot/dry\n- RuBisCO can bind O₂ instead of CO₂\n- Wastes energy\n\nC4 Plants (tropical plants):\n- First product is 4C compound (malate)\n- CO₂ initially fixed by PEP carboxylase\n- In mesophyll cells\n- 4C compound moves to bundle sheath\n- Releases CO₂ for Calvin cycle\n- High CO₂ concentration at RuBisCO\n- Prevents photorespiration\n- More efficient in hot/dry conditions\n- Examples: maize, sugarcane, sorghum\n\nAdvantages of C4:\n- Avoid photorespiration\n- Better water use efficiency\n- Higher yields in hot climates\n- Can close stomata more (less water loss)\n\nDisadvantage:\n- Requires more ATP initially', answer: 'C4 avoids photorespiration, more efficient in heat', explanation: 'C4 plants fix CO₂ twice - adaptation to hot climates'}
  ], practiceQuestions: [{question: 'Where does Calvin cycle occur?', options: ['Stroma', 'Thylakoid', 'Mitochondria', 'Cytoplasm'], answer: 'Stroma', explanation: 'Stroma of chloroplast', difficulty: 'medium'}], tips: ['⭐ Learn both stages', '⭐ Understand limiting factors graph'], commonMistakes: ['❌ Confusing stages', '❌ Wrong products'], examStrategy: 'Photosynthesis: 12-18 marks!'},
  
  {moduleNumber: 10, title: 'Respiration', duration: '125 min', introduction: 'Glycolysis, Krebs cycle, electron transport chain, ATP production', keyPoints: ['Glycolysis in cytoplasm', 'Link reaction', 'Krebs cycle in mitochondria', 'Oxidative phosphorylation', 'Anaerobic respiration'], explanation: 'Cellular respiration releases energy from glucose', examples: [
    {question: 'Describe glycolysis in detail', workingOut: 'Location: Cytoplasm (not mitochondria!)\nNo oxygen required (anaerobic)\n\nStep 1: Phosphorylation\n- Glucose (6C) + 2ATP → Glucose bisphosphate\n- Energy investment phase\n- Makes glucose more reactive\n\nStep 2: Lysis (splitting)\n- Glucose bisphosphate splits\n- Forms 2 × triose phosphate (3C)\n- "Glyco-lysis" = glucose splitting\n\nStep 3: Oxidation\n- 2 × triose phosphate oxidized\n- Hydrogen removed\n- Picked up by NAD\n- NAD → reduced NAD\n\nStep 4: ATP formation\n- Substrate-level phosphorylation\n- 4 ATP produced\n- Net gain: 4 - 2 = 2 ATP\n\nStep 5: Pyruvate formation\n- 2 × pyruvate (3C) produced\n\nOverall equation:\nGlucose → 2 Pyruvate\nNet gain: 2 ATP, 2 reduced NAD\n\nProducts used in:\n- Aerobic: Link reaction\n- Anaerobic: Fermentation', answer: 'Glucose → 2 Pyruvate, 2ATP, 2 reduced NAD', explanation: 'Glycolysis: phosphorylation, lysis, oxidation'},
    {question: 'Describe the Link Reaction and Krebs Cycle', workingOut: 'Location: Mitochondrial matrix\nOxygen required (aerobic)\n\nLINK REACTION (per pyruvate):\n- Pyruvate (3C) from glycolysis\n- Decarboxylation: CO₂ removed\n- Dehydrogenation: H removed → NAD\n- Forms Acetyl (2C)\n- Combines with Coenzyme A\n- Forms Acetyl CoA (2C)\n\n2 pyruvate → 2 Acetyl CoA + 2CO₂ + 2 reduced NAD\n\nKREBS CYCLE (per Acetyl CoA):\nStep 1: Acetyl CoA (2C) + Oxaloacetate (4C) → Citrate (6C)\n\nStep 2: Citrate decarboxylated\n- CO₂ removed\n- 6C → 5C\n\nStep 3: Further decarboxylation\n- CO₂ removed\n- 5C → 4C\n- Back to Oxaloacetate\n\nStep 4: Dehydrogenation (multiple times)\n- H atoms removed\n- 3 × NAD → reduced NAD\n- 1 × FAD → reduced FAD\n\nStep 5: Substrate-level phosphorylation\n- 1 ATP produced\n\nPer glucose (2 × Acetyl CoA):\n- 4 CO₂\n- 6 reduced NAD\n- 2 reduced FAD\n- 2 ATP\n\nProducts go to electron transport chain!', answer: 'Link: Pyruvate → Acetyl CoA. Krebs: produces reduced NAD/FAD', explanation: 'Link reaction prepares for Krebs, which produces H carriers'},
    {question: 'Describe oxidative phosphorylation and chemiosmosis', workingOut: 'Location: Inner mitochondrial membrane (cristae)\n\nStep 1: Electron transport chain\n- Reduced NAD and FAD from Krebs\n- Release H atoms → H⁺ + e⁻\n- Electrons pass along carriers\n- Energy released at each step\n\nStep 2: Proton pumping\n- Energy used to pump H⁺\n- From matrix to intermembrane space\n- Creates electrochemical gradient\n- High [H⁺] outside, low inside\n\nStep 3: Chemiosmosis\n- H⁺ diffuse back through ATP synthase\n- Down concentration gradient\n- Energy released\n- ADP + Pi → ATP\n\nStep 4: Oxygen as final electron acceptor\n- Electrons + H⁺ + O₂ → H₂O\n- Oxygen is ESSENTIAL\n- Without O₂: electrons back up\n- ETC stops, no ATP made\n\nATP yield:\n- 1 reduced NAD → ~3 ATP\n- 1 reduced FAD → ~2 ATP\n- From glycolysis: 2 reduced NAD → 6 ATP\n- From Link: 2 reduced NAD → 6 ATP\n- From Krebs: 6 reduced NAD → 18 ATP\n-            2 reduced FAD → 4 ATP\n- Total from oxidative phosphorylation: ~34 ATP\n\nTotal respiration:\nGlycolysis: 2 ATP\nKrebs: 2 ATP\nOxidative: 34 ATP\nTotal: ~38 ATP (theoretical max)', answer: 'ETC pumps H⁺, chemiosmosis makes ATP, O₂ final acceptor', explanation: 'Oxidative phosphorylation: chemiosmosis driven by ETC'},
    {question: 'Compare aerobic and anaerobic respiration', workingOut: 'AEROBIC RESPIRATION:\nLocation: Mitochondria (mainly)\nOxygen: Required\nProducts: CO₂ + H₂O\nATP yield: ~38 ATP per glucose\nGlucose completely oxidized\n\nStages:\n1. Glycolysis (cytoplasm)\n2. Link reaction (matrix)\n3. Krebs cycle (matrix)\n4. Oxidative phosphorylation (cristae)\n\nEquation:\nC₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\n\nANAEROBIC RESPIRATION:\nLocation: Cytoplasm only\nOxygen: Not required\nATP yield: 2 ATP per glucose (from glycolysis only)\nGlucose partially broken down\n\nIn animals (lactate fermentation):\nGlucose → 2 Lactate + 2 ATP\nPyruvate + reduced NAD → Lactate + NAD\n- Regenerates NAD for glycolysis\n- Lactate causes muscle fatigue\n- Must be converted back (oxygen debt)\n\nIn yeast (alcoholic fermentation):\nGlucose → 2 Ethanol + 2CO₂ + 2 ATP\nPyruvate → Ethanol + CO₂\n- Used in brewing and baking\n- Ethanol is toxic to yeast\n\nWhy anaerobic?\n- No oxygen available\n- Muscles during intense exercise\n- Allows glycolysis to continue\n- Regenerates NAD\n- Better 2 ATP than none!', answer: 'Aerobic: 38 ATP, complete oxidation. Anaerobic: 2 ATP, partial', explanation: 'Anaerobic only glycolysis, aerobic includes all stages'}
  ], practiceQuestions: [{question: 'Where is Krebs cycle?', options: ['Mitochondrial matrix', 'Cytoplasm', 'Cristae', 'Stroma'], answer: 'Mitochondrial matrix', explanation: 'Matrix of mitochondria', difficulty: 'easy'}], tips: ['⭐ Learn all stages and locations', '⭐ Understand ATP yield'], commonMistakes: ['❌ Wrong ATP totals', '❌ Location errors'], examStrategy: 'Respiration: 12-18 marks!'},
  
  {moduleNumber: 11, title: 'Ecosystems', duration: '110 min', introduction: 'Energy flow, nutrient cycles, succession, populations', keyPoints: ['Food chains and webs', 'Energy transfer', 'Carbon and nitrogen cycles', 'Ecological succession', 'Population dynamics'], explanation: 'Ecosystems involve energy flow and nutrient recycling', examples: [{question: 'Energy transfer efficiency?', workingOut: '(Energy in consumer / Energy in producer) × 100%\nTypically 10%', answer: '~10%', explanation: 'Most energy lost as heat'}], practiceQuestions: [{question: 'Primary producers are?', options: ['Plants', 'Herbivores', 'Carnivores', 'Decomposers'], answer: 'Plants', explanation: 'Photosynthetic organisms', difficulty: 'easy'}], tips: ['⭐ Draw food webs', '⭐ Learn nutrient cycles'], commonMistakes: ['❌ Wrong trophic levels', '❌ Energy transfer errors'], examStrategy: 'Ecosystems: 10-15 marks!'},
  
  {moduleNumber: 12, title: 'Gene Technology', duration: '115 min', introduction: 'Genetic engineering, PCR, DNA sequencing, gene therapy', keyPoints: ['Recombinant DNA', 'PCR - amplify DNA', 'DNA sequencing', 'Gene therapy', 'Ethical issues'], explanation: 'Gene technology manipulates genetic material for various applications', examples: [{question: 'PCR stages?', workingOut: 'Denaturation (95°C)\nAnnealing (55°C)\nExtension (72°C)', answer: 'Denaturation, annealing, extension', explanation: 'Amplifies DNA'}], practiceQuestions: [{question: 'PCR purpose?', options: ['Amplify DNA', 'Cut DNA', 'Join DNA', 'Read DNA'], answer: 'Amplify DNA', explanation: 'Polymerase chain reaction', difficulty: 'medium'}], tips: ['⭐ Learn PCR steps', '⭐ Understand applications'], commonMistakes: ['❌ Wrong temperature orders', '❌ Confusing techniques'], examStrategy: 'Gene tech: 10-15 marks!'},
  
  {moduleNumber: 13, title: 'Cloning and Biotechnology', duration: '100 min', introduction: 'Reproductive cloning, tissue culture, industrial applications', keyPoints: ['Animal cloning', 'Plant cloning', 'Tissue culture', 'Fermentation', 'Monoclonal antibodies'], explanation: 'Biotechnology uses organisms for practical applications', examples: [{question: 'Describe tissue culture', workingOut: 'Explant taken\nGrown on nutrient medium\nPlant growth regulators added\nGenetically identical plants', answer: 'Cloning plants from small tissue samples', explanation: 'Produces many identical plants'}], practiceQuestions: [{question: 'Monoclonal antibodies from?', options: ['Hybridoma cells', 'B cells only', 'T cells', 'Bacteria'], answer: 'Hybridoma cells', explanation: 'Fused B cell and tumor cell', difficulty: 'hard'}], tips: ['⭐ Learn cloning methods', '⭐ Understand applications'], commonMistakes: ['❌ Confusing cloning types'], examStrategy: 'Biotechnology: 8-12 marks!'},
  
  {moduleNumber: 14, title: 'Nervous System & Muscles', duration: '120 min', introduction: 'Brain structure, reflex arcs, muscle contraction, neurotransmitters', keyPoints: ['Brain regions', 'Reflex arc components', 'Sliding filament theory', 'Action potentials', 'Synaptic transmission'], explanation: 'Nervous system coordinates responses; muscles enable movement', examples: [{question: 'Describe sliding filament', workingOut: 'Myosin heads pull actin\nSarcomere shortens\nATP provides energy\nCalcium ions trigger', answer: 'Actin slides past myosin', explanation: 'Muscle contraction mechanism'}], practiceQuestions: [{question: 'Neurotransmitter at NMJ?', options: ['Acetylcholine', 'Dopamine', 'Serotonin', 'GABA'], answer: 'Acetylcholine', explanation: 'Neuromuscular junction', difficulty: 'medium'}], tips: ['⭐ Learn muscle structure', '⭐ Understand action potentials'], commonMistakes: ['❌ Wrong muscle filaments', '❌ Synapse errors'], examStrategy: 'Nervous/muscles: 12-18 marks!'},
  
  {moduleNumber: 15, title: 'Exam Mastery & A-Star Techniques', duration: '120 min', introduction: 'Past paper strategy, extended response questions, synoptic links', keyPoints: ['Command words', 'Extended writing', 'Practical skills', 'Synoptic assessment', 'Time management'], explanation: 'Master exam technique for maximum marks', examples: [{question: 'How to answer "evaluate"?', workingOut: 'Give pros and cons\nUse evidence\nCome to conclusion\nShow judgement', answer: 'Balanced argument with conclusion', explanation: 'Higher-order skill'}], practiceQuestions: [{question: 'A-Star boundary typically?', options: ['80-85%', '90%', '75%', '95%'], answer: '80-85%', explanation: 'Usually 80-85%', difficulty: 'easy'}], tips: ['⭐ Practice past papers', '⭐ Learn mark schemes', '⭐ Show working always'], commonMistakes: ['❌ Not answering the question', '❌ Poor time management'], examStrategy: 'Master exam technique for A-Star! Practice, practice, practice! 🎯'}
];

export default aLevelBiologyContent;

