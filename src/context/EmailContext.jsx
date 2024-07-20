// src/context/EmailContext.js
import React, { createContext, useState, useContext } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
    const [email, setEmail] = useState('');

    return (
        <EmailContext.Provider value={{ email, setEmail }}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmail() {
    return useContext(EmailContext);
}
