
import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative w-full max-w-sm mx-auto bg-card p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05),0_0_0_1px_rgba(0,0,0,0.03)] backdrop-blur-sm animate-scale-in',
        className
      )}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-black/5 pointer-events-none" />
      {children}
    </div>
  );
};

export default CalculatorContainer;
