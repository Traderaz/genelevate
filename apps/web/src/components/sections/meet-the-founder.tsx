'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Founder } from '@/types/founder';
import { Linkedin, Twitter, Mail, Award } from 'lucide-react';
import Image from 'next/image';

export function MeetTheFounder() {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        console.log('Fetching founders from Firestore...');
        const foundersRef = collection(db, 'founders');
        
        // Try with orderBy first, if it fails (no index), fetch without orderBy
        let querySnapshot;
        try {
          const q = query(
            foundersRef,
            where('isActive', '==', true),
            orderBy('order', 'asc')
          );
          querySnapshot = await getDocs(q);
          console.log('Fetched with orderBy:', querySnapshot.docs.length, 'documents');
        } catch (indexError: any) {
          console.log('Fetching founders without index (this is fine for now)');
          // Fallback: just get active founders without ordering
          const simpleQuery = query(
            foundersRef,
            where('isActive', '==', true)
          );
          querySnapshot = await getDocs(simpleQuery);
          console.log('Fetched without orderBy:', querySnapshot.docs.length, 'documents');
        }
        
        const foundersData: Founder[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Founder data:', data.name, 'isActive:', data.isActive);
          return {
            id: doc.id,
            name: data.name,
            role: data.role,
            bio: data.bio,
            imageUrl: data.imageUrl,
            order: data.order ?? 0,
            socialLinks: data.socialLinks,
            achievements: data.achievements || [],
            isActive: data.isActive,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });

        // Sort manually if needed
        foundersData.sort((a, b) => a.order - b.order);

        console.log('Founders loaded successfully:', foundersData.length);
        console.log('Founder details:', foundersData);
        setFounders(foundersData);
      } catch (error) {
        console.error('Error fetching founders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFounders();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet the <span className="text-primary">Founder</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate about empowering the next generation of learners and leaders
            </p>
          </div>
          <div className="h-96 bg-card/50 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  // Show a message if no founders (instead of hiding completely)
  if (founders.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet the <span className="text-primary">Founder</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Passionate about empowering the next generation of learners and leaders
            </p>
            <div className="bg-card/50 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                No founder profiles available yet. If you're an admin, please add a founder profile in the admin panel.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="text-primary">Founder{founders.length > 1 ? 's' : ''}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about empowering the next generation of learners and leaders
          </p>
        </div>

        {/* Horizontal Scrolling Founders Reel */}
        <div className="relative">
          {/* Gradient Overlays for scroll hints */}
          {founders.length > 1 && (
            <>
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </>
          )}
          
          {/* Scrollable Container */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4 scroll-smooth">
            <div className={`flex gap-8 px-4 sm:px-6 lg:px-8 ${founders.length === 1 ? 'justify-center' : ''}`}>
              {founders.map((founder, index) => (
                <div
                  key={founder.id}
                  className="group w-full max-w-5xl flex-shrink-0"
                  style={{
                    animation: `fadeInSlide 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="h-full bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row">
                      {/* Founder Image */}
                      <div className="relative w-full md:w-80 lg:w-96 h-[400px] md:h-auto bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0">
                        <Image
                          src={founder.imageUrl}
                          alt={founder.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 384px"
                          priority={index === 0}
                        />
                      </div>

                      {/* Founder Info */}
                      <div className="flex-1 p-8 lg:p-10 flex flex-col">
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                              {founder.name}
                            </h3>
                            <p className="text-primary font-medium text-xl">
                              {founder.role}
                            </p>
                          </div>

                          {/* Full Bio - No truncation */}
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {founder.bio}
                          </p>

                          {/* Achievements */}
                          {founder.achievements && founder.achievements.length > 0 && (
                            <div className="space-y-3 pt-2">
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Award className="w-5 h-5 text-primary" />
                                <span>Key Achievements</span>
                              </div>
                              <ul className="space-y-2">
                                {founder.achievements.map((achievement, idx) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-muted-foreground flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Social Links */}
                        {founder.socialLinks && (
                          <div className="flex items-center gap-3 pt-8 mt-auto">
                            {founder.socialLinks.linkedin && (
                              <a
                                href={founder.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="LinkedIn"
                              >
                                <Linkedin className="w-6 h-6 text-primary" />
                              </a>
                            )}
                            {founder.socialLinks.twitter && (
                              <a
                                href={founder.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="Twitter"
                              >
                                <Twitter className="w-6 h-6 text-primary" />
                              </a>
                            )}
                            {founder.socialLinks.email && (
                              <a
                                href={`mailto:${founder.socialLinks.email}`}
                                className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                                aria-label="Email"
                              >
                                <Mail className="w-6 h-6 text-primary" />
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
          
          {/* Scroll Indicator */}
          {founders.length > 1 && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              ← Scroll to see more founders →
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

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}

