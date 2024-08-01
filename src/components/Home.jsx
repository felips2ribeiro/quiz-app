// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import EmailInput from './EmailInput';
import { useEmail } from '../context/EmailContext';

export default function Home() {
  const { email } = useEmail(); // Obtemos o email do contexto
  const [isEmailTyped, setIsEmailTyped] = useState(false);

  return (
    <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className={`absolute inset-0 ${isEmailTyped ? 'blur-none' : 'blur-xl'} flex items-center justify-center`}>
        <Dashboard creatorEmail={email} />
      </div>
      {!isEmailTyped && (
        <div className="relative z-10">
          <EmailInput isParticipating ={false} setIsEmailTyped = {setIsEmailTyped}/>
        </div>
      )}
    </section>
  );
}
