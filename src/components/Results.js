import React from "react";
import Question from "./Question";

export default function Results ({ score, totalQuestions, onReview}) {
    // Calcula a porcentagem de acertos
    const percentage = (score /totalQuestions ) * 100;


    return (
        <div className="container">
            <h2>Resultados</h2>
            <p>Você acertou {score} de {totalQuestions} perguntas.</p>
            <p>Sua pontuação é {percentage}%</p>
            <button className="results" onClick={onReview}>Conferir Resultados</button>
        </div>
        
    )
}