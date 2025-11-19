'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Expert } from '@/types/expert';
import { Linkedin, Twitter, Mail, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export function MeetTheExperts() {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentExpert, setCurrentExpert] = useState(0);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        console.log('Fetching experts from Firestore...');
        const expertsRef = collection(db, 'experts');
        
        // Try with orderBy first, if it fails (no index), fetch without orderBy
        let querySnapshot;
        try {
          const q = query(
            expertsRef,
            where('isActive', '==', true),
            orderBy('order', 'asc')
          );
          querySnapshot = await getDocs(q);
          console.log('Fetched with orderBy:', querySnapshot.docs.length, 'documents');
        } catch (indexError: any) {
          console.log('Fetching experts without index (this is fine for now)');
          // Fallback: just get active experts without ordering
          const simpleQuery = query(
            expertsRef,
            where('isActive', '==', true)
          );
          querySnapshot = await getDocs(simpleQuery);
          console.log('Fetched without orderBy:', querySnapshot.docs.length, 'documents');
        }
        
        const expertsData: Expert[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Expert data:', data.name, 'isActive:', data.isActive);
          return {
            id: doc.id,
            name: data.name,
            role: data.role,
            bio: data.bio,
            imageUrl: data.imageUrl,
            order: data.order ?? 0,
            socialLinks: data.socialLinks,
            expertise: data.expertise || [],
            isActive: data.isActive,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });

        // Sort manually if needed
        expertsData.sort((a, b) => a.order - b.order);

        console.log('Experts loaded successfully:', expertsData.length);
        console.log('Expert details:', expertsData);
        setExperts(expertsData);
      } catch (error) {
        console.error('Error fetching experts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const nextExpert = () => {
    setCurrentExpert((prev) => (prev + 1) % experts.length);
  };

  const prevExpert = () => {
    setCurrentExpert((prev) => (prev - 1 + experts.length) % experts.length);
  };

  // Auto-rotate experts
  useEffect(() => {
    if (experts.length <= 1) return;
    const interval = setInterval(nextExpert, 6000);
    return () => clearInterval(interval);
  }, [experts]);

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-teal-gold">Experts</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Learn from industry professionals and subject matter experts
            </p>
          </div>
          <div className="h-96 bg-white/10 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  // Don't show section if no experts
  if (experts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-teal-gold">Experts</span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Learn from industry professionals and subject matter experts who are passionate about your success
          </p>
        </div>

        {/* Expert Slider */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Main Expert Card */}
            <div className="overflow-hidden">
              <div
                className="transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentExpert * 100}%)`,
                  display: 'flex',
                }}
              >
                {experts.map((expert, index) => (
                  <div
                    key={expert.id}
                    className="w-full flex-shrink-0"
                    style={{ minWidth: '100%' }}
                  >
                    <div className="teal-card-glass backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-teal-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-gold/10">
                      <div className="flex flex-col md:flex-row">
                        {/* Expert Image */}
                        <div className="relative w-full md:w-80 lg:w-96 h-[400px] md:h-[500px] bg-gradient-to-br from-white/10 to-white/5 flex-shrink-0">
                          {expert.imageUrl ? (
                            <Image
                              src={expert.imageUrl}
                              alt={expert.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 384px"
                              priority={index === 0}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50">
                              <span className="text-6xl">{expert.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>

                        {/* Expert Info */}
                        <div className="flex-1 p-8 lg:p-10 flex flex-col">
                          <div className="space-y-5">
                            <div>
                              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                                {expert.name}
                              </h3>
                              <p className="text-teal-gold font-medium text-xl">
                                {expert.role}
                              </p>
                            </div>

                            {/* Bio */}
                            <p className="text-white/90 leading-relaxed text-base">
                              {expert.bio}
                            </p>

                            {/* Expertise */}
                            {expert.expertise && expert.expertise.length > 0 && (
                              <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-2 text-sm font-medium text-white">
                                  <Award className="w-5 h-5 text-teal-gold" />
                                  <span>Areas of Expertise</span>
                                </div>
                                <ul className="space-y-2">
                                  {expert.expertise.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-white/80 flex items-start gap-2"
                                    >
                                      <span className="text-teal-gold mt-1">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Social Links */}
                          {expert.socialLinks && (
                            <div className="flex items-center gap-3 pt-8 mt-auto">
                              {expert.socialLinks.linkedin && (
                                <a
                                  href={expert.socialLinks.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-12 h-12 bg-teal-gold/10 hover:bg-teal-gold/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                  aria-label="LinkedIn"
                                >
                                  <Linkedin className="w-6 h-6 text-teal-gold" />
                                </a>
                              )}
                              {expert.socialLinks.twitter && (
                                <a
                                  href={expert.socialLinks.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-12 h-12 bg-teal-gold/10 hover:bg-teal-gold/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                  aria-label="Twitter"
                                >
                                  <Twitter className="w-6 h-6 text-teal-gold" />
                                </a>
                              )}
                              {expert.socialLinks.email && (
                                <a
                                  href={`mailto:${expert.socialLinks.email}`}
                                  className="w-12 h-12 bg-teal-gold/10 hover:bg-teal-gold/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                  aria-label="Email"
                                >
                                  <Mail className="w-6 h-6 text-teal-gold" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {experts.length > 1 && (
              <>
                <button
                  onClick={prevExpert}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Previous expert"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextExpert}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Next expert"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {experts.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {experts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExpert(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentExpert
                      ? 'bg-teal-gold w-8'
                      : 'bg-white/30 w-2 hover:bg-white/50'
                  }`}
                  aria-label={`Go to expert ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

