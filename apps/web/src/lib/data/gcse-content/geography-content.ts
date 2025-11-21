/**
 * GCSE Geography - Complete Revision Guide
 * 
 * 15 comprehensive modules covering GCSE Geography specifications
 * AQA 8035, Edexcel A & B, OCR B, WJEC A & B
 * Updated for 2025/2026 curriculum
 * 
 * Topics: Physical Geography (Rivers, Coasts, Weather, Tectonic Hazards, Ecosystems)
 * Human Geography (Urban, Economic, Development)
 * Geographical Skills & Fieldwork
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

export const gcseGeographyContent: LessonContent[] = [
  // Module 1: River Landscapes
  {
    moduleNumber: 1,
    title: 'River Landscapes & Processes',
    duration: '90 minutes',
    introduction: 'Master river processes for GCSE! Erosion, transportation, deposition, landforms. Essential for physical geography paper.',
    keyPoints: [
      'Four types of erosion: hydraulic action, abrasion, attrition, solution',
      'Transportation: traction, saltation, suspension, solution',
      'Deposition when river loses energy',
      'Upper course: V-shaped valleys, waterfalls, gorges',
      'Middle course: meanders, oxbow lakes',
      'Lower course: floodplains, levees, deltas',
      'Human impacts: dams, channelization, flood management'
    ],
    explanation: 'Rivers shape landscape through erosion, transportation, deposition. Upper course: steep gradient, vertical erosion creates V-shaped valleys, waterfalls. Middle course: lateral erosion forms meanders, can create oxbow lakes. Lower course: wide, flat floodplain, deposition creates levees, deltas. Hydraulic action (water force), abrasion (rocks scraping), attrition (rocks hitting each other), solution (chemical dissolving). Transportation methods depend on energy. Humans modify rivers for flood protection, water supply, but impacts ecosystems.',
    examples: [
      {
        question: 'Explain the formation of a waterfall (4 marks)',
        workingOut: `Step 1: Identify hard and soft rock
Waterfall forms where river flows over hard rock onto soft rock.

Step 2: Differential erosion
Soft rock erodes faster than hard rock (through hydraulic action and abrasion). Creates step in river bed.

Step 3: Undercutting
Soft rock underneath hard rock erodes, creating overhang.

Step 4: Collapse and retreat
Overhang becomes unstable, collapses. Fallen rocks erode plunge pool at base. Waterfall retreats upstream, leaving gorge.

Diagram annotation: Hard rock layer on top, soft rock below, overhang, plunge pool, gorge behind.`,
        answer: 'Hard rock over soft rock → soft rock erodes faster → undercutting creates overhang → collapse → retreat upstream leaving gorge',
        explanation: 'Formation questions = step-by-step process. Use geographical terms (hydraulic action, abrasion). Diagram if asked! 4 marks = 4 clear steps.'
      },
      {
        question: 'Case study: Flood management on River Thames, London (6 marks)',
        workingOut: `Location: River Thames, flows through London (capital city, 9 million people)

Problem: Tidal river, risk of flooding. 1953 flood killed 300+ people. Climate change increases risk.

Solution: Thames Barrier (completed 1982)
- 10 steel gates across river at Woolwich
- Raised when storm surge forecast
- Protects £200 billion of property
- Used 200+ times since opening

Additional measures:
- Flood walls along embankment
- Improved weather forecasting
- Flood warning systems

Effects:
✓ Successfully protected London (no major floods since)
✓ Allows development of Thames waterfront
✗ Expensive (£535 million, maintenance costs)
✗ Disrupts shipping when closed
✗ Climate change means may need replacement by 2070

Case studies need: location, problem, solution (details!), effects (pros & cons)`,
        answer: 'Thames Barrier: 10 gates at Woolwich, raised for storm surges, protected London 40+ years, £535m cost, shipping disruption, may need upgrade',
        explanation: 'Case study = specific named example with details! Location, facts, figures, effects. Show pros AND cons. 6+ marks need detailed case study.'
      },
      {
        question: 'Explain how a meander forms (4 marks)',
        workingOut: `Step 1: Fastest current
River flow fastest on outside of bend, slowest on inside.

Step 2: Erosion on outside
Fast flow → more energy → erosion (hydraulic action, abrasion) on outside bend. Creates river cliff.

Step 3: Deposition on inside
Slow flow → less energy → deposition on inside bend. Creates slip-off slope (point bar).

Step 4: Meander grows
Continuous erosion outside, deposition inside makes bend more pronounced. Meander migrates downstream and laterally.

Can lead to oxbow lake if meander neck narrows and breaks through.`,
        answer: 'Fast flow outside bend → erosion creates river cliff. Slow flow inside → deposition creates slip-off slope. Bend becomes more pronounced.',
        explanation: 'Formation = process! Explain cause (flow speed) and effect (erosion/deposition). Link to landforms created. Use correct terms!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is hydraulic action?',
        options: ['Force of water breaking rocks', 'Rocks scraping river bed', 'Rocks smashing together', 'Chemical dissolving'],
        answer: 'Force of water breaking rocks',
        explanation: 'Hydraulic action = force of water compressing air in cracks, breaking rock apart',
        difficulty: 'easy'
      },
      {
        question: 'Which erosion process creates a V-shaped valley?',
        options: ['Vertical erosion in upper course', 'Lateral erosion in middle course', 'Deposition in lower course', 'Transportation'],
        answer: 'Vertical erosion in upper course',
        explanation: 'Upper course: steep gradient, vertical erosion cuts down, valley sides weathered creating V-shape',
        difficulty: 'medium'
      },
      {
        question: 'Levees form when...',
        options: ['River floods, deposits sediment on banks', 'River erodes outer bend', 'Waterfall retreats', 'Delta grows'],
        answer: 'River floods, deposits sediment on banks',
        explanation: 'Levees = raised banks formed by repeated flooding depositing alluvium on river sides',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ Formation questions = step-by-step process',
      '⭐ Use correct terms (erosion types, landforms)',
      '⭐ Draw annotated diagrams if asked',
      '⭐ Case studies need specific details (names, figures)'
    ],
    commonMistakes: [
      '❌ Confusing erosion types',
      '❌ Vague case studies (no specific details)',
      '❌ Not explaining WHY processes happen',
      '❌ Missing diagrams when asked'
    ],
    examStrategy: 'Rivers = common exam topic! Formation questions (4-6 marks) = clear steps. Case studies (6-9 marks) = specific named example with details. Practice drawing landforms!'
  },

  // Module 2: Coastal Landscapes
  {
    moduleNumber: 2,
    title: 'Coastal Landscapes & Management',
    duration: '90 minutes',
    introduction: 'Master coastal processes! Erosion, weathering, transportation, deposition, coastal landforms, management strategies.',
    keyPoints: [
      'Wave types: constructive (deposit) vs destructive (erode)',
      'Coastal erosion: hydraulic action, abrasion, attrition, solution',
      'Landforms: cliffs, wave-cut platforms, headlands, bays, caves, arches, stacks',
      'Deposition: beaches, spits, bars, tombolos',
      'Hard engineering: sea walls, groynes, rock armour',
      'Soft engineering: beach nourishment, dune regeneration, managed retreat',
      'Coastal management: economic vs environmental'
    ],
    explanation: 'Coasts shaped by waves, weathering, mass movement. Destructive waves (high, frequent) erode - backwash stronger. Constructive waves (low, gentle) deposit - swash stronger. Erosion creates cliffs, headlands. Deposition forms beaches, spits. Hard engineering (sea walls, groynes) fights erosion but expensive, ugly. Soft engineering (beach replenishment, managed retreat) works with nature, cheaper, sustainable. Holdfast (protect) or strategic realignment? Decisions based on economics vs environment.',
    examples: [
      {
        question: 'Explain the formation of a headland and bay (6 marks)',
        workingOut: `Step 1: Geology
Coastline has alternating bands of hard rock (resistant, e.g. chalk, limestone) and soft rock (less resistant, e.g. clay, sandstone).

Step 2: Differential erosion
Waves erode soft rock faster than hard rock (through hydraulic action, abrasion).

Step 3: Hard rock juts out
Hard rock erodes slowly, remains jutting out into sea = headland.

Step 4: Soft rock retreats
Soft rock erodes quickly, forms curved indentation = bay.

Step 5: Further development
Headlands protect bays from full force of waves. Bays become beaches (deposition in sheltered areas). Headlands continue to erode → caves, arches, stacks.

Example: Old Harry Rocks, Dorset - chalk headland with stacks`,
        answer: 'Alternating hard/soft rock → soft rock erodes faster → hard rock forms headland → soft rock forms bay → bays shelter beaches',
        explanation: '6 marks = detailed! Explain geology, differential erosion, resulting landforms. Named example if possible.'
      },
      {
        question: 'Case study: Coastal management at Lyme Regis, Dorset (9 marks)',
        workingOut: `Location: Lyme Regis, Dorset coast (southwest England). Tourist town, 4,000 residents, £50m tourism annually.

Why protected: Town on cliff, history of landslides. 1994: rotational slump. Economic importance (tourism, houses).

Hard engineering:
1. Sea wall (1995) - £2 million
   ✓ Protects promenade, absorbs wave energy
   ✗ Expensive maintenance, ugly, waves reflect damage elsewhere
   
2. Rock armour (1995) - £1.5 million
   ✓ Absorbs wave energy, gaps reduce force
   ✗ Expensive, ugly, dangerous for beach users
   
3. Beach replenishment (2015) - £20 million
   ✓ Wider beach absorbs waves, tourism benefit
   ✗ Temporary (sand moves), repeated cost

Soft engineering:
4. Cliff drainage - reduces water = more stable
5. Vegetation - roots stabilize slopes

Effects:
✓ Town protected (no major landslides since)
✓ Tourism maintained (beach, promenade)
✗ Very expensive (£30m+ total, ongoing costs)
✗ Coastal squeeze (armour + rising sea levels = beach narrows)
✗ Downdrift erosion (groynes trap sediment, starve beaches east)

Evaluation: Successful for Lyme Regis BUT expensive, harms other areas. Raises question: protect everywhere or strategic realignment?`,
        answer: 'Lyme Regis: sea wall, rock armour, beach replenishment protect tourist town (£50m annually). £30m+ cost. Successful BUT expensive, coastal squeeze, downdrift erosion.',
        explanation: '9-mark case study = DETAILED! Location, why important, methods (with costs), effects (pros & cons), evaluation. Show both sides!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Constructive waves...',
        options: ['Have strong swash, deposit', 'Have strong backwash, erode', 'Are high and frequent', 'Cause cliff retreat'],
        answer: 'Have strong swash, deposit',
        explanation: 'Constructive waves: low, gentle, strong swash (forward) deposits sediment, builds beaches',
        difficulty: 'easy'
      },
      {
        question: 'A stack forms from...',
        options: ['Cave → arch → stack', 'Bay → headland → stack', 'Beach → spit → stack', 'Wave-cut platform → stack'],
        answer: 'Cave → arch → stack',
        explanation: 'Headland erosion: cave forms → erodes through to arch → collapses leaving stack',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ Wave type crucial: constructive (deposit) vs destructive (erode)',
      '⭐ Formation = step-by-step geological process',
      '⭐ Case studies need costs, pros, cons',
      '⭐ Hard vs soft engineering - know advantages/disadvantages'
    ],
    commonMistakes: [
      '❌ Confusing wave types',
      '❌ No specific case study details',
      '❌ One-sided (only pros OR only cons)',
      '❌ Not explaining geological processes'
    ],
    examStrategy: 'Coasts = physical geography paper. Formation questions (4-6 marks), management case studies (6-9 marks). Compare hard vs soft engineering. Show costs & impacts!'
  },

  // Streamlined modules 3-15 for efficiency
  {
    moduleNumber: 3,
    title: 'Weather Hazards & Climate Change',
    duration: '90 minutes',
    introduction: 'Master global atmospheric circulation, tropical storms, UK weather, climate change causes and effects.',
    keyPoints: [
      'Global atmospheric circulation: Hadley, Ferrel, Polar cells',
      'Tropical storms: structure, distribution, causes',
      'UK weather: air masses, depressions, anticyclones',
      'Climate change: natural causes (Milankovitch, volcanoes) vs human (greenhouse gases)',
      'Evidence: ice cores, temperature records, sea level rise',
      'Effects: sea level rise, extreme weather, ecosystems, food/water',
      'Responses: mitigation (renewable energy) vs adaptation (flood barriers)'
    ],
    explanation: 'Global atmospheric circulation drives weather patterns. Hadley cells (0-30°), Ferrel (30-60°), Polar (60-90°). Tropical storms form in warm oceans (27°C+), low pressure, Coriolis effect. Eye, eyewall, rotating winds. UK weather: temperate maritime. Air masses (tropical/polar, maritime/continental), depressions (low pressure, rain), anticyclones (high pressure, dry). Climate change: natural (orbital changes, volcanoes) but current warming human-caused (fossil fuels → CO₂). Effects: rising seas, melting ice, extreme weather, ecosystems disrupted, food/water stress. Responses: mitigation (reduce emissions) and adaptation (cope with changes).',
    examples: [
      {
        question: 'Case study: Tropical Storm - Hurricane Katrina, USA 2005 (9 marks)',
        workingOut: `Location: Gulf of Mexico → Louisiana, Mississippi, Florida (USA). Hit New Orleans hardest.

When: August 29, 2005. Category 5 storm (280 km/h winds).

Primary effects:
- 1,836 deaths (mostly Louisiana)
- 300,000 homes destroyed
- 80% New Orleans flooded (levees failed)
- $105 billion damage
- Oil refineries damaged → fuel shortages
- 3 million without electricity

Secondary effects:
- Disease spread (sewage in floodwater)
- 400,000 jobs lost
- Looting, violence (law and order breakdown)
- 1 million people displaced
- Psychological trauma
- Long-term economic decline

Responses:
Immediate:
- Coast Guard rescued 33,000 people
- Emergency shelters (Superdome - overcrowded, poor conditions)
- National Guard deployed
- BUT slow federal response (criticized)

Long-term:
- $120 billion rebuilding
- Levee improvements ($15 billion)
- Early warning systems improved
- Building codes strengthened
- BUT many residents never returned, inequality persists

Why so devastating:
- HIC but poor preparation, aging infrastructure
- New Orleans below sea level, reliant on levees
- Poorest areas most affected (couldn't evacuate)

Evaluation: Exposed USA's vulnerability despite wealth. Inequality major factor. Improved defenses but climate change increases future risk.`,
        answer: 'Katrina 2005: 1,836 deaths, $105bn damage, New Orleans 80% flooded. Slow response criticized. Rebuilt ($120bn) but inequality persists.',
        explanation: '9-mark named example = PRIMARY & SECONDARY effects, IMMEDIATE & LONG-TERM responses, WHY so bad, evaluation!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Tropical storms form when ocean temperature is...',
        options: ['27°C or above', '10°C', '0°C', '50°C'],
        answer: '27°C or above',
        explanation: 'Need 27°C+ ocean to evaporate enough water for tropical storm formation',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Tropical storm case study = effects (1°/2°) + responses (immediate/long-term)',
      '⭐ Climate change = natural AND human causes',
      '⭐ Mitigation vs adaptation - know difference'
    ],
    commonMistakes: [
      '❌ Only primary effects, forgetting secondary',
      '❌ No specific facts (dates, numbers)',
      '❌ Confusing mitigation and adaptation'
    ],
    examStrategy: 'Weather hazards = 9-mark case studies! Need: what happened, effects (1°&2°), responses (immediate&long-term), why vulnerable, evaluation. Practice tropical storm & UK extreme weather!'
  },

  {
    moduleNumber: 4,
    title: 'Tectonic Hazards: Earthquakes & Volcanoes',
    duration: '95 minutes',
    introduction: 'Master plate tectonics! Types of plate boundaries, earthquakes, volcanoes, effects, responses, monitoring.',
    keyPoints: [
      'Plate tectonic theory: convection currents move plates',
      'Constructive margins: plates move apart, volcanoes (e.g. Mid-Atlantic Ridge)',
      'Destructive margins: oceanic subducts under continental, earthquakes & volcanoes (e.g. Pacific Ring of Fire)',
      'Conservative margins: plates slide past, earthquakes (e.g. San Andreas Fault)',
      'Primary effects: buildings collapse, deaths, infrastructure damage',
      'Secondary effects: tsunamis, disease, economic impacts',
      'Responses: immediate (rescue) vs long-term (rebuild, monitoring)',
      'HIC vs LIC: different impacts and responses'
    ],
    explanation: 'Earth\'s crust = plates floating on mantle. Convection currents move plates. Constructive: plates diverge, magma rises (volcanoes, e.g. Iceland). Destructive: oceanic plate subducts under continental, friction causes earthquakes, melting causes volcanoes (e.g. Japan). Conservative: plates slide, earthquakes (e.g. California). Earthquakes: shake buildings, primary (immediate) and secondary (after) effects. Volcanoes: lava, ash, pyroclastic flows. HIC better prepared (building codes, monitoring, emergency services) than LIC. Prediction impossible for earthquakes, monitoring helps for volcanoes.',
    examples: [
      {
        question: 'Compare earthquake impacts: HIC vs LIC (6 marks)',
        workingOut: `Structure: Point → Example HIC → Example LIC → Explain difference

Point 1: Death toll
HIC: Japan 2011 - 18,500 deaths (magnitude 9.0)
LIC: Nepal 2015 - 9,000 deaths (magnitude 7.8)
Explain: Japan higher magnitude BUT Nepal higher proportion. Nepal: poor building standards, rural areas inaccessible. Japan: earthquake-resistant buildings, strict codes.

Point 2: Economic damage
HIC: Japan 2011 - $235 billion (most expensive disaster ever)
LIC: Nepal 2015 - $10 billion (50% of GDP)
Explain: HIC absolute cost higher BUT LIC relative impact worse. Nepal's economy devastated. Japan wealthy, can rebuild.

Point 3: Response speed
HIC: Japan 2011 - immediate response (prepared emergency services, earthquake drills, stockpiles)
LIC: Nepal 2015 - slow response (limited resources, infrastructure damaged, reliant on international aid)
Explain: HIC preparation and resources enable fast response. LIC underprepared, overwhelmed.

Conclusion: HICs face higher absolute costs BUT have resources, preparation, building codes to reduce deaths and recover. LICs face proportionally worse impacts and struggle to respond/rebuild.`,
        answer: 'HICs: better building codes & preparation = fewer deaths relative to magnitude, higher absolute cost but lower % GDP, faster response. LICs: opposite.',
        explanation: 'Compare question = show similarities AND differences. Use specific examples. Explain WHY differences exist. 6 marks = detailed!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Destructive plate margins produce...',
        options: ['Earthquakes and volcanoes', 'Only volcanoes', 'Only earthquakes', 'Nothing'],
        answer: 'Earthquakes and volcanoes',
        explanation: 'Subduction at destructive margins causes friction (earthquakes) and melting (volcanoes)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Case studies = HIC AND LIC examples',
      '⭐ Effects = primary (immediate) + secondary (after)',
      '⭐ Responses = immediate + long-term',
      '⭐ Explain WHY HIC/LIC differences'
    ],
    commonMistakes: [
      '❌ Only one case study (need HIC & LIC)',
      '❌ Not explaining why differences',
      '❌ Confusing plate margin types'
    ],
    examStrategy: 'Tectonic hazards = need HIC & LIC case studies! Compare effects, responses, explain differences. Practice: earthquake HIC, earthquake LIC, volcano.'
  },

  {
    moduleNumber: 5,
    title: 'Ecosystems: Tropical Rainforests',
    duration: '85 minutes',
    introduction: 'Master tropical rainforests! Distribution, characteristics, biodiversity, deforestation causes/impacts, sustainability.',
    keyPoints: [
      'Location: 0-10° North/South equator (Amazon, Congo, SE Asia)',
      'Hot, wet climate (25-30°C, 2000mm+ rain)',
      'Nutrient cycle: rapid, poor soils (leaching)',
      'Layers: emergent, canopy, understory, forest floor',
      'High biodiversity, interdependence',
      'Deforestation causes: logging, agriculture, mining, infrastructure',
      'Impacts: climate change, biodiversity loss, soil erosion, indigenous people',
      'Sustainable management: selective logging, ecotourism, conservation'
    ],
    explanation: 'Tropical rainforests near equator. Year-round hot, wet (convectional rain). Rapid nutrient cycling BUT poor soils (nutrients in biomass). Layers adapted to light. High biodiversity, species interdependent. Threatened by deforestation: commercial logging, cattle ranching, soy farms, mining, roads. Impacts: carbon released (climate change), species extinct, soil erodes, indigenous cultures lost. Sustainable: selective logging (fewer trees), replanting, ecotourism (value alive), reserves, international agreements.',
    examples: [
      {
        question: 'Case study: Deforestation in Amazon rainforest (9 marks)',
        workingOut: `Location: Amazon Basin, 9 countries (mainly Brazil). 5.5 million km² (60% Brazil).

Causes:
1. Cattle ranching (80% deforestation) - beef export
2. Soy farming (animal feed for global market)
3. Logging (mahogany, teak - valuable)
4. Mining (gold, iron ore)
5. Infrastructure (Trans-Amazonian Highway)
6. Hydroelectric dams (Belo Monte)

Rate: 10,000 km² per year (size of Jamaica annually!)

Impacts:
Environmental:
- 17% of Amazon lost (was carbon sink, now source)
- 10% world's species live here - many extinct
- Soil erosion (no roots to hold)
- Less rainfall (trees recycle moisture)
- Climate change accelerated

Social:
- Indigenous people displaced (Yanomami, Kayapo)
- Cultures lost
- Conflict (land disputes)

Economic:
- Short-term: jobs, export income ($20bn annually)
- Long-term: ecosystem services lost, tourism potential gone

Sustainable management:
1. Selective logging (e.g. FSC certified - 1 tree per hectare)
2. Replanting programs
3. Ecotourism (value alive - Peru generates $3bn)
4. Conservation zones (40% Amazon protected on paper BUT enforcement weak)
5. International pressure (debt-for-nature swaps, REDD+)

Challenges: Economic pressure vs environment. Brazil: "our resource, our decision." Illegal logging continues.

Evaluation: Deforestation slowing (monitoring, enforcement) BUT still losing forest. Balance economic development with sustainability difficult for LIC/NEE countries.`,
        answer: 'Amazon: 17% lost, 10,000 km²/year. Cattle, soy, logging, mining. Climate change, extinction, indigenous displacement. Sustainable: selective logging, ecotourism, reserves.',
        explanation: '9-mark rainforest = location, causes (multiple!), impacts (environmental/social/economic), sustainable management, evaluation!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Tropical rainforests are located...',
        options: ['0-10° N/S equator', '23.5° N/S', '60° N/S', 'Poles'],
        answer: '0-10° N/S equator',
        explanation: 'Tropical rainforests lie close to equator where hot, wet year-round',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Rainforest case study = causes, impacts, management',
      '⭐ Impacts = environmental, social, economic',
      '⭐ Sustainability = working with nature'
    ],
    commonMistakes: [
      '❌ Only one type of impact',
      '❌ No sustainable management',
      '❌ Vague (not using case study details)'
    ],
    examStrategy: 'Ecosystems = 9-mark case study! Need specific rainforest (Amazon common). Causes, impacts (3 types), sustainable management, evaluation. Practice!'
  },

  {
    moduleNumber: 6,
    title: 'Hot Deserts: Challenges & Opportunities',
    duration: '80 minutes',
    introduction: 'Master hot desert ecosystems! Characteristics, adaptations, development opportunities, desertification.',
    keyPoints: [
      'Location: 15-30° N/S (sub-tropical high pressure)',
      'Very hot, very dry (<250mm rain annually)',
      'Plants/animals adapted (cacti, camels)',
      'Opportunities: mineral extraction, energy, tourism',
      'Challenges: extreme heat, water scarcity, inaccessibility',
      'Desertification: land becomes desert (overgrazing, climate change)',
      'Management: water conservation, tree planting, appropriate technology'
    ],
    explanation: 'Hot deserts at 15-30° latitude (sub-tropical high pressure zones). Very hot day (45°C+), cool night. Very dry (<250mm rain/year). Life adapted: cacti (store water), camels (humps, wide feet), fennec fox (large ears dissipate heat). Opportunities: minerals, solar energy, tourism (safaris). Challenges: water scarce, extreme heat, remote. Desertification threatens borders: overgrazing removes vegetation, soil erosion, climate change. Management: drip irrigation, tree planting, sand dunes stabilization, sustainable farming.',
    examples: [
      {
        question: 'Case study: Development in hot desert - Thar Desert, India/Pakistan (6 marks)',
        workingOut: `Location: Thar Desert (Great Indian Desert), Rajasthan (India), extends Pakistan. 200,000 km².

Challenges:
- Temperature extremes (50°C summer)
- Low rainfall (100-240mm annually)
- Water scarcity
- Inaccessibility (remote villages)

Opportunities & development:
1. Mineral extraction
   - Gypsum, phosphate, limestone
   - Provides employment, export income
   
2. Energy
   - Solar farms (e.g. Bhadla Solar Park, world's largest 2.25 GW)
   - Excellent solar irradiance
   
3. Tourism
   - Jaisalmer (Golden City), camel safaris
   - Generates income for locals
   
4. Agriculture
   - Indira Gandhi Canal (650 km) brings water from Himalayas
   - Irrigated farming now possible
   - BUT water diverted from other areas

Impacts:
✓ Economic development, jobs
✓ Improved infrastructure
✗ Increased water consumption
✗ Soil salinization from irrigation
✗ Traditional nomadic lifestyles threatened

Evaluation: Development brings opportunities BUT must be sustainable (water scarcity, desertification risk).`,
        answer: 'Thar Desert: minerals, solar energy (Bhadla 2.25GW), tourism, Indira Gandhi Canal irrigation. Jobs, development BUT water scarcity, salinization risks.',
        explanation: '6-mark desert case study = challenges, opportunities, development examples, impacts (pros & cons), evaluation!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Hot deserts are located...',
        options: ['15-30° N/S', '0-10° N/S', '60° N/S', 'Poles'],
        answer: '15-30° N/S',
        explanation: 'Hot deserts at 15-30° latitude (sub-tropical high pressure, descending dry air)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Desert case study = challenges + opportunities',
      '⭐ Desertification = land degradation',
      '⭐ Show development impacts (pros & cons)'
    ],
    commonMistakes: [
      '❌ Only challenges OR only opportunities',
      '❌ No specific case study',
      '❌ Not discussing sustainability'
    ],
    examStrategy: 'Hot deserts = cold environments alternative. Case study (6-9 marks): challenges, opportunities, development, impacts. Balance pros & cons!'
  },

  {
    moduleNumber: 7,
    title: 'Urban Issues: UK City',
    duration: '90 minutes',
    introduction: 'Master urbanization in UK! Growth, migration, opportunities, challenges, regeneration, sustainability.',
    keyPoints: [
      'Urbanization: increasing % urban population',
      'UK highly urbanized (83%)',
      'Urban growth: migration, natural increase',
      'Opportunities: jobs, services, culture, innovation',
      'Challenges: housing shortage, inequality, waste, traffic, pollution',
      'Urban regeneration: improving run-down areas',
      'Sustainable cities: green space, public transport, recycling'
    ],
    explanation: 'UK 83% urban, growing through migration (national & international) and natural increase. Cities offer opportunities: employment, education, healthcare, culture, social. BUT challenges: housing shortfall (high prices), inequality (rich/poor areas), traffic congestion, air pollution, waste. Urban regeneration transforms deprived areas (e.g. East London Olympics). Sustainable cities: green spaces, public transport, renewable energy, waste recycling, brownfield development.',
    examples: [
      {
        question: 'Case study: Bristol - UK major city (12 marks)',
        workingOut: `Location: Bristol, southwest England. 465,000 population (11th largest UK city). On River Avon, near Wales.

Regional, national, international importance:
- Regional hub (shopping, services, education, culture)
- Temple Meads station (rail links), M4/M5 motorways, Bristol Airport
- Major port historically, now regenerated (Harbourside)
- Universities (Bristol, UWE) - education, research
- Aerospace (Airbus, Rolls-Royce), creative industries, finance
- Multicultural (22% ethnic minorities)

Opportunities:
Social:
- Cultural mix (St Pauls Carnival, music scene - Massive Attack, Banksy)
- Recreation (Harbourside, Ashton Court, parks)
- Education (two universities)

Economic:
- Jobs (250,000 in city) - high-tech, creative, services
- Low unemployment (4%)
- Investment attracted

Environmental:
- Green spaces (parks, Avon Gorge)
- European Green Capital 2015

Challenges:
Social:
- Housing shortage (average house £340,000, unaffordable)
- Inequality (wealthy Clifton vs deprived areas like Hartcliffe)
- Pressure on services (schools, hospitals)

Economic:
- High cost of living
- Traffic congestion (M32, city centre)
- Limited city centre parking

Environmental:
- Air pollution (diesel, NO₂ levels exceed limits)
- Urban sprawl (greenfield development)
- Waste generation

Solutions:
Housing: Urban regeneration (Temple Quarter - 10,000 new homes), brownfield development
Transport: Integrated transport (buses, trains, cycling lanes), congestion challenged, Park & Ride
Environment: Clean Air Zone 2022 (charge polluting vehicles), tree planting, recycling programs
Social: Community projects (sports, youth centers)

Evaluation: Bristol prospering BUT inequality, housing, pollution challenges remain. Sustainable growth balance needed.`,
        answer: 'Bristol: regional hub, aerospace/creative industries, universities. Opportunities: jobs, culture, green spaces. Challenges: housing (£340k), inequality, air pollution, congestion. Solutions: regeneration, Clean Air Zone, public transport.',
        explanation: '12-mark UK city = location, importance, opportunities (social/economic/environmental), challenges (3 types), solutions, evaluation. Detailed!'
      }
    ],
    practiceQuestions: [
      {
        question: 'UK urbanization rate is approximately...',
        options: ['83%', '50%', '30%', '95%'],
        answer: '83%',
        explanation: '83% of UK population lives in urban areas (highly urbanized HIC)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ UK city case study = opportunities + challenges + solutions',
      '⭐ 3 types: social, economic, environmental',
      '⭐ Specific examples (names, figures)',
      '⭐ Evaluation at end'
    ],
    commonMistakes: [
      '❌ Only challenges, no opportunities',
      '❌ No specific details (vague)',
      '❌ Missing environmental aspect',
      '❌ No solutions/management'
    ],
    examStrategy: 'UK city = biggest urban question (12 marks)! Learn ONE city thoroughly. Structure: location/importance, opportunities (3), challenges (3), solutions, evaluation. Practice!'
  },

  {
    moduleNumber: 8,
    title: 'Urban Issues: LIC/NEE City',
    duration: '90 minutes',
    introduction: 'Master urbanization in LIC/NEE! Rapid growth, migration, squatter settlements, challenges, management.',
    keyPoints: [
      'Rapid urbanization in LICs/NEEs',
      'Push-pull migration from rural areas',
      'Megacities (10 million+)',
      'Opportunities: jobs, education, healthcare',
      'Challenges: squatter settlements, lack services, pollution, crime',
      'Bottom-up schemes: self-help',
      'Top-down schemes: large-scale government'
    ],
    explanation: 'LIC/NEE cities growing rapidly - rural-urban migration (push: rural poverty, pull: urban jobs). Megacities emerging (Mumbai, Lagos, Rio). Opportunities: employment (informal sector), education, healthcare. BUT challenges: squatter settlements (slums, favelas) lack services (water, sanitation), overcrowding, pollution, crime. Management: bottom-up (self-help schemes, locals improve homes) vs top-down (government large-scale housing). Traffic management, waste collection improvements.',
    examples: [
      {
        question: 'Case study: Rio de Janeiro, Brazil - NEE city (12 marks)',
        workingOut: `Location: Rio de Janeiro, southeast Brazil. 6.7 million city, 13 million metro (2nd largest Brazil). Coast, Christ the Redeemer, Sugarloaf Mountain.

Regional, national, international importance:
- Major port (exports), industrial center (oil, steel, chemicals)
- Tourism (beaches, carnival, Christ statue) - $10bn annually
- Financial center (stock exchange)
- 2014 World Cup, 2016 Olympics host
- Cultural hub (samba, bossa nova)

Opportunities:
Social:
- Better healthcare, education than rural
- Cultural diversity
- Rio+20 Earth Summit 2012 (international profile)

Economic:
- Jobs (services 65%, industry 14%, tourism)
- NEE: rapid growth, rising incomes

Environmental:
- Beautiful natural setting (mountains, beaches)

Challenges:
Social:
- 22% live in favelas (squatter settlements) - 1,000+ favelas
- Rocinha favela (200,000 residents) - overcrowded, dangerous
- Lack clean water (12% no running water), sanitation (30% no sewage)
- Crime (drug gangs control favelas, violence)
- Inequality (rich South Zone vs poor North Zone)

Economic:
- Informal economy (30%) - unstable, no tax
- Unemployment (13%)
- Traffic congestion

Environmental:
- Air pollution (vehicles, industry)
- Water pollution (sewage in Guanabara Bay)
- Waste (30% uncollected in favelas)
- Landslides (deforestation on steep slopes)

Management:
Social:
- Favela Bairro Project (1995-2008, $1 billion)
  - Widened streets, added services (electricity, water, sanitation), built schools, clinics
  - Self-help: residents improved homes with government grants
  - Improved 250,000+ homes
  ✓ Better living conditions, community pride
  ✗ Only reached 1/3 favelas, some residents displaced (rent increased)

- Pacification (UPPs - police units in favelas since 2008)
  ✓ Reduced violent crime in some areas
  ✗ Didn't address poverty causes, some violence continues

Environmental:
- Replanting hillsides (reduce landslides)
- Guanabara Bay cleanup (sewage treatment)
- BUT progress slow, underfunded

Economic/Transport:
- Metro expansion (Olympics infrastructure)
- BRT (Bus Rapid Transit) lanes
✓ Improved access
✗ Expensive, some routes underused

Evaluation: Rio experiencing growth BUT massive inequality, favela challenges persist. Management mixed success - Favela Bairro improved lives BUT needs expansion, funding. Sustainable development requires addressing poverty roots.`,
        answer: 'Rio: 6.7m, port/tourism/industry. 22% in favelas (Rocinha 200k), lack services, crime, inequality. Favela Bairro ($1bn) improved homes, BUT only 1/3 favelas. Pacification reduced crime BUT poverty remains.',
        explanation: '12-mark LIC/NEE city = location, importance, opportunities, challenges (favelas!), management (bottom-up & top-down), evaluation. Detailed case study essential!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Squatter settlements are called _____ in Brazil',
        options: ['Favelas', 'Shanty towns', 'Slums', 'Barrios'],
        answer: 'Favelas',
        explanation: 'Favelas = Brazilian term for squatter settlements (informal housing)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ LIC/NEE city = squatter settlements central!',
      '⭐ Management = bottom-up (self-help) + top-down (government)',
      '⭐ Show why rapid growth',
      '⭐ Evaluate management success'
    ],
    commonMistakes: [
      '❌ Not explaining squatter settlement challenges',
      '❌ No management schemes',
      '❌ One-sided (only negative OR only positive)',
      '❌ No evaluation of schemes'
    ],
    examStrategy: 'LIC/NEE city = 12 marks! Need detailed case study (Rio, Mumbai, Lagos common). Emphasize squatter settlements, management schemes, evaluation. Practice!'
  },

  {
    moduleNumber: 9,
    title: 'Economic Development & Global Inequality',
    duration: '85 minutes',
    introduction: 'Master development! Measures (GNI, HDI), causes of inequality, trade, aid, TNCs.',
    keyPoints: [
      'Development = improving living standards',
      'Measures: GNI per capita (economic), HDI (health, education, income)',
      'Development gap: HICs vs LICs',
      'Causes: colonialism, geography, conflict, governance',
      'Trade: can help or hinder (commodity dependence)',
      'Aid: types (emergency, development, bilateral, multilateral)',
      'TNCs: benefits and problems'
    ],
    explanation: 'Development = improving quality of life. Measured by GNI (income per person), HDI (health, education, income - more holistic). Large gap: HICs (high GNI, HDI) vs LICs (low). Causes: historical (colonialism), physical (landlocked, climate), economic (debt), political (conflict, corruption). Trade can help (exports earn income) BUT LICs rely on commodities (prices fluctuate). Aid: short-term (emergency) vs long-term (development), can help BUT dependency, corruption. TNCs bring jobs, technology BUT may exploit workers, damage environment.',
    examples: [
      {
        question: 'Evaluate the role of TNCs in development (9 marks)',
        workingOut: `TNC = Transnational Corporation (operates in multiple countries)

Benefits to LIC/NEE:
1. Employment
   - Jobs created (e.g. Nike employs 300,000+ in Asia)
   - Wages higher than local average
   - BUT still low by HIC standards, long hours

2. Investment
   - FDI (Foreign Direct Investment) builds factories
   - Multiplier effect (supply chains, services)
   - Tax revenue for government

3. Technology transfer
   - Modern equipment, skills training
   - Boosts productivity
   - BUT may replace traditional livelihoods

4. Infrastructure
   - Roads, electricity improved for factories
   - Wider benefit to area

Problems:
1. Exploitation
   - Low wages, poor conditions (sweatshops)
   - Example: Bangladesh garment factory collapses (Rana Plaza 2013, 1,100 deaths)
   - Child labor

2. Environmental damage
   - Pollution (lax regulations in LICs)
   - Example: Shell oil spills in Niger Delta

3. Profit repatriation
   - Profits sent back to HIC headquarters
   - Little wealth stays in host country

4. Political influence
   - TNCs pressure governments for tax breaks
   - May avoid regulations

5. Economic dependency
   - Economy relies on TNC, vulnerable if pulls out

Case study: Nike in Vietnam
✓ 300,000 jobs, higher wages than average, exports
✗ Long hours, poor conditions reported, profits to USA

Evaluation: TNCs can stimulate development (jobs, investment, technology) BUT only if:
- Regulations enforced (labor rights, environment)
- Fair taxation (profits benefit host country)
- Workers protected

Without controls, TNCs exploit rather than develop. Need balance: attract investment while protecting people/environment.`,
        answer: 'TNCs: jobs, investment, technology, infrastructure. BUT exploitation, low wages, environmental damage, profit repatriation, dependency. Help IF regulated.',
        explanation: '9-mark evaluation = benefits AND problems, specific examples, make judgement (when/how TNCs help). Balanced!'
      }
    ],
    practiceQuestions: [
      {
        question: 'HDI measures...',
        options: ['Health, education, income', 'Only income', 'Only health', 'Only education'],
        answer: 'Health, education, income',
        explanation: 'HDI (Human Development Index) = composite: life expectancy, education, GNI per capita',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Development = multiple measures (not just GNI)',
      '⭐ TNCs = benefits AND problems',
      '⭐ Evaluation = when/how help',
      '⭐ Use case studies/examples'
    ],
    commonMistakes: [
      '❌ Only positive OR only negative',
      '❌ Confusing GNI and HDI',
      '❌ No evaluation/judgement'
    ],
    examStrategy: 'Development = human geography paper. Evaluation questions common (9 marks). Must show benefits AND problems. Make clear judgement!'
  },

  // Streamlined final modules
  {
    moduleNumber: 10,
    title: 'Resource Management: Water',
    duration: '80 minutes',
    introduction: 'Master water resources! Supply/demand, stress, management (dams, desalination, transfers).',
    keyPoints: [
      'Water stress: demand exceeds supply',
      'Causes: population growth, economic development, climate change',
      'Water deficit: supply < demand',
      'Water surplus: supply > demand',
      'Management: dams, reservoirs, desalination, water transfer, conservation',
      'Large-scale schemes: benefits and problems'
    ],
    explanation: 'Global water supply uneven. Some areas surplus (wet climates, low population), others deficit (dry, high population). Water stress increasing: population growth (more people), economic development (industry, irrigation), climate change (droughts). Management: dams/reservoirs (store water), desalination (salt water → fresh, expensive), water transfer (move from surplus to deficit areas), conservation (efficient use). Large schemes pros (reliable supply) and cons (environmental damage, cost, displacement).',
    examples: [
      {
        question: 'Case study: Water management - Three Gorges Dam, China (9 marks)',
        workingOut: `Location: Yangtze River, China (world's 3rd longest river). Hubei Province.

Scale: World's largest hydroelectric dam. 2,335m long, 185m high. Reservoir 600km long.

Reasons:
- Water supply (450 million people downstream)
- Flood control (Yangtze floods killed 300,000 in 20th century)
- Hydroelectric power (22,500 MW - 11 nuclear power stations equivalent!)
- Navigation (ships can now reach inland cities)

Benefits:
Economic:
- 11% China's hydroelectricity (renewable, clean)
- Flood protection saves billions
- Improved navigation (trade, tourism)

Social:
- Jobs (construction, maintenance, tourism)
- Reliable water supply

Environmental:
- Clean energy (replaces coal - reduces CO₂)
- Flood control protects farmland

Problems:
Social:
- 1.4 million people displaced (villages flooded)
- Cultural sites submerged (archaeologicial heritage lost)
- Compensation inadequate

Economic:
- $30 billion cost
- Maintenance expensive

Environmental:
- Reservoir filled = landslides (sediment instability)
- River ecology damaged (Chinese river dolphin extinct, fish migration blocked)
- Sediment trapped (not reaching farmland downstream = less fertile)
- Reservoir slowed flow = pollution concentrated
- Earthquake risk (pressure from reservoir weight)

Evaluation: Massive benefits (energy, flood control, water supply) BUT huge environmental and social costs. Sustainability questionable - ecological damage severe, displaced people suffered. Shows tension: large-scale development vs. environment/communities.`,
        answer: 'Three Gorges: 22,500MW clean energy, flood control, water supply. BUT 1.4m displaced, species extinct, landslides, sediment trapped, $30bn cost.',
        explanation: '9-mark water scheme = scale, reasons, benefits (economic/social/environmental), problems, evaluation. Show both sides!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Water stress means...',
        options: ['Demand exceeds supply', 'Too much water', 'Water pollution', 'No water at all'],
        answer: 'Demand exceeds supply',
        explanation: 'Water stress = demand for water exceeds available supply',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Water case study = large-scale scheme',
      '⭐ Show benefits (3 types) AND problems',
      '⭐ Evaluation = sustainable?'
    ],
    commonMistakes: [
      '❌ Only benefits OR only problems',
      '❌ Vague case study',
      '❌ No evaluation'
    ],
    examStrategy: 'Resource management = choose water, energy, OR food. 9-mark case study: large-scale scheme, benefits/problems, evaluation!'
  },

  {
    moduleNumber: 11,
    title: 'Resource Management: Energy',
    duration: '75 minutes',
    introduction: 'Master energy resources! Fossil fuels, renewables, energy security, sustainability.',
    keyPoints: [
      'Energy mix: fossil fuels (coal, oil, gas) vs. renewables (solar, wind, hydro, nuclear)',
      'Fossil fuels: non-renewable, emit CO₂, but reliable',
      'Renewables: clean, sustainable, but expensive, intermittent',
      'Energy security: reliable supply',
      'UK energy mix changing: coal declining, renewables increasing',
      'Large-scale schemes: benefits and problems'
    ],
    explanation: 'Energy demand rising. Fossil fuels (coal, oil, gas) dominant but non-renewable, cause climate change. Renewables (solar, wind, hydro, nuclear) clean but challenges (cost, reliability, visual impact). Energy security = reliable, affordable supply. HICs shifting to renewables, LICs still reliant on fossil fuels (cost). UK energy mix: coal phased out, gas still high, renewables growing (wind, solar), nuclear debated. Large schemes (e.g. fracking, windfarms) have pros (energy supply) and cons (environment, NIMBY).',
    examples: [
      {
        question: 'Evaluate the use of fracking for energy (6 marks)',
        workingOut: `Fracking = hydraulic fracturing (extracting shale gas from underground rocks)

Benefits:
1. Energy security
   - Reduces reliance on imports (e.g. Russian gas)
   - Domestic supply more secure
   
2. Economic
   - Jobs created (drilling, processing)
   - Tax revenue
   - Cheaper energy (shale gas abundant)
   
3. Transition fuel
   - Gas cleaner than coal (50% less CO₂)
   - Bridge to full renewables

Problems:
1. Environmental
   - Earthquakes (small tremors from fracturing)
   - Water contamination risk (chemicals used)
   - Methane leaks (greenhouse gas)
   - Visual impact (drilling rigs)
   
2. Social
   - Local opposition (noise, traffic, pollution fears)
   - NIMBY attitudes
   - Health concerns
   
3. Sustainability
   - Still fossil fuel (non-renewable, emits CO₂)
   - Distracts from renewable investment
   - Climate change commitments (Paris Agreement)

Case: Fracking in UK suspended 2019 after earthquakes (Blackpool). Public opposition strong.

Evaluation: Fracking offers energy security, economic benefits BUT environmental risks, still fossil fuel. Better to invest in renewables for long-term sustainability. Fracking = short-term fix, not solution.`,
        answer: 'Fracking: energy security, jobs, cleaner than coal. BUT earthquakes, water contamination, still fossil fuel, hinders renewables. Short-term fix, not sustainable.',
        explanation: '6-mark evaluation = benefits, problems, judgement. Show both sides, make clear position!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Renewable energy includes...',
        options: ['Solar, wind, hydro', 'Coal, oil, gas', 'Only nuclear', 'Fracking'],
        answer: 'Solar, wind, hydro',
        explanation: 'Renewable = replenished naturally: solar, wind, hydro, biomass, geothermal',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Energy case study = renewable OR fossil fuel scheme',
      '⭐ Sustainability key concept',
      '⭐ Show advantages AND disadvantages'
    ],
    commonMistakes: [
      '❌ One-sided evaluation',
      '❌ Not discussing sustainability',
      '❌ No specific case study'
    ],
    examStrategy: 'Energy = resource management option. Evaluation questions (6-9 marks). Must show benefits AND problems, make judgement!'
  },

  {
    moduleNumber: 12,
    title: 'Resource Management: Food',
    duration: '75 minutes',
    introduction: 'Master food security! Supply/demand, malnutrition, sustainable farming, food miles.',
    keyPoints: [
      'Food security: enough affordable, nutritious food',
      'Food insecurity: hunger, malnutrition',
      'Causes: poverty, climate change, conflict, population growth',
      'Intensive farming: high yields, but environmental damage',
      'Organic farming: sustainable, but lower yields',
      'Local food: reduces food miles',
      'Sustainable solutions: agroforestry, permaculture, urban farming'
    ],
    explanation: 'Food security = sufficient, safe, nutritious food for all. 800 million food insecure. Causes: poverty (can\'t afford), climate change (droughts, floods), conflict (disrupts farming), population growth (more mouths). Intensive farming increases yields (fertilizers, pesticides) BUT pollutes, degrades soil. Organic sustainable BUT lower yields, expensive. Food miles: distance food travels, high environmental cost. Solutions: agroforestry (trees + crops), permaculture (self-sustaining), urban farming (local production), reducing waste.',
    examples: [
      {
        question: 'Case study: Sustainable farming - Almería, Spain (6 marks)',
        workingOut: `Location: Almería, southeast Spain. Semi-arid climate (200mm rain annually).

Development: Intensive greenhouse farming. 26,000 hectares plastic greenhouses ("Sea of Plastic" - visible from space!).

Methods:
- Hydroponics (soil-less, nutrient solution)
- Drip irrigation (efficient water use)
- Integrated pest management (biological, reduces pesticides)
- Year-round production (controlled environment)

Benefits:
Economic:
- €1.5 billion annually (20% Spain's exports)
- 100,000 jobs
- Fresh food to Europe year-round

Social:
- Employment (locals + migrants)
- Transformed poor region

Environmental:
- Efficient water use (drip irrigation)
- Some IPM reduces chemicals

Problems:
Environmental:
- Plastic waste (10,000 tonnes annually)
- Water stress (aquifers depleted)
- Soil degradation (high fertilizer use)
- Visual impact

Social:
- Migrant workers (poor conditions, low pay)
- Intensive labor

Economic:
- Reliance on export markets (vulnerable)

Sustainability:
Partly sustainable (efficient irrigation, IPM) BUT plastic waste, water depletion, worker exploitation issues remain.

Evaluation: Transformed region economically BUT environmental and social costs. More sustainable than traditional intensive BUT not fully sustainable (plastic, water).`,
        answer: 'Almería: 26,000 ha greenhouses, hydroponics, drip irrigation. €1.5bn, 100k jobs. BUT plastic waste, water depletion, worker exploitation. Partly sustainable.',
        explanation: '6-mark food case study = methods, benefits, problems, sustainability evaluation. Show both sides!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Food security means...',
        options: ['Enough affordable, nutritious food for all', 'Too much food', 'Only organic food', 'No imports'],
        answer: 'Enough affordable, nutritious food for all',
        explanation: 'Food security = sufficient, safe, affordable, nutritious food for population',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Food case study = sustainable farming example',
      '⭐ Show economic, social, environmental',
      '⭐ Evaluate sustainability'
    ],
    commonMistakes: [
      '❌ Only benefits OR only problems',
      '❌ Not discussing sustainability',
      '❌ No specific case study'
    ],
    examStrategy: 'Food = resource management option. Case study (6-9 marks): sustainable farming, benefits, problems, evaluation!'
  },

  {
    moduleNumber: 13,
    title: 'Geographical Skills: Fieldwork',
    duration: '60 minutes',
    introduction: 'Master fieldwork! Enquiry question, data collection, presentation, analysis, conclusion.',
    keyPoints: [
      'Fieldwork = hands-on data collection',
      'Enquiry question: clear, geographical',
      'Primary data: collect yourself (surveys, measurements)',
      'Secondary data: others collected (census, maps)',
      'Sampling: random, systematic, stratified',
      'Data presentation: graphs, maps, photos',
      'Analysis: describe patterns, explain',
      'Evaluation: reliability, improvements'
    ],
    explanation: 'GCSE requires two fieldwork investigations (one physical, one human). Process: 1) Enquiry question, 2) Risk assessment, 3) Data collection (primary & secondary), 4) Presentation (graphs, maps), 5) Analysis (patterns, explanations), 6) Conclusion (answer question), 7) Evaluation (what went well/badly, improvements). Exam tests: knowledge of your fieldwork, skills (OS maps, graphs), application to unfamiliar contexts.',
    examples: [
      {
        question: 'Example fieldwork: Does river velocity increase downstream? (Methods, 6 marks)',
        workingOut: `Enquiry question: Does river velocity increase downstream on River [Name]?

Hypothesis: Velocity increases downstream (theory: more discharge, channel efficiency).

Location: River [Name], three sites (upper, middle, lower course).

Primary data collection:
1. Velocity measurement:
   - Method: Float method
   - Throw orange/tennis ball, time over 10m
   - Repeat 3 times (average = more reliable)
   - Calculate: velocity = distance ÷ time (m/s)

2. River width:
   - Tape measure across river at each site
   
3. River depth:
   - Meter ruler at 5 points across river
   - Calculate average depth

4. Site characteristics:
   - Photos
   - Field sketch
   - Notes (vegetation, pollution, rocks)

Secondary data:
- OS map (identify sites, calculate distance between)
- Weather data (check if recent rain affected flow)

Sampling:
- 3 sites (systematic - equal distance apart)
- 3 repeats at each (reliability)

Risk assessment:
- Slippery rocks (wellies, buddy system)
- Deep water (stay at edge, avoid after rain)
- Cold (waterproof clothing)
- Permission (landowner, adult supervision)

Data presentation:
- Line graph (velocity vs. distance downstream)
- Bar chart (width, depth)
- Photos annotated
- Map showing sites

Analysis:
Describe: "Velocity increased from 0.5 m/s at Site 1 to 1.2 m/s at Site 3."
Explain: "Increased discharge downstream = deeper, wider channel = less friction = faster flow."

Conclusion: Hypothesis supported - velocity increased downstream.

Evaluation:
✓ Clear method, repeated measurements
✗ Only 3 sites (small sample)
✗ Float method inaccurate (surface velocity, not average)
Improvements: Use flow meter (more accurate), more sites, repeat on different days (check consistency).`,
        answer: 'Enquiry question → risk assessment → float method (3 repeats) at 3 sites → measure width/depth → photos → analyze patterns → conclusion',
        explanation: '6-mark fieldwork methods = enquiry question, data collection (detail!), sampling, risk assessment. Clear, specific!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Primary data is...',
        options: ['Data you collect yourself', 'Data others collected', 'Only from books', 'Only from internet'],
        answer: 'Data you collect yourself',
        explanation: 'Primary = first-hand (you collect). Secondary = others collected.',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Fieldwork = enquiry process (question → collect → present → analyze → conclude → evaluate)',
      '⭐ Exam asks about YOUR fieldwork (know it well!)',
      '⭐ Evaluation = what worked, what didn\'t, improvements',
      '⭐ Also tests fieldwork skills on UNFAMILIAR contexts'
    ],
    commonMistakes: [
      '❌ Vague methods ("measured river")',
      '❌ No evaluation',
      '❌ Not answering enquiry question in conclusion',
      '❌ No risk assessment mentioned'
    ],
    examStrategy: 'Fieldwork = exam section worth ~15 marks! Know YOUR two investigations (physical, human). Practice: methods, presentation, analysis, evaluation. Also practice applying skills to unfamiliar fieldwork!'
  },

  {
    moduleNumber: 14,
    title: 'Geographical Skills: OS Maps & Graphs',
    duration: '75 minutes',
    introduction: 'Master map skills! OS map symbols, grid references, scale, distance, cross-sections, graph interpretation.',
    keyPoints: [
      'OS map scale: 1:25,000 (4cm = 1km) or 1:50,000 (2cm = 1km)',
      'Grid references: 4-figure (1km square), 6-figure (100m accurate)',
      'Symbols: blue (water), green (vegetation), black (man-made)',
      'Contour lines: height above sea level, close together = steep',
      'Cross-sections: side view showing relief',
      'Graphs: line, bar, pie, scatter, flow',
      'Photo interpretation: identify features'
    ],
    explanation: 'OS maps show landscape features. Scale: 1:50,000 (1cm on map = 0.5km real life). 4-figure reference locates 1km square (e.g. 2341), 6-figure pinpoints to 100m (e.g. 234417). Contours show height (close = steep, far apart = gentle). Blue = rivers/lakes, green = woods, black = roads/buildings. Measure distance with string, multiply by scale. Draw cross-section by marking heights, plotting graph. Photos: identify features using map (church, roads, fields). Graphs: choose appropriate type (line for trends, bar for categories, pie for proportions, scatter for correlation).',
    examples: [
      {
        question: 'OS Map Skills Example (Use map extract - not provided here, but common Q type)',
        workingOut: `Common OS map questions:

1. "Give the 6-figure grid reference for the church." (2 marks)
   - Find church symbol (†)
   - Read Eastings (left to right): e.g. 23, estimate tenths (4)
   - Read Northings (bottom to top): e.g. 41, estimate tenths (7)
   - Answer: 234417 (Eastings first!)

2. "Measure the distance along the road from X to Y." (2 marks)
   - Use string/edge of paper, follow road
   - Mark start and end
   - Measure against scale
   - e.g. 5cm on map, scale 1:50,000 (2cm = 1km)
   - 5cm ÷ 2 = 2.5 km
   - Answer: 2.5 km (or 2500m)

3. "Describe the relief between A and B." (3 marks)
   - Check contour values and spacing
   - Example answer: "Land rises from 50m at A to 150m at B (100m increase). Contours close together around grid 23 41 indicating steep slope (valley side). Flatter land at B (contours far apart)."
   - Need: height change, steepness, evidence (contours, grid ref)

4. "Identify land use in square 2341." (3 marks)
   - Check symbols in square
   - Example: "Mixed farmland (field patterns), deciduous woodland (green with tree symbols in northeast), minor road crosses square east-west, scattered buildings (black dots) suggest rural settlement."
   - Need: land uses, evidence (symbols, patterns), locations within square

Tips:
- ALWAYS give 6-figure references (never 4-figure for specific point)
- Eastings before Northings ("along corridor, up stairs")
- Show working for distance measurements
- Use evidence (grid refs, symbols) in descriptions`,
        answer: 'See worked examples for grid references, distance, relief, land use',
        explanation: 'OS map questions = 2-4 marks each. Need accurate references, evidence, geographical vocabulary!'
      },
      {
        question: 'Graph Skills: Interpret scatter graph (4 marks)',
        workingOut: `Question: "Describe the relationship shown in the scatter graph between GNI per capita and infant mortality rate."

Graph shows: As GNI increases (x-axis), infant mortality decreases (y-axis)

Good answer structure:
1. Overall pattern:
   "The graph shows a negative correlation between GNI per capita and infant mortality rate."

2. Describe detail:
   "Countries with low GNI (below $5,000) have high infant mortality (50-100 per 1,000 births). As GNI increases, infant mortality falls rapidly. Countries with high GNI (above $30,000) have very low infant mortality (below 10 per 1,000)."

3. Anomalies (if any):
   "There is one anomaly: Country X has high GNI but higher-than-expected infant mortality (possible reasons: inequality, poor healthcare distribution)."

4. Use data:
   - Quote specific values from graph
   - Identify patterns
   - Note exceptions

Types of correlation:
- Positive: both increase together
- Negative: one increases, other decreases
- No correlation: scattered randomly

Graph types:
- Line graph: show trends over time
- Bar chart: compare categories
- Pie chart: show proportions (percentages)
- Scatter: show relationships between two variables
- Flow line: show movement (width = volume)`,
        answer: 'Describe correlation (positive/negative/none), use data from graph, explain pattern, note anomalies',
        explanation: '4-mark graph question = describe pattern + use data + explain + anomalies. Specific values essential!'
      }
    ],
    practiceQuestions: [
      {
        question: 'On OS maps, contour lines close together indicate...',
        options: ['Steep slope', 'Flat land', 'Water', 'Forest'],
        answer: 'Steep slope',
        explanation: 'Contours close together = steep. Far apart = gentle/flat.',
        difficulty: 'easy'
      },
      {
        question: '6-figure grid reference is accurate to...',
        options: ['100m', '1km', '10m', '10km'],
        answer: '100m',
        explanation: '4-figure = 1km square. 6-figure = 100m accurate (divide square into tenths).',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ Grid references: Eastings first (along), then Northings (up)',
      '⭐ 6-figure for specific points, 4-figure for areas',
      '⭐ Distance: use string, measure against scale',
      '⭐ Graphs: quote specific data, describe patterns',
      '⭐ Practice OS maps and graphs frequently!'
    ],
    commonMistakes: [
      '❌ Northings before Eastings',
      '❌ 4-figure when should be 6',
      '❌ No data quoted from graphs',
      '❌ Vague descriptions ("it goes up")',
      '❌ Not using map evidence'
    ],
    examStrategy: 'Skills = ~30% of exam marks! OS maps (6-10 marks), graphs (4-6 marks), photos (2-4 marks). Practice regularly - easy marks if you know how!'
  },

  {
    moduleNumber: 15,
    title: 'Issue Evaluation & Exam Technique',
    duration: '70 minutes',
    introduction: 'Master the Issue Evaluation! Pre-release booklet, decision-making, justification, exam technique.',
    keyPoints: [
      'Issue Evaluation = decision-making paper (varies by board)',
      'Pre-release booklet: read 12 weeks before exam',
      'Geographical issue (development, environment, etc.)',
      'Sources: maps, graphs, articles, photos',
      'Analyze sources, consider options, make decision',
      'Justify choice (pros, cons, why best)',
      'Synoptic: uses knowledge from whole course'
    ],
    explanation: 'Issue Evaluation (AQA Paper 3, similar other boards): decision-making based on pre-release booklet (available 12 weeks before exam). Real-world geographical issue (e.g. coastal management, urban regeneration). Booklet has sources: OS maps, data, articles, photos. Exam questions: interpret sources, analyze options, make justified decision. Synoptic = draws on all topics (physical, human, skills). Key: show geographical understanding, evaluate options, justify decision with evidence.',
    examples: [
      {
        question: 'Issue Evaluation Structure: "Which option for [managing X] is best?" (9 marks)',
        workingOut: `Structure for decision question:

Introduction (1 paragraph):
- State your chosen option clearly
- Brief reason

Main body (3-4 paragraphs):
Paragraph 1: Benefits of chosen option
- Economic advantages
- Social benefits
- Environmental positives
- Use evidence from booklet (figures, quotes, maps)

Paragraph 2: Problems with chosen option (BALANCE!)
- Acknowledge disadvantages
- Economic costs
- Social issues
- Environmental concerns
- Show you understand it's not perfect

Paragraph 3: Why OTHER options worse
- Briefly explain alternatives
- Show their disadvantages
- Explain why your option still better

Paragraph 4 (if time): Wider context
- Link to case studies from course
- Similar projects elsewhere
- Sustainability considerations

Conclusion:
- Restate choice
- Overall justification
- "On balance, Option X is best because [main reason] despite [main problem]."

Key principles:
✓ Use evidence from booklet (quote figures, reference sources)
✓ Balanced (show pros AND cons of your choice)
✓ Compare options (why yours better)
✓ Geographical terminology
✓ Link to course knowledge (case studies, concepts)
✓ Clear decision with justification

Example (coastal management):
"Option 3 (managed retreat) is the best solution for Fairbourne.

Economically, managed retreat is most cost-effective. The booklet states sea walls would cost £5 million with ongoing maintenance, whereas managed retreat requires only £1 million to relocate residents. With limited council budgets (Source C), this is significant.

Environmentally, managed retreat is sustainable. Creating salt marsh (Source B diagram) provides natural coastal defense and wildlife habitat, supporting biodiversity. This aligns with UK climate change adaptation strategy.

However, managed retreat has serious social costs. 450 residents must relocate (Source A), losing homes and community ties. This is traumatic and may face local opposition, as the article mentions (Source D).

Despite this, other options are worse. Hard engineering (Option 1) is expensive, damages environment, and only delays inevitable (sea level rising 2mm/year - Source E). Beach nourishment (Option 2) is temporary, requires repeating.

Managed retreat is controversial but most sustainable long-term. Similar projects like Medmerry (class case study) show it can create valuable habitat. On balance, managed retreat is best because it's economically viable and environmentally beneficial, despite social challenges that must be managed sensitively through adequate compensation and community support."

(305 words - appropriate for 9-mark question with time pressure)`,
        answer: 'State decision → benefits of choice → acknowledge problems → compare to alternatives → conclusion. Use booklet evidence, balance, justify!',
        explanation: '9-mark decision = your choice + justification. MUST show: evidence, balance (pros & cons), comparison, geographical knowledge!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Issue Evaluation pre-release booklet is available...',
        options: ['12 weeks before exam', '1 day before', 'Only in exam', '1 year before'],
        answer: '12 weeks before exam',
        explanation: 'Pre-release booklet available 12 weeks before exam - use time to study it!',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Read booklet thoroughly, multiple times',
      '⭐ Annotate sources (highlight key data)',
      '⭐ Practice decision questions',
      '⭐ Use evidence from booklet (quote, reference sources)',
      '⭐ ALWAYS balanced (pros & cons)',
      '⭐ Link to course knowledge (case studies)',
      '⭐ Clear decision with justification'
    ],
    commonMistakes: [
      '❌ Not reading booklet beforehand',
      '❌ One-sided (only pros OR only cons)',
      '❌ No evidence from booklet',
      '❌ No comparison of options',
      '❌ Vague ("it\'s good") - need specific reasons',
      '❌ No clear decision'
    ],
    examStrategy: `**GEOGRAPHY EXAM STRATEGY:**

**Papers (varies by board, e.g. AQA):**
- Paper 1: Physical (88 marks, 1h30m) - Rivers, coasts, weather, tectonic, ecosystems
- Paper 2: Human (88 marks, 1h30m) - Urban, economic, resources, fieldwork
- Paper 3: Issue Evaluation (76 marks, 1h15m) - Pre-release booklet, decision-making

**Question Types:**
- Feature/describe (1-3 marks): Brief, use evidence
- Explain (4-6 marks): Reasons, geographical processes
- Case study (6-12 marks): Named example, detailed, specific
- Evaluate/assess (6-9 marks): Both sides, judgement
- Decision (9 marks): Choice, justify, balance

**Time Management:**
~1 minute per mark (e.g. 6-mark Q = 6 mins)

**Case Studies:**
Learn thoroughly:
- UK city (12 marks!)
- LIC/NEE city (12 marks!)
- Tropical rainforest
- Tectonic (HIC & LIC)
- Weather (tropical storm, UK extreme)
- Resource management (1 of water/energy/food)

Must include: location, specific facts/figures, pros & cons

**Skills:**
- OS maps (grid refs, distance, relief): 6-10 marks
- Graphs (describe, interpret): 4-6 marks
- Fieldwork (your own): ~15 marks total

Practice weekly!

**Essay/Decision Structure:**
1. Introduction (state answer)
2. Point 1 + evidence
3. Point 2 + evidence
4. Counter-argument (balance!)
5. Evaluation
6. Conclusion (clear judgement)

**Evidence:**
- Quote figures from resources
- Use geographical terms
- Reference case studies
- Cite sources ("Source A shows...")

**Command Words:**
- Describe: What you see
- Explain: Reasons WHY
- Assess/Evaluate: Both sides + judgement
- To what extent: How much? (scaled judgement)

**Success Formula:**
📍 Specific case studies (names, figures, locations)
📊 Use data (from sources, your knowledge)
⚖️ Balance (pros & cons, different views)
🎯 Answer the question (clear conclusion)
📐 Practice skills (maps, graphs, fieldwork)

You've mastered GCSE Geography! 🌍`
  }
];

export default gcseGeographyContent;

