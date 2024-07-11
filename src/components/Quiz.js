import React, {useState} from "react";
import Question from "./Question";
import Results from "./Results";
import questionsData from '../data/questions.js'

export default function Quiz ()  {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);


    const handleAnswer = (selectedOption) => {
        if (selectedOption === questionsData[currentQuestionIndex].answer && questionsData[currentQuestionIndex].boolean === false) {
            setScore(score + 1);
            questionsData[currentQuestionIndex].boolean = true
            console.log("acertou" + (score + 1))
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
        />
    );
    
};
