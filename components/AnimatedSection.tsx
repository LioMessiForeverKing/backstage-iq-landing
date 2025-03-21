"use client"
import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeIn' | 'scaleIn' | 'staggerFadeIn';
  triggerOnScroll?: boolean;
  id?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fadeIn',
  triggerOnScroll = true,
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { fadeIn, scaleIn, staggerFadeIn, createScrollTrigger } = useGSAP();

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
let anim: GSAPAnimation | undefined;

    if (animation === 'fadeIn') {
      anim = fadeIn(section, 0.8, delay);
    } else if (animation === 'scaleIn') {
      anim = scaleIn(section, 0.8, delay);
    } else if (animation === 'staggerFadeIn') {
      // For staggered animations, we'll animate the children
      const children = section.children;
      anim = staggerFadeIn(Array.from(children), 0.1, 0.8);
    }

    // If we want to trigger on scroll, create a scroll trigger
    if (triggerOnScroll && anim) {
      anim.pause(); // Pause the animation initially
      createScrollTrigger(`#${id || section.id}`, anim as gsap.core.Tween, {
        start: 'top 80%',
      });
    }

    return () => {
      if (anim) {
        anim.kill();
      }
    };
  }, [animation, delay, fadeIn, scaleIn, staggerFadeIn, createScrollTrigger, triggerOnScroll, id]);

  return (
    <div ref={sectionRef} className={className} id={id}>
      {children}
    </div>
  );
};