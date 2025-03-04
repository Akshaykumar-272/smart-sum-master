
import React, { useState, useEffect } from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorContainer from './CalculatorContainer';
import { useToast } from '@/components/ui/use-toast';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(e.key);
      } else if (e.key === '.') {
        inputDot();
      } else if (e.key === '+') {
        performOperation('+');
      } else if (e.key === '-') {
        performOperation('-');
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        performOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        performOperation('=');
      } else if (e.key === 'Escape') {
        clearAll();
      } else if (e.key === 'Backspace') {
        clearLastChar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, operator, storedValue, waitingForOperand]);

  // Input digit handler
  const inputDigit = (digit: string) => {
    const newValue = waitingForOperand ? digit : displayValue === '0' ? digit : displayValue + digit;
    setDisplayValue(newValue);
    setWaitingForOperand(false);
    setLastKeyPressed(digit);
  };

  // Input decimal point
  const inputDot = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
    setLastKeyPressed('.');
  };

  // Toggle sign (positive/negative)
  const toggleSign = () => {
    setDisplayValue(displayValue.charAt(0) === '-' ? displayValue.substring(1) : '-' + displayValue);
    setLastKeyPressed('±');
  };

  // Calculate percentage
  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
    setLastKeyPressed('%');
  };

  // Clear the last character
  const clearLastChar = () => {
    if (waitingForOperand) return;
    setDisplayValue(displayValue.length > 1 ? displayValue.substring(0, displayValue.length - 1) : '0');
    setLastKeyPressed('⌫');
  };

  // Clear all calculator state
  const clearAll = () => {
    setDisplayValue('0');
    setExpression('');
    setWaitingForOperand(false);
    setStoredValue(null);
    setOperator(null);
    setLastKeyPressed('C');
  };

  // Perform mathematical operation
  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);
    
    if (storedValue === null) {
      setStoredValue(displayValue);
      setWaitingForOperand(true);
      setOperator(nextOperator);
      
      // Update expression
      if (nextOperator !== '=') {
        setExpression(`${displayValue} ${nextOperator}`);
      }
      setLastKeyPressed(nextOperator);
      return;
    }
    
    const currentValue = parseFloat(storedValue);
    let newValue: number;
    
    switch (operator) {
      case '+':
        newValue = currentValue + inputValue;
        break;
      case '-':
        newValue = currentValue - inputValue;
        break;
      case '×':
        newValue = currentValue * inputValue;
        break;
      case '÷':
        if (inputValue === 0) {
          toast({
            title: "Error",
            description: "Cannot divide by zero",
            variant: "destructive"
          });
          clearAll();
          return;
        }
        newValue = currentValue / inputValue;
        break;
      default:
        newValue = inputValue;
    }
    
    // Format the result to avoid long decimals
    const formattedValue = formatResult(newValue);
    
    // Update expression
    if (nextOperator === '=') {
      setExpression(`${storedValue} ${operator} ${displayValue} =`);
    } else {
      setExpression(`${formattedValue} ${nextOperator}`);
    }
    
    // Update calculator state
    setDisplayValue(formattedValue);
    setStoredValue(nextOperator === '=' ? null : formattedValue);
    setWaitingForOperand(true);
    setOperator(nextOperator === '=' ? null : nextOperator);
    setLastKeyPressed(nextOperator);
  };
  
  // Format calculation results to avoid floating point issues
  const formatResult = (num: number): string => {
    // Convert to string and avoid scientific notation
    const str = num.toString();
    
    // If no decimal or length is reasonable, just return
    if (!str.includes('.') || str.length <= 10) return str;
    
    // For long decimals, limit to a reasonable precision
    return num.toPrecision(10).replace(/\.?0+$/, '');
  };

  return (
    <CalculatorContainer>
      <CalculatorDisplay value={displayValue} expression={expression} className="mb-6" />
      
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        <CalculatorButton value="C" onClick={clearAll} className="bg-secondary" />
        <CalculatorButton value="±" onClick={toggleSign} className="bg-secondary" />
        <CalculatorButton value="%" onClick={inputPercent} className="bg-secondary" />
        <CalculatorButton value="÷" onClick={performOperation} isOperator />
        
        <CalculatorButton value="7" onClick={inputDigit} />
        <CalculatorButton value="8" onClick={inputDigit} />
        <CalculatorButton value="9" onClick={inputDigit} />
        <CalculatorButton value="×" onClick={performOperation} isOperator />
        
        <CalculatorButton value="4" onClick={inputDigit} />
        <CalculatorButton value="5" onClick={inputDigit} />
        <CalculatorButton value="6" onClick={inputDigit} />
        <CalculatorButton value="-" onClick={performOperation} isOperator />
        
        <CalculatorButton value="1" onClick={inputDigit} />
        <CalculatorButton value="2" onClick={inputDigit} />
        <CalculatorButton value="3" onClick={inputDigit} />
        <CalculatorButton value="+" onClick={performOperation} isOperator />
        
        <CalculatorButton value="0" onClick={inputDigit} wide />
        <CalculatorButton value="." onClick={inputDot} />
        <CalculatorButton value="=" onClick={performOperation} isOperator />
      </div>
    </CalculatorContainer>
  );
};

export default Calculator;
