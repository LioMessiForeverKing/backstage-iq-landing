'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';

interface CustomCursorProps {
  className?: string;
}

type CursorState = 'default' | 'hover' | 'click' | 'text' | 'media';

export function CustomCursor({ className }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { fadeIn } = useGSAP();
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursor || !cursorRing) return;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Initial position off-screen
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(cursorRing, { x: -100, y: -100 });
    
    // Show cursor after a short delay to prevent flashing during page load
    setTimeout(() => setIsVisible(true), 300);
    
    // Mouse move handler with smoother animation
    const onMouseMove = (e: MouseEvent) => {
      // Animate cursor to mouse position with slight delay for smooth effect
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out',
      });
      
      // Animate cursor ring with more delay for trailing effect
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: 'power3.out',
      });
    };
    
    // Mouse down/up handlers for click effect
    const onMouseDown = () => {
      setCursorState('click');
    };
    
    const onMouseUp = () => {
      // Return to hover state if currently hovering over interactive element
      if (cursorState === 'click') {
        const element = document.elementFromPoint(cursor.getBoundingClientRect().left, cursor.getBoundingClientRect().top);
        const isInteractive = element?.closest('a, button, [role="button"], input, textarea, select, [tabindex]');
        setCursorState(isInteractive ? 'hover' : 'default');
      }
    };
    
    // Add hover effect to interactive elements
    const handleLinkHoverStart = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      setCursorState('hover');
      
      // Check for data attributes to customize cursor
      if (target.dataset.cursorText) {
        setCursorText(target.dataset.cursorText);
      } else {
        setCursorText('');
      }
    };
    
    const handleLinkHoverEnd = () => {
      setCursorState('default');
      setCursorText('');
    };
    
    // Handle text inputs
    const handleTextHoverStart = () => {
      setCursorState('text');
    };
    
    // Handle media elements
    const handleMediaHoverStart = () => {
      setCursorState('media');
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Add hover listeners to different types of elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]');
    const textElements = document.querySelectorAll('input[type="text"], textarea, [contenteditable]');
    const mediaElements = document.querySelectorAll('img, video, canvas, svg, [data-cursor-media]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    textElements.forEach((el) => {
      el.addEventListener('mouseenter', handleTextHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    mediaElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMediaHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    // Handle cursor visibility when leaving/entering window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
      
      textElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleTextHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
      
      mediaElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMediaHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [cursorState]);
  
  // Determine cursor classes based on state
  const getCursorClasses = () => {
    switch (cursorState) {
      case 'hover':
        return 'w-4 h-4 bg-purple-500 shadow-lg shadow-purple-500/50';
      case 'click':
        return 'w-3 h-3 bg-purple-600 scale-90';
      case 'text':
        return 'w-2 h-4 bg-white rounded-sm';
      case 'media':
        return 'w-5 h-5 bg-purple-500/50 backdrop-blur-sm';
      default:
        return 'w-3 h-3 bg-purple-500';
    }
  };
  
  // Determine ring classes based on state
  const getRingClasses = () => {
    switch (cursorState) {
      case 'hover':
        return 'w-14 h-14 border-2 border-purple-400 bg-purple-500/10';
      case 'click':
        return 'w-10 h-10 border-2 border-purple-600 bg-purple-500/20 scale-90';
      case 'text':
        return 'w-4 h-4 border-white opacity-70';
      case 'media':
        return 'w-16 h-16 border-purple-400/50 border-dashed';
      default:
        return 'w-8 h-8 border border-purple-400';
    }
  };
  
  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-150',
          getCursorClasses(),
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
      {/* Cursor ring/halo */}
      <div
        ref={cursorRingRef}
        className={cn(
          'fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200',
          getRingClasses(),
          isVisible ? 'opacity-100' : 'opacity-0',
          className
        )}
      >
        {/* Optional cursor text (for custom hover states) */}
        {cursorText && (
          <div 
            ref={cursorTextRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-white bg-purple-600 px-2 py-1 rounded-full"
          >
            {cursorText}
          </div>
        )}
      </div>
    </>
  );
}