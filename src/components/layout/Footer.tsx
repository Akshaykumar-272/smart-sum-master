
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-8 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} Precision Calculator. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
