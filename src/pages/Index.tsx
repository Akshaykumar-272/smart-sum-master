
import React from 'react';
import Calculator from '@/components/calculator/Calculator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-12 text-center max-w-md">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            Minimalist Design
          </span>
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Precision Calculator
          </h2>
          <p className="text-muted-foreground">
            A beautifully designed calculator with smooth animations and precise calculations.
          </p>
        </div>
        
        <Calculator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
