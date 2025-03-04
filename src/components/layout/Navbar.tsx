
import React from 'react';
import { Calculator } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-6 px-8 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Calculator className="text-primary h-6 w-6" />
        <h1 className="text-xl font-medium">Precision Calculator</h1>
      </div>
    </nav>
  );
};

export default Navbar;
