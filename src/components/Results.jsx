import React from "react";

export default function Results({ score, totalQuestions, onReview }) {
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    return (
        <div className="flex items-center justify-center min-h-screen p-20">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Resultados</h2>
                <p className="text-lg mb-2">
                    Você acertou <span className="font-semibold">{score}</span> de{" "}
                    <span className="font-semibold">{totalQuestions}</span> perguntas.
                </p>
                <p className="text-lg mb-6">
                    Sua pontuação é <span className="font-semibold">{percentage}%</span>
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onReview}
                >
                    Conferir Resultados
                </button>
            </div>
        </div>
    );
}
