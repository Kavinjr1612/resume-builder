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
          } else {
            // Fade out when scrolling away so it replays
            setVisible(false);
          }
        });
      },
      // Trigger when element crosses 50px inside the viewport from either top or bottom
      { threshold: 0, rootMargin: '-50px 0px -50px 0px' }
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
