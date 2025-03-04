
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
  isOperator?: boolean;
  wide?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  onClick,
  className,
  isOperator = false,
  wide = false,
}) => {
  return (
    <button
      className={cn(
        'calculator-key h-16 md:h-20',
        isOperator && 'calculator-key-operator',
        wide ? 'col-span-2' : 'aspect-square',
        className
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default CalculatorButton;
