import React, { useState, useEffect } from "react";
import EmailInput from './EmailInput';
import Question from './Question'


export default function Quiz() {
    const [isEmailTyped, setIsEmailTyped] = useState(false) 

    return(
        <section className="relative h-screen bg-gray-100 flex items-center justify-center">
      <div className={`absolute inset-0 ${isEmailTyped ? 'blur-none' : 'blur-xl'} flex items-center justify-center`}>
        <Question />
      </div>
      {!isEmailTyped && (
        <div className="relative z-10">
          <EmailInput isParticipating = {true} setIsEmailTyped = {setIsEmailTyped} />
        </div>
      )}
    </section>
    )
}
