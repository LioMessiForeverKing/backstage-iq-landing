"use client"
import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';

export const ArtistTestimonial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a timeline for the animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Animate the container background
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Animate the text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3' // Start slightly before the previous animation finishes
    );

    // Animate the number with a counting effect
    if (numberRef.current) {
      tl.fromTo(
        numberRef.current,
        { textContent: '0', opacity: 0.5 },
        {
          textContent: '10',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 }, // Snap to integer values
          onUpdate: () => {
            // Add a pulsing effect during the count
            gsap.to(numberRef.current, {
              scale: 1.1,
              duration: 0.1,
              yoyo: true,
              repeat: 1
            });
          }
        },
        '-=0.2'
      );
    }

    // Animate the artist avatars
    if (artistsRef.current) {
      const avatars = artistsRef.current.children;
      tl.fromTo(
        avatars,
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        },
        '-=1' // Start while the number is still counting
      );
    }

    return () => {
      // Clean up animations
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 rounded-xl text-center my-12 overflow-hidden"
    >
      <h3 ref={textRef} className="text-2xl font-bold mb-4">
        Already <span ref={numberRef} className="text-purple-500 text-3xl">10</span> indie artists have signed up!
      </h3>
      
      <div ref={artistsRef} className="flex justify-center gap-2 mt-6">
        {/* Artist avatars - represented as colored circles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: `hsl(${260 + i * 12}, 70%, ${50 + i * 3}%)`,
              transform: `translateY(${Math.sin(i * 0.5) * 5}px)`
            }}
          >
            {String.fromCharCode(65 + i)}
          </div>
        ))}
      </div>
    </div>
  );
};