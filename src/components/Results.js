import React from "react";

export default function Results ({ score, totalQuestions}) {
    const percentage = (score /totalQuestions ) * 100;

    return (
        <div className="container">
            <h2>Resultados</h2>
            <p>Você acertou {score} de {totalQuestions} perguntas.</p>
            <p>Sua pontuação é {percentage}%</p>
        </div>
    )
}