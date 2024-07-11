import React from 'react';

export default function Question ({ question, options, handleAnswer, currentQuestionIndex, setCurrentQuestionIndex, markedQuestion, reviewMode, correctAnswer, setReviewMode, setShowResults  })  {

    return (
        <div>
            <div className='container'>
                <h2>{question}</h2>
                <div className='options'>
                    {options.map((option, index) => (
                        <button className={reviewMode ? (option === correctAnswer ? "correct" : markedQuestion === option ? "incorrect" : "")
                        : markedQuestion === option ? "selected" : ""} disabled={reviewMode} key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                {reviewMode && (
                    <p>{markedQuestion === correctAnswer ? "Você acertou" : "Você errou"}</p>
                )}
                <div className='navigation'>
                    {currentQuestionIndex < 9 && (
                        <button  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                            Próxima
                        </button>
                    )}
                    {reviewMode && (
                        <button onClick={() => {
                            setShowResults(true);
                            setReviewMode(false); // Certifique-se de sair do modo de revisão
                        }}>
                            Voltar para Resultados
                        </button>
                    )}
                    {currentQuestionIndex > 0 && (
                        <button  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                            Voltar
                        </button>
                    )}
                    
                </div>
            </div>
            
        </div>
    )
}