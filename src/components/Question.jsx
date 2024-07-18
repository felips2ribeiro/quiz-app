import React from 'react';

export default function Question ({ question, options, handleAnswer, currentQuestionIndex, setCurrentQuestionIndex, markedQuestion, reviewMode, correctAnswer, setReviewMode, setShowResults  })  {

    return (
        <div>
            <div className='container'>
                 {/* Exibe a pergunta atual */}
                <h2>{question}</h2>
                <div className='options'>
                     {/* Mapeia e exibe as opções de resposta */}
                    {options.map((option, index) => (
                        <button className={reviewMode ? (option === correctAnswer ? "correct" : markedQuestion === option ? "incorrect" : "")
                        : markedQuestion === option ? "selected" : ""} disabled={reviewMode} key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                 {/* Exibe feedback após a revisão, se estiver em modo de revisão */}
                {reviewMode && (
                    <p>{markedQuestion === correctAnswer ? "Você acertou" : "Você errou"}</p>
                )}
                {/* Navegação entre perguntas */}
                <div className='navigation'>
                    {currentQuestionIndex < 9 && (
                        <button  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                            Próxima
                        </button>
                    )}
                    {/* Botão para voltar aos resultados após a revisão */}
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