import React, { useState } from 'react';

interface ExpandableSummaryBoxProps {
  title: string;
  summaryPoints: string[];
  prose: React.ReactNode;
  expanded: boolean;
  onClick: () => void;
}

const ExpandableSummaryBox: React.FC<ExpandableSummaryBoxProps> = ({
  title,
  summaryPoints,
  prose,
  expanded,
  onClick,
}) => {
  return (
    <div
      className={`bg-slate-800/30 rounded-xl border border-slate-700 p-6 flex flex-col cursor-pointer transition-all duration-300 shadow-md ${expanded ? 'z-10' : ''}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <h4 className="text-white font-semibold text-lg mb-4 select-none">{title}</h4>
      {!expanded ? (
        <ul className="space-y-2 mb-2">
          {summaryPoints.map((point, idx) => (
            <li key={idx} className="flex items-center text-base text-gray-200">
              <span className="inline-block w-2.5 h-2.5 bg-blue-400 rounded-full mr-3"></span>
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-300 text-base leading-relaxed animate-fade-in">{prose}</div>
      )}
      <div className="mt-4 text-xs text-blue-400 font-semibold select-none">
        {expanded ? 'Click to collapse' : 'Click to expand'}
      </div>
    </div>
  );
};

export default ExpandableSummaryBox;
