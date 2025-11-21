/**
 * Life Skills: Entrepreneurial Creativity & Innovation
 * 
 * Comprehensive module teaching students how to think like entrepreneurs,
 * generate innovative ideas, solve problems creatively, and turn ideas into reality.
 * 
 * Designed for all age groups with real-world examples and practical exercises.
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

export const entrepreneurialCreativityContent: LifeSkillsContent = {
  moduleNumber: 1,
  title: 'Entrepreneurial Creativity & Innovation',
  duration: '120 minutes',
  introduction: 'Master the art of entrepreneurial thinking! This module teaches you how to identify opportunities, generate innovative ideas, think creatively, solve problems, and turn your ideas into reality. Whether you want to start a business, create a social enterprise, or simply think more innovatively, this module provides the tools and mindset you need.',
  
  keyPoints: [
    '🎯 Opportunity Recognition: Spot problems that need solving',
    '💡 Creative Thinking: Generate innovative solutions',
    '🔄 Design Thinking Process: Empathize → Define → Ideate → Prototype → Test',
    '🚀 Minimum Viable Product (MVP): Start small, learn fast',
    '📊 Lean Startup Methodology: Build, Measure, Learn',
    '🤝 Customer Discovery: Understand your target audience',
    '💪 Resilience & Pivoting: Adapt when things don\'t work',
    '🎨 Innovative Problem Solving: Think outside the box'
  ],

  mainContent: [
    {
      section: '1. The Entrepreneurial Mindset',
      content: `Entrepreneurship isn't just about starting businesses - it's a way of thinking that helps you identify opportunities, solve problems, and create value in any context.

**Core Traits of Entrepreneurial Thinkers:**

🔍 **Opportunity Recognition**
- See problems as opportunities
- Notice gaps in the market
- Ask: "What if?" and "Why not?"
- Observe frustrations (yours and others')

💪 **Resilience & Growth Mindset**
- View failures as learning experiences
- Embrace challenges
- Persist when things get difficult
- Believe skills can be developed

🎯 **Action-Oriented**
- Bias toward taking action
- Start before you feel "ready"
- Learn by doing, not just planning
- "Done is better than perfect"

🤝 **Resourcefulness**
- Work with what you have
- Find creative solutions to constraints
- Build networks and partnerships
- Bootstrap when necessary

🌍 **Value Creation Focus**
- Focus on helping others
- Solve real problems
- Create win-win situations
- Think long-term sustainability`,

      examples: [
        '**Brian Chesky (Airbnb)**: Struggling to pay rent, he rented out air mattresses in his apartment during a conference. He noticed a problem (expensive hotels, no availability) and created a solution that became a $75 billion company.',
        '**Sarah Blakely (Spanx)**: Frustrated with visible panty lines, she cut the feet off her pantyhose. She turned a personal problem into a billion-dollar shapewear company with just $5,000.',
        '**Student Example - Tom, Age 16**: Noticed his classmates struggled to find study groups. Created a free Discord server organizing study sessions by subject. Now has 500+ members and monetizes through premium features.'
      ],

      activities: [
        '**Problem Spotting Exercise**: For one week, write down 3 frustrations/problems you encounter daily. Ask friends/family about their frustrations. You\'ll have 20+ potential business ideas by week\'s end!',
        '**Opportunity Journal**: Dedicate a notebook to recording: 1) Problems you notice, 2) Ideas that excite you, 3) Trends you observe, 4) Questions you have. Review monthly.',
        '**What If? Game**: Take an everyday object (e.g., pen). Ask "What if it could...?" 20 times. Stretch your creative thinking muscles.'
      ]
    },

    {
      section: '2. Creative Idea Generation',
      content: `Innovation comes from systematic creative thinking, not waiting for a "lightbulb moment". Learn proven techniques to generate breakthrough ideas.

**Proven Idea Generation Techniques:**

🎨 **Brainstorming Rules**
- Quantity over quality (100 bad ideas to find 1 great one)
- No judgment during generation phase
- Build on others' ideas ("Yes, and...")
- Encourage wild ideas
- Use visuals (sketches, mind maps)

🔀 **SCAMPER Method**
For improving existing products/services:
- **S**ubstitute: What can you replace?
- **C**ombine: What can you merge?
- **A**dapt: What can you adjust?
- **M**odify: What can you change?
- **P**ut to other uses: New applications?
- **E**liminate: What can you remove?
- **R**everse: What if you did opposite?

🧩 **Problem-Solution Fit**
1. Identify a specific problem
2. Who experiences this problem?
3. How do they currently solve it?
4. What's wrong with current solutions?
5. How could you solve it better?

💭 **The "Wouldn't it be great if..." Technique**
Complete this sentence 20 times:
"Wouldn't it be great if you could [do something impossible/difficult] ..."
Example: "Wouldn't it be great if you could try on clothes without going to a store?" (Led to virtual fitting rooms)

🌍 **Cross-Industry Innovation**
Take solutions from one industry and apply to another:
- Uber (taxi) → Uber Eats (food delivery)
- Netflix (movies) → MasterClass (education)
- Airbnb (accommodation) → Swimply (private pools)`,

      examples: [
        '**SCAMPER in Action - Instagram Stories**: **A**dapted Snapchat\'s disappearing photos → Instagram Stories → Became more popular than original',
        '**Cross-Industry - Spotify**: Applied Netflix\'s subscription model to music → Disrupted iTunes\' pay-per-song model → 500+ million users',
        '**Student Success - Jessica, Age 15**: Combined her love of art + noticed students stressed → Created coloring book for exam stress → Sold 200 copies at school, donated profits to mental health charity'
      ],

      activities: [
        '**30 Ideas in 30 Minutes Challenge**: Pick a topic (e.g., "How to make school lunches better"). Set timer. Generate 30 ideas without stopping. No filtering. Quantity is the goal.',
        '**SCAMPER Your Daily Life**: Choose something you use daily (backpack, phone case, water bottle). Apply all 7 SCAMPER prompts. Share your best idea.',
        '**Mashup Game**: Pick two random companies/products (use random word generator). How would you combine them? Example: "Duolingo + Tinder" = Language learning through conversation with native speakers?'
      ]
    },

    {
      section: '3. Design Thinking Process',
      content: `Design Thinking is a human-centered approach to innovation used by companies like Apple, Google, and IDEO. It ensures you create solutions people actually want.

**The 5 Stages of Design Thinking:**

🧡 **1. EMPATHIZE - Understand Your Users**
- Talk to potential customers (interviews)
- Observe how they currently solve the problem
- Experience the problem yourself
- Create empathy maps (what they think, feel, say, do)
- Don't assume - ask and observe!

**Questions to ask:**
- What frustrates you about [current solution]?
- Walk me through the last time you [experienced problem]
- What would make your life easier?
- If you had a magic wand, what would you change?

📝 **2. DEFINE - Clarify the Problem**
- Synthesize your research
- Write a clear problem statement
- Format: "[User] needs [need] because [insight]"
- Example: "Busy students need a faster way to find reliable study notes because they waste hours searching multiple sources"

Focus on the problem, not the solution yet!

💡 **3. IDEATE - Generate Solutions**
- Use brainstorming techniques (see previous section)
- Generate many ideas
- Don't judge yet
- Involve diverse perspectives
- Think wild and ambitious

Goal: 50-100 ideas minimum

🔨 **4. PROTOTYPE - Build Quick Versions**
- Create cheap, fast prototypes
- Paper sketches, mockups, role-play scenarios
- Minimum Viable Product (MVP) approach
- Doesn't need to be perfect
- Good enough to test and get feedback

**Prototype Examples:**
- App idea? → Paper sketches or Figma mockup (before coding)
- Service? → Offer it manually to 5 people first
- Product? → Cardboard/3D printed version
- Website? → One-page landing page

✅ **5. TEST - Get Real Feedback**
- Show prototype to target users
- Watch how they use it (observation > opinion)
- Ask: "What's confusing?" "What would you change?"
- Iterate based on feedback
- Repeat cycle: Prototype → Test → Improve

**Key Rule:** Fall in love with the problem, not your solution. Be ready to change your idea based on feedback.`,

      examples: [
        '**Airbnb\'s Design Thinking Journey**: Initially called "Air Bed & Breakfast" - wasn\'t working. They visited hosts, discovered poor photos were the issue. Took professional photos themselves. Bookings doubled. Empathy and observation saved the company.',
        '**Dropbox MVP**: Before building the product, founder made a simple video showing how it would work. Video went viral. Got 75,000 signups overnight. Validated demand before writing code.',
        '**Student Example - Marcus, Age 14**: Wanted to create a homework planner app. First, interviewed 20 students (Empathize). Discovered they wanted reminders + tracking completion (Define). Sketched 5 different layouts (Ideate). Made paper prototype (Prototype). Let classmates use it for a week (Test). Now building digital version based on feedback.'
      ],

      activities: [
        '**Your First Design Thinking Project**: Pick a problem at your school. Complete all 5 stages: 1) Interview 10 people (Empathize), 2) Write problem statement (Define), 3) Generate 30 solutions (Ideate), 4) Pick best idea and sketch it (Prototype), 5) Show to 5 people and get feedback (Test).',
        '**Empathy Interview Practice**: Find someone who has a problem you want to solve. Ask them 10 questions. Listen more than you talk. Take notes. What did you learn that surprised you?',
        '**Rapid Prototyping Challenge**: Got a product/app/service idea? Give yourself 2 hours to create a simple prototype using materials around you. Show it to 3 people today. What did they say?'
      ]
    },

    {
      section: '4. Minimum Viable Product (MVP) Strategy',
      content: `The MVP approach is how successful entrepreneurs launch quickly, learn fast, and avoid wasting time building things nobody wants.

**What is an MVP?**
The simplest version of your idea that delivers core value and allows you to learn from real users.

**NOT:** A half-baked, buggy product
**IS:** The minimum features needed to solve the problem and test your hypothesis

**Why MVP Matters:**

⏱️ **Speed to Market**
- Launch in weeks, not years
- Start getting customers while competitors are still planning
- Beat larger, slower-moving companies

📊 **Learn Before You Invest**
- Test if people actually want your solution
- Discover what features they really need
- Avoid building expensive features nobody uses

💰 **Resource Efficiency**
- Start with minimal investment
- Reduce financial risk
- Prove concept before seeking funding

🔄 **Iterative Improvement**
- Release → Learn → Improve → Repeat
- Each version better than last
- Customer feedback guides development

**How to Build Your MVP:**

**Step 1: Identify Core Value**
What is the ONE problem you solve?
What is the MINIMUM feature set to solve it?

Example: Uber's MVP
- Could request a ride via SMS
- Only black cars (no UberX, UberPool)
- San Francisco only
- No ratings, no split fare, no multiple stops
But it solved the core problem: Get a ride easily

**Step 2: Choose Your MVP Type**

📧 **Landing Page MVP** ($0-50, 1 day)
- Single webpage explaining your idea
- Email signup form
- Gauge interest before building
- Tools: Carrd, Webflow, Wix

🎥 **Explainer Video MVP** ($0, 1-2 days)
- 2-minute video showing how it works
- Share on social media
- See if people sign up
- Example: Dropbox's famous video

👨‍💼 **Concierge MVP** ($0, immediate)
- Manually deliver the service
- No automation yet
- Learn exactly what customers need
- Scale after you understand the process
- Example: Food delivery done manually before building app

🎨 **Wizard of Oz MVP** ($0-100)
- Frontend looks automated
- Backend is manual
- Users think it's technology
- You're learning what to build
- Example: Zappos started by buying shoes from stores when someone ordered

🛠️ **Basic Feature MVP** (Cost varies)
- Core features only
- Basic design
- Works but not polished
- Enough to solve problem

**Step 3: Define Success Metrics**
Before launching, decide what "success" means:
- 100 email signups in first month?
- 10 paying customers?
- 50% of users complete action?
- NPS score of 8+?

**Step 4: Launch and Learn**
- Get it in front of real users ASAP
- Don't wait for "perfect"
- Actively ask for feedback
- Measure your success metrics
- Iterate based on data

**The Build-Measure-Learn Loop (Lean Startup):**

1. **BUILD** a minimum viable product
2. **MEASURE** how customers respond (data + feedback)
3. **LEARN** what works and what doesn't
4. **DECIDE:** Persevere (continue) or Pivot (change direction)
5. Repeat cycle

Each cycle should be 1-2 weeks max!`,

      examples: [
        '**Instagram\'s MVP (originally Burbn)**: Started as location check-in app with many features. Nobody used it. Noticed users only shared photos. Stripped everything except photo sharing + filters. Launched as Instagram. Sold to Facebook for $1 billion 18 months later.',
        '**Amazon\'s MVP**: Started selling only books. Once proven, added more categories. Now sells everything. Started narrow, expanded based on success.',
        '**Buffer\'s MVP**: Just a landing page with pricing plans. No actual product built. When people clicked "Buy", a message said "Not ready yet, but enter your email". Got 100+ signups. Then built the product. Now a $20M+ company.',
        '**Student Example - Lily, Age 16**: Wanted to create custom study planner business. MVP: Made 5 planners by hand, posted photos on Instagram. Sold all 5 in 2 days. This validated demand before investing in bulk printing. Now sells 50+ per month.'
      ],

      activities: [
        '**Your MVP in 48 Hours**: Pick your best business idea. Create an MVP this weekend: Landing page (Carrd.co) OR Manual service to 5 friends OR Paper prototype. Don\'t overthink - just launch!',
        '**MVP Analysis**: Research 3 successful companies. Find what their MVPs looked like (search "[Company] first version" or "original MVP"). Compare to today. What did they start with? What did they add later?',
        '**Your Build-Measure-Learn Plan**: For your idea, write: 1) What\'s your MVP? (Build), 2) What will you measure? (Measure), 3) What will each result tell you? (Learn), 4) What\'s your success criteria?'
      ]
    },

    {
      section: '5. Customer Discovery & Validation',
      content: `The biggest mistake entrepreneurs make? Building something nobody wants. Customer discovery prevents this by ensuring you understand your market before investing time and money.

**Customer Discovery Process:**

🎯 **Step 1: Define Your Target Customer**

Create a detailed customer avatar:
- Demographics (age, location, income, education)
- Psychographics (values, interests, behaviors)
- Problems they experience
- Current solutions they use
- Where they spend time (online and offline)

**Bad:** "Everyone who needs [my product]"
**Good:** "College students aged 18-22, studying STEM subjects, who struggle with procrastination and want to improve productivity. They currently use phone apps but find them too complicated."

🗣️ **Step 2: Conduct Customer Interviews**

**The Goal:** Understand their problems deeply (NOT to pitch your solution)

**Golden Rule:** Talk about their life and problems 80% of the time. Your solution 20% maximum.

**Great Interview Questions:**
- Tell me about the last time you experienced [problem]
- What have you tried to solve this?
- What's frustrating about current solutions?
- What's the hardest part about [their situation]?
- How much time/money does this problem cost you?
- If you had a magic wand, what would you change?
- What else have you tried?

**Questions to AVOID:**
- "Would you use [my solution]?" (People lie to be polite)
- Leading questions that suggest the answer
- Talking about your solution too much

**Where to Find Interviewees:**
- Friends and family (but be aware of bias)
- Social media (Reddit, Facebook groups, Twitter)
- Online forums related to the problem
- School/university communities
- Local meetups and events
- LinkedIn outreach

**Aim for:** 20-50 interviews for strong validation

📊 **Step 3: Identify Patterns**

After interviews, look for:
- Common problems mentioned by multiple people
- Emotional pain points (frustration, anger, desperation)
- Current solutions and their limitations
- Willingness to pay (do they pay for solutions now?)
- Urgency (is this a "nice to have" or "must have"?)

**Red Flags:**
🚩 People say "that sounds cool" but don't have the problem
🚩 They've never paid for a solution
🚩 The problem isn't painful enough
🚩 They're happy with current solutions
🚩 You have to convince them they have a problem

**Green Flags:**
✅ They've actively looked for solutions
✅ They currently pay for imperfect solutions
✅ They describe the problem without prompting
✅ They show emotion when talking about it
✅ They ask when your solution will be available

💰 **Step 4: Validate Willingness to Pay**

**The Ultimate Test:** Will they pay for your solution?

**Validation Hierarchy (strongest to weakest):**

1. **They pay you money NOW** 💰💰💰
   - Pre-orders
   - Founding member discounts
   - Waitlist with deposit
   - This is the ONLY validation that truly matters

2. **They commit time/effort** 💰💰
   - Sign up for beta testing
   - Refer friends
   - Complete detailed survey
   - Actions speak louder than words

3. **They express strong interest** 💰
   - "I would definitely buy this"
   - Ask detailed questions
   - Request to stay updated
   - Better than nothing, but still uncertain

4. **They say "interesting"** ⚠️
   - Polite but non-committal
   - Don't rely on this
   - Keep searching for stronger signals

**How to Ask for Money (Without Being Awkward):**

"I'm planning to launch this at $[price]. If I gave you early access for $[discounted price], would you be interested in securing a spot?"

OR

"Does $[price] per month sound reasonable for solving [problem]?"

Watch their reaction. Hesitation = Price too high or value not clear.

🎯 **Step 5: Calculate Product-Market Fit Score**

Ask users (after they've tried your MVP):
"How would you feel if you could no longer use [your product]?"
- Very disappointed
- Somewhat disappointed  
- Not disappointed

**Target:** 40%+ saying "Very disappointed" = Strong product-market fit

🔄 **When to Pivot**

Pivot (change direction) if:
- After 20+ interviews, nobody has the problem you thought
- People aren't willing to pay
- Current solutions are "good enough"
- You discover a different, bigger problem
- Your solution doesn't solve the problem well

**Famous Pivots:**
- YouTube: Started as video dating site → Video sharing platform
- Twitter: Started as podcasting platform → Microblogging
- Slack: Started as gaming company → Team communication
- Instagram: Started as check-in app → Photo sharing

**Don't pivot after:** 2 rejections. Give it proper time and sample size.`,

      examples: [
        '**Superhuman Email (Premium Email App)**: Founder Rahul Vohra interviewed 700+ people before building. Discovered target customers valued speed above all. Built fastest email client. Charges $30/month. Waitlist of 200,000+ people.',
        '**Notion**: Interviewed 100+ knowledge workers about productivity tools. Discovered people use 5-10 different apps. Built all-in-one workspace. Now valued at $10 billion.',
        '**Student Example - Alex, Age 17**: Wanted to sell custom art prints. Interviewed 30 students. Discovered they wanted affordable dorm room art (~£10-15). Initially planned £30+ prices. Adjusted pricing and size. Sold 80 prints in first month by understanding his market.'
      ],

      activities: [
        '**Your First 10 Interviews**: Pick your target customer. Find 10 people who match this description. Interview them this week using the questions above. Write down patterns you notice.',
        '**Validation Experiment**: Create a landing page for your idea with a "Pre-order now" button. Even if you can\'t fulfill yet, see how many people click. If 100 visitors and 0 clicks = weak demand. 10+ clicks = promising!',
        '**Problem-Solution Fit Canvas**: Draw 2 columns. Left: "Problems I Think They Have". Right: "Problems They Actually Have (from interviews)". Compare after 10 interviews. Were you right?'
      ]
    },

    {
      section: '6. Resilience, Failure, and Pivoting',
      content: `Every successful entrepreneur has failed multiple times. The difference? They learned from failures, adapted, and persisted. This section teaches you how to build resilience and pivot effectively.

**The Entrepreneurial Reality:**

📊 **Statistics You Should Know:**
- 90% of startups fail
- 50% of businesses fail within 5 years  
- Average successful entrepreneur has failed 3.8 times before success
- Successful entrepreneurs are not luckier - they just try more times

**But here's the key:** Each "failure" teaches you lessons that increase your odds of future success.

🧠 **Developing a Growth Mindset**

**Fixed Mindset:**
- "I'm not entrepreneurial"
- "This failed, I'm a failure"
- Avoids challenges
- Gives up easily

**Growth Mindset:**
- "I'm learning entrepreneurship"
- "This attempt didn't work, what can I learn?"
- Embraces challenges
- Persists through obstacles

**How to Build Growth Mindset:**
1. Replace "I can't" with "I can't yet"
2. View obstacles as opportunities to grow
3. Celebrate effort, not just results
4. Learn from criticism
5. Study how successful people overcame failure

💪 **Building Entrepreneurial Resilience**

**Resilience = Ability to bounce back from setbacks**

**Practical Strategies:**

**1. Reframe Failure:**
- It's not failure, it's a "failed experiment"
- You didn't lose, you learned what doesn't work
- Every "no" brings you closer to "yes"

**2. Separate Your Idea from Your Self-Worth:**
- Bad idea ≠ You're a bad person
- Failed business ≠ You're a failure
- Your value isn't determined by business success

**3. Build a Support Network:**
- Find mentor(s) who've been through it
- Join entrepreneur communities
- Share struggles with trusted friends
- Celebrate small wins together

**4. Practice Self-Compassion:**
- Talk to yourself like you'd talk to a friend
- Acknowledge difficulty: "This is really hard"
- Remember: Everyone struggles
- Take breaks when needed

**5. Focus on What You Can Control:**
- Can't control: Market conditions, competitors, timing
- Can control: Your effort, learning, improvement, persistence
- Spend energy on controllables only

**6. Maintain Perspective:**
- Will this matter in 5 years?
- What's the worst that can actually happen?
- You're young - you have time to try many times
- One business ≠ your entire life

🔄 **When and How to Pivot**

**What is a Pivot?**
A structured course correction to test a new hypothesis about your product, business model, or market.

**When to Consider Pivoting:**

✅ **Pivot If:**
- After 6+ months, little traction
- Customers aren't using key features
- Can't achieve product-market fit
- Market is too small
- Discovered a better opportunity
- Your solution doesn't solve problem well enough

❌ **Don't Pivot If:**
- You had one bad week
- One customer complained
- You're just feeling discouraged
- Haven't given it proper time (6+ months)
- Haven't tried different approaches yet

**Types of Pivots:**

**1. Customer Segment Pivot**
- Same product, different target customer
- Example: Microsoft went from developers to businesses

**2. Problem Pivot**
- Same customer, different problem you solve
- Example: YouTube went from video dating to video sharing

**3. Feature Pivot**
- What was one feature becomes the whole product
- Example: Instagram dropped all features except photo sharing

**4. Business Model Pivot**
- Same product, different way of making money
- Example: LinkedIn went from paid subscriptions to freemium

**5. Platform Pivot**
- Change from app to website or vice versa
- Example: Instagram started as web-only, pivoted to mobile-first

**6. Value Capture Pivot**
- Change who pays and how
- Example: Spotify free with ads vs. premium subscription

**How to Pivot Successfully:**

**Step 1: Recognize the Need**
Look at data:
- User engagement dropping?
- Customer acquisition cost too high?
- Can't reach target growth?
- Customers using product unexpectedly?

**Step 2: Form New Hypothesis**
"We believe that [new target customer] has [this problem] and will value [our solution] because [reason]"

**Step 3: Test Quickly**
- MVP of new direction
- 30-day sprint to validate
- If working: continue
- If not: try again or different direction

**Step 4: Communicate Changes**
- Tell existing customers why you're changing
- Explain how it benefits them
- Be honest and transparent

**Step 5: Commit Fully**
Once decided, go all in
Don't half-pivot
Give it proper time and effort

⚠️ **Common Pivot Mistakes:**

**Pivoting Too Often** (Shiny Object Syndrome)
- Changing direction every month
- Never giving ideas time to work
- Commit to 6 months minimum

**Not Pivoting When Should**
- Stubbornly sticking to failed idea
- Ignoring clear signals
- Pride preventing adaptation

**Pivoting Based on Opinions**
- One person's feedback
- Your own preferences (not customer needs)
- Use data + consistent feedback patterns

**The Pivot Without Learning**
- Making changes randomly
- Not understanding why last attempt failed
- Repeat same mistakes in new direction

📈 **Tracking Progress & Learning**

**Keep a Founder's Journal:**
- Daily/weekly reflection
- What worked? What didn't?
- What did I learn?
- What will I try differently?

**Metrics to Track:**
- Customer conversations per week
- Sign-ups/users
- Revenue (if charging)
- Customer satisfaction (NPS)
- Time to achieve milestones

**Quarterly Review Questions:**
1. Are we making progress toward our goal?
2. Are customers more satisfied than 3 months ago?
3. What was our biggest learning?
4. What should we stop/start/continue doing?
5. Do we need to pivot?`,

      examples: [
        '**WhatsApp**: Founder Brian Acton was rejected by Facebook and Twitter for jobs. Started WhatsApp at age 33. Struggled for years. Finally sold to Facebook for $19 billion. His tweet after Facebook rejection (2009): "Facebook turned me down. Looking forward to life\'s next adventure." Resilience paid off.',
        '**Dyson**: James Dyson made 5,126 prototypes over 15 years before successful vacuum cleaner. Banks rejected him. Manufacturers rejected him. Kept going. Now worth $5 billion. "Failure is interesting - it\'s part of making progress."',
        '**Airbnb**: Founders were so broke they sold cereal boxes ("Obama O\'s") to fund the business. Rejected by investors 7 times. Kept iterating based on customer feedback. Now worth $75+ billion.',
        '**Student Example - Mia, Age 15**: Started 3 businesses: 1) Jewelry (no sales), 2) Tutoring (too time-intensive), 3) Digital study guides (successful). Each "failure" taught her lessons. Third business makes £300/month. Took 18 months of attempts.',
        '**Pivots That Worked**: Nintendo (playing cards → video games), Starbucks (coffee beans → coffee shop experience), PayPal (cryptography → payments), Twitter (podcasting → microblogging)'
      ],

      activities: [
        '**Your Failure Résumé**: List every "failure" you\'ve experienced. Next to each, write what you learned. See the value in setbacks.',
        '**Weekly Resilience Practice**: Each week, try something with 50% chance of rejection (ask question in class, reach out to someone on LinkedIn, pitch an idea). Build rejection resilience.',
        '**Pivot Decision Framework**: If you have a current idea/project: Answer honestly: 1) Have I given it 6+ months? 2) Have I truly validated it with customers? 3) What data says it\'s not working? 4) What would need to be true to pivot? 5) What will I try differently?',
        '**Learn from Failure Stories**: Research 5 successful entrepreneurs. Find their failure stories (search "[name] failures" or "rejected"). Notice patterns in how they responded.'
      ]
    },

    {
      section: '7. Creative Problem-Solving Frameworks',
      content: `Great entrepreneurs aren't just creative - they use systematic frameworks to solve problems innovatively. Master these techniques to generate breakthrough solutions.

**Framework 1: The 5 Whys**

**Purpose:** Find root cause of problems (not just symptoms)

**How it works:**
Ask "Why?" five times to dig deeper

**Example:**
Problem: Our online shop has no sales

Why? → Nobody is visiting the website
Why? → We're not marketing effectively  
Why? → We don't know where our customers are
Why? → We haven't researched our target market
Why? → We started building before understanding customers

**Root Cause:** Started building solution before validating problem and understanding customers

**Your action:** Do customer discovery first!

**Framework 2: First Principles Thinking**

**Used by:** Elon Musk, Jeff Bezos, Aristotle

**Purpose:** Break down complex problems to fundamental truths, then rebuild from there

**How it works:**

Step 1: Identify the problem
Step 2: Break it down to basic facts (not assumptions)
Step 3: Create new solutions from these basics

**Example (Elon Musk & SpaceX):**

**Conventional wisdom:** "Rockets are expensive, space travel only for governments"

**First Principles approach:**
- What are rockets made of? Aluminum, titanium, copper, carbon fiber
- How much do these materials cost? ~2% of typical rocket price
- Why so expensive? Because we buy complete rockets
- New solution: Build our own rockets from raw materials
- Result: Reduced cost by 10x, made space travel viable

**Framework 3: Lateral Thinking (Edward de Bono)**

**Purpose:** Solve problems through indirect and creative approaches

**Techniques:**

**Random Entry:**
- Pick random word (use dictionary or random word generator)
- Force-connect it to your problem
- Generate unexpected solutions

Example:
Problem: Make studying more engaging
Random word: "Pizza"
Ideas: Study groups with pizza, gamify learning (levels like pizza toppings), share knowledge in slices, build momentum like dominos falling...

**Challenge Assumptions:**
List all assumptions about your problem
Challenge each one: "What if the opposite were true?"

Problem: "Students need quiet to study"
Assumption: Quiet = better focus
Challenge: What if ambient noise helps some students?
Solution: Create study playlists, co-working spaces with background energy

**Reversal:**
Reverse the problem
Instead of "How to increase sales?" ask "How to guarantee zero sales?"
List all ways to guarantee failure
Now avoid those things!

**Framework 4: The Opportunity Matrix**

**Purpose:** Prioritize ideas based on impact and effort

Create 2x2 grid:
- Horizontal: Easy to Hard (effort)
- Vertical: Low to High (impact)

**Four Quadrants:**

**Quick Wins (High Impact, Easy)**
→ Do these FIRST
Example: Improve landing page copy, ask for referrals

**Strategic Projects (High Impact, Hard)**
→ Plan for these long-term
Example: Build custom software, enter new market

**Fill-ins (Low Impact, Easy)**
→ Do when have extra time
Example: Post on social media, tidy up website

**Thankless Tasks (Low Impact, Hard)**
→ AVOID these (unless mandatory)
Example: Building features nobody asked for

**Framework 5: Jobs To Be Done (JTBD)**

**Purpose:** Understand why customers "hire" products

**Key insight:** People don't buy products, they "hire" them to do a job

**The Milkshake Example (Clayton Christensen):**

Fast food chain wanted to improve milkshake sales.

**Wrong approach:** "Make it thicker? Sweeter? Bigger?"

**JTBD approach:** "What job are customers hiring milkshakes for?"

**Discovery:**
- Morning commuters "hired" milkshakes to make boring commute interesting and keep them full until lunch
- Afternoon customers "hired" milkshakes as reward for kids

**Different jobs = Different solutions:**
- Morning: Thicker, takes longer to drink, fruit pieces for texture
- Afternoon: Smaller, faster to consume, served quickly

**How to Apply JTBD:**

Ask customers:
- What were you trying to accomplish?
- What did you use before our product?
- What made you switch?
- What was the first moment you realized you needed a solution?

**Framework 6: Blue Ocean Strategy**

**Purpose:** Create uncontested market space (don't compete, create new category)

**Red Ocean:** Compete in existing market (bloody waters)
**Blue Ocean:** Create new market space (clear waters)

**How to find Blue Oceans:**

**Eliminate:** What factors can you remove that industry takes for granted?
**Reduce:** What factors can you reduce below industry standard?
**Raise:** What factors can you raise above industry standard?
**Create:** What new factors can you create that industry never offered?

**Example: Cirque du Soleil**

Traditional circus:
- Animal shows, star performers, multiple arenas, aisle concessions

Cirque du Soleil:
- **Eliminated:** Animals, stars, multiple arenas
- **Reduced:** Humor, cheap prices
- **Raised:** Unique venue, artistic music/dance
- **Created:** Theatrical theme, refined environment

Result: Created new category ("artistic circus"), charged premium prices, no direct competitors

**Framework 7: The "What If?" Game**

**Purpose:** Break free from conventional thinking

**How to Play:**

Take your industry's "rules" and reverse them:

**Transportation:**
- What if you didn't own a car? → Uber
- What if hotels were people's homes? → Airbnb
- What if restaurants delivered anything? → DoorDash

**Education:**
- What if learning was free? → Khan Academy, YouTube
- What if anyone could teach? → Udemy, Skillshare
- What if education was personalized? → AI tutoring

**Your Turn:**
Pick your industry/idea
List 5 "rules" or "that's how it's always been"
Ask "What if we did the opposite?"
Explore the possibilities`,

      examples: [
        '**First Principles - Tesla Battery Cost**: Instead of accepting $600/kWh battery cost, Elon Musk broke it down to raw materials (~$80/kWh of cobalt, nickel, etc.). Built Gigafactory to manufacture at scale. Reduced cost to $100/kWh. Made electric cars affordable.',
        '**Lateral Thinking - Spotify Discover Weekly**: Problem: How to make users discover new music? Random entry word: "Friend". Connection: What if an algorithm became your friend who knows your taste? Result: AI-curated playlists, 40M+ users engage weekly.',
        '**Jobs To Be Done - Google Search**: Job: "I need to find information quickly without reading multiple books". Not "buy a search engine". Understanding the job led to fast, relevant results.',
        '**Blue Ocean - Apple iPhone**: Eliminated: Physical keyboard. Reduced: Price variation (fewer models). Raised: Design, user experience. Created: App ecosystem, touchscreen. Result: New category, premium pricing, market dominance.'
      ],

      activities: [
        '**5 Whys Challenge**: Pick a problem you\'re experiencing (at school, home, business). Ask "Why?" five times. What\'s the real root cause? How does this change your approach?',
        '**First Principles Exercise**: Choose something expensive in your industry/interest. Break it down to fundamental components. What are the basic materials/facts? Could you create it cheaper/better from scratch?',
        '**Opportunity Matrix**: List 10 ideas you have. Plot them on the 2x2 matrix (Impact vs Effort). Which are Quick Wins? Do one this week.',
        '**JTBD Interview**: Interview 5 people who use a product you\'re interested in. Don\'t ask if they like it - ask what "job" it does for them. What were they trying to accomplish? What insights emerge?'
      ]
    }
  ],

  realWorldExamples: [
    {
      title: '🚀 Sara Blakely - Spanx (Turned $5,000 into $1 Billion)',
      description: 'Sara was selling fax machines door-to-door when she had an idea for footless pantyhose. She had no fashion experience, no business training. She cut the feet off her pantyhose, tried to sell the idea to hosiery mills (rejected), wrote her own patent, cold-called Neiman Marcus buyer, got a meeting, and demonstrated the product in the bathroom. Started with $5,000 savings. Oprah featured it. Now worth over $1 billion. First self-made female billionaire.',
      keyLessons: [
        'You don\'t need experience - you need a solution to a real problem',
        'Persistence beats perfection (kept trying after rejections)',
        'Bootstrap when possible (started with $5,000)',
        'Personal problem = potential business opportunity',
        'Creative selling (in-person demonstration)',
        'Started as side hustle while working full-time'
      ]
    },
    {
      title: '💼 Mark Zuckerberg - Facebook (Started Age 19 in Dorm Room)',
      description: 'Mark launched "TheFacebook" from his Harvard dorm room as a project. Initially just for Harvard students. Users loved it. Expanded to other universities. Dropped out to pursue it full-time. Focused on user experience over monetization early on. Turned down billion-dollar acquisition offers. Grew to 3 billion users worldwide.',
      keyLessons: [
        'Start small, scale gradually (Harvard → Other schools → World)',
        'Focus on user experience before making money',
        'Timing matters (MySpace was declining, opportunity window opened)',
        'Network effects (product gets better as more people join)',
        'Young age is not a barrier (started at 19)',
        'MVP approach (basic version first, improved constantly)'
      ]
    },
    {
      title: '🎨 Tope Awotona - Calendly ($3 Billion Scheduling Company)',
      description: 'Tope worked in sales and hated email back-and-forth for scheduling meetings. Noticed everyone had this problem. Taught himself to code. Built Calendly as a simple scheduling tool. No investors for 8 years (bootstrapped). Grew organically through word-of-mouth. Free tier + paid premium model. Now worth $3 billion, 10 million users.',
      keyLessons: [
        'Solve your own problem (authentic entrepreneurship)',
        'Technical skills not required (learned to code for this project)',
        'Bootstrap when possible (maintained control, no investors needed initially)',
        'Freemium model works (free tier drove growth)',
        'Product solved clear pain point (meeting scheduling hassle)',
        'Patient growth (took 8 years to take funding)'
      ]
    },
    {
      title: '🏠 Brian Chesky & Joe Gebbia - Airbnb ($75 Billion from Air Mattresses)',
      description: 'Couldn\'t afford rent in San Francisco. Conference in town, hotels fully booked. Rented out air mattresses in apartment. Made website "Air Bed & Breakfast". Nobody used it. Visited hosts, discovered poor photos were issue. Personally took professional photos of listings. Bookings doubled. Paul Graham (Y Combinator) initially rejected them, later invested. Survived by selling cereal boxes. Persistence paid off.',
      keyLessons: [
        'Personal necessity can spark billion-dollar ideas',
        'Customer feedback is gold (discovered photo issue)',
        'Be scrappy (sold cereal boxes to stay afloat)',
        'Rejection doesn\'t mean bad idea (Y Combinator initially said no)',
        'Do things that don\'t scale early on (personally photographing homes)',
        'Solved real problem (expensive hotels, no availability)'
      ]
    },
    {
      title: '👟 Phil Knight - Nike ($37 Billion from Garage)',
      description: 'Wrote college paper about importing Japanese running shoes. After graduation, flew to Japan, made deal with Tiger shoe company. Sold shoes from car trunk. Co-founded with coach Bill Bowerman. Experimented with waffle iron to create better sole. Focused on athletes\' needs. "Just Do It" campaign. Built brand focused on aspiration and performance.',
      keyLessons: [
        'College projects can become businesses (write business plan)',
        'Start small (car trunk → global empire)',
        'Partner with complementary skills (athlete + coach)',
        'Innovation through experimentation (waffle iron)',
        'Focus on specific customer (athletes) before mass market',
        'Branding matters (Just Do It became cultural phenomenon)'
      ]
    },
    {
      title: '🎓 Student Success: Moziah Bridges - Mo\'s Bows (Started Age 9)',
      description: 'Age 9, couldn\'t find ties he liked. Learned to sew from grandmother. Started making bow ties. Appeared on Shark Tank at age 11. Didn\'t get deal, but exposure helped business. Sold online and to boutiques. By age 17, made $1 million in revenue. NBA partnership.',
      keyLessons: [
        'Age is just a number (started at 9 years old)',
        'Family support matters (grandmother taught him)',
        'Media exposure can skyrocket business (Shark Tank effect)',
        'Niche markets can be profitable (handmade bow ties)',
        'Partnership deals open new opportunities (NBA)',
        'Personal style = business opportunity'
      ]
    }
  ],

  practicalExercises: [
    {
      exercise: '🎯 30-Day Opportunity Spotting Challenge',
      instructions: `For 30 days, write down:
1. Three problems you encountered today
2. One frustration a friend/family member mentioned
3. One pattern you noticed (trends, behaviors, repeated complaints)

End of 30 days: You'll have 90+ potential business ideas!

Format your notes:
- Problem: [Description]
- Who has this problem: [Target market]
- How they currently solve it: [Existing solutions]
- Why current solutions suck: [Gaps/opportunities]
- Potential solution: [Your idea]`,
      expectedOutcome: 'A rich database of validated problems and potential solutions. At least 5-10 ideas worth pursuing further.'
    },
    {
      exercise: '💡 Rapid MVP Weekend Challenge',
      instructions: `Choose your best business idea. This weekend, create an MVP using one of these methods:

Option 1 - Landing Page (2 hours):
- Use Carrd.co (free)
- Headline: What problem you solve
- 3 benefits of your solution
- Email signup form
- Share link on social media
- Goal: 10+ email signups

Option 2 - Manual Service (Immediate):
- Offer service to 5 people manually (no automation)
- Charge small amount or do free for feedback
- Learn what they actually need
- Document the process
- Goal: Complete 5 customer jobs

Option 3 - Video MVP (1 day):
- Create 2-min explainer video showing how solution works
- Use phone camera + free editing (CapCut, iMovie)
- Post on Instagram/TikTok/YouTube
- Include "Sign up for early access" link
- Goal: 50+ views, 5+ signups`,
      expectedOutcome: 'Validated (or invalidated) your idea in 48 hours with real user feedback. Data to decide whether to pursue further.'
    },
    {
      exercise: '🗣️ Customer Discovery Interview Marathon',
      instructions: `Find 20 people who match your target customer profile. Interview them using this script:

Introduction: "I'm researching [problem area] and would love to learn about your experience. This isn't a sales call - just trying to understand the problem better. Can I ask you 5-10 questions?"

Questions (Choose 10):
1. Tell me about the last time you experienced [problem]
2. How often does this happen?
3. What have you tried to solve this?
4. What's frustrating about current solutions?
5. How much time does this problem cost you per week?
6. Have you ever paid for a solution? How much?
7. If you had a magic wand, what would the perfect solution look like?
8. What's the hardest part about [related activity]?
9. Do you know others with this problem?
10. If I built [solution], would you be interested in trying it?

Document answers in spreadsheet.
Look for patterns after 20 interviews.`,
      expectedOutcome: 'Deep understanding of customer problems, validation of problem existence, specific feature requests, pricing insights, and contacts for beta testing.'
    },
    {
      exercise: '🎨 Design Thinking Sprint (5 Days)',
      instructions: `Complete the full Design Thinking process:

**Day 1 - Empathize:**
- Interview 5 people about a problem
- Observe them in their environment
- Create empathy map (think/feel/say/do)

**Day 2 - Define:**
- Synthesize interview findings
- Write clear problem statement: "[User] needs [need] because [insight]"
- Define success metrics

**Day 3 - Ideate:**
- Generate 50 possible solutions (quantity over quality)
- Use SCAMPER, brainstorming, crazy 8s
- Select top 3 ideas

**Day 4 - Prototype:**
- Create simple prototype of best idea
- Can be: paper sketch, Figma mockup, role-play, cardboard model
- Goal: Testable, not perfect

**Day 5 - Test:**
- Show prototype to 5 target users
- Watch them interact (observation > their opinion)
- Ask: What's confusing? What would you change?
- Iterate based on feedback

Document entire process with photos and notes.`,
      expectedOutcome: 'A validated prototype with real user feedback, clear next steps for development, and practiced design thinking methodology.'
    },
    {
      exercise: '🔄 Pivot or Persevere Decision',
      instructions: `If you have a current project/business idea, complete this analysis:

**Data Collection (Week 1-4):**
Track:
- Number of customers/users
- Engagement rate
- Revenue (if charging)
- Customer satisfaction (ask: "How disappointed if product disappeared?" on 1-10 scale)
- Time spent on project vs. results

**Analysis:**
Answer honestly:
1. Are metrics improving month-over-month?
2. Are customers actively using the core feature?
3. Have I reached product-market fit? (40%+ "very disappointed")
4. Am I solving a real problem customers care about?
5. Is the market big enough?
6. Do I still believe in this opportunity?
7. What have I learned in the past 3-6 months?

**Decision Framework:**
If 5+ answers are negative → Consider pivot
If 4+ answers are positive → Persevere with current direction
If mixed → Give it 3 more months with specific improvement targets

If pivoting:
- What did I learn?
- What would I do differently?
- What new opportunity should I explore?
- Write new hypothesis to test

If persevering:
- What improvements will I make?
- What specific targets for next 90 days?
- What obstacles need removing?`,
      expectedOutcome: 'Clear data-driven decision on whether to pivot or persevere. Specific action plan for next 90 days.'
    },
    {
      exercise: '🧠 Creative Problem-Solving Workout',
      instructions: `Practice all frameworks on one real problem you want to solve:

**Your Problem:** [Write it down]

**Apply each framework:**

1. **5 Whys:**
   - Ask why 5 times, find root cause

2. **First Principles:**
   - Break problem to fundamental truths
   - What assumptions can you challenge?

3. **Lateral Thinking:**
   - Pick random word, force-connect to your problem
   - List 10 connections/ideas

4. **Challenge Assumptions:**
   - List 5 assumptions about your problem
   - What if opposite were true?

5. **SCAMPER:**
   - Apply all 7 prompts to your problem/solution
   - Generate 10+ ideas

6. **Jobs To Be Done:**
   - What "job" are people trying to accomplish?
   - What do they "hire" currently to do this job?

7. **Blue Ocean:**
   - What can you eliminate/reduce/raise/create?

By end, you'll have 50+ possible approaches to your problem!`,
      expectedOutcome: 'Dozens of novel solution approaches, practiced multiple creative frameworks, broken out of conventional thinking patterns.'
    }
  ],

  tipsAndTricks: [
    '⚡ **Start Before You\'re Ready**: Waiting for perfect conditions? You\'ll wait forever. Launch messy, improve as you go. Done beats perfect.',
    '🎯 **Solve Your Own Problems**: Best businesses solve problems founders experienced personally. Authenticity shows. You understand the customer because you ARE the customer.',
    '📊 **Fall in Love with the Problem, Not Your Solution**: Your first solution will probably be wrong. Stay flexible. The problem is what matters.',
    '💰 **Validate Before You Build**: The biggest waste is building something nobody wants. Get 10 people to pay you before you write a single line of code.',
    '🚀 **Launch Faster Than Feels Comfortable**: If you\'re not slightly embarrassed by your first version, you launched too late. Ship it, learn, improve.',
    '🗣️ **Talk to 50+ Customers Before Scaling**: Most founders talk to 5 people and think they understand the market. Talk to 50+. Patterns emerge.',
    '📱 **Start Ridiculously Small**: Don\'t try to conquer the world. Facebook started at Harvard. Amazon started with books. Uber started in San Francisco. Start small, dominate that, expand.',
    '🎨 **Steal Smart**: Innovation is often combination of existing ideas in new ways. Study other industries, combine concepts creatively.',
    '⏰ **Time Box Everything**: Give yourself strict deadlines. "I have 48 hours to build MVP", "I have 30 days to get 10 customers". Constraints force creativity.',
    '🤝 **Find a Co-Founder or Mentor**: Entrepreneurship is lonely. Find someone who complements your skills. Having support makes difference between quitting and persisting.',
    '📝 **Write Everything Down**: Ideas fade. Keep opportunity journal. Document insights from customer interviews. Review quarterly.',
    '💪 **Build in Public**: Share your journey on social media. You\'ll find customers, supporters, and accountability. Transparency builds trust.',
    '🔄 **Iterate Based on Data, Not Opinions**: Everyone has opinions about your business. Most are wrong. Listen to paying customers and measurable results.',
    '🎯 **Focus on One Thing**: Trying to do everything = doing nothing well. Pick ONE problem, ONE customer segment, ONE channel. Master it. Then expand.',
    '📚 **Learn from Failures (Yours and Others\')**: Every successful entrepreneur has failed. Study their failures. Learn from your own. Each failure increases odds of future success.'
  ],

  commonMistakes: [
    '❌ **Building Without Customer Validation**: Spending months building something nobody wants. Solution: Talk to 20+ potential customers BEFORE building anything.',
    '❌ **Perfectionism Paralysis**: Waiting until product is "perfect" to launch. Competitors ship, you\'re still planning. Solution: Launch MVP in 2 weeks, improve based on feedback.',
    '❌ **Falling in Love with Your Solution**: Refusing to pivot when customers clearly don\'t want your solution. Solution: Stay attached to problem, flexible on solution.',
    '❌ **Ignoring Unit Economics**: Making $10 per sale but spending $50 to acquire customer. Growth = faster death. Solution: Understand customer acquisition cost vs. lifetime value from day one.',
    '❌ **Building for Everyone**: "Our target market is everyone" = target market is nobody. Solution: Start with narrow, specific niche. Expand later.',
    '❌ **Analysis Paralysis**: Spending 6 months researching and planning. Solution: Set deadline. Research 2 weeks max, then take action.',
    '❌ **Assuming You Know What Customers Want**: Building based on your assumptions, not customer needs. Solution: Customer discovery interviews, test all assumptions.',
    '❌ **Copying Without Understanding**: Seeing successful company and copying surface-level features without understanding why they work. Solution: Understand principles, adapt to your context.',
    '❌ **Quitting Too Early**: Giving up after first rejection or slow month. Solution: Commit to 6 months minimum. Track progress. Decide based on data, not emotions.',
    '❌ **Scaling Prematurely**: Spending on ads, hiring team before proving product-market fit. Solution: Get to 10-100 customers manually first. Prove it works. Then scale.',
    '❌ **Ignoring Feedback**: Customers tell you what\'s wrong, you ignore because it contradicts your vision. Solution: Listen, especially to early adopters who actually use your product.',
    '❌ **Focusing on Features, Not Benefits**: Talking about what your product does instead of what problem it solves. Solution: Lead with the problem and outcome, not features.',
    '❌ **Not Charging Enough**: Underpricing because you\'re afraid nobody will pay. Solution: Price based on value delivered, not cost to produce. Test higher prices.',
    '❌ **Doing Everything Yourself**: Trying to do design, development, marketing, sales, finance all alone. Solution: Find co-founder, outsource non-core tasks, focus on your strengths.',
    '❌ **Forgetting to Actually Ask for the Sale**: Building great product but never directly asking people to buy. Solution: Clear call-to-action, simple buying process, ask for commitment.'
  ],

  nextSteps: [
    '📝 **Start Your Opportunity Journal Today**: Buy notebook or create digital doc. For next 30 days, record 3 problems daily. Review at end of month.',
    '💡 **Pick ONE Idea to Validate This Week**: Choose your best idea. Create landing page OR offer service manually to 5 people. Get real feedback.',
    '🗣️ **Schedule 10 Customer Discovery Interviews**: Find 10 people who match your target customer. Interview them using provided questions. Look for patterns.',
    '🎨 **Complete a Design Thinking Sprint**: Pick a problem. Go through all 5 stages (Empathize, Define, Ideate, Prototype, Test) in one week.',
    '🚀 **Build Your MVP in 48 Hours**: This weekend, create simplest version of your idea. Landing page, manual service, or basic prototype. Launch it.',
    '📊 **Join Entrepreneur Communities**: Find local startup meetups, online communities (Indie Hackers, r/Entrepreneur), or school entrepreneurship clubs. Network.',
    '📚 **Read Startup Classics**: "The Lean Startup" (Eric Ries), "Zero to One" (Peter Thiel), "The Mom Test" (Rob Fitzpatrick). Apply learnings.',
    '🤝 **Find a Mentor or Accountability Partner**: Reach out to local entrepreneur, teacher, or parent who\'s started a business. Ask for monthly check-ins.',
    '💼 **Start a Side Project**: Even if not "the big idea", start something small. Sell something online, offer a service, create content. Learn by doing.',
    '🎯 **Set 90-Day Goals**: Specific, measurable targets. Example: "Interview 50 people, build MVP, get 10 paying customers by [date]". Review weekly progress.',
    '📱 **Build in Public**: Start documenting your entrepreneurial journey on social media. Share learnings, struggles, wins. Build your network.',
    '🧠 **Practice Creative Frameworks Daily**: Each day, apply one framework (SCAMPER, First Principles, etc.) to a random problem. Build creative muscle.',
    '🔄 **Review and Reflect Weekly**: Every Sunday, review: What worked? What didn\'t? What did I learn? What will I try differently? Adjust course.',
    '🎓 **Consider Entrepreneurship Programs**: Look for school programs, Young Enterprise, Startup Weekend events, or online courses to deepen learning.',
    '🚀 **Most Important: TAKE ACTION**: Reading this is great. Applying it is what matters. Pick ONE action from this list. Do it TODAY. Entrepreneurship is learned by doing, not studying.'
  ]
};

export default entrepreneurialCreativityContent;

