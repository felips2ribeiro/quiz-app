import React from "react";

export default Results = ({ score, totalQuestions}) => {
    const percentage = (score /totalQuestions ) * 100;

    return (
        <div>
            <h2>Resultados</h2>
            <p>Você acertou {score} de {totalQuestions} perguntas.</p>
            <p>Sua pontuação é {percentage}%</p>
        </div>
    )
}