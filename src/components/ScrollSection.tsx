
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  triggerPercent?: number;
  onInView?: (inView: boolean) => void;
  activeSection?: string;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  id,
  children,
  className,
  triggerPercent = 0.5,
  onInView,
  activeSection
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (id === 'executive') {
            if (window.scrollY === 0) {
              setIsInView(true);
              onInView?.(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    if (id === 'executive') {
      window.addEventListener('scroll', handleScroll);
      // On mount, if at top, set in view
      if (window.scrollY === 0) {
        setIsInView(true);
        onInView?.(true);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (id === 'executive' && window.scrollY === 0) {
          // Do nothing, handled by scroll
          return;
        }
        const inView = entry.isIntersecting;
        setIsInView(inView);
        onInView?.(inView);
      },
      id === 'phases'
        ? {
            threshold: 0.15,
            rootMargin: '-30% 0px -30% 0px'
          }
        : {
            threshold: triggerPercent,
            rootMargin: '-10% 0px -10% 0px'
          }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (id === 'executive') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [triggerPercent, onInView, id]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={cn(
        'min-h-screen flex items-center transition-all duration-1000',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollSection;
