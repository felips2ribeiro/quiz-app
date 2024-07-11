import React, {useState} from "react";
import Question from "./Question";
import Results from "./Results";
import questionsData from '../data/questions.js'

export default function Quiz ()  {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);



    const handleAnswer = (selectedOption) => {

        const currentQuestion = questionsData[currentQuestionIndex];

        if (currentQuestion.marked === "") {
            // Primeira marcação da resposta
            currentQuestion.marked = selectedOption;
            if (currentQuestion.answer === selectedOption) {
                setScore(score + 1);
            }
        } else {
            // Alteração da resposta marcada
            if (currentQuestion.marked !== selectedOption) {
                // Se a resposta marcada anteriormente estava correta, diminui o ponto
                if (currentQuestion.marked === currentQuestion.answer) {
                    setScore(score - 1);
                }
                // Marca a nova resposta
                currentQuestion.marked = selectedOption;
                // Se a nova resposta está correta, adiciona o ponto
                if (selectedOption === currentQuestion.answer) {
                    setScore(score + 1);
                }
            }
        }

        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < questionsData.length) {
            setCurrentQuestionIndex(nextQuestionIndex)
        } else {
            setShowResults(true)
        }
    };

    if (showResults) {
        return <Results score={score} totalQuestions={questionsData.length} />;
    }

    return (
        <Question question={questionsData[currentQuestionIndex].question} 
        options={questionsData[currentQuestionIndex].options}
        handleAnswer={handleAnswer}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        markedQuestion={questionsData[currentQuestionIndex].marked}
        />
    );
    
};
