
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  sections: string[];
  activeSection: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  sections,
  activeSection
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSectionIndex = sections.indexOf(activeSection);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      {/* Progress bar */}
      <div className="h-1 bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Section indicators */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-lg">Al-Ruwais Network</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {sections.map((section, index) => (
                <div
                  key={section}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index <= activeSectionIndex ? 'bg-blue-400' : 'bg-slate-600'
                  )}
                />
              ))}
            </div>
            
            <div className="text-sm text-gray-400 font-mono">
              {Math.round(scrollProgress)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
