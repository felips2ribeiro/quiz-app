import React, { useState } from 'react';
import Dashboard from './Dashboard';
import EmailInput from './EmailInput';

export default function Home() {
  const [isEmailTyped, setIsEmailTyped] = useState(false);
  const [creatorEmail, setCreatorEmail] = useState('');

  const handleEmailTyped = (email) => {
    setCreatorEmail(email)
    setIsEmailTyped(true);
  };

  return (
    <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className={`absolute inset-0 ${isEmailTyped ? 'blur-none' : 'blur-xl'} flex items-center justify-center`}>
        <Dashboard creatorEmail={creatorEmail} />
      </div>
      {!isEmailTyped && (
        <div className="relative z-10">
          <EmailInput onEmailTyped={handleEmailTyped} />
        </div>
      )}
    </section>
  );
}
