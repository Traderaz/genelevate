'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function NetflixFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's included in each subscription plan?",
      answer: "Our single subscription plan at £29.99/month (approximately 98p per day) gives you unlimited access to all GCSE and A-Level courses, life skills modules, progress tracking, and our comprehensive learning platform. No hidden fees or tiered restrictions."
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
      question: "How does the learning platform work?",
      answer: "Our platform provides structured learning modules with comprehensive content, examples, and exercises. You can track your progress through each module, with sequential unlocking to ensure proper learning progression. The platform includes both academic subjects and essential life skills."
    },
    {
      question: "Can I access content offline?",
      answer: "Currently, our platform is web-based and requires an internet connection to access content. We're working on offline capabilities for future updates to enhance your learning experience."
    },
    {
      question: "What subjects do you cover?",
      answer: "We offer comprehensive GCSE courses in Mathematics, Physics, Chemistry, Biology, English Language & Literature, History, Geography, and Computer Science. We also provide essential life skills modules covering entrepreneurship, communication, mental health, and professional development."
    },
    {
      question: "How is progress tracked?",
      answer: "Your learning progress is automatically tracked as you complete lessons and modules. The platform uses a sequential unlock system where completing one module unlocks the next, ensuring a structured learning path that builds knowledge progressively."
    },
    {
      question: "What makes Gen Elevate different from other learning platforms?",
      answer: "Gen Elevate combines comprehensive GCSE academic content with essential life skills that aren't taught in traditional education. Our unique approach prepares students not just for exams, but for real-world success with modules on entrepreneurship, communication, and professional development."
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-teal-gold">Questions</span>
          </h2>
          <p className="text-xl text-white/90">
            Everything you need to know about Gen Elevate. Can't find what you're looking for? 
            Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="teal-card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/40 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-teal-card-text pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <ChevronUp className="w-6 h-6 text-teal-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-teal-card-text-muted flex-shrink-0" />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="text-teal-card-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 p-8 teal-card">
          <h3 className="text-2xl font-bold text-teal-card-text mb-4">
            Still have questions?
          </h3>
          <p className="text-teal-card-text-muted mb-6">
            Our support team is here to help you get started with Gen Elevate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="teal-button-primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
