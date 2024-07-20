import React, { useState, useEffect } from 'react';
import { db, doc, getDoc } from './firebase/firebaseConfig'; // Assumindo que você exporta o db do firebase.js
import { useParams } from 'react-router-dom';
import { useEmail } from '../context/EmailContext';

export default function Quiz() {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const { email } = useEmail();
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
                    setQuestions(quizData.questions || []); // Garantir que questions é um array
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

    const handleAnswerChange = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmitAnswer = () => {
        const correctAnswerIndex = questions[currentQuestionIndex]?.correctAnswerIndex;
        if (selectedAnswer === correctAnswerIndex) {
            setScore(score + 1);
        }
        setSelectedAnswer(null);
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setIsFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsFinished(false);
    };

    const currentQuestion = questions[currentQuestionIndex] || {};

    return (
        <section className='p-20'>
            <div className="bg-white p-10 rounded-xl shadow-lg relative">
                <button
                    onClick={() => window.history.back()} // Navega para a página anterior
                    className="absolute top-4 right-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                    Voltar
                </button>
                <h1 className="text-3xl mb-4">{quizTitle}</h1>
                <p className="mb-4 text-lg">{quizDescription}</p>
                {!isFinished ? (
                    <div>
                        <h2 className="text-2xl mb-4">Pergunta {currentQuestionIndex + 1}</h2>
                        <p className="mb-4">{currentQuestion.questionText || 'Pergunta não encontrada'}</p>
                        {currentQuestion.answers?.map((answer, index) => (
                            <div key={index} className="mb-2 flex items-center gap-10 mt-2">
                                <input
                                    type="radio"
                                    id={`answer-${index}`}
                                    name="answer"
                                    value={index}
                                    checked={selectedAnswer === index}
                                    onChange={() => handleAnswerChange(index)}
                                    className="mr-2"
                                />
                                <label htmlFor={`answer-${index}`} className="text-sm font-medium text-gray-700">{answer}</label>
                            </div>
                        ))}
                        <button
                            onClick={handleSubmitAnswer}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Próxima Pergunta
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl mb-4">Quiz Concluído!</h2>
                        <p className="mb-4">Sua pontuação: {score} de {questions.length}</p>
                        <button
                            onClick={handleRestart}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Reiniciar Quiz
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
