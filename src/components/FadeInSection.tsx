import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // If the element is visible in the viewport
          if (entry.isIntersecting) {
            // Apply optional delay before setting visible to true
            setTimeout(() => {
              setVisible(true);
            }, delay);
            // Once it's visible, stop observing it so it doesn't fade out again
            observer.unobserve(entry.target);
          }
        });
      },
      // Trigger when 10% of the element is visible
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[800ms] ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
