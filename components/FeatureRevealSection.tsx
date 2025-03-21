"use client"
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureRevealSectionProps {
  googleFormUrl: string;
}

export const FeatureRevealSection: React.FC<FeatureRevealSectionProps> = ({ googleFormUrl }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  
  // Features data
  const features = [
    {
      id: 'feature-1',
      title: '🔍 Know What\'s Working—And Where',
      description: 'See where your music is growing—by city, country, or region. Understand your fanbase\'s geography so you can actually plan smart.',
      highlight: [
        { city: 'Los Angeles', growth: '+17%' },
        { city: 'Berlin', growth: '+12%' },
        { city: 'Manila', growth: '+34%' },
      ]
    },
    {
      id: 'feature-2',
      title: '📈 Track All Platforms. In One Place.',
      description: 'No more jumping between apps. Spotify, TikTok, YouTube, and Instagram—plugged in, synced, visualized.',
      note: '🧩 Four platform logos orbiting around your music avatar. Think "solar system" layout.'
    },
    {
      id: 'feature-3',
      title: '⚡ Get Notified When You\'re Blowing Up',
      description: 'Don\'t miss the moment. Real-time alerts tell you when a track or video is spiking—so you can ride the wave, not chase it.',
      quote: 'Your track is up 26% in NYC this week—drop a story, launch an ad, or book a gig.'
    },
    {
      id: 'feature-4',
      title: '📬 Weekly Recaps Straight to Your Inbox',
      description: 'Every Monday: your performance, growth hotspots, top content, and one smart tip to take action.',
      email: {
        subject: 'Your fans in Atlanta are waking up…',
        body: 'Spotify +19%, TikTok steady. Post a teaser now?'
      }
    },
    {
      id: 'feature-5',
      title: '🎯 Insights → Actions. Not Just Charts.',
      description: 'We don\'t just show you numbers—we tell you what to do. What to post. Where to promote. When to drop. Think of it as your personal music growth strategist, 24/7.',
      cta: 'Ready to stop guessing and start growing?'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create a timeline for each feature
    const featureTimelines = featuresRef.current.map((featureEl, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featureEl,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
          onEnter: () => updateProgress(index),
          onEnterBack: () => updateProgress(index - 1),
        }
      });

      // Animate the feature content
      tl.fromTo(
        featureEl.querySelector('.feature-content'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      // Animate any special elements within the feature
      const specialElement = featureEl.querySelector('.feature-special');
      if (specialElement) {
        tl.fromTo(
          specialElement,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.4'
        );
      }

      return tl;
    });

    // Create a scroll-linked animation for the progress bar
    const progressBar = progressRef.current?.querySelector('.progress-bar');
    if (progressBar) {
      gsap.fromTo(
        progressBar,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.3
          }
        }
      );
    }

    // Function to update the active progress dot
    function updateProgress(index: number) {
      if (index < 0) index = 0;
      if (index >= dotsRef.current.length) index = dotsRef.current.length - 1;

      // Update all dots
      dotsRef.current.forEach((dot, i) => {
        if (i <= index) {
          // Active or passed dots
          gsap.to(dot, { backgroundColor: '#a855f7', scale: i === index ? 1.2 : 1, duration: 0.3 });
        } else {
          // Inactive dots
          gsap.to(dot, { backgroundColor: '#3f3f46', scale: 1, duration: 0.3 });
        }
      });
    }

    return () => {
      // Clean up all ScrollTrigger instances
      featureTimelines.forEach(tl => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      });
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Add feature elements to refs
  const addToFeaturesRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current[index] = el;
    }
  };

  // Add dot elements to refs
  const addToDotsRef = (el: HTMLDivElement | null, index: number) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current[index] = el;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Unlock Your Music's <span className="text-purple-500">Full Potential</span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Left side - Progress indicator */}
          <div ref={progressRef} className="md:w-1/6 sticky top-1/4 h-[500px] hidden md:flex flex-col items-center justify-start">
            <div className="relative h-full flex flex-col items-center">
              <div className="progress-bar absolute left-1/2 transform -translate-x-1/2 w-1 bg-purple-600 rounded-full" />
              
              {features.map((feature, index) => (
                <div 
                  key={`dot-${index}`}
                  ref={(el) => addToDotsRef(el, index)}
                  className="w-4 h-4 rounded-full bg-zinc-600 z-10 mb-24 transition-all duration-300"
                  style={{ backgroundColor: index === 0 ? '#a855f7' : '#3f3f46' }}
                />
              ))}
            </div>
          </div>
          
          {/* Right side - Features */}
          <div className="md:w-5/6">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                ref={(el) => addToFeaturesRef(el as HTMLDivElement, index)}
                className="mb-32 last:mb-16 min-h-[300px]"
              >
                <div className="feature-content">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-xl text-zinc-300 mb-6">{feature.description}</p>
                  
                  {/* Feature-specific content */}
                  <div className="feature-special mt-8">
                    {/* Feature 1 - City growth list */}
                    {feature.highlight && (
                      <div className="bg-zinc-800/50 p-6 rounded-xl space-y-3">
                        {feature.highlight.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xl">🎧</span>
                            <span className="text-lg font-medium">{item.city}</span>
                            <span className="text-purple-500 font-bold">{item.growth}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Feature 2 - Platform integration */}
                    {feature.note && (
                      <div className="bg-zinc-800/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-6">
                          {/* Platform orbit animation */}
                          <div className="relative w-48 h-48">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                              �
                            </div>
                            {/* Orbiting platforms */}
                            {['🎧', '📱', '📺', '📷'].map((icon, i) => (
                              <div 
                                key={i}
                                className="absolute w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center text-lg"
                                style={{
                                  top: `${50 + 40 * Math.sin(i * Math.PI / 2)}%`,
                                  left: `${50 + 40 * Math.cos(i * Math.PI / 2)}%`,
                                  transform: 'translate(-50%, -50%)',
                                  animation: `orbit ${3 + i * 0.5}s infinite linear`
                                }}
                              >
                                {icon}
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-zinc-400 text-center italic">{feature.note}</p>
                      </div>
                    )}
                    
                    {/* Feature 3 - Notification */}
                    {feature.quote && (
                      <div className="bg-zinc-800/50 p-6 rounded-xl border-l-4 border-purple-600">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">📱</div>
                          <div>
                            <div className="font-bold mb-1">Backstage IQ Alert</div>
                            <p className="text-zinc-300">"{feature.quote}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Feature 4 - Email preview */}
                    {feature.email && (
                      <div className="bg-zinc-800/50 p-6 rounded-xl">
                        <div className="border border-zinc-700 rounded-lg overflow-hidden">
                          <div className="bg-zinc-700 p-3 flex items-center gap-2">
                            <span className="text-lg">📬</span>
                            <span className="font-medium">Weekly Recap</span>
                          </div>
                          <div className="p-4">
                            <p className="font-bold text-lg mb-2">{feature.email.subject}</p>
                            <p className="text-zinc-300">{feature.email.body}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Feature 5 - CTA */}
                    {feature.cta && (
                      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-xl text-center">
                        <p className="text-xl font-bold mb-6">{feature.cta}</p>
                        <Link href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg">
                            Join the Beta →
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add keyframes for orbit animation */}
      <style jsx global>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};