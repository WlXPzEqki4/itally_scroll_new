import React, { useState } from 'react';
import ExpandableSummaryBox from './ExpandableSummaryBox';

interface BoxConfig {
  title: string;
  summaryPoints: string[];
  prose: React.ReactNode;
}

interface ExpandableSummaryRowProps {
  boxes: BoxConfig[];
}

const ExpandableSummaryRow: React.FC<ExpandableSummaryRowProps> = ({ boxes }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-row gap-8 mt-12 mb-6 w-full">
      {boxes.map((box, idx) => (
        <div key={box.title} className="flex-1 min-w-0">
          <ExpandableSummaryBox
            title={box.title}
            summaryPoints={box.summaryPoints}
            prose={box.prose}
            expanded={expandedIdx === idx}
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default ExpandableSummaryRow;
