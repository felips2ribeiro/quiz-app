import React, { useState } from "react";
import Question from "./Question";
import Results from "./Results";
import questionsData from '../data/questions.js';

export default function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);

    const handleAnswer = (selectedOption) => {
        const currentQuestion = questionsData[currentQuestionIndex];

        if (currentQuestion.marked === "") {
            currentQuestion.marked = selectedOption;
            if (currentQuestion.answer === selectedOption) {
                setScore(score + 1);
            }
        } else {
            if (currentQuestion.marked !== selectedOption) {
                if (currentQuestion.marked === currentQuestion.answer) {
                    setScore(score - 1);
                }
                currentQuestion.marked = selectedOption;
                if (selectedOption === currentQuestion.answer) {
                    setScore(score + 1);
                }
            }
        }

        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < questionsData.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowResults(true);
        }
    };

    const handleReview = () => {
        setReviewMode(true);
        setCurrentQuestionIndex(0);
    };


    if (showResults && !reviewMode) {
        return <Results score={score} totalQuestions={questionsData.length} onReview={handleReview} />;
    }

    if (reviewMode) {
        return (
            <Question
                question={questionsData[currentQuestionIndex].question}
                options={questionsData[currentQuestionIndex].options}
                handleAnswer={handleAnswer}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                markedQuestion={questionsData[currentQuestionIndex].marked}
                reviewMode={reviewMode}
                correctAnswer={questionsData[currentQuestionIndex].answer}
                setShowResults={setShowResults}
                setReviewMode={setReviewMode}
            />
        );
    }

    return (
        <Question
            question={questionsData[currentQuestionIndex].question}
            options={questionsData[currentQuestionIndex].options}
            handleAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            markedQuestion={questionsData[currentQuestionIndex].marked}
        />
    );
}
