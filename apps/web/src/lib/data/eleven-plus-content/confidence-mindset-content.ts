import { LessonContent } from './verbal-reasoning-content';

/**
 * 11+ Confidence & Exam Mindset Content
 * Age-appropriate content for 10/11-year-olds preparing for 11+ exams
 * Focus: Building confidence, managing stress, developing positive mindset
 * Tone: Friendly, supportive, relatable, encouraging
 */

export const confidenceMindsetContent: LessonContent[] = [
  // ==================== MODULE 1: UNDERSTANDING EXAM STRESS ====================
  {
    moduleNumber: 1,
    title: 'Understanding Exam Stress',
    duration: '20 minutes',
    introduction: `Hey there! 👋 Let's talk about something that happens to EVERYONE - feeling nervous about exams. The good news? It's totally normal, and we're going to help you understand why it happens and what you can do about it!

Think of your brain like a superhero with different powers. Sometimes it gets a bit overexcited and sends out "worry signals" even when there's no real danger. We're going to learn how to tell your brain, "Thanks for trying to help, but I've got this!" 😊`,
    keyPoints: [
      'Feeling nervous about exams is completely normal - it happens to everyone!',
      'Your body has a natural alarm system that sometimes goes off at the wrong time.',
      'Stress can actually HELP you perform better (in small amounts).',
      'You can learn to control your stress instead of it controlling you.',
      'Your friends probably feel the same way, even if they don\'t show it.',
      'Understanding stress is the first step to managing it.'
    ],
    explanation: `
**What Is Exam Stress, Really?**

Imagine your brain has a smoke alarm. It's meant to keep you safe by warning you about danger. But sometimes, it goes off when you're just making toast - not because there's a real fire!

Exam stress is like that. Your brain thinks, "Oh no, an exam! That's scary!" and turns on your body's alarm system. This makes your:
- Heart beat faster
- Hands feel sweaty
- Tummy feel weird or "butterflies"
- Mind race with thoughts

**But here's the cool part:** This is your body trying to help you! It's giving you extra energy and focus. The problem is, it sometimes gives you TOO much, and that's when you feel stressed.

**Why Do Exams Feel Scary?**

Your brain worries about exams for a few reasons:
1. **They're important** - You know it matters, so your brain pays extra attention
2. **They're unknown** - Your brain doesn't like surprises
3. **You care about doing well** - This is actually a GOOD thing!
4. **Everyone talks about them** - Parents, teachers, friends - it can feel like a big deal

**The Secret About Stress**

Here's something amazing: A little bit of stress is actually HELPFUL! It's like having a turbo boost in a video game. It helps you:
- Focus better
- Remember things more clearly
- Have energy to keep going
- Care about doing your best

The trick is learning to have just the right amount - not too much, not too little. Like Goldilocks and her porridge - just right! 🥣

**You're Not Alone**

Almost every student taking the 11+ feels nervous sometimes. Even students who seem super confident get worried! The difference is, some have learned tricks to manage it, and that's exactly what you're learning now.

**What's Normal?**

✅ Feeling a bit nervous before exams
✅ Worrying if you'll do well
✅ Finding it hard to sleep the night before
✅ Getting butterflies in your tummy
✅ Overthinking mistakes

**What's NOT Helpful?**

❌ Thinking you're the only one feeling this way
❌ Believing stress means you can't do it
❌ Letting worry stop you from trying
❌ Thinking everyone else finds it easy

**The Good News**

You can learn to work WITH your stress, not against it. By the end of this course, you'll have a whole toolbox of tricks to help you feel calm, confident, and ready for anything! 🌟
    `,
    examples: [
      {
        question: 'EXAMPLE: Imagine you\'re about to take a mock exam and you notice your heart beating fast. What\'s happening?',
        workingOut: `Step 1: Recognize this is your body's alarm system turning on.
Step 2: Remember this is NORMAL and happens to everyone.
Step 3: Tell yourself: "My body is giving me energy to focus. Thanks, body!"
Step 4: Take 3 slow, deep breaths.
Step 5: Remind yourself you've practiced and you're ready.`,
        answer: 'Your body is trying to help by giving you extra energy and focus. It\'s normal!',
        explanation: 'Fast heartbeat before an exam is your body\'s natural response. It\'s preparing you to perform at your best. This is actually helpful in small amounts - it means you care and you\'re ready to try your hardest!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: Is feeling nervous about exams normal?',
        options: ['Yes, everyone feels it sometimes', 'No, only weak people feel nervous', 'Maybe, but I shouldn\'t feel it', 'I don\'t know'],
        answer: 'Yes, everyone feels it sometimes',
        explanation: 'Feeling nervous about exams is completely normal and happens to everyone - even adults! It shows you care about doing well, which is a good thing.',
        difficulty: 'easy'
      },
      {
        question: 'Q2: What is exam stress trying to do?',
        options: ['Make you fail', 'Help you by giving extra energy', 'Punish you', 'Make you give up'],
        answer: 'Help you by giving extra energy',
        explanation: 'Your body\'s stress response is actually trying to HELP you! It gives you energy, focus, and alertness. The trick is learning to use it the right way.',
        difficulty: 'easy'
      },
      {
        question: 'Q3: Which is a normal sign of exam stress?',
        options: ['Butterflies in your tummy', 'Turning green', 'Growing taller', 'Becoming invisible'],
        answer: 'Butterflies in your tummy',
        explanation: 'Butterflies in your tummy (that weird, fluttery feeling) is a super common sign of nervousness. It\'s your body\'s way of preparing for something important.',
        difficulty: 'easy'
      },
      {
        question: 'Q4: Can a little bit of stress actually help you?',
        options: ['Yes, it helps you focus', 'No, all stress is bad', 'Only on Tuesdays', 'Only if you\'re tall'],
        answer: 'Yes, it helps you focus',
        explanation: 'The right amount of stress is like a superpower! It helps you focus better, remember things more clearly, and gives you energy. Too much is the problem, which is why we learn to manage it.',
        difficulty: 'medium'
      },
      {
        question: 'Q5: If your friend seems confident, does that mean they\'re not nervous?',
        options: ['No, they might be nervous inside', 'Yes, confident people never worry', 'Maybe, depends on their hair color', 'Only if they smile a lot'],
        answer: 'No, they might be nervous inside',
        explanation: 'Just because someone looks confident doesn\'t mean they don\'t feel nervous inside! Many people are good at hiding their nerves. Remember, almost everyone feels nervous about exams.',
        difficulty: 'medium'
      },
      {
        question: 'Q6: What\'s the best way to think about exam stress?',
        options: ['It\'s my body trying to help me', 'It means I\'m going to fail', 'It\'s a sign of weakness', 'I should ignore it completely'],
        answer: 'It\'s my body trying to help me',
        explanation: 'The healthiest way to think about stress is as your body\'s way of helping you prepare for something important. Understanding this helps you work WITH your stress instead of fighting against it.',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Remember: nerves mean you CARE about doing well. That\'s awesome! 🌟',
      'Your body is on YOUR team, even when it feels weird.',
      'Talk to your friends - you\'ll be surprised how many feel the same way!',
      'Parents felt the same when they were your age (ask them!).',
      'Every time you practice managing stress, you get better at it - like leveling up in a game!',
      'Write down your worries - getting them out of your head onto paper really helps.',
      'Remember a time you felt nervous but then did great - you can do it again!',
      'It\'s okay to tell adults when you\'re feeling worried - they want to help.'
    ],
    commonMistakes: [
      'Thinking you\'re the only one feeling nervous (you\'re definitely not!).',
      'Believing that stress means you can\'t do well (it doesn\'t!).',
      'Trying to stop feeling nervous completely (a little is actually helpful!).',
      'Keeping worries bottled up instead of talking about them.',
      'Comparing yourself to others (everyone\'s journey is different).',
      'Thinking nerves are "bad" or something to be ashamed of.'
    ],
    examStrategy: `
**Your Stress-Busting Game Plan:**

**When You First Notice Stress:**
1. Say to yourself: "This is normal, and I can handle it."
2. Take 3 slow, deep breaths (we'll learn more about this next!)
3. Remember: nerves mean you care - that's a GOOD thing!

**Before You Practice or Take Exams:**
- Remind yourself of times you've done well before
- Think: "I've practiced, and I'm ready"
- Do something that makes you feel good (stretch, drink water, smile!)

**If Stress Feels Too Big:**
- Talk to a parent, teacher, or trusted adult
- Write down what you're worried about
- Remember: you don't have to be perfect!

**Daily Habit:**
- Each night, think of one thing you did well that day
- Tell yourself: "Tomorrow, I'll do my best, and that's enough"

**Remember:** You're learning an important life skill here! Managing stress isn't just for exams - it's for EVERYTHING. You're becoming stronger and more confident every day! 💪😊

**Quick Check-In:**
After reading this module, you now understand:
✅ What stress is and why it happens
✅ That it's completely normal
✅ How it can actually help you
✅ That you're not alone in feeling this way

Great job! You're already on your way to becoming a stress-management champion! 🏆
    `
  },

  // ==================== MODULE 2: BREATHING AND RELAXATION TECHNIQUES ====================
  {
    moduleNumber: 2,
    title: 'Breathing and Relaxation Techniques',
    duration: '20 minutes',
    introduction: `Did you know you have a superpower that's with you ALL the time? It's FREE, always works, and you can use it ANYWHERE - even in the middle of an exam! 🦸

What is it? Your BREATHING! 💨

Sounds too simple to be true, right? But your breath is like a remote control for your nervous system. When you breathe in certain ways, you can literally tell your body: "Hey, it's time to calm down now." Let's learn how!`,
    keyPoints: [
      'Your breathing affects how you feel - and you can control it!',
      'Slow, deep breaths tell your body to relax.',
      'You can use breathing techniques ANYWHERE - even during exams.',
      'Practice makes perfect - the more you do it, the better it works.',
      'Different techniques work for different people - find your favorite!',
      'Breathing exercises are used by athletes, actors, and even astronauts!'
    ],
    explanation: `
**Why Does Breathing Matter?**

Your breath and your feelings are connected like best friends. When you're scared or stressed:
- Your breathing gets FAST and SHALLOW (short little breaths)
- This tells your brain: "Danger! Stay alert!"

But when you're calm and relaxed:
- Your breathing is SLOW and DEEP (long, full breaths)
- This tells your brain: "Everything's okay. You can relax!"

Here's the AMAZING part: You can trick your brain! By breathing slowly on purpose, even when you're nervous, your brain thinks: "Oh, we must be safe if we're breathing calmly" - and it helps you relax! 🧠✨

**The Science Bit (The Cool Part!)**

When you breathe slowly:
- Your heart rate slows down
- Your muscles relax
- Your mind becomes clearer
- You feel more in control

It's like magic, but it's actually science! Your body has an automatic system that breathing can control.

**When Can You Use This?**

✨ Before an exam (in the waiting area)
✨ During an exam (if you feel panicky)
✨ When you're studying and feel overwhelmed
✨ Before bed if you can't sleep
✨ Anytime you feel worried or nervous
✨ Even when you're not stressed - it feels nice!

**The Best Techniques for 10/11-Year-Olds**

We're going to learn 5 EASY breathing techniques. Each one has a fun name to help you remember it!

---

**TECHNIQUE 1: 4-7-8 Breathing (The Sleep Wizard)** 🧙‍♂️

This one is great for bedtime or when you need to calm down FAST.

**How to do it:**
1. Breathe OUT completely through your mouth (whoosh!)
2. Close your mouth and breathe IN through your nose for 4 counts (1, 2, 3, 4)
3. Hold your breath for 7 counts (1, 2, 3, 4, 5, 6, 7)
4. Breathe OUT through your mouth for 8 counts (1, 2, 3, 4, 5, 6, 7, 8)
5. Repeat 3-4 times

**Why it works:** The long breath out tells your body to activate "rest mode"!

---

**TECHNIQUE 2: Box Breathing (The Square)** 📦

This one is used by athletes and even Navy SEALs! It's perfect for staying calm under pressure.

**How to do it:**
Imagine drawing a square in your mind:
1. Breathe IN for 4 counts (drawing the first side)
2. HOLD for 4 counts (second side)
3. Breathe OUT for 4 counts (third side)
4. HOLD for 4 counts (fourth side)
5. Repeat 4-5 times

**Why it works:** The even pattern helps your brain focus and calms racing thoughts!

---

**TECHNIQUE 3: Balloon Breathing (The Inflator)** 🎈

This is super easy and fun - great for younger siblings too!

**How to do it:**
1. Imagine a balloon in your belly
2. Breathe IN slowly through your nose, filling the balloon (your belly goes OUT)
3. Breathe OUT slowly through your mouth, deflating the balloon (belly goes IN)
4. Do this 5-10 times

**Why it works:** Belly breathing (not chest breathing) is the deepest, most calming kind!

---

**TECHNIQUE 4: 5-Finger Breathing (The Hand Helper)** ✋

Perfect for during exams because it looks like you're just resting your hand!

**How to do it:**
1. Hold one hand out in front of you
2. With your other hand's finger, trace up and down each finger
3. Breathe IN as you trace UP a finger
4. Breathe OUT as you trace DOWN
5. By the time you've traced all 5 fingers, you've done 5 calming breaths!

**Why it works:** It gives your mind something to focus on while you breathe!

---

**TECHNIQUE 5: Bunny Breathing (The Quick Calm)** 🐰

This is the fastest one - perfect for a quick calm-down!

**How to do it:**
1. Take 3 quick sniffs in through your nose (sniff, sniff, sniff)
2. One long breath out through your mouth (ahhhh)
3. Repeat 3 times

**Why it works:** Quick ins followed by long outs rapidly activate your calm system!

---

**Choosing Your Favorite**

Everyone's different! Try all of these and see which one YOU like best. You might like:
- **4-7-8** if you need help sleeping
- **Box Breathing** if you like patterns and counting
- **Balloon Breathing** if you want something simple
- **5-Finger** if you need to be sneaky in an exam
- **Bunny** if you need quick results

**Practice Time!**

The cool thing about breathing is that it's like a skill in a video game - the more you practice, the better you get! 

Try to practice your favorite breathing technique:
- Every morning when you wake up (just 2 minutes!)
- Before you start homework
- Before bed
- Anytime you remember!

The more you practice when you're NOT stressed, the easier it will be to use when you ARE stressed!
    `,
    examples: [
      {
        question: 'EXAMPLE: You\'re in the exam hall waiting for papers to be handed out. Your heart is racing. What can you do?',
        workingOut: `Step 1: Choose a breathing technique (let's use 5-Finger Breathing since it's quiet and sneaky)
Step 2: Place one hand on your lap where you can see it
Step 3: Trace up your thumb as you breathe IN slowly
Step 4: Trace down your thumb as you breathe OUT slowly
Step 5: Continue for all 5 fingers
Step 6: Notice how much calmer you feel
Step 7: Tell yourself: "I'm ready now"`,
        answer: 'Use 5-Finger Breathing - quiet, subtle, and works perfectly in an exam hall!',
        explanation: '5-Finger Breathing is ideal for exam situations because it looks like you\'re just resting your hand, but you\'re actually doing a powerful calming technique. By the time you finish, you\'ll feel much calmer and ready to start!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: How does slow breathing help you feel calmer?',
        options: ['It tells your brain you\'re safe', 'It makes you tired', 'It stops your heart', 'It doesn\'t help'],
        answer: 'It tells your brain you\'re safe',
        explanation: 'When you breathe slowly and deeply, it sends a signal to your brain that says "everything is okay." Your brain then tells your body to relax!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: When can you use breathing techniques?',
        options: ['Only before bed', 'Only at home', 'Anywhere, anytime!', 'Only when a teacher says so'],
        answer: 'Anywhere, anytime!',
        explanation: 'That\'s the amazing thing about breathing - you can use it ANYWHERE! Before exams, during exams, at home, at school, even on the bus. Your breath is always with you!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: In Box Breathing, how long do you breathe in for?',
        options: ['2 counts', '4 counts', '10 counts', 'As long as possible'],
        answer: '4 counts',
        explanation: 'Box Breathing uses 4 counts for everything: breathe in for 4, hold for 4, breathe out for 4, hold for 4. It makes a perfect "box" pattern!',
        difficulty: 'easy'
      },
      {
        question: 'Q4: Which breathing technique is best for sneaky use during an exam?',
        options: ['Balloon Breathing', '5-Finger Breathing', 'Bunny Breathing', 'Shouting loudly'],
        answer: '5-Finger Breathing',
        explanation: '5-Finger Breathing is perfect for exams because it looks like you\'re just resting your hand on the desk. No one else needs to know you\'re doing a calming technique!',
        difficulty: 'medium'
      },
      {
        question: 'Q5: What makes breathing techniques work better?',
        options: ['Practicing regularly', 'Only doing them once', 'Thinking they won\'t work', 'Breathing really fast'],
        answer: 'Practicing regularly',
        explanation: 'Breathing techniques are like a muscle - the more you practice, the stronger they get! Practice when you\'re calm so they\'re easy to use when you\'re stressed.',
        difficulty: 'medium'
      },
      {
        question: 'Q6: What\'s the MAIN benefit of learning breathing techniques?',
        options: ['You can control how calm you feel', 'You\'ll never feel nervous', 'You\'ll get 100% on exams', 'You can hold your breath forever'],
        answer: 'You can control how calm you feel',
        explanation: 'The superpower of breathing is that it gives YOU control over how calm you feel. You won\'t never feel nervous (that\'s normal!), but you CAN manage it and feel more in control!',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Practice your favorite breathing technique every day - even just for 2 minutes!',
      'Try different techniques and find YOUR favorite - everyone\'s different!',
      'Put a reminder on your phone or make a poster for your room.',
      'Teach your breathing technique to a friend or family member - it helps you remember!',
      'Use breathing BEFORE you feel really stressed - don\'t wait until panic hits!',
      'If counting in your head is distracting, try saying the counts silently: "In-two-three-four".',
      'Make it fun! Imagine you\'re a dragon when you breathe out, or a balloon filling with air.',
      'Remember: professional athletes use these exact same techniques before big competitions!'
    ],
    commonMistakes: [
      'Breathing too fast - slow down! This isn\'t a race.',
      'Only trying breathing when you\'re super stressed (practice when calm too!).',
      'Giving up if it doesn\'t work immediately - it takes practice!',
      'Breathing with your chest instead of your belly (belly breathing is better!).',
      'Thinking you have to be perfect at it (any calm breathing is helpful!).',
      'Forgetting to breathe during exams because you\'re too focused (set a mental reminder!).'
    ],
    examStrategy: `
**Your Breathing Game Plan for Exams:**

**One Week Before Exam:**
- Practice your chosen technique for 5 minutes every day
- Try it in different places (bedroom, kitchen, car)
- Use it before mock exams to test it out

**The Night Before:**
- Use 4-7-8 Breathing to help you sleep
- Do it lying in bed with lights off
- If you wake up nervous, do it again!

**Exam Morning:**
- Start your day with 5 minutes of your favorite technique
- Use it in the car or bus on the way to the exam
- One more round right before you go into the exam hall

**In the Exam Hall (Before Start):**
- Use 5-Finger Breathing (quiet and sneaky!)
- Or Box Breathing if you like counting
- Just 3-5 rounds to feel calm and focused

**During the Exam (If You Feel Panicky):**
- Stop for just 10 seconds
- Do 3 slow, deep breaths
- Tell yourself: "I'm okay, I can do this"
- Continue with renewed calm

**After the Exam:**
- Take a few deep breaths to release any leftover tension
- Celebrate that you used your breathing superpower!

**Remember:**
- Your breath is ALWAYS with you - it's your secret weapon!
- Even ONE deep breath can help
- The more you practice, the more powerful it becomes
- You've got this! 💪😊

**Try This Tonight:**
Before bed tonight, try the 4-7-8 Breathing technique 4 times. Notice how calm and sleepy you feel! That\'s your superpower working! ✨
    `
  },

  // ==================== MODULE 3: POSITIVE SELF-TALK ====================
  {
    moduleNumber: 3,
    title: 'Positive Self-Talk',
    duration: '25 minutes',
    introduction: `Quick question: What's the voice inside your head saying to you right now? 🤔

We all have a little voice in our head that talks to us ALL day long. Sometimes it's nice and helpful: "You can do this! You're doing great!" But sometimes... it's not so nice: "You're going to mess this up. You're not good enough."

Here's the super cool thing: YOU get to decide what that voice says! You can train it to be your biggest cheerleader instead of your worst critic. Let's learn how! 🎉`,
    keyPoints: [
      'The way you talk to yourself affects how you feel and perform.',
      'Everyone has negative thoughts sometimes - it\'s normal!',
      'You can CHOOSE to change negative thoughts into helpful ones.',
      'Positive self-talk isn\'t lying to yourself - it\'s being your own friend.',
      'What you practice grows stronger - practice positive thinking!',
      'Your brain believes what you tell it repeatedly.'
    ],
    explanation: `
**What Is Self-Talk?**

Self-talk is the conversation you have with yourself in your head. You might not realize it, but you're talking to yourself ALL the time!

Examples of self-talk:
- "This maths question is hard"
- "I'm good at spelling"
- "I always mess up on tests"
- "I can figure this out"

Some of these are helpful, and some... not so much! The good news? You can change them!

**Why Does It Matter?**

Imagine you have two friends:

**Friend 1 says:** "You're going to fail. You're not smart enough. Everyone else is better than you. Don't even try."

**Friend 2 says:** "You've got this! You've practiced hard. Just do your best. I believe in you!"

Which friend would help you do better on a test? Obviously Friend 2, right?

Well, YOUR self-talk is like having one of these friends in your head ALL the time. Wouldn't you rather have the encouraging friend? 😊

**The Science Part (Really Cool!)**

Scientists have found that:
- When you think "I can't do this," your brain starts looking for evidence that you're right
- When you think "I can do this," your brain starts looking for ways to make it happen
- Your brain doesn't know the difference between a real threat and an imagined one
- Positive self-talk actually makes you PERFORM BETTER on tests!

It's like your brain is a search engine - it finds what you're looking for!

**Types of Self-Talk**

**😢 Unhelpful Self-Talk (The Mean Friend):**
- "I'm terrible at this"
- "I always fail"
- "Everyone else is better than me"
- "I can't do it"
- "I'm going to mess up"
- "What's the point in trying?"

**😊 Helpful Self-Talk (The Good Friend):**
- "This is tricky, but I can work it out"
- "I've done well before, I can do it again"
- "Everyone has different strengths"
- "I'll give it my best shot"
- "If I make a mistake, I'll learn from it"
- "Every bit of effort counts"

**Turning Thoughts Around**

The trick isn't to stop negative thoughts (that's really hard!). The trick is to NOTICE them and then CHANGE them into something more helpful.

It's like being a thought detective! 🔍

**The CATCH-CHECK-CHANGE Method:**

**1. CATCH the negative thought**
Notice when you're being mean to yourself.
"I just thought: I'm going to fail this exam"

**2. CHECK if it's true and helpful**
Ask yourself:
- Is this definitely true?
- Is thinking this helping me?
- Would I say this to my best friend?

**3. CHANGE it to something more helpful**
Turn it into something realistic AND kind:
"I'm worried about the exam, but I've been practicing and I'll do my best"

**Real Examples from Real Students:**

**Example 1:**
❌ "I'm rubbish at verbal reasoning"
⬇️ CATCH-CHECK-CHANGE ⬇️
✅ "Verbal reasoning is challenging for me, but I'm getting better with practice"

**Example 2:**
❌ "Everyone else finds this easy except me"
⬇️ CATCH-CHECK-CHANGE ⬇️
✅ "Others might find different things easy or hard. We all have our own strengths"

**Example 3:**
❌ "If I don't get into grammar school, I'm a failure"
⬇️ CATCH-CHECK-CHANGE ⬇️
✅ "I'm going to try my best. Whatever happens, I'll be okay and there are many paths to success"

**Power Phrases for Exams**

These are like magic spells for your brain! Pick your favorites and practice saying them:

**Before the Exam:**
- "I've prepared well, and I'm ready"
- "I'll do my best, and that's all I can do"
- "Feeling nervous just means I care - that's okay"
- "I've got this!"
- "One question at a time"

**During the Exam:**
- "Breathe. Focus. I can do this"
- "This question is hard, but I'll try my best"
- "If I don't know this one, I'll move on and come back"
- "I'm doing great - keep going!"
- "My preparation is paying off"

**When You're Stuck:**
- "Let me think about this differently"
- "I'll skip this and come back fresh"
- "I know more than I think I do"
- "One step at a time"
- "If I can't get it all, I'll get what I can"

**After the Exam:**
- "I tried my best, and that's what matters"
- "I can't change it now, so I'll let it go"
- "I learned something from this experience"
- "I'm proud of myself for trying"

**Making It a Habit**

The more you practice positive self-talk, the more natural it becomes. It's like learning a new language - at first it feels weird, but then it becomes automatic!

**Daily Practice Ideas:**
1. **Morning Affirmations:** Start each day with 3 positive statements
2. **Thought Journal:** Write down negative thoughts and flip them
3. **Sticky Notes:** Put encouraging messages around your room
4. **Buddy System:** Practice with a friend - catch each other's negative talk

**Important:** Positive self-talk doesn't mean lying to yourself or pretending everything's perfect. It means being REALISTIC and KIND to yourself at the same time.

It's the difference between:
- "This exam will be super easy!" (Unrealistic)
- "This exam will be challenging, and I'm as prepared as I can be" (Realistic AND kind)
    `,
    examples: [
      {
        question: 'EXAMPLE: You get a practice question wrong and think: "I\'m so stupid, I\'ll never get this right." Use CATCH-CHECK-CHANGE to fix this thought.',
        workingOut: `CATCH: "I'm so stupid, I'll never get this right"

CHECK: 
- Is this definitely true? No! Getting one question wrong doesn't make me stupid
- Is this helpful? No, it makes me feel worse
- Would I say this to my friend? Never!

CHANGE:
"I got this question wrong, but that's how I learn. I'll understand it now and remember it for the exam"`,
        answer: 'Changed thought: "I got this question wrong, but that\'s how I learn. Now I\'ll remember it for the exam!"',
        explanation: 'Getting questions wrong during practice is actually GOOD - it\'s how you learn! The new thought is realistic (you did get it wrong) but kind and helpful (you\'re learning from it).'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: What is self-talk?',
        options: ['Talking out loud to yourself', 'The voice in your head', 'Only negative thoughts', 'Speaking to others'],
        answer: 'The voice in your head',
        explanation: 'Self-talk is the internal conversation you have with yourself all day long. It\'s that voice in your head that comments on things, makes decisions, and sometimes worries!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: Does everyone have negative thoughts sometimes?',
        options: ['Yes, it\'s completely normal', 'No, only worried people', 'Only people who aren\'t smart', 'No one has negative thoughts'],
        answer: 'Yes, it\'s completely normal',
        explanation: 'Everyone - even super confident people, adults, teachers, athletes - everyone has negative thoughts sometimes. The difference is learning what to do with them!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: Change this thought: "I always fail at maths." What\'s a better version?',
        options: ['"Maths is challenging, but I\'m improving"', '"Maths is impossible"', '"I should give up on maths"', '"Everyone else is better"'],
        answer: '"Maths is challenging, but I\'m improving"',
        explanation: 'This new thought is realistic (maths IS hard!) but also kind and encouraging (you\'re improving!). It acknowledges the challenge without being mean to yourself.',
        difficulty: 'medium'
      },
      {
        question: 'Q4: What does CATCH-CHECK-CHANGE help you do?',
        options: ['Turn negative thoughts into helpful ones', 'Catch a ball', 'Check your answers', 'Change your clothes'],
        answer: 'Turn negative thoughts into helpful ones',
        explanation: 'CATCH-CHECK-CHANGE is a method to notice negative thoughts, check if they\'re helpful, and change them into something more supportive and realistic.',
        difficulty: 'easy'
      },
      {
        question: 'Q5: Is positive self-talk the same as lying to yourself?',
        options: ['No, it\'s being realistic AND kind', 'Yes, you\'re pretending', 'Only if you\'re not honest', 'It doesn\'t matter'],
        answer: 'No, it\'s being realistic AND kind',
        explanation: 'Positive self-talk isn\'t about pretending everything\'s perfect. It\'s about being honest about challenges while also being kind and encouraging to yourself - like a good friend would be!',
        difficulty: 'medium'
      },
      {
        question: 'Q6: Your friend says: "I\'m going to fail, I just know it!" What should you tell them?',
        options: ['"You\'ve prepared well, you\'ll do your best"', '"Yeah, you probably will fail"', '"Stop worrying!"', '"Exams don\'t matter"'],
        answer: '"You\'ve prepared well, you\'ll do your best"',
        explanation: 'When helping a friend (or yourself!), acknowledge their feelings but remind them of the truth - they\'ve prepared, and doing their best is all anyone can do. This is supportive AND realistic!',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Start each morning by saying 3 positive things to yourself in the mirror! 🪞',
      'Keep a "wins" jar - write down good things and read them when you\'re feeling down.',
      'Notice when you\'re being mean to yourself - would you talk to a friend that way? No? Then don\'t talk to yourself that way!',
      'Create a personal mantra: a short, powerful phrase you repeat (e.g., "I am capable and strong").',
      'Write encouraging notes to yourself and hide them in your study materials.',
      'Ask parents to write you encouraging messages for exam day.',
      'Remember: positive self-talk feels weird at first, but gets easier with practice!',
      'Talk to yourself like you\'re coaching your future self to victory! 🏆'
    ],
    commonMistakes: [
      'Expecting positive thoughts to work instantly (they take practice!).',
      'Being too harsh when you catch yourself thinking negatively (be kind about being kind!).',
      'Thinking positive self-talk means you\'ll never feel nervous (you will, that\'s normal!).',
      'Giving up if it feels silly at first (that feeling goes away!).',
      'Only practicing when you\'re stressed (practice when calm too!).',
      'Comparing your inside feelings to others\' outside appearances (you don\'t know what they\'re thinking!).'
    ],
    examStrategy: `
**Your Self-Talk Strategy for Success:**

**Starting Today:**
- Keep a thought journal: write down negative thoughts and flip them
- Practice your power phrases every day
- Put positive sticky notes around your room

**This Week:**
- Choose your top 3 power phrases and practice them
- Notice your negative thoughts without judging yourself
- Practice CATCH-CHECK-CHANGE every time you notice unhelpful thinking

**The Week Before Exams:**
- Read your power phrases every morning
- Write yourself an encouraging letter for exam day
- Practice positive self-talk during mock exams

**On Exam Day:**
- Start with your morning affirmation routine
- Repeat your power phrases on the way to the exam
- Have a mantra ready for tough moments: "Breathe. I\'ve got this."

**During the Exam:**
When you catch a negative thought:
1. Pause for 3 seconds
2. Take a deep breath
3. Replace with a power phrase
4. Smile (even a tiny one helps!)
5. Continue with renewed confidence

**Your Emergency Power Phrase:**
Choose ONE phrase to be your go-to in really tough moments. Examples:
- "I am capable and prepared"
- "One question at a time"
- "I\'ve got this"
- "My best is good enough"

Write it on your hand, say it 10 times before the exam, and use it whenever you need it!

**Remember:**
Your mind is incredibly powerful. What you tell it repeatedly, it starts to believe. So tell it good things! You\'re not lying - you\'re being your own best friend and biggest supporter! 💪😊

**Tonight\'s Challenge:**
Say 3 kind things to yourself before bed. Make it a habit. You deserve your own kindness! 🌟
    `
  }

  ,

  // ==================== MODULE 4: GROWTH MINDSET DEVELOPMENT ====================
  {
    moduleNumber: 4,
    title: 'Growth Mindset Development',
    duration: '25 minutes',
    introduction: `Pop quiz! What do you think is more important for success: 🧠

A) Being naturally "smart"
B) Working hard and practicing

If you answered B, you're absolutely right! And guess what? Scientists have proven it! 🔬

Welcome to the world of Growth Mindset - one of the most powerful secrets for success that even adults are still learning about. By the end of this module, you'll understand why effort is your superpower! 💪✨`,
    keyPoints: [
      'Your brain is like a muscle - it grows stronger when you use it!',
      'Being "smart" isn\'t something you\'re born with - it\'s something you BUILD.',
      'Mistakes are your brain\'s way of growing - they\'re GOOD things!',
      'The word "yet" is magical - "I can\'t do it... YET!"',
      'People who succeed aren\'t just "naturally good" - they practiced A LOT.',
      'Challenges make you stronger, not weaker!'
    ],
    explanation: `
**What Is a Growth Mindset?**

Imagine two students:

**Student A (Fixed Mindset)** thinks:
- "I'm either good at things or I'm not"
- "If I fail, it means I'm not smart"
- "Smart people don't have to try hard"
- "If it's difficult, I should give up"

**Student B (Growth Mindset)** thinks:
- "I can get better at anything with practice"
- "If I fail, it means I need to learn more"
- "Trying hard helps me grow my brain"
- "If it's difficult, it's making me stronger!"

Which student do you think does better? Student B! And here's the cool part - ANYONE can learn to think like Student B!

**The Science Bit (Super Cool!)** 🧠

Scientists discovered something amazing: Your brain is like a muscle. When you practice something, your brain actually GROWS new connections! It's called neuroplasticity (say: noo-roh-plas-TIS-it-ee).

Every time you:
- Try something hard
- Make a mistake and learn from it
- Practice a skill
- Think in a new way

...Your brain is literally building new pathways! It's like your brain is a Minecraft world and you're building new structures! 🏗️

**The Power of "YET"**

This is the most magical word you'll learn today: **YET**

Watch how it changes things:

❌ "I can't do fractions"
✅ "I can't do fractions... **YET!**"

❌ "I'm not good at non-verbal reasoning"
✅ "I'm not good at non-verbal reasoning... **YET!**"

❌ "I don't understand this"
✅ "I don't understand this... **YET!**"

See? Adding "YET" means you believe you CAN learn it - you just haven't mastered it YET! It changes everything!

**What Successful People Know**

Let me tell you some secrets about people you might think are "naturally talented":

**Athletes:** Lionel Messi practices football for HOURS every day. He wasn't born kicking perfectly!

**Musicians:** Taylor Swift wrote hundreds of songs before writing hits. She practiced and practiced!

**Scientists:** Albert Einstein failed his entrance exam to university at first! He kept trying!

**Authors:** J.K. Rowling was rejected by 12 publishers before Harry Potter was accepted!

The pattern? They all:
- Practiced A LOT
- Made lots of mistakes
- Kept trying when it was hard
- Believed they could improve

**Growth Mindset vs. Fixed Mindset**

Let's see the difference in real situations:

**Situation 1: You get a low score on a practice test**

Fixed Mindset: "I'm rubbish at tests. I'll never be good at this."
Growth Mindset: "This shows me what I need to practice more. Next time I'll do better!"

**Situation 2: A question is really hard**

Fixed Mindset: "I can't do this. I'll just skip it."
Growth Mindset: "This is challenging! Let me try a different approach."

**Situation 3: Your friend does better than you**

Fixed Mindset: "They're just smarter than me. There's no point trying."
Growth Mindset: "I can learn from them! Maybe they practiced differently?"

**Situation 4: You make a mistake**

Fixed Mindset: "I'm so stupid. I always mess up."
Growth Mindset: "Great! Now I know what to improve. Mistakes help me learn!"

**The Three Growth Mindset Rules**

**Rule 1: Challenge = Growth**
When something is easy, your brain isn't growing much. When it's HARD, that's when your brain is building new connections! So challenges are GOOD!

Think of it like exercise:
- Lifting a tiny weight = not much muscle growth
- Lifting a challenging weight = muscles grow!

Same with your brain!

**Rule 2: Effort = Success**
Your effort is what makes you better, not some magical "talent" you're born with.

Formula for success:
💪 Practice + 🎯 Focus + ⏰ Time = 🌟 Getting Better!

**Rule 3: Mistakes = Learning**
Every mistake teaches you something. No mistakes = no growth!

Think of mistakes like:
- Video game failures: You learn the level better each time!
- Learning to ride a bike: You fell off lots before you could do it!
- Learning to read: You got words wrong before you got them right!

**Developing Your Growth Mindset**

Here's how to train your brain to think in a growth mindset way:

**Daily Practice:**

1. **Notice Fixed Mindset Thoughts**
   When you think "I can't...", STOP!

2. **Add "YET"**
   "I can't... YET!"

3. **Ask Growth Questions**
   Instead of "Why am I bad at this?"
   Ask: "What can I do to get better at this?"

4. **Celebrate Effort, Not Just Success**
   Instead of: "I got it right!"
   Say: "I worked hard and figured it out!"

5. **Learn from Mistakes**
   Instead of: "I failed"
   Think: "What did this teach me?"

**Growth Mindset Phrases for Exams:**

Before Studying:
- "This practice will make my brain stronger!"
- "Challenges help me grow"
- "I'm going to learn something new today"

When It's Hard:
- "This is my brain getting stronger!"
- "I love a challenge!"
- "I can't do this YET, but I'm learning"

After Making a Mistake:
- "Awesome! Now I know what to practice"
- "Mistakes are proof that I'm trying"
- "This is how I learn!"

When You Succeed:
- "My hard work paid off!"
- "I kept trying and it worked!"
- "My practice made this possible"

**The Brain Growth Mindset**

Every time you practice something hard, imagine your brain like this:

🧠 + 💪 (effort) = 🧠🌟 (smarter brain!)

Your brain is building:
- New neural pathways
- Stronger connections
- Better problem-solving skills
- Increased understanding

**Real Student Examples:**

**Riya's Story:**
Riya found maths really hard. She thought "I'm just not a maths person." Then she learned about growth mindset. She started thinking "I'm not a maths person YET!" She practiced every day, asked for help, and learned from mistakes. Six months later, maths became one of her favorite subjects!

**Tom's Story:**
Tom always gave up when questions were too hard. He learned that hard questions make your brain grow. He started saying "This is my brain getting stronger!" when things were tough. Now he actually LIKES challenging questions!

**Your Story:**
What will YOUR growth mindset story be? It starts right now! 🌟
    `,
    examples: [
      {
        question: 'EXAMPLE: You\'re struggling with a type of question you\'ve practiced 10 times. Your brain says "I\'m never going to get this!" How do you respond with a growth mindset?',
        workingOut: `Step 1: Notice the fixed mindset thought
Step 2: Add "YET" - "I haven't got this YET"
Step 3: Ask a growth question: "What strategy haven't I tried?"
Step 4: Remember: struggle means your brain is growing!
Step 5: Try a new approach: maybe explain it to someone, draw it out, or ask for help
Step 6: Celebrate your effort!`,
        answer: '"I haven\'t mastered this YET! Each attempt is making my brain stronger. Let me try a different strategy!"',
        explanation: 'This response shows growth mindset by: adding YET (showing belief in improvement), recognizing effort as valuable (brain getting stronger), and being willing to try new approaches. Remember: struggling isn\'t failing - it\'s growing!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: What does "growth mindset" mean?',
        options: ['Believing you can improve with practice', 'Being naturally smart', 'Never making mistakes', 'Only doing easy things'],
        answer: 'Believing you can improve with practice',
        explanation: 'Growth mindset is believing that your abilities can be developed through effort, practice, and learning from mistakes. It\'s the opposite of thinking you\'re either "good" or "bad" at something naturally!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: Your brain is like a _____ that gets stronger when you use it.',
        options: ['muscle', 'bone', 'computer', 'phone'],
        answer: 'muscle',
        explanation: 'Just like muscles get stronger when you exercise them, your brain gets stronger (builds new connections) when you challenge it and practice!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: What does adding "YET" to "I can\'t do this" mean?',
        options: ['You believe you can learn it', 'You\'re giving up', 'It\'s impossible', 'You need help immediately'],
        answer: 'You believe you can learn it',
        explanation: '"I can\'t do this YET" means you haven\'t learned it so far, BUT you believe you can learn it with practice. It\'s a hopeful, growth mindset way of thinking!',
        difficulty: 'easy'
      },
      {
        question: 'Q4: In growth mindset, mistakes are seen as:',
        options: ['Opportunities to learn', 'Proof you\'re not smart', 'Things to avoid always', 'Embarrassing failures'],
        answer: 'Opportunities to learn',
        explanation: 'Growth mindset sees mistakes as valuable learning opportunities! They show you what to work on and help your brain grow new connections. No mistakes = no growth!',
        difficulty: 'medium'
      },
      {
        question: 'Q5: Why do successful people often practice A LOT?',
        options: ['Because practice builds skills', 'Because they\'re bored', 'Because it\'s easy for them', 'They don\'t need to practice'],
        answer: 'Because practice builds skills',
        explanation: 'Successful people know that talent is built through practice, not born naturally. They practice a lot BECAUSE it makes them better, not because they already find it easy!',
        difficulty: 'medium'
      },
      {
        question: 'Q6: When something is REALLY hard, what\'s happening in your brain?',
        options: ['It\'s growing new connections!', 'It\'s giving up', 'It\'s broken', 'Nothing useful'],
        answer: 'It\'s growing new connections!',
        explanation: 'This is the coolest part! When something challenges you, your brain is actively building new neural pathways. Difficulty = growth! That\'s why challenges are good things!',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Put a "YET" poster in your room - remind yourself daily!',
      'Keep a "growth log" - write down what you learned from mistakes each day.',
      'When you catch yourself in fixed mindset thinking, don\'t judge it - just add "YET"!',
      'Praise yourself for EFFORT, not just results: "I worked really hard on that!"',
      'Remember: every expert was once a beginner who didn\'t give up!',
      'Ask your parents about something they got better at through practice - you\'ll be surprised!',
      'Turn mistakes into "learning discoveries" - what did you discover today?',
      'Challenge yourself on purpose - that\'s where the growth happens! 🌱'
    ],
    commonMistakes: [
      'Thinking growth mindset means you\'ll never struggle (you will! That\'s the point!).',
      'Giving up on growth mindset if it doesn\'t work immediately (it takes practice!).',
      'Only using growth mindset for schoolwork (use it for sports, music, friendships - everything!).',
      'Thinking "smart" people don\'t need to try hard (everyone needs effort!).',
      'Comparing your beginning to someone else\'s middle (everyone starts somewhere!).',
      'Forgetting to celebrate effort even when results aren\'t perfect.'
    ],
    examStrategy: `
**Your Growth Mindset Exam Strategy:**

**Starting Now:**
- Every day, add "YET" to one thing you find difficult
- Keep a growth journal: "Today I learned..." or "Today\'s challenge helped me..."
- Celebrate effort, not just success!

**During Practice:**
When you make a mistake:
1. Say: "Great! Now I know what to practice!"
2. Figure out WHY you got it wrong
3. Practice that type of question again
4. Celebrate that you\'re learning!

**Before the Exam:**
- "All my practice has made my brain stronger"
- "Challenges in the exam will show how much I\'ve grown"
- "I\'m ready to try my best"

**During the Exam:**

When it\'s easy:
- "My practice is showing!"
- "I\'ve learned this well!"

When it\'s hard:
- "This is my brain getting stronger!"
- "I love a challenge - let me think..."
- "I\'ll try my best and learn from this"

If you make a mistake:
- "That\'s okay, mistakes happen"
- "I\'ll get the next one!"
- "I\'m still doing great"

**After the Exam:**
- Focus on the EFFORT you put in
- "I tried my hardest, and that\'s what matters"
- "I learned so much preparing for this"
- "Every exam makes me stronger for the next one"

**Long-Term:**
Growth mindset isn\'t just for exams - it\'s for LIFE!
- Sports: "I\'m not good at football YET!"
- Arts: "I can\'t draw that well YET!"
- Music: "I can\'t play that song YET!"
- Friendships: "I don\'t know how to handle that situation YET!"

**Your Growth Mindset Promise:**

"I promise to believe in my ability to grow and learn.
I will celebrate my efforts and learn from my mistakes.
I will add \'YET\' when things are hard.
I will remember that my brain gets stronger every time I try.
I am not afraid of challenges - they make me stronger!
My best effort is enough!" 💪🌟

**Try This Tonight:**
1. Think of ONE thing you think you\'re "not good at"
2. Add "YET" to it
3. Write down ONE small thing you could practice tomorrow to get better at it
4. Do it!

Remember: You\'re not stuck with the brain you have - you\'re building a better one every single day! 🧠✨
    `
  },

  // ==================== MODULE 5: HANDLING DIFFICULT QUESTIONS ====================
  {
    moduleNumber: 5,
    title: 'Handling Difficult Questions',
    duration: '20 minutes',
    introduction: `Imagine you\'re in the middle of your exam and you come across a question that looks like it\'s written in alien language. 👽 Your brain goes: "What?! I don\'t know this!"

Panic time? NOPE! 💪

Every single person taking the 11+ will face questions they find difficult. The secret isn\'t knowing everything (that\'s impossible!). The secret is knowing what to DO when you face a tough question.

Let\'s learn the strategies that exam experts use! 🎯`,
    keyPoints: [
      'EVERYONE gets stuck on questions - even the smartest students!',
      'Hard questions don\'t mean you\'re doing badly - they\'re supposed to be there!',
      'You have strategies to handle ANY difficult question.',
      'Sometimes the best thing is to skip it and come back later.',
      'Making an educated guess is better than leaving it blank!',
      'Stay calm - one hard question doesn\'t ruin your whole exam.'
    ],
    explanation: `
**Why Difficult Questions Exist**

First, let\'s understand something important: exams are SUPPOSED to have some really hard questions! Here\'s why:

1. They test different levels of ability
2. They help show what you really know
3. They challenge you to think differently
4. They\'re often worth the same marks as easier questions!

So if you find questions hard, it means you\'re taking a proper exam - not that you\'re failing! 😊

**Types of "Difficult" Questions**

**Type 1: The Confusing One** 🤔
You read it three times and still don\'t understand what it\'s asking.

**Type 2: The Memory Blank** 🧠
You KNEW this yesterday, but your brain has suddenly forgotten!

**Type 3: The Time Thief** ⏰
You could probably work it out, but it would take ages.

**Type 4: The Never Seen Before** 👽
It\'s using knowledge in a way you\'ve never practiced.

**Type 5: The Trick Question** 🎭
It looks simple but has a sneaky twist.

Good news? We have strategies for ALL of these!

**The STOP-BREATHE-PLAN Method**

When you hit a difficult question, use this 3-step process:

**STEP 1: STOP** (5 seconds) 🛑
- Don\'t panic!
- Don\'t stare at it getting more worried
- Recognize: "This is a tough one"

**STEP 2: BREATHE** (3 seconds) 😮‍💨
- Take ONE slow, deep breath
- Reset your brain
- Tell yourself: "I can handle this"

**STEP 3: PLAN** (5 seconds) 📋
- Decide your strategy (we\'ll learn these!)
- Choose your next action
- Move forward with confidence

Total time: 13 seconds to go from panic to plan! ⚡

**Strategy 1: The Break-It-Down Method** 🧩

**When to use:** Questions that seem complicated or have multiple parts

**How it works:**
1. Read the question slowly
2. Identify what you DO understand
3. Break it into smaller chunks
4. Solve one small part at a time

**Example:**
Big scary question: "If Tom has 3 times as many marbles as Sarah, and Sarah has 5 fewer than James who has 20, how many does Tom have?"

Break it down:
- James has 20 marbles ✓ (I know this!)
- Sarah has 5 fewer than James: 20 - 5 = 15 ✓
- Tom has 3 times Sarah\'s amount: 15 × 3 = 45 ✓
- Answer: 45!

See? Breaking it down makes it manageable!

**Strategy 2: The Skip-and-Return Method** ⏭️

**When to use:** Questions that will take too long OR you\'re stuck

**How it works:**
1. Put a small mark next to the question number
2. Make your BEST guess (we\'ll cover this!)
3. Move on immediately
4. Come back with fresh eyes at the end

**Why it works:**
- Keeps you moving through the exam
- You might find clues in other questions!
- Your brain works on it in the background
- You return with a fresh perspective

**Important:** ALWAYS put an answer (even a guess) before you move on!

**Strategy 3: The Elimination Method** 🚫

**When to use:** Multiple choice questions where you\'re unsure

**How it works:**
1. Cross out answers you KNOW are wrong
2. Look at what\'s left
3. Make an educated guess from the remaining options
4. Trust your instinct!

**Example:**
Question: "What is 15% of 80?"

Options:
A) 8
B) 12
C) 25
D) 120

Eliminate:
- D is too big (that\'s more than 80!) ❌
- C seems too high ❌
- Between A and B...
- 10% of 80 is 8, so 15% must be a bit more
- Answer: B! ✓

**Strategy 4: The Working Backwards Method** ⏪

**When to use:** When you can\'t see the way forward

**How it works:**
1. Look at the answer options (if given)
2. Try working backwards from each answer
3. See which one makes sense
4. Check your work!

**Strategy 5: The Draw-It-Out Method** ✏️

**When to use:** Word problems, geometry, or anything confusing

**How it works:**
1. Draw a quick diagram
2. Label what you know
3. Visualize the problem
4. The answer often becomes clearer!

**Your brain LOVES pictures!** Drawing helps you understand questions that seem impossible when they\'re just words.

**Strategy 6: The Keywords Method** 🔑

**When to use:** Questions where you\'re not sure what they want

**How it works:**
1. Underline key words in the question
2. Circle what you need to find
3. Identify what operation is needed (×, ÷, +, -)
4. Focus on just those elements

**Key words to spot:**
- "Total" or "altogether" = probably ADD (+)
- "Difference" or "fewer" = probably SUBTRACT (-)
- "Each" or "groups of" = probably MULTIPLY (×)
- "Share" or "split" = probably DIVIDE (÷)
- "Most likely" = looking for probability
- "Both" or "and" = might need two steps!

**Making Your Best Guess** 🎲

If you really don\'t know the answer, DON\'T leave it blank! Here\'s how to make smart guesses:

**For Multiple Choice:**
1. Eliminate obviously wrong answers
2. Look for patterns (is one option very different?)
3. Go with your gut feeling
4. Middle options (B or C) are often correct (but not always!)

**For Written Answers:**
1. Show ANY working you can - you might get method marks!
2. Write something related to the topic
3. If it\'s maths, estimate a reasonable number
4. Never leave it completely blank!

**Stay Calm Tricks** 🧘

When a hard question makes you feel panicky:

**The 3-Breath Reset:**
1. Slow breath in through nose (1, 2, 3)
2. Hold (1, 2)
3. Slow breath out through mouth (1, 2, 3, 4)
4. Repeat twice more
5. Now tackle the question!

**The Perspective Reminder:**
Think: "This is ONE question out of 50. I can get others right. This single question won\'t make or break everything!"

**The Success Reminder:**
Think: "I\'ve solved hard questions before. I can do this too!"

**Time Management with Hard Questions** ⏰

**Rule:** Don\'t spend more than 2 minutes on ANY single question on your first pass!

**If you\'ve spent 2 minutes:**
- Make your best guess
- Mark it to return
- Move on!

**Save time for:**
- Questions you CAN answer
- Coming back to hard ones with fresh eyes
- Checking your work

**Remember:** Getting 8 questions right that you know is better than spending all your time on 2 you don\'t!

**Practice Makes Perfect** 🎯

The more you practice these strategies with mock questions, the more automatic they become. It\'s like learning combos in a video game - at first you have to think about it, but then it becomes instinct!

**What Top Students Do**

Students who do really well on exams:
- Don\'t panic when they see hard questions
- Use strategies instead of giving up
- Move on when stuck
- Come back with fresh eyes
- Make educated guesses
- Stay positive throughout

**You can do ALL of these things too!** 💪
    `,
    examples: [
      {
        question: 'EXAMPLE: You\'re on question 15 and it\'s REALLY hard. You\'ve spent 2 minutes on it and still don\'t know. What should you do?',
        workingOut: `Step 1: Recognize you\'ve spent 2 minutes - that\'s your limit!
Step 2: Make your BEST guess using elimination (cross out wrong answers)
Step 3: Put a small mark next to question 15
Step 4: Move on to question 16
Step 5: Keep going and build confidence on questions you CAN do
Step 6: Return to question 15 at the end if you have time
Step 7: If no time at end, that\'s okay - you have your guess there!`,
        answer: 'Make your best guess, mark it to return to, move on to the next question, and come back later if you have time!',
        explanation: 'This strategy keeps you moving, prevents wasting time, ensures you answer questions you DO know, and gives you a chance to return with fresh eyes. One hard question won\'t ruin your exam, but spending too long on it might mean you miss easier questions later!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: When you come across a really hard question, what should you do FIRST?',
        options: ['Panic and give up', 'STOP and take a breath', 'Spend 10 minutes on it', 'Leave it blank and move on'],
        answer: 'STOP and take a breath',
        explanation: 'The STOP-BREATHE-PLAN method starts with stopping and taking a breath. This prevents panic and helps you think clearly about your strategy!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: How long should you spend on a single question on your first pass through the exam?',
        options: ['As long as it takes', 'Maximum 2 minutes', '10 seconds', '30 minutes'],
        answer: 'Maximum 2 minutes',
        explanation: 'Spending more than 2 minutes on one question means you might run out of time for questions you CAN answer. Make your best guess and move on!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: What\'s the "elimination method"?',
        options: ['Crossing out wrong answers first', 'Deleting questions', 'Ignoring hard questions', 'Eliminating all answers'],
        answer: 'Crossing out wrong answers first',
        explanation: 'The elimination method means crossing out answers you KNOW are wrong, which makes it easier to choose between what\'s left. Even eliminating one option improves your guess!',
        difficulty: 'easy'
      },
      {
        question: 'Q4: Is it better to leave a question blank or make a guess?',
        options: ['Make a guess', 'Leave it blank', 'Either is fine', 'Depends on your mood'],
        answer: 'Make a guess',
        explanation: 'ALWAYS make a guess! A blank answer has 0% chance of being right, but a smart guess might be correct! Plus, you might get method marks in maths even if the answer is wrong.',
        difficulty: 'medium'
      },
      {
        question: 'Q5: What does the "break-it-down" method mean?',
        options: ['Solving one small part at a time', 'Breaking your pencil', 'Taking a break', 'Writing really small'],
        answer: 'Solving one small part at a time',
        explanation: 'Break-it-down means splitting complicated questions into smaller, manageable chunks. This makes scary questions much less overwhelming!',
        difficulty: 'medium'
      },
      {
        question: 'Q6: Why is it good to come back to hard questions at the end?',
        options: ['You might see it differently with fresh eyes', 'It wastes time', 'You\'ll forget about it', 'Questions get easier over time'],
        answer: 'You might see it differently with fresh eyes',
        explanation: 'After answering other questions, your brain has had a break and you might spot something you missed before. Plus, sometimes other questions give you clues!',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Practice these strategies with mock questions before exam day!',
      'Remember: hard questions are SUPPOSED to be there - they don\'t mean you\'re failing!',
      'Keep a small checklist of strategies on a bookmark you can look at while studying.',
      'Time yourself on practice questions - learn what "2 minutes" feels like.',
      'Draw diagrams for ANYTHING that\'s confusing - your brain loves pictures!',
      'If you get stuck, ask yourself: "What DO I know about this?"',
      'Mark questions you want to return to with a small star or dot (not a huge one!).',
      'Celebrate when you successfully use a strategy - you\'re building skills! 🎉'
    ],
    commonMistakes: [
      'Spending too long on one hard question and running out of time.',
      'Leaving questions blank instead of guessing (always guess!).',
      'Panicking and not using any strategy at all.',
      'Thinking hard questions mean you\'re doing badly (they don\'t!).',
      'Not marking questions to return to (then forgetting which ones they were).',
      'Giving up too quickly without trying a strategy first.',
      'Forgetting to come back to marked questions at the end.'
    ],
    examStrategy: `
**Your Hard-Question Battle Plan:**

**Before the Exam:**
- Practice all these strategies with mock questions
- Time yourself to learn what 2 minutes feels like
- Make a strategy bookmark you can look at while studying
- Build confidence that you CAN handle tough questions!

**During the Exam:**

**First Pass Through (Main Goal: Answer what you know!)**
1. Read each question carefully
2. If you know it → answer it!
3. If it\'s hard → use STOP-BREATHE-PLAN
4. Choose your strategy (break it down, eliminate, etc.)
5. If still stuck after 2 minutes → best guess, mark it, move on!
6. Keep your confidence up!

**Second Pass (If you have time)**
1. Return to marked questions
2. Look with fresh eyes
3. Try a different strategy
4. Make or improve your guess
5. Check your work!

**Your Strategy Toolkit:**

**Quick Questions (under 30 seconds):**
✓ Just do it and move on!

**Medium Questions (30 seconds - 2 minutes):**
✓ Use break-it-down or keywords method
✓ Draw diagrams if helpful

**Hard Questions (stuck after 2 minutes):**
✓ Use elimination
✓ Make best guess
✓ Mark to return
✓ Move on!

**Panic Moments:**
✓ Stop!
✓ Three deep breaths
✓ "I can handle this"
✓ Try a strategy
✓ Trust yourself!

**Your Exam Day Mantra:**
"I have strategies for every question.
Hard questions are normal and expected.
I will use my time wisely.
My best guess is better than no answer.
I\'ve got this!" 💪

**Remember:**
- You don\'t need to get everything right to do well!
- Using strategies IS succeeding, even if you don\'t get the answer!
- Every time you stay calm and try a strategy, you\'re winning!
- The exam is testing how you handle challenges - show them you can! 🌟

**Tonight\'s Practice:**
Find a hard practice question. Set a timer for 2 minutes. Try using one of today\'s strategies. Did it help? Try a different one! Building this skill NOW means you\'ll use it automatically in the real exam!
    `
  },

  // ==================== MODULE 6: BUILDING RESILIENCE ====================
  {
    moduleNumber: 6,
    title: 'Building Resilience',
    duration: '20 minutes',
    introduction: `What do you think is more important: never falling down, or getting back up when you do? 🤔

If you said "getting back up," you understand RESILIENCE! 💪

Resilience (say: rez-IL-ee-ence) is like being a rubber ball - when life throws you down, you bounce back up! It\'s one of the most important skills you\'ll ever learn, not just for exams, but for your whole life!

By the end of this module, you\'ll know how to bounce back from anything! 🎾`,
    keyPoints: [
      'Resilience means bouncing back from tough times.',
      'EVERYONE has setbacks - it\'s how you respond that matters!',
      'Resilient people aren\'t perfect - they just don\'t give up.',
      'Each time you bounce back, you get stronger!',
      'You can build resilience like building a muscle.',
      'Asking for help is a sign of strength, not weakness!'
    ],
    explanation: `
**What Is Resilience?**

Resilience is your ability to:
- Keep going when things are hard
- Bounce back from disappointments
- Stay positive (mostly!) when things go wrong
- Learn from failures and try again
- Ask for help when you need it
- Believe in yourself even when it\'s tough

Think of resilience like this:

**A Glass Ball vs. A Rubber Ball**
- Glass Ball: Drops once and shatters 💔
- Rubber Ball: Drops, bounces, keeps going! 🎾

You want to be like the rubber ball!

**Why Resilience Matters for Exams**

Exams are a LONG journey. You\'ll face:
- Practice questions you get wrong ✗
- Topics you find really hard 📚
- Days when you don\'t want to study 😴
- Moments of doubt and worry 😟
- Comparisons with friends 👥
- Pressure from adults 😅

Resilience helps you handle ALL of these and keep moving forward!

**What Resilient People Do Differently**

Let\'s meet two students facing the same setback:

**Setback:** Both students get a low score on a practice test

**Non-Resilient Response:**
- "I\'m rubbish at this"
- "There\'s no point trying"
- "I might as well give up"
- Stops practicing

**Resilient Response:**
- "Okay, that didn\'t go well"
- "What can I learn from this?"
- "I\'ll practice the areas I struggled with"
- Keeps going with new strategies

Same setback, VERY different outcomes!

**The Resilience Cycle** 🔄

Resilient people go through this cycle:

1. **Something Hard Happens** 😟
   (Bad test score, difficult question, feeling overwhelmed)
   ↓
2. **They Feel Bad** 😢
   (And that\'s OKAY! Feelings are normal!)
   ↓
3. **They Process It** 🤔
   (What happened? What can I learn? What\'s my next step?)
   ↓
4. **They Take Action** 💪
   (Try a new approach, ask for help, practice more)
   ↓
5. **They Grow Stronger** 🌟
   (Each cycle makes them more resilient!)

**Important:** It\'s okay to feel bad when things go wrong! Resilient people DO feel sad, frustrated, or worried. The difference is, they don\'t STAY there forever.

**Building Your Resilience Muscles**

Just like physical muscles, resilience gets stronger the more you use it! Here\'s how:

**Exercise 1: The Setback Reframe**

When something goes wrong, practice reframing it:

❌ "I failed that test" 
→ ✅ "That test showed me what I need to practice"

❌ "I\'m terrible at maths"
→ ✅ "Maths is challenging for me right now, but I\'m improving"

❌ "Everyone else is better than me"
→ ✅ "Everyone has different strengths. I\'ll focus on my own progress"

❌ "I should just give up"
→ ✅ "This is hard, but I\'ve overcome hard things before"

**Exercise 2: The Previous Wins Reminder**

Make a list of times you\'ve overcome difficulties before:
- Learned to ride a bike (you fell lots first!)
- Moved up in swimming levels
- Made a new friend when you were nervous
- Learned to read (seemed impossible once!)
- Any time you kept trying when something was hard

**You\'VE DONE THIS BEFORE!** You can do it again!

**Exercise 3: The Support Team Map**

Draw circles for:
- Family members who support you
- Friends who encourage you
- Teachers who help you
- Other trusted adults

Remember: Asking for help is STRONG, not weak!

**Exercise 4: The Small Wins Celebration**

Every day, notice ONE thing that went well:
- "I understood a question I found hard yesterday!"
- "I studied even though I didn\'t feel like it"
- "I asked for help when I needed it"
- "I stayed calm during a practice test"

Small wins build BIG resilience! 🏆

**The Resilience Toolbox** 🧰

When facing tough times, you can use these tools:

**Tool 1: Perspective Questions**
Ask yourself:
- Will this matter in a week? A month? A year?
- What\'s the worst that can realistically happen?
- Have I faced hard things before? (Yes!)
- What would I tell my best friend in this situation?

**Tool 2: The Problem-Solve Plan**
Instead of "This is awful!", try:
1. What exactly is the problem?
2. What are 3 possible solutions?
3. Which one will I try first?
4. Who can help me?

**Tool 3: The Feelings Outlet**
It\'s okay to feel bad! Let it out healthily:
- Talk to someone you trust
- Write in a journal
- Do physical exercise
- Create art or music
- Have a good cry (it helps!)

Then, when you\'re ready, move forward.

**Tool 4: The Self-Care Reminder**
When stressed, remember to:
- Get enough sleep (8-10 hours!)
- Eat healthy food
- Exercise or play
- Do something fun
- Take breaks from studying
- Spend time with family/friends

**You can\'t pour from an empty cup!** Take care of yourself!

**Resilience in the Real Exam** 📝

Here\'s how resilience helps during actual exams:

**Moment 1: You don\'t know an answer**
- Non-resilient: Panic, give up, let it ruin the rest
- Resilient: "That\'s okay, I\'ll make my best guess and move on!"

**Moment 2: You make a silly mistake**
- Non-resilient: "I\'m so stupid! I\'ve ruined everything!"
- Resilient: "That happens. I\'ll be more careful on the next question"

**Moment 3: A section seems really hard**
- Non-resilient: "I can\'t do this. I\'m going to fail"
- Resilient: "This is challenging, but I\'ll try my best on each question"

**Moment 4: You feel overwhelmed**
- Non-resilient: Freeze, panic, can\'t continue
- Resilient: "Stop. Breathe. One question at a time. I can do this"

**Famous Examples of Resilience**

**J.K. Rowling (Harry Potter author):**
- 12 publishers rejected Harry Potter
- She kept trying
- Now one of the most successful authors ever!

**Michael Jordan (Basketball legend):**
- Was cut from his high school basketball team
- Practiced harder
- Became one of the greatest players ever!

**Thomas Edison (Inventor):**
- Failed 1,000 times making the lightbulb
- Said: "I didn\'t fail. I just found 1,000 ways that don\'t work"
- Eventually succeeded!

**Your Resilience Story**

What will YOUR resilience story be?

Every time you:
- Study even when you\'re tired
- Try again after getting something wrong
- Ask for help when stuck
- Stay positive when things are hard
- Keep going when you want to quit

...You\'re writing your resilience story! 📖✨

**The Long-Term Power of Resilience**

Here\'s the amazing thing: resilience you build now helps you FOREVER!

- Future exams? ✓
- Learning new skills? ✓
- Making new friends? ✓
- Trying new activities? ✓
- Handling disappointments? ✓
- Achieving your dreams? ✓

You\'re not just preparing for the 11+ - you\'re building a superpower for life! 🦸

**Remember:**
- You are STRONGER than you think
- You\'ve overcome challenges before
- Every setback is a setup for a comeback
- You have people who support you
- You can do hard things
- You\'ve got this! 💪🌟
    `,
    examples: [
      {
        question: 'EXAMPLE: You\'ve been studying verbal reasoning for weeks, but you still got a low score on a practice test today. You feel like giving up. What would a resilient response look like?',
        workingOut: `Step 1: Acknowledge your feelings (it\'s okay to feel disappointed!)
Step 2: Avoid the trap: Don\'t think "I\'ll never get this" or "I should give up"
Step 3: Reframe: "This test showed me what I still need to work on"
Step 4: Problem-solve: Look at which types of questions you got wrong
Step 5: Make a plan: Focus practice on those specific areas
Step 6: Get support: Ask a parent or teacher to help with those question types
Step 7: Remember: You\'ve improved at other things before through practice
Step 8: Take action: Keep practicing with your new focus
Step 9: Believe: Your effort WILL pay off!`,
        answer: '"This is disappointing, but it shows me what to practice. I\'ll focus on my weak areas, ask for help, and keep trying. I\'ve overcome challenges before and I can do it again!"',
        explanation: 'This response shows true resilience: acknowledging feelings (normal!), reframing the setback as information, making a plan, asking for support, and maintaining belief in yourself. This is exactly what successful people do when they face setbacks!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Q1: What does "resilience" mean?',
        options: ['Never having problems', 'Bouncing back from difficulties', 'Being perfect at everything', 'Never feeling sad'],
        answer: 'Bouncing back from difficulties',
        explanation: 'Resilience is your ability to bounce back from tough situations, setbacks, and disappointments. It\'s not about never having problems - it\'s about how you handle them!',
        difficulty: 'easy'
      },
      {
        question: 'Q2: When something goes wrong, resilient people:',
        options: ['Give up immediately', 'Learn from it and try again', 'Blame others', 'Pretend it didn\'t happen'],
        answer: 'Learn from it and try again',
        explanation: 'Resilient people see setbacks as learning opportunities. They figure out what went wrong, learn from it, and try again with new strategies!',
        difficulty: 'easy'
      },
      {
        question: 'Q3: Is it okay for resilient people to feel sad or disappointed?',
        options: ['Yes, feelings are normal!', 'No, they should never feel bad', 'Only sometimes', 'Only if no one sees'],
        answer: 'Yes, feelings are normal!',
        explanation: 'Resilient people DO feel sad, frustrated, or disappointed - that\'s totally normal! The difference is they don\'t stay stuck in those feelings forever. They feel them, process them, and then move forward.',
        difficulty: 'easy'
      },
      {
        question: 'Q4: What\'s a sign of strength in building resilience?',
        options: ['Never asking for help', 'Asking for help when you need it', 'Doing everything alone', 'Never showing weakness'],
        answer: 'Asking for help when you need it',
        explanation: 'Asking for help is actually a sign of STRENGTH and intelligence! It shows you know your limits and you\'re willing to use all available resources to succeed.',
        difficulty: 'medium'
      },
      {
        question: 'Q5: When you make a mistake in an exam, what\'s the resilient response?',
        options: ['Let it ruin the whole exam', '"That\'s okay, I\'ll move on"', 'Give up on the rest', 'Panic and freeze'],
        answer: '"That\'s okay, I\'ll move on"',
        explanation: 'Resilient people acknowledge mistakes but don\'t let them define the whole experience. They stay calm, accept it happened, and focus on doing well on the remaining questions!',
        difficulty: 'medium'
      },
      {
        question: 'Q6: What happens each time you bounce back from a setback?',
        options: ['You get weaker', 'You stay the same', 'You get stronger', 'You become scared'],
        answer: 'You get stronger',
        explanation: 'Every time you bounce back from a difficult situation, your resilience grows stronger - just like a muscle getting stronger with exercise! Each challenge you overcome makes you better at handling the next one!',
        difficulty: 'hard'
      }
    ],
    tips: [
      'Keep a "resilience journal" - write down challenges you\'ve overcome!',
      'Create a "Previous Wins" poster for your wall - remind yourself daily!',
      'Make a list of your support team (people who help you) - you\'re not alone!',
      'Practice reframing negative thoughts as soon as you notice them.',
      'Celebrate small wins EVERY DAY - resilience is built in tiny moments!',
      'Remember: every successful person has faced setbacks. You\'re in good company!',
      'When you want to give up, remember WHY you started.',
      'Be kind to yourself - you\'re doing something brave by trying! 🌟'
    ],
    commonMistakes: [
      'Thinking resilient people never struggle (they do!).',
      'Believing asking for help is weakness (it\'s actually strength!).',
      'Expecting to bounce back immediately (it takes time, and that\'s okay).',
      'Comparing your behind-the-scenes to others\' highlight reel.',
      'Forgetting previous successes when facing new challenges.',
      'Not taking care of yourself while trying to be resilient (rest is important!).',
      'Thinking one setback means you should give up (it doesn\'t!).'
    ],
    examStrategy: `
**Your Resilience Strategy:**

**Building Resilience NOW (Before Exams):**

**Daily Practice:**
- List 1 thing that went well each day
- Reframe 1 negative thought
- Remember 1 previous challenge you overcame
- Be kind to yourself about mistakes

**Weekly Review:**
- What did I improve at this week?
- What challenge did I face and handle?
- Who helped me this week?
- What am I proud of?

**When Setbacks Happen:**
1. Feel your feelings (that\'s okay!)
2. Talk to someone who cares
3. Reframe: "What can I learn?"
4. Make a new plan
5. Get support if needed
6. Try again!

**On Exam Day:**

**Morning Resilience Prep:**
- Remember: "I\'ve prepared well"
- "I can handle whatever comes"
- "I\'ve overcome challenges before"
- "I\'ve got this!"

**During the Exam:**

**If something goes wrong:**
- Stop
- Take a breath
- "That\'s okay"
- Move forward
- Stay positive

**If you feel overwhelmed:**
- Remember your support team
- Think of previous wins
- One question at a time
- You can do hard things!

**After a tough moment:**
- Don\'t let it affect the rest
- Reset and refocus
- "Next question, fresh start!"
- Keep your confidence up

**After the Exam:**

**Regardless of how it went:**
- Be proud you tried
- You showed resilience just by being there!
- One exam doesn\'t define you
- You\'ll be okay whatever happens

**Your Resilience Affirmations:**

Read these every day:
- "I am stronger than I think"
- "I can handle challenges"
- "Every setback helps me grow"
- "I have people who support me"
- "I bounce back from difficulties"
- "I am resilient and capable"
- "I\'ve got this!" 💪

**Long-Term Resilience:**

Remember, you\'re building a skill for LIFE:
- This exam is just one moment
- You\'ll face and overcome many challenges
- Each one makes you stronger
- You\'re capable of amazing things
- Your resilience is your superpower! 🦸

**Final Thought:**

You\'re not just preparing for an exam - you\'re becoming the kind of person who doesn\'t give up, who bounces back, who tries again, who believes in themselves.

THAT\'S more valuable than any exam result! 🌟

**Tonight\'s Resilience Practice:**

1. Write down 3 challenges you\'ve overcome in your life
2. Remember how strong you were
3. Know that you have that strength for the 11+ too!
4. You\'ve got this! 💪✨

Remember: The rubber ball bounces back every single time. So can you! 🎾
    `
  }
];

export default confidenceMindsetContent;

