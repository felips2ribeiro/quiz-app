import React, {useState} from "react";
import Question from "./Question";
import Results from "./Results";
import questionsData from '../data/questions.json'

export default Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === questionsData[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questionsData.lenght) {
            setCurrentQuestionIndex(nextQuestionIndex)
        } else {
            setShowResults(true)
        }
    };

    if (showResults) {
        return <Results score={score} totalQuestions={questionsData.lenght} />;
    }

    return (
        <Question question={questionsData[currentQuestionIndex].question} 
        options={questionsData[currentQuestionIndex].options}
        handleAnswer={handleAnswer}
        />
    );
};
