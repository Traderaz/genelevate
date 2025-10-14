'use client';

import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        // Create mailto link
        const subject = encodeURIComponent('Waitlist');
        const body = encodeURIComponent(`Email: ${email}`);
        const mailtoLink = `mailto:hello@genelevate.app?subject=${subject}&body=${body}`;
        
        // Open mailto link
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you! Your email client should open now. If not, please email us directly at hello@genelevate.app');
        
        // Clear form
        setEmail('');
      } else {
        alert('Please enter a valid email address.');
      }
    }
  };

  return (
    <section id="join" className="py-20 gradient-bg text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Waitlist</h2>
        <p className="text-xl mb-8 text-gray-200">Be the first to know when Gen Elevate launches.</p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
                placeholder="Enter your email"
                aria-describedby="email-description"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300 whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </div>
          <p id="email-description" className="text-gray-300 text-sm mt-4">No spam. We'll only email launch updates.</p>
        </form>
      </div>
    </section>
  );
}
