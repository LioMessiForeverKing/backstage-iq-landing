import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationTarget = string | Element | Element[] | NodeList;

export const useGSAP = () => {
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // Create a new timeline
  const createTimeline = (vars?: gsap.TimelineVars) => {
    timeline.current = gsap.timeline(vars);
    return timeline.current;
  };

  // Fade in animation
  const fadeIn = (target: AnimationTarget, duration: number = 0.8, delay: number = 0, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, delay, ...vars }
    );
  };

  // Stagger animation for multiple elements
  const staggerFadeIn = (target: AnimationTarget, stagger: number = 0.1, duration: number = 0.8, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, stagger, ...vars }
    );
  };

  // Scale in animation
  const scaleIn = (target: AnimationTarget, duration: number = 0.8, delay: number = 0, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, delay, ...vars }
    );
  };

  // Create scroll trigger animation
  const createScrollTrigger = (trigger: string, animation: gsap.core.Tween | gsap.core.Timeline, vars?: ScrollTrigger.Vars) => {
    return ScrollTrigger.create({
      trigger,
      animation,
      start: 'top 80%',
      toggleActions: 'play none none none',
      ...vars
    });
  };

  // Clean up animations on component unmount
  useEffect(() => {
    return () => {
      if (timeline.current) {
        timeline.current.kill();
      }
      
      // Kill all scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    timeline: timeline.current,
    createTimeline,
    fadeIn,
    staggerFadeIn,
    scaleIn,
    createScrollTrigger
  };
};