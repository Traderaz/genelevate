/**
 * Life Skills: Cultural Capital & High Net Worth Communication
 * 
 * Comprehensive module teaching students how to build cultural capital,
 * communicate confidently with high net worth individuals, navigate elite
 * social settings, and develop social intelligence for success.
 * 
 * Designed to democratize access to "soft skills" often learned in
 * private schools and wealthy families.
 */

export interface LifeSkillsContent {
  moduleNumber: number;
  title: string;
  duration: string;
  introduction: string;
  keyPoints: string[];
  mainContent: {
    section: string;
    content: string;
    examples?: string[];
    activities?: string[];
  }[];
  realWorldExamples: {
    title: string;
    description: string;
    keyLessons: string[];
  }[];
  practicalExercises: {
    exercise: string;
    instructions: string;
    expectedOutcome: string;
  }[];
  tipsAndTricks: string[];
  commonMistakes: string[];
  nextSteps: string[];
}

export const culturalCapitalContent: LifeSkillsContent = {
  moduleNumber: 2,
  title: 'Cultural Capital & High Net Worth Communication',
  duration: '150 minutes',
  introduction: 'Master the unwritten rules of elite social circles! This module teaches you cultural capital - the knowledge, behaviors, and social skills that open doors to opportunities. Learn how to communicate confidently with high net worth individuals, navigate business and social settings, understand dining etiquette, build powerful networks, and develop the social intelligence that creates success in any environment.',
  
  keyPoints: [
    '💎 What Cultural Capital Is and Why It Matters',
    '🗣️ How to Speak to High Net Worth Individuals with Confidence',
    '🍽️ Dining Etiquette & Business Meals',
    '👔 Dress for Success - Professional Image',
    '🤝 Networking Strategies for Elite Circles',
    '📧 Email & Written Communication Standards',
    '🎭 Social Intelligence & Reading Rooms',
    '🌍 International Business Customs & Cultural Awareness',
    '💬 Small Talk & Conversation Skills',
    '🎯 Executive Presence & Gravitas'
  ],

  mainContent: [
    {
      section: '1. Understanding Cultural Capital',
      content: `Cultural capital is the collection of knowledge, behaviors, and skills that signal education, sophistication, and belonging to elite circles. It's often invisible if you have it and an obvious barrier if you don't.

**What is Cultural Capital?**

French sociologist Pierre Bourdieu identified three types:

**1. Embodied Cultural Capital** (What you know & how you behave)
- Knowledge of arts, literature, current affairs
- Manners, etiquette, social graces
- How you speak, carry yourself, interact
- Tastes, preferences, cultural references

**2. Objectified Cultural Capital** (What you own)
- Books, art, musical instruments
- Educational materials and resources
- Quality clothing and accessories
- Symbols of refinement

**3. Institutional Cultural Capital** (Credentials)
- Degrees from prestigious universities
- Certifications and qualifications
- Memberships in professional organizations
- Awards and recognitions

**Why Cultural Capital Matters:**

🚪 **Opens Doors**
- Job interviews: hiring managers assess "fit" (often cultural signals)
- Business opportunities: investors back people who "speak their language"
- Social access: invitations to events, introductions, networks

💼 **Career Advancement**
- 85% of jobs filled through networking (not job boards)
- Promotions often go to those with "executive presence"
- Cultural fit matters as much as competence

🤝 **Trust & Rapport**
- Shared cultural references build instant connection
- Similar communication styles create comfort
- Understanding unwritten rules prevents social mistakes

💰 **Economic Benefits**
- Higher salaries correlated with cultural capital
- Business deals happen in social settings
- Access to information about opportunities

**The Good News:**

Cultural capital can be LEARNED. It's not about changing who you are - it's about gaining fluency in different social contexts. Think of it as learning a new language.

**Key Mindset:**

✅ "I'm learning to navigate different social contexts"
✅ "These are skills I can develop"
✅ "I'm adding to my toolkit, not replacing my identity"

❌ "I have to become someone I'm not"
❌ "This is fake or inauthentic"
❌ "Rich people are just better at this"

**Cultural Capital is NOT:**

- Being fake or abandoning your roots
- Looking down on your background
- Only about wealth and status
- Fixed or unchangeable

**Cultural Capital IS:**

- Strategic social competence
- Understanding context and adapting communication
- Building bridges across different worlds
- Expanding your range and versatility`,

      examples: [
        '**Barack Obama**: Born to single mother, raised by grandparents, mixed-race background. Through education (Columbia, Harvard Law), reading widely, observing elite spaces, and deliberate practice, developed exceptional cultural capital. Became President. Key: He could speak to both working-class communities and Wall Street boardrooms.',
        '**Oprah Winfrey**: Grew up in poverty in Mississippi. Through voracious reading, observation, and intentional learning, built massive cultural capital. Can interview billionaires and everyday people with equal skill. Built media empire worth $2.5 billion.',
        '**Priyanka Chopra**: Bollywood actress who learned Western cultural codes, studied accents, networking, Hollywood social dynamics. Now global star, entrepreneur, married to Nick Jonas. Bridges Indian and Western cultures seamlessly.'
      ],

      activities: [
        '**Cultural Capital Audit**: Rate yourself 1-10 on: Knowledge of current affairs, dining etiquette, professional email writing, small talk skills, dress sense, networking ability. Identify your top 3 areas to develop.',
        '**Observation Exercise**: Watch interviews with successful people (60 Minutes, Charlie Rose, Lex Fridman). Note: How do they speak? Body language? What do they reference? How do they handle difficult questions?',
        '**Read Widely**: This month, read one business magazine (Economist, Financial Times), one literary work, and one biography of someone successful. Notice cultural references and knowledge.'
      ]
    },

    {
      section: '2. Communicating with High Net Worth Individuals',
      content: `High net worth individuals (HNWIs) - people with significant wealth and influence - respond to specific communication styles. Master these principles to engage confidently with anyone, regardless of their status or wealth.

**Core Principles:**

**1. Confidence Without Arrogance**

HNWIs respect confidence but despise arrogance.

✅ **Confident:**
- Make eye contact
- Firm handshake
- Clear, articulate speech
- Ask thoughtful questions
- Share your perspective with conviction

❌ **Arrogant:**
- Dominating conversation
- Name-dropping constantly
- Talking about how rich/smart you are
- Interrupting or dismissing others
- Trying too hard to impress

**The difference**: Confidence serves the conversation. Arrogance serves the ego.

**2. Value Their Time**

Successful people's time is extremely valuable ($1,000+ per hour).

**How to Respect Their Time:**
- Be punctual (10 minutes early = on time)
- Prepare thoroughly before meetings
- Get to the point quickly (no rambling)
- Have clear ask/objective
- End meetings early if possible (they'll remember)

**Email Example:**

❌ **Bad:**
"Hi! Hope you're having a great day! I've been following you for years and love your work! I'm a student and I was wondering if maybe you might have time to chat sometime about business? Let me know when works for you! Thanks so much!"

✅ **Good:**
"Hi [Name],

I'm [Your Name], a student passionate about [field]. I'm researching [specific topic] and would value your insight given your experience with [specific achievement].

Would you have 15 minutes for a call on [Date Option 1] or [Date Option 2]?

Happy to work around your schedule.

Best,
[Your Name]"

Why it's better: Specific, clear ask, respects time, shows preparation

**3. Focus on Value Exchange**

Never approach with pure "take" energy. Always offer value.

**What you can offer:**
- Fresh perspective (you're closer to youth markets)
- Technical skills (social media, design, coding)
- Research or assistance
- Genuine enthusiasm and energy
- Connection to communities they can't reach

**Framework:**
"How can I help?" before "Can you help me?"

**4. Ask Intelligent Questions**

Quality questions demonstrate:
- You've done research
- You think strategically
- You value their expertise specifically

❌ **Generic Questions:**
- "How did you become successful?"
- "What advice do you have for young people?"
- "How do I make money?"

✅ **Specific Questions:**
- "I read you pivoted your company in 2018. How did you recognize that was necessary?"
- "Your approach to [specific strategy] is different from conventional wisdom. What led you to that insight?"
- "What would you do differently if starting today with current market conditions?"

**5. Demonstrate Preparation**

Research before any interaction:
- Recent news about their company
- Their background (LinkedIn, interviews, articles)
- Their interests and values
- Mutual connections
- Industry trends affecting them

**Opening that shows preparation:**
"I saw your company just expanded to [market]. Given [trend], how are you thinking about [challenge]?"

VS

"So... what does your company do?"

**6. Confident Body Language**

Non-verbal communication matters as much as words:

✅ **Strong Body Language:**
- Stand/sit up straight
- Maintain eye contact (3-5 seconds at a time)
- Firm handshake (not bone-crushing)
- Open posture (arms uncrossed)
- Genuine smile
- Take up appropriate space (not hunched)

❌ **Weak Body Language:**
- Looking at floor/phone
- Hunched shoulders
- Limp handshake
- Crossed arms (defensive)
- Nervous fidgeting
- Taking up minimal space

**7. Match Their Communication Style**

High net worth individuals often communicate in specific ways:

**Characteristics:**
- **Direct**: Get to point quickly
- **Results-focused**: Care about outcomes
- **Time-conscious**: Value efficiency
- **Analytical**: Appreciate data/evidence
- **Strategic**: Think long-term

**How to match:**
- Bottom-line first (conclusion, then details)
- Use numbers and specifics
- Respect time limits
- Show you think strategically
- Be decisive, not wishy-washy

**8. Treat Them as People, Not Status Symbols**

Wealthy people interact with:
- People who want something
- People who are intimidated
- People who treat them as ATMs

**They appreciate people who:**
- Are genuine and authentic
- Treat them normally
- Are interested in them as people (not just their money)
- Challenge them intellectually
- Share interesting perspectives

**The Secret:**
Respect their achievements without being starstruck. Engage intellectually without being sycophantic.`,

      examples: [
        '**Warren Buffett Communication Style**: Famously accessible despite being worth $100B+. Prefers simple language, Midwestern honesty, folksy stories with deep wisdom. When meeting Buffett, people who do well: Skip financial jargon, be authentic, ask about business fundamentals, share honest opinions. Those who fail: Try too hard to impress with fancy terms, are sycophantic, don\'t have opinions.',
        '**Richard Branson Approach**: Very casual, approachable style despite immense wealth. Values bold ideas, adventure, fun. Meeting Branson: Be enthusiastic, share creative ideas, be authentic, don\'t take yourself too seriously. He\'s tested people by having them call him "Richard" not "Mr. Branson" - those who relax and engage normally build rapport.',
        '**Student Success - Jake, Age 17**: Wanted to connect with successful entrepreneur at conference. Instead of pitching idea, Jake asked about entrepreneur\'s biggest current challenge. Entrepreneur appreciated the interest. They discussed problem together. Jake followed up with article about solution. Entrepreneur became mentor, eventually invested in Jake\'s startup.'
      ],

      activities: [
        '**Communication Audit**: Record yourself (phone video) having a conversation. Watch it. Rate: Eye contact, posture, clarity of speech, confidence level, listening quality. What needs improvement?',
        '**Email Practice**: Write 3 emails to successful people you admire. Ask for 15-minute call. Follow the framework above. Send them. Learn from responses (or lack thereof - that\'s data too!).',
        '**Question Bank**: Create list of 20 intelligent questions you could ask successful people in your field of interest. Practice asking them naturally (record yourself). Make them specific, researched, thoughtful.'
      ]
    },

    {
      section: '3. Dining Etiquette & Business Meals',
      content: `Many important business conversations happen over meals. Knowing proper dining etiquette prevents awkward moments and signals sophistication.

**Why Dining Etiquette Matters:**

- Business deals often discussed over meals
- Social dinners are common in professional settings
- Poor etiquette is distracting and memorable (for wrong reasons)
- Proper etiquette becomes invisible (allowing focus on conversation)

**The Basics:**

**1. Table Setting Knowledge**

Looking at your place setting:

**Silverware:**
- **Forks on left** (use from outside in)
- **Knives and spoons on right**
- **Dessert utensils** at top

**Memory trick:** BMW
- **B**read plate on left (B)
- **M**eal in middle (M)
- **W**ater glass on right (W)

**2. Napkin Etiquette**

- Place on lap when you sit down (wait for host to do so first at formal events)
- Fold in half, crease toward you
- Use to dab mouth (don't wipe vigorously)
- If leaving table temporarily: place on chair
- End of meal: loosely fold and place left of plate

**3. Ordering**

**At Business Meals:**
- Let host order first (or senior person)
- Order mid-price range (never most expensive)
- Avoid messy foods (spaghetti, ribs, whole lobster)
- Match formality (if they order appetizer, you can too)
- Skip alcohol unless host orders it first

**Safe Choices:**
- Grilled fish or chicken
- Pasta (short pasta, not spaghetti)
- Steak (if appropriate for meal type)
- Salad + entree

**4. Eating Etiquette**

**Continental vs. American Style:**

**American Style (Most Common in US):**
- Cut with knife in right hand, fork in left
- After cutting, put knife down
- Switch fork to right hand to eat
- Repeat

**Continental Style (European, increasingly common):**
- Fork in left hand throughout
- Knife in right hand throughout
- Cut and eat without switching hands
- More efficient

**Both are acceptable. Use what you're comfortable with.**

**General Rules:**
- Chew with mouth closed (obvious but critical)
- Don't talk with food in mouth
- Take small bites
- Don't reach across table (ask someone to pass)
- Pass salt and pepper together
- Break bread into small pieces, butter one piece at a time
- Pace yourself with others at table

**5. Conversation During Meals**

**Business Lunch Timeline:**
- First 10-15 minutes: Small talk, build rapport
- Middle of meal: Business discussion
- End of meal: Summarize agreements, next steps

**Topics to Avoid (especially at first meeting):**
- Politics (unless you're certain of alignment)
- Religion
- Money (your own financial situation)
- Complaints or negative talk
- Controversial social issues

**Good Topics:**
- Recent news in your industry
- Sports (generally safe)
- Travel experiences
- Books, podcasts, shows
- Hobbies and interests
- Mutual connections

**6. Phone Etiquette at Table**

- Phone in pocket or bag (not on table)
- Silence your phone
- If urgent call expected: "I'm expecting an urgent call, I apologize if I need to step away"
- If must check phone: "Excuse me, I need to quickly check on something"
- No scrolling social media or texting

**7. Paying**

**If You're Being Treated:**
- Thank them sincerely
- Offer to pay (they'll decline but it's polite)
- Follow up with thank you email/message
- Offer to return the favor (coffee, etc.)

**If You're Hosting:**
- Handle bill discreetly
- Give card to server beforehand if possible
- Don't discuss price or split the bill (you invited)

**If Splitting:**
- Agree beforehand if uncertain
- Split evenly if similar price ranges
- Use payment apps to avoid awkward card situations

**8. Special Dietary Needs**

If you have dietary restrictions:
- Mention when accepting invitation ("I should mention I'm vegetarian")
- Don't make it a big deal at table
- If nothing you can eat: eat what you can, focus on conversation
- Host will appreciate knowing in advance

**9. Difficult Foods**

**Bread Rolls:**
- Break with hands (don't cut with knife)
- Butter one small piece at a time

**Soup:**
- Spoon away from you
- Sip from side of spoon
- If too hot, wait (don't blow on it)

**Pasta:**
- Twirl small amount on fork against plate
- Never cut it
- No spoon (unless broth is involved)

**Shellfish:**
- Use provided tools (crackers, tiny forks)
- If unclear, watch others or ask discreetly

**10. Ending the Meal**

- Wait for host or senior person to signal end
- Place napkin loosely on left side of plate
- Don't push plate away
- Wait for others before leaving table
- Thank host/server

**11. After-Meal Protocol**

- Send thank-you email within 24 hours
- Reference something specific from conversation
- Restate any agreements or next steps
- Express appreciation for their time`,

      examples: [
        '**Real Scenario**: Student on lunch interview. Ordered most expensive item (lobster), talked with mouth full, phone on table, interrupted constantly. Did not get job. Interviewer later said, "We can teach skills, but basic professionalism is expected."',
        '**Successful Example**: Young entrepreneur at dinner with potential investor. Let investor order first, matched their pace, asked thoughtful questions, listened more than talked, knew which fork to use, sent thank-you email that night referencing specific conversation point. Got investment.',
        '**Cultural Difference Example**: American exec dining with Japanese clients. Learned beforehand: never stick chopsticks upright in rice (funeral symbol), pour drinks for others before yourself, compliment food. Small details showed respect. Deal succeeded.'
      ],

      activities: [
        '**Practice Dinner**: Set formal table at home. Practice with family: place setting knowledge, napkin etiquette, continental eating style, passing dishes, conversation during eating. Make it fun but instructive.',
        '**Restaurant Observation**: Visit nice restaurant (even just for coffee). Watch: How do people behave? What etiquette do you notice? How do staff interact? Take mental notes.',
        '**Video Study**: Watch business dinner scenes in movies/TV (Mad Men, Billions, Succession). Notice: table manners, conversation flow, power dynamics, who orders first, phone usage.'
      ]
    },

    {
      section: '4. Professional Image & Dress Code',
      content: `You're judged within 7 seconds of meeting someone. Your appearance communicates before you say a word.

**The Rule:**
Dress for the position you want, not the one you have.

**Understanding Dress Codes:**

**1. Business Professional (Most Formal)**

**Men:**
- Dark suit (navy, charcoal grey)
- White or light blue dress shirt
- Conservative tie
- Black leather dress shoes
- Minimal accessories (watch, simple ring)

**Women:**
- Suit (matching jacket and skirt/trousers)
- Blouse (conservative colors)
- Closed-toe pumps (2-3 inch heels)
- Minimal jewelry
- Natural makeup

**When:** Banking, law, corporate C-suite, important client meetings

**2. Business Casual**

**Men:**
- Dress trousers (not jeans)
- Collared shirt (can skip tie)
- Blazer optional
- Leather shoes (not sneakers)

**Women:**
- Dress trousers or skirt (knee-length)
- Blouse or knit top
- Cardigan or blazer
- Closed-toe shoes

**When:** Most office environments, client meetings, networking events

**3. Smart Casual**

**Men:**
- Chinos or dark jeans (no rips)
- Polo shirt or casual button-down
- Clean sneakers or casual leather shoes
- Optional blazer

**Women:**
- Nice jeans or casual trousers
- Blouse or smart top
- Flats or low heels
- Simple accessories

**When:** Startup offices, creative industries, casual Friday, lunch meetings

**4. Casual**

**Still professional:**
- No graphic tees, ripped jeans, or beachwear
- Clean, well-fitted clothes
- Appropriate for workplace

**When:** Tech companies, remote work (video calls), team outings

**Key Principles:**

**Fit Matters Most**
Better to have one well-fitted suit than five ill-fitting ones.

**What good fit means:**
- Shoulders align with your natural shoulder line
- Sleeves hit wrist bone
- Trousers break slightly on shoe
- Not too tight or baggy
- Can move comfortably

**Invest in Alterations**
Off-the-rack clothes almost never fit perfectly. $20-40 in alterations makes $100 suit look like $500 suit.

**Quality Over Quantity**
3 quality pieces > 20 cheap ones

**Investment pieces:**
- One great suit (navy or charcoal)
- 2-3 quality dress shirts
- Quality leather shoes
- Classic watch
- Quality bag

**Grooming Matters**

**Universal Standards:**
- Clean, styled hair
- Trimmed nails
- Fresh breath
- Deodorant (not overwhelming cologne/perfume)
- Clean shoes (people notice!)
- Ironed/steamed clothes (no wrinkles)
- Clothes free of stains, tears, lint

**Men:**
- Facial hair groomed or clean-shaven
- Mustache/beard trimmed
- Nose/ear hair trimmed

**Women:**
- Natural-looking makeup (unless creative field)
- Hair styled (doesn't have to be elaborate)
- Manicure (doesn't need polish, just clean)

**Color Psychology**

**Navy Blue:**
- Trust, authority, intelligence
- Best for interviews, important meetings

**Charcoal Grey:**
- Sophistication, neutrality
- Safe, professional choice

**Black:**
- Power, formality
- Formal events, evening

**White:**
- Cleanliness, simplicity
- Classic shirt color

**Red (Accents):**
- Power, confidence
- Use in tie or accessories (not full suit)

**Avoid:**
- Very bright colors (unless creative field)
- Busy patterns
- Novelty ties/accessories

**Accessories**

**Men:**
- **Watch**: Most important accessory. Classic, not flashy. Can be investment piece.
- **Belt**: Leather, matches shoes
- **Tie**: Solid color or simple pattern, reaches belt
- **Socks**: Match trousers, no white athletic socks with suits!
- **Bag**: Leather briefcase or professional backpack

**Women:**
- **Bag**: Structured, professional, neutral color
- **Jewelry**: Simple, classic (avoid noisy/distracting pieces)
- **Scarf**: Can add personality while remaining professional
- **Watch**: Classic and minimal
- **Shoes**: Clean, not too high (you need to walk comfortably)

**The Cost Question**

You don't need to spend a fortune:

**Budget Options:**
- Thrift/consignment stores for quality brands
- End-of-season sales
- H&M, Zara, Uniqlo for basics
- Invest in alterations

**Where to Invest:**
- Suit (one quality suit)
- Shoes (quality leather lasts)
- Watch (classic design, can be affordable)
- Coat/jacket (worn often)

**Where to Save:**
- Dress shirts (can find good ones cheap)
- Accessories
- Trendy pieces (classic better)

**Industry Variations**

**Finance/Law/Corporate:** Conservative, formal, traditional
**Tech/Startup:** Casual, personality okay, comfort
**Creative (Ad/Design):** Show personality, trends okay, express yourself
**Healthcare:** Clean, functional, modest
**Education:** Business casual, approachable

**Research your industry norms!**

**Building a Professional Wardrobe (Starting from Scratch)**

**Priority Order:**

**Stage 1 (Essentials - £200-400):**
1. One navy suit (get altered)
2. Two white dress shirts
3. One pair black leather dress shoes
4. Black leather belt
5. Simple watch

**Stage 2 (Expansion - £200-300):**
6. Grey suit or charcoal trousers + navy blazer
7. Two more shirts (light blue, pattern)
8. Brown leather shoes
9. 2-3 ties
10. Professional bag

**Stage 3 (Variety - Ongoing):**
11. Casual professional wear
12. Accessories
13. Quality pieces to replace budget items
14. Industry-specific items

**Maintenance**

- Dry clean suits 2-3 times per year (air them between wears)
- Rotate shoes (don't wear same pair daily)
- Iron/steam before wearing
- Shine shoes weekly
- Store properly (hangers, shoe trees)`,

      examples: [
        '**Mark Zuckerberg\'s Hoodie**: He can wear hoodies to meetings because he\'s billionaire CEO of Facebook. You cannot (yet). His hoodie is calculated casualness. Know the rules before you break them.',
        '**Steve Jobs Black Turtleneck**: Became iconic, but he had earned the right through decades of achievement. Early in career at Atari, he was told he smelled bad and dressed poorly.',
        '**Power Dressing - Margaret Thatcher**: First female UK Prime Minister deliberately chose powerful, formal clothing to be taken seriously in male-dominated environment. Image was strategic tool.',
        '**Student Success**: Sarah, 18, had job interview at consulting firm. Borrowed her dad\'s blazer, got it tailored for £30, paired with simple black trousers and white shirt. Got internship. Interviewer later mentioned her professional appearance impressed.'
      ],

      activities: [
        '**Closet Audit**: Review your wardrobe. What could you wear to professional event? What\'s missing? Make shopping list based on priority order above.',
        '**Fit Check**: Try on your most professional outfit. Have someone take photos from front, side, back. Does it fit properly? (Shoulders, length, etc.) If not, visit tailor for quote.',
        '**Industry Research**: Look up 10 successful people in your target industry on LinkedIn/Instagram. What do they wear? What\'s the standard? Build understanding of your field\'s norms.'
      ]
    },

    {
      section: '5. Networking & Relationship Building',
      content: `85% of jobs are filled through networking, not job postings. Most business opportunities come from relationships. Networking is not optional - it's essential.

**Reframe Networking:**

❌ **Wrong Mindset:**
- "Networking is fake and transactional"
- "Using people to get ahead"
- "Awkward small talk with strangers"
- "I'm not good at this"

✅ **Right Mindset:**
- "Building genuine relationships with interesting people"
- "Creating value for others"
- "Exchanging knowledge and opportunities"
- "It's a learnable skill"

**Core Principles:**

**1. Give Before You Ask**

The most powerful networkers focus on helping others first.

**How to Give Value (Even as a Student):**
- Make introductions between your contacts
- Share relevant articles/resources
- Offer your skills (social media, design, research)
- Provide fresh perspective from your generation
- Send opportunities their way
- Genuinely support their work (share, recommend)
- Ask thoughtful questions (people love talking about their expertise)

**The Law of Reciprocity:**
When you help someone, they naturally want to help you back. But don't keep score - focus on genuine value.

**2. Quality Over Quantity**

10 strong relationships > 1,000 business cards

**Strong Relationship Indicators:**
- You can text/email and they respond
- They'd take your call
- They know what you're working on
- You've helped each other
- You genuinely like them

**Weak Relationship:**
- Met once, never followed up
- Only reach out when you need something
- Can't remember details about them

**3. Follow-Up Is Everything**

The fortune is in the follow-up.

**After Meeting Someone:**
- **Within 24 hours:** Send connection request (LinkedIn) or email
- **Within 48 hours:** Send personalized message referencing your conversation
- **Within 1 week:** Share something relevant to them (article, introduction, opportunity)
- **Within 1 month:** Check in, update them on something you discussed

**Sample Follow-Up Email:**

"Hi [Name],

Great meeting you at [Event] yesterday! Really enjoyed our conversation about [specific topic you discussed].

I thought you might find this article interesting given your work on [their project]: [link]

Would love to stay connected. I'm on LinkedIn: [your profile]

Best,
[Your Name]"

**4. Where to Network**

**In-Person Events:**
- Industry conferences (often have student discounts)
- Meetup groups in your field
- University/school career events
- Startup events, pitch competitions
- Workshops and seminars
- Volunteering (board of directors, nonprofit events)
- Professional association meetings

**Online Networking:**
- LinkedIn (most important professional network)
- Twitter/X (industry conversations)
- Industry-specific forums and Slack/Discord groups
- Clubhouse/Twitter Spaces for industry topics
- Email outreach (cold but can work)

**Indirect Networking:**
- Alumni networks (your school/university)
- Family and friends connections
- Parents' professional networks
- Teachers' and professors' networks
- Former internship colleagues

**5. Working a Room at Events**

**Arrival:**
- Arrive early (easier to meet people before crowded)
- Don't immediately go to people you know
- Target: Meet 3-5 new people, not 30

**Body Language:**
- Stand with open posture (invites approach)
- Make eye contact, smile
- Join groups of 3+ (easier than interrupting pair)
- Look for solo people (also networking)

**Approach:**
"Hi, I'm [Name]. What brings you to [event]?"
OR
"Mind if I join you? I'm here to learn about [topic]."

**Conversation:**
- Listen more than you talk (70/30 rule)
- Ask questions about them
- Find common ground
- Share what you're working on briefly
- Don't monopolize time (5-10 minutes, then move on)

**Graceful Exits:**
- "I should let you meet others, but let's connect. Here's my LinkedIn/card."
- "I'm going to grab a drink, great talking to you!"
- "I see someone I need to say hello to. Let's stay in touch - do you have a card?"

**6. Crafting Your Introduction (30-Second Pitch)**

When someone asks "What do you do?", have a compelling answer.

**Formula:**
"I'm [Name], I [what you do] for [who you help] to [outcome/impact]."

**Examples:**

❌ **Generic:**
"I'm a student."

✅ **Better:**
"I'm studying computer science at [University] and I'm particularly interested in AI applications in healthcare."

✅ **Best (with project):**
"I'm a CS student building an app that helps elderly patients remember to take medications. We're working with local hospitals to pilot it."

**Make It:**
- **Clear**: No jargon
- **Concrete**: Specific, not vague
- **Interesting**: Gives them something to ask about
- **Authentic**: Genuinely you

**7. LinkedIn Strategy**

LinkedIn is your professional online presence. Critical for networking.

**Profile Optimization:**
- **Profile photo**: Professional, smiling, plain background
- **Headline**: Not just "Student at..." - add what you're interested in or working on
- **About section**: Your story, what you're passionate about, what you're looking for
- **Experience**: Include school projects, volunteering, part-time work
- **Skills**: List relevant skills
- **Custom URL**: linkedin.com/in/yourname

**Building Network:**
- Connect with everyone you meet in person
- Add thoughtful note when connecting with new people
- Engage with others' content (comment thoughtfully)
- Share valuable content (articles, insights)
- Join relevant groups

**Cold Outreach on LinkedIn:**

**Message Template:**

"Hi [Name],

I came across your profile while researching [their field/company] and was impressed by your work on [specific project/achievement].

I'm a student passionate about [field] and currently working on [what you're doing]. I'd love to learn from your experience with [specific topic].

Would you have 15 minutes for a quick call? Happy to work around your schedule.

Best,
[Your Name]"

**Why it works:**
- Personalized (mentioned specific work)
- Clear and concise
- Specific ask (15 minutes, not vague "pick your brain")
- Shows you've done research

**Response Rate:**
Expect 10-20% response rate. That's good! Send 20 messages, get 2-4 calls. That's 4 new mentors/contacts.

**8. Building Long-Term Relationships**

**Stay in Touch Strategy:**

**Monthly:**
- Share article they'd find interesting
- Congratulate them on achievements (LinkedIn alerts)
- Comment on their social media content

**Quarterly:**
- Check-in email ("Hi! Been a while, wanted to update you on...")
- Coffee/call catch-up

**Annually:**
- Holiday greeting (not generic, personal)
- Birthday message if you know it

**The Key:**
Add value in every interaction. Don't just reach out when you need something.

**9. Networking for Introverts**

**Good news:** Many successful networkers are introverts!

**Strategies:**
- **One-on-one**: Coffee meetings rather than large events
- **Online first**: Build relationship via email/LinkedIn, then meet
- **Bring a friend**: Tag-team events
- **Recharge**: Take breaks at events, step outside
- **Prepare**: Have questions ready, practice introduction
- **Quality over quantity**: Focus on deep, not broad
- **Lead with questions**: Makes it easier (they talk more)

**Remember:** Listening is more important than talking. Introverts often excel because they listen well!

**10. Common Networking Mistakes**

❌ **Only networking when you need something**
✅ **Ongoing relationship building**

❌ **Talking only about yourself**
✅ **70% listening, 30% talking**

❌ **Not following up**
✅ **Follow up within 24-48 hours**

❌ **Collecting cards without connecting**
✅ **Have real conversations, build relationships**

❌ **Being transactional**
✅ **Genuine interest in people**

❌ **Asking for too much too soon**
✅ **Build relationship first, ask later**

❌ **Forgetting names**
✅ **Use their name in conversation, write it down after**`,

      examples: [
        '**Reid Hoffman (LinkedIn Founder)**: Built LinkedIn after years of strategic networking. He helped everyone he met, connected people, provided value. When he launched LinkedIn, his network became early users. Lesson: Network before you need it.',
        '**Gary Vaynerchuk Strategy**: "Jab, jab, jab, right hook" - give value 3 times before asking for anything. Commented on 1,000+ posts per day to build relationships before launching businesses.',
        '**Student Success - Alex, Age 16**: Attended tech meetup monthly for 6 months. Always asked questions, shared resources, helped organize events. When he needed internship, three people offered without him asking. They remembered him as helpful and passionate.'
      ],

      activities: [
        '**30-Day LinkedIn Challenge**: 1) Optimize your profile, 2) Connect with 30 new people (with personalized notes), 3) Comment on 10 posts per day (thoughtfully), 4) Share 5 valuable articles. Track results.',
        '**Attend One Event This Month**: Find a networking event, meetup, or seminar in your field. Set goal: Have 3 meaningful conversations. Follow up with all 3 within 48 hours.',
        '**Reach Out to 10 People**: Create list of 10 people you admire in your field. Send personalized LinkedIn messages or emails asking for 15-minute call. Track responses. Even 2 responses = 2 new mentors!'
      ]
    }
  ],

  realWorldExamples: [
    {
      title: '🎓 Malala Yousafzai - Cultural Capital Across Contexts',
      description: 'Pakistani activist who survived Taliban assassination attempt. Despite young age and non-Western background, developed exceptional cultural capital to navigate global elite circles. Addressed UN, met world leaders, spoke at Oxford, youngest Nobel Prize winner. Maintains authenticity to Pakistani roots while fluent in Western diplomatic/academic contexts.',
      keyLessons: [
        'Cultural capital can be learned from any starting point',
        'Authenticity + adaptability = powerful combination',
        'Education and reading build cultural knowledge',
        'Speaking multiple "cultural languages" increases impact',
        'Your background is asset, not liability',
        'Age and gender don\'t limit cultural capital development'
      ]
    },
    {
      title: '💼 Daymond John - From Street to Boardroom',
      description: 'Shark Tank investor started selling hats on Queens street corner. Built FUBU fashion brand with $40 start-up capital. Learned business etiquette, networking, communication through observation and deliberate practice. Now advises Fortune 500 companies. Maintains street credibility while commanding respect in elite business circles.',
      keyLessons: [
        'Cultural capital is learnable skill, not birthright',
        'Study and observe successful people',
        'Mentors accelerate cultural capital development',
        'Can bridge multiple worlds authentically',
        'Reading and learning crucial for development',
        'Confidence built through preparation and practice'
      ]
    },
    {
      title: '🌍 Priyanka Chopra - Cultural Code-Switching',
      description: 'Indian actress who transitioned from Bollywood to Hollywood global star. Studied American cultural norms, networking practices, communication styles. Learned to navigate Western media, Hollywood parties, American business culture while maintaining Indian identity. Married Nick Jonas, produced content, invested in startups. Master of cultural code-switching.',
      keyLessons: [
        'Cultural fluency opens global opportunities',
        'Research and preparation before entering new contexts',
        'Maintain core identity while adapting communication',
        'International cultural capital increasingly valuable',
        'Body language and social cues vary by culture',
        'Continuous learning and observation essential'
      ]
    }
  ],

  practicalExercises: [
    {
      exercise: '🍽️ Formal Dining Practice',
      instructions: `Set up formal dining practice at home:

1. **Setup**: Research formal table setting online. Set table correctly (use paper/cloth napkins, proper silverware placement, glasses).

2. **Practice Elements**:
   - Napkin etiquette
   - Using correct utensils (work from outside in)
   - Continental eating style
   - Passing items politely
   - Conversation during eating
   - Handling bread rolls
   - Soup technique

3. **Make It Real**: Dress appropriately, practice conversation topics, role-play business lunch scenario.

4. **Document**: Take photos of setup. Have someone evaluate your technique. Practice until comfortable.

5. **Level Up**: Visit nice restaurant. Observe and practice skills in real environment.`,
      expectedOutcome: 'Confidence in formal dining situations. Comfort with proper etiquette. Reduced anxiety about business meals.'
    },
    {
      exercise: '💬 Conversation Skills Development',
      instructions: `30-Day Conversation Challenge:

**Week 1: Small Talk Practice**
- Start 3 conversations with strangers daily (coffee shop, store, etc.)
- Topics: Weather, current events, compliments
- Goal: 60-second conversation

**Week 2: Question Quality**
- Have 5 conversations using only questions
- Practice: "Tell me about...", "What led you to...", "How did you..."
- Listen more than talk (70/30 rule)

**Week 3: Networking**
- Attend 2 networking events or meetups
- Goal: 3 meaningful conversations each event
- Exchange contact info, follow up within 48 hours

**Week 4: Professional Conversations**
- Schedule 3 informational interviews or coffee chats
- Prepare 10 questions beforehand
- Practice professional communication

**Track**: Keep journal noting what worked, what was awkward, what you learned.`,
      expectedOutcome: 'Dramatically improved conversational confidence. Comfortable with small talk. Natural question-asking. Reduced social anxiety.'
    },
    {
      exercise: '📧 Professional Communication Mastery',
      instructions: `Email and Communication Project:

**Task 1: Email Audit**
Review your recent emails. Identify problems:
- Too casual?
- Too wordy?
- Unclear subject lines?
- No clear ask/action?

**Task 2: Template Creation**
Create templates for:
1. Cold outreach to mentor/professional
2. Thank you after meeting
3. Request for informational interview
4. Follow-up after no response
5. Introduction email (connecting two people)

Use frameworks from this module.

**Task 3: Real Application**
Send 10 professional emails this month:
- 3 to people you want to meet
- 3 follow-ups from conversations
- 2 thank you emails
- 2 introductions (connecting people in your network)

**Task 4: Response Analysis**
Track response rates. What works? Refine templates.

**Bonus**: Practice LinkedIn messaging using same principles.`,
      expectedOutcome: 'Professional email communication skills. Higher response rates. Comfortable reaching out to anyone. Growing network.'
    },
    {
      exercise: '👔 Professional Image Development',
      instructions: `Wardrobe and Presentation Project:

**Phase 1: Assessment (Week 1)**
1. Try on your most professional outfit
2. Have someone take photos (front, side, back)
3. Evaluate:
   - Does it fit properly?
   - Appropriate for professional setting?
   - Clean and pressed?
   - Missing pieces?

**Phase 2: Research (Week 1-2)**
1. Study 20 successful people in your target industry
2. Note: What do they wear? Industry norms?
3. Make list of "must-have" items for your field

**Phase 3: Shopping (Week 2-3)**
1. Budget: £200-400 for starter professional wardrobe
2. Priority: Suit OR blazer + trousers + 2 shirts + shoes
3. Get items altered if needed (£20-40)
4. Check thrift stores for quality brands

**Phase 4: Practice (Ongoing)**
1. Wear professional attire to events
2. Get comfortable being "dressed up"
3. Practice putting outfits together
4. Maintain items properly

**Document**: Take "before and after" photos. Note confidence difference.`,
      expectedOutcome: 'Professional wardrobe ready for any opportunity. Increased confidence in professional settings. Understanding of industry norms.'
    }
  ],

  tipsAndTricks: [
    '🎯 **Remember Names**: Repeat their name when they introduce themselves. Use it in conversation. Write it down after. People love hearing their name.',
    '📚 **Read Widely**: The Economist, Financial Times, biographies of successful people. Cultural capital grows through exposure to ideas and references.',
    '👀 **Observe and Adapt**: Watch how successful people in your field communicate, dress, and behave. Model their patterns (authentically).',
    '🤝 **Help First**: Before asking for anything, find way to provide value. Introduction, resource, perspective, skill. Givers gain.',
    '⏰ **Follow Up Fast**: Within 24 hours of meeting someone. While conversation is fresh in their mind. Most people don\'t follow up - this makes you memorable.',
    '💼 **Invest in One Great Suit**: Better to have one perfectly fitted suit than five cheap ones. Get it tailored. Wear it to every important event.',
    '📱 **LinkedIn Is Your Resume**: Optimize profile. Post thoughtfully. Engage with others\' content. Build your professional brand online.',
    '🎭 **Code-Switch**: Adapt communication style to context. Not being fake - being strategic. Speak differently to peers vs. professors vs. CEOs.',
    '📧 **Subject Lines Matter**: Clear, specific subject lines get emails opened. "Quick Question" = ignored. "Inquiry about Summer Internship at [Company]" = opened.',
    '🍽️ **Practice Dining Etiquette at Home**: Set formal table, practice proper technique with family. Comfort comes from repetition.',
    '🗣️ **Ask Better Questions**: "What\'s the biggest challenge you\'re facing?" beats "What do you do?". Thoughtful questions create connection.',
    '📖 **Build Your Reference Library**: Know current events, classic books, films. Cultural literacy creates connection with diverse people.',
    '👥 **Quality Network > Large Network**: 10 strong relationships that would take your call > 1,000 LinkedIn connections you\'ve never spoken to.',
    '🎯 **Have Clear Ask**: When networking, know what you want. Vague "pick your brain" = waste of time. Specific ask = they can help.',
    '💡 **Cultural Capital Compounds**: Each bit of knowledge, each skill, each relationship builds on previous ones. Start now. Be consistent.'
  ],

  commonMistakes: [
    '❌ **Treating Networking as Transaction**: Only reaching out when you need something. People feel used. Solution: Build relationships continuously, not just when desperate.',
    '❌ **Overdoing It**: Trying too hard to impress with fancy words, name-dropping, showing off. Comes across as insecure. Solution: Be genuine. Confidence beats arrogance.',
    '❌ **Not Following Up**: Met interesting person, never contacted them again. Relationship dies. Solution: Follow up within 24-48 hours. Always.',
    '❌ **Monologuing**: Talking only about yourself. Boring and self-centered. Solution: 70% listening, 30% talking. Ask questions. Be genuinely interested.',
    '❌ **Wrong Formality Level**: Too casual in formal setting OR too stiff in casual setting. Misreading room. Solution: Research environment beforehand. When uncertain, slightly more formal is safer.',
    '❌ **Poor Email Etiquette**: Vague subject lines, walls of text, no clear ask, typos. Gets ignored or deleted. Solution: Clear subject, 3 paragraphs max, specific ask, proofread.',
    '❌ **Ordering Wrong at Business Meals**: Most expensive item, messy food, or getting drunk. Memorable for wrong reasons. Solution: Mid-price, easy-to-eat food. Match host\'s alcohol consumption.',
    '❌ **Forgetting Names**: Meet someone, forget name 30 seconds later. Awkward and shows lack of attention. Solution: Repeat name when introduced. Use it in conversation. Write it down immediately after.',
    '❌ **Phone Addiction at Events**: Constantly checking phone instead of engaging. Sends "I\'d rather be elsewhere" message. Solution: Phone in pocket. Check only if urgent. Focus on people in room.',
    '❌ **Unprofessional Social Media**: Recruiters check social media. Party photos, controversial posts, or unprofessional content damages opportunities. Solution: Audit your social media. Make private or clean it up.',
    '❌ **Bad Handshake**: Limp fish handshake OR bone-crushing grip. First impression matters. Solution: Firm (not tight), web-to-web contact, 2-3 pumps, eye contact, smile.',
    '❌ **Generic Outreach**: Copy-paste networking messages. Obvious and disrespectful of recipient\'s time. Solution: Personalize every message. Reference specific work/achievement.',
    '❌ **Not Researching Before Meetings**: Meeting someone important, knowing nothing about them. Wasted opportunity. Solution: 15 minutes of LinkedIn/Google research before any meeting.',
    '❌ **Inappropriate Dress**: Showing up to formal event in jeans OR suit to casual startup. Shows lack of judgment. Solution: Ask about dress code. Research company culture. When uncertain, go business casual.',
    '❌ **Talking About Money (Yours)**: Discussing your financial situation, bragging about wealth, or complaining about lack of money. Unprofessional. Solution: Keep finances private. Focus on value and opportunities.'
  ],

  nextSteps: [
    '📧 **Send 5 Cold Emails This Week**: Reach out to 5 people you admire using templates from this module. Ask for 15-minute call. Track responses.',
    '🍽️ **Practice Formal Dining**: Set formal table at home this weekend. Practice with family. Then visit nice restaurant and observe/practice.',
    '👔 **Wardrobe Audit**: This weekend, evaluate your professional wardrobe. Make shopping list. Budget for one quality outfit. Get it tailored.',
    '🎯 **Attend One Networking Event**: Find event in your field this month. Set goal: 3 meaningful conversations. Follow up with all within 48 hours.',
    '📱 **Optimize LinkedIn Profile**: Today, update profile photo, headline, about section, experience. Add skills. Start posting/commenting regularly.',
    '📚 **Read Cultural References**: Subscribe to one quality publication (Economist, Financial Times, or industry magazine). Read daily. Build cultural literacy.',
    '🗣️ **Practice Elevator Pitch**: Write your 30-second introduction. Practice until natural. Record yourself. Refine. Use at every introduction.',
    '💬 **30-Day Conversation Challenge**: Start 3 conversations daily with people you don\'t know. Small talk practice. Track comfort level improvement.',
    '🤝 **Make 5 Introductions**: Connect people in your network who should know each other. Practice relationship-building by providing value.',
    '👥 **Find a Mentor**: Reach out to 10 potential mentors. Ask for quarterly coffee chats. Provide value to them (research, fresh perspective, energy).',
    '🎭 **Study Successful People**: Watch 10 interviews with people in your target industry. Note: communication style, references they make, how they handle questions.',
    '📖 **Start Reading List**: Pick 3 books: 1 classic literature, 1 biography of successful person, 1 business book. Read this quarter.',
    '🍽️ **Experience Fine Dining**: Save up, visit one upscale restaurant. Observe everything. Practice etiquette. Note how people behave.',
    '👗 **Dress for Success Week**: Wear most professional outfit for one full week. Notice how you feel, how people respond. Build comfort.',
    '🚀 **Most Important: Take Action TODAY**: Pick ONE exercise from this module. Start it today. Not tomorrow. Cultural capital builds through consistent practice, not just reading.'
  ]
};

export default culturalCapitalContent;

