'use client';

import { useState } from 'react';

const faqs = [
  {
    id: 'faq-1',
    question: 'When are you launching?',
    answer: 'Private beta soon; join the waitlist for early access and updates.'
  },
  {
    id: 'faq-2',
    question: 'Is this for my school?',
    answer: 'Yes—schools get an institutional account with referral links and comprehensive dashboards.'
  },
  {
    id: 'faq-3',
    question: 'What ages do you cover?',
    answer: 'Year 6, Years 9–11 (GCSE), Years 12–13 (A-Level + Oxbridge preparation).'
  },
  {
    id: 'faq-4',
    question: 'Is there a free plan?',
    answer: 'Founding schools get early access pricing; student pricing will be announced soon.'
  },
  {
    id: 'faq-5',
    question: 'Is my data safe?',
    answer: 'We follow UK GDPR with tenant-scoped access and parental read-only permissions for transparency.'
  },
  {
    id: 'faq-6',
    question: 'How do I get updates?',
    answer: 'Join the waitlist below for launch updates and early access opportunities.'
  }
];

export function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <section id="faqs" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      openFaq === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openFaq === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
