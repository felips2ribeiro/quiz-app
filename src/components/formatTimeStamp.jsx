// formatTimeStamp.js
import React from 'react';
import { Timestamp } from 'firebase/firestore';

// Função para formatar o timestamp
const formatTimestamp = (timestamp) => {
    // Se o timestamp for um objeto Timestamp do Firestore
    const date = timestamp.toDate(); // Converte o Timestamp para um objeto Date
    
    // Formata a data e a hora
    const options = {  
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
    };
    
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

// Componente React para exibir a data formatada
const DisplayDate = ({ timestamp }) => {
    return (
        <p>{formatTimestamp(timestamp)}</p>
    );
};

export default DisplayDate;
