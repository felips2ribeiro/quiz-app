import React, { useState } from "react";
import Question from "./Question.jsx";
import Results from "./Results.jsx";
import questionsData from '../data/questions.jsx';

export default function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [reviewMode, setReviewMode] = useState(false);

    // Função para lidar com a seleção de resposta
    const handleAnswer = (selectedOption) => {
        const currentQuestion = questionsData[currentQuestionIndex];

        // Verifica se a questão já foi respondida
        if (currentQuestion.marked === "") {
             // Marca a resposta selecionada
            currentQuestion.marked = selectedOption;
            // Atualiza a pontuação se a resposta estiver correta
            if (currentQuestion.answer === selectedOption) {
                setScore(score + 1);
            }
        } else {
            // Verifica se a resposta selecionada é diferente da anterior
            if (currentQuestion.marked !== selectedOption) {
                // Reduz a pontuação se a resposta anterior estava correta
                if (currentQuestion.marked === currentQuestion.answer) {
                    setScore(score - 1);
                }
                 // Marca a nova resposta selecionada
                currentQuestion.marked = selectedOption;
                 // Atualiza a pontuação se a nova resposta estiver correta
                if (selectedOption === currentQuestion.answer) {
                    setScore(score + 1);
                }
            }
        }

        // Calcula o índice da próxima pergunta
        const nextQuestionIndex = currentQuestionIndex + 1;
        // Verifica se todas as questões foram respondidas
        const allQuestionsAnswered = questionsData.every(question => question.marked !== "");

        if (nextQuestionIndex < questionsData.length) {
            // Avança para a próxima pergunta
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            // Mostra os resultados se todas as questões foram respondidas
            if(allQuestionsAnswered){
                setShowResults(true);
            }else{
                // Alerta para responder todas as questões antes de finalizar
                alert("Responda todas as questões")
            }
            
        }
    };

    // Função para entrar no modo de revisão
    const handleReview = () => {
        setReviewMode(true);
        setCurrentQuestionIndex(0); // Reinicia o índice da pergunta ao revisar
    };

    // Renderiza o componente de resultados após o término do quiz
    if (showResults && !reviewMode) {
        return <Results score={score} totalQuestions={questionsData.length} onReview={handleReview} />;
    }

    // Renderiza o componente de questão durante o quiz normal ou em modo de revisão
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

    // Renderiza o componente de questão durante o quiz normal
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
