
import React from 'react';
import { cn } from '@/lib/utils';

interface TimelineEventProps {
  title: string;
  date: string;
  description: string;
  type: 'foundation' | 'financial' | 'expansion' | 'security' | 'crisis' | 'innovation' | 'leadership';
  isActive?: boolean;
  phase?: string;
  impact?: 'high' | 'medium' | 'low';
  outcome?: string;
  innovations?: string[];
}

const TimelineEvent: React.FC<TimelineEventProps> = ({
  title,
  date,
  description,
  type,
  isActive = false,
  phase,
  impact,
  outcome,
  innovations
}) => {
  const getTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'foundation': return 'border-blue-400 bg-blue-500/20';
      case 'financial': return 'border-green-400 bg-green-500/20';
      case 'expansion': return 'border-purple-400 bg-purple-500/20';
      case 'security': return 'border-yellow-400 bg-yellow-500/20';
      case 'crisis': return 'border-red-400 bg-red-500/20';
      case 'innovation': return 'border-cyan-400 bg-cyan-500/20';
      case 'leadership': return 'border-orange-400 bg-orange-500/20';
      default: return 'border-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'foundation': return '🏗️';
      case 'financial': return '💰';
      case 'expansion': return '📈';
      case 'security': return '🛡️';
      case 'crisis': return '⚡';
      case 'innovation': return '🚀';
      case 'leadership': return '👑';
      default: return '📍';
    }
  };

  const getLineColor = (eventType: string) => {
    switch (eventType) {
      case 'foundation': return 'border-blue-400';
      case 'financial': return 'border-green-400';
      case 'expansion': return 'border-purple-400';
      case 'security': return 'border-yellow-400';
      case 'crisis': return 'border-red-400';
      case 'innovation': return 'border-cyan-400';
      case 'leadership': return 'border-orange-400';
      default: return 'border-gray-400';
    }
  };

  const getCircleColor = (eventType: string) => {
    switch (eventType) {
      case 'foundation': return 'bg-blue-400';
      case 'financial': return 'bg-green-400';
      case 'expansion': return 'bg-purple-400';
      case 'security': return 'bg-yellow-400';
      case 'crisis': return 'bg-red-400';
      case 'innovation': return 'bg-cyan-400';
      case 'leadership': return 'bg-orange-400';
      default: return 'bg-gray-400';
    }
  };

  const getImpactColor = (impactLevel?: string) => {
    switch (impactLevel) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-400/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-400/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  return (
    <div>
      {/* Content (now full width, no left padding) */}
      <div className="pb-8">
        <div className={cn(
          'bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 shadow-lg',
          getTypeColor(type).replace('border-', 'border-').replace('bg-', 'bg-'),
          isActive && 'scale-[1.02] shadow-2xl',
          type === 'crisis' && 'border-2 border-red-400' // Special styling for crisis events
        )}>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-white font-semibold text-xl flex items-center gap-3 flex-1">
              <span className="text-2xl flex-shrink-0">{getTypeIcon(type)}</span>
              <span className="leading-tight">{title}</span>
            </h3>
            <div className="flex flex-col items-end gap-2">
              <time className="text-gray-400 font-mono text-sm bg-slate-700/50 px-3 py-1 rounded-full flex-shrink-0">
                {date}
              </time>
              {phase && (
                <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full font-medium">
                  {phase}
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed text-base mb-4">{description}</p>
          
          {outcome && (
            <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border-l-4 border-yellow-400">
              <p className="text-yellow-300 text-sm">
                <strong>Outcome:</strong> {outcome}
              </p>
            </div>
          )}

          {innovations && innovations.length > 0 && (
            <div className="mb-4 p-3 bg-cyan-500/10 rounded-lg border-l-4 border-cyan-400">
              <p className="text-cyan-300 text-sm font-medium mb-2">Innovations:</p>
              <ul className="text-cyan-200 text-sm space-y-1">
                {innovations.map((innovation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                    {innovation}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className={cn(
              'inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider',
              getTypeColor(type).replace('border-', 'text-').replace('bg-', 'bg-').replace('/20', '/30')
            )}>
              {type}
            </span>
            
            {impact && (
              <span className={cn(
                'inline-block px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border',
                getImpactColor(impact)
              )}>
                {impact} IMPACT
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;
