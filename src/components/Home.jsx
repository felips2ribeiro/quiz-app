import React, { useState } from 'react';
import Dashboard from './Dashboard';
import EmailInput from './EmailInput';

export default function Home() {
  const [isEmailTyped, setIsEmailTyped] = useState(false);

  const handleEmailTyped = () => {
    setIsEmailTyped(true);
  };

  return (
    <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className={`absolute inset-0 ${isEmailTyped ? 'blur-none' : 'blur-sm'} flex items-center justify-center`}>
        <Dashboard />
      </div>
      {!isEmailTyped && (
        <div className="relative z-10">
          <EmailInput onEmailTyped={handleEmailTyped} />
        </div>
      )}
    </section>
  );
}
