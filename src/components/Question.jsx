import React from 'react';

export default function Question({
    question,
    options = [],
    handleAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    markedQuestion,
    reviewMode,
    correctAnswer,
    totalQuestions
}) {
    
    const questionText = question?.questionText || 'Pergunta não disponível';
    const answers = question?.answers || [];

    return (
        <div className="flex items-center justify-center min-h-screen p-20">
            <div className='bg-white p-10 rounded-xl shadow-lg text-center'>
                <h2 className="text-2xl mb-6">{questionText}</h2>
                <div className='options'>
                    {answers.map((option, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 m-2 rounded ${
                                reviewMode
                                    ? option === correctAnswer
                                        ? "bg-green-500"
                                        : markedQuestion === option
                                        ? "bg-red-500"
                                        : "bg-gray-200"
                                    : markedQuestion === option
                                    ? "bg-blue-500"
                                    : "bg-gray-200"
                            } text-white`}
                            disabled={reviewMode}
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className='navigation flex items-center justify-between mt-6'>
                    {currentQuestionIndex > 0 && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                        >
                            Voltar
                        </button>
                    )}
                    {currentQuestionIndex < totalQuestions - 1 && (
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                        >
                            Próxima
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
