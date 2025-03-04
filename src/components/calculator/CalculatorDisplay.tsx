
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorDisplayProps {
  value: string;
  expression: string;
  className?: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
  expression,
  className,
}) => {
  return (
    <div className={cn('calculator-display flex flex-col w-full', className)}>
      {expression && (
        <div className="text-right text-sm text-foreground/60 mb-2 h-6 overflow-hidden overflow-ellipsis">
          {expression}
        </div>
      )}
      <div className="text-right text-4xl md:text-5xl font-light tracking-tight overflow-hidden overflow-ellipsis">
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
