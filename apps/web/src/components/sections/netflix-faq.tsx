'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function NetflixFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "Your 14-day free trial includes full access to our Premium plan features: all 500+ courses, unlimited live webinars, AI tutoring, offline downloads, and HD video quality. No credit card required to start."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your current billing period, and you won't be charged again."
    },
    {
      question: "What age groups do you support?",
      answer: "Gen Elevate is designed for students from Year 6 (age 10-11) through A-Level (age 18). Our content is carefully curated and age-appropriate for each educational level."
    },
    {
      question: "Do you offer certificates upon completion?",
      answer: "Yes! Premium and Institution subscribers receive verified certificates of completion for all courses. These certificates are recognized by educational institutions and can be shared on LinkedIn and other professional platforms."
    },
    {
      question: "How does the AI tutoring work?",
      answer: "Our AI tutor analyzes your learning patterns, identifies knowledge gaps, and provides personalized recommendations. It's available 24/7 to answer questions, explain concepts, and suggest practice exercises tailored to your needs."
    },
    {
      question: "Can I access content offline?",
      answer: "Premium and Institution subscribers can download course videos and materials for offline access through our mobile app. This is perfect for studying during commutes or in areas with limited internet connectivity."
    },
    {
      question: "What subjects do you cover?",
      answer: "We cover all major subjects including Mathematics, Sciences (Physics, Chemistry, Biology), English, History, Geography, Computer Science, Economics, Business Studies, and more. New subjects are added regularly."
    },
    {
      question: "How do live webinars work?",
      answer: "Live webinars are interactive sessions with expert educators. You can ask questions in real-time, participate in polls, and engage with other students. All sessions are recorded and available for later viewing."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Frequently Asked <span className="netflix-text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Gen Elevate. Can't find what you're looking for? 
            Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg overflow-hidden netflix-card"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-accent/50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="w-6 h-6 text-netflix-red flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 p-8 bg-card border border-border rounded-xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you get started with Gen Elevate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold rounded-lg netflix-button">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg netflix-button hover:border-netflix-red hover:text-netflix-red transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
