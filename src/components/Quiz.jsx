import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";
import Results from "./Results.jsx";
import { db, doc, getDoc } from './firebase/firebaseConfig';
import { useParams } from 'react-router-dom';

export default function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const { quizId } = useParams();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const quizDocRef = doc(db, 'quizzes', quizId);
                const quizDoc = await getDoc(quizDocRef);
                if (quizDoc.exists()) {
                    const quizData = quizDoc.data();
                    setQuizTitle(quizData.title);
                    setQuizDescription(quizData.description);
                    setQuestions(quizData.questions.map(q => ({ ...q, marked: "" })));
                } else {
                    console.log('Quiz não encontrado');
                }
            } catch (error) {
                console.error('Erro ao buscar quiz:', error);
            }
        };

        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    const handleAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.marked === "") {
            currentQuestion.marked = selectedOption;
            if (currentQuestion.answer === selectedOption) {
                setScore(score + 1);
            }
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
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
        return <Results score={score} totalQuestions={questions.length} onReview={handleReview} />;
    }

    return (
        <Question
            question={questions[currentQuestionIndex]}
            options={questions[currentQuestionIndex]?.answers}
            handleAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            markedQuestion={questions[currentQuestionIndex]?.marked}
            reviewMode={reviewMode}
            correctAnswer={questions[currentQuestionIndex]?.correctAnswerIndex}
            setShowResults={setShowResults}
            setReviewMode={setReviewMode}
            totalQuestions={questions.length}
        />
    );
}
