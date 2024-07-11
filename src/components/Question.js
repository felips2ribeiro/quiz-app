import React from 'react';

export default function Question ({ question, options, handleAnswer, currentQuestionIndex, setCurrentQuestionIndex, markedQuestion })  {

    return (
        <div>
            <div className='container'>
                <h2>{question}</h2>
                <div className='options'>
                    {options.map((option, index) => (
                        <button className={markedQuestion === option ? "selected" : ""} key={index} onClick={() => handleAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                <div className='navigation'>
                    {currentQuestionIndex > 0 && (
                            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                                Voltar
                            </button>
                        )}
                </div>
            </div>
            
        </div>
    )
}