import React, { useState } from 'react';
import { db, collection, addDoc } from './firebase/firebaseConfig'; // Assumindo que você exporta o db do firebase.js
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate para navegação
import { useEmail } from '../context/EmailContext';

export default function CreateQuiz() {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', answers: ['', '', '', ''], correctAnswerIndex: 0 }]);
    const { email } = useEmail();
    const navigate = useNavigate(); // Cria a instância do hook useNavigate

    const handleTitleChange = (e) => setQuizTitle(e.target.value);
    const handleDescriptionChange = (e) => setQuizDescription(e.target.value);

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers[answerIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (questionIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].correctAnswerIndex = parseInt(e.target.value, 10);
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', answers: ['', '', '', ''], correctAnswerIndex: 0 }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cria um novo quiz
            await addDoc(collection(db, 'quizzes'), {
                title: quizTitle,
                description: quizDescription,
                emailCreator: email,
                questions,
                createdAt: new Date(),
            });
            alert('Quiz criado com sucesso!');
            navigate('/'); // Navega para a página inicial após criar o quiz
        } catch (error) {
            console.error('Erro ao salvar quiz:', error);
            alert('Erro ao salvar quiz.');
        }
    };

    return (
        <section className='flex items-center justify-center'>
            <div className="flex flex-col bg-white p-10 rounded-xl shadow-lg">
                <div className='flex flex-row-reverse justify-between'>
                    <button onClick={() => navigate("/")} className="">Voltar</button>
                    <h1 className="text-3xl mb-4">Criar Quiz</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Título do Quiz</label>
                        <input id="title"type="text" value={quizTitle}onChange={handleTitleChange}className="p-2 border border-gray-300 rounded-lg w-full" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Descrição do Quiz</label>
                        <textarea id="description" value={quizDescription} onChange={handleDescriptionChange} className="p-2 border border-gray-300 rounded-lg w-full resize-none"/>
                    </div>
                    {questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="mb-4">
                            <label htmlFor={`question-${questionIndex}`} className="block mb-2 text-sm font-medium text-gray-700">
                                Pergunta {questionIndex + 1}
                            </label>
                            <input
                                id={`question-${questionIndex}`}
                                type="text"
                                name="questionText"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(questionIndex, e)}
                                className="p-2 border border-gray-300 rounded-lg w-full"
                                required
                            />
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="mb-2 flex items-center gap-10 mt-5">
                                    <label htmlFor={`answer-${questionIndex}-${answerIndex}`} className="block whitespace-nowrap text-sm font-medium text-gray-700">
                                        {['a', 'b', 'c', 'd'][answerIndex]})</label>
                                    <input id={`answer-${questionIndex}-${answerIndex}`} type="text" value={answer} onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}className="p-2 border border-gray-300 rounded-lg w-full"required/>
                                    <div className="mt-2 flex">
                                        <input type="radio"name={`correct-answer-${questionIndex}`}value={answerIndex}checked={question.correctAnswerIndex === answerIndex}onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}className="mr-2"/>
                                        <span className='whitespace-nowrap'>Resposta Correta</span>
                                    </div>
                                    
                                </div>
                                
                            ))}
                            <button type="button"onClick={() => removeQuestion(questionIndex)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Deletar Pergunta</button>
                        </div>
                        
                    ))}
                    <div className='flex gap-2 justify-between'>
                        <button type="button"onClick={addQuestion}className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Adicionar Pergunta</button>
                        
                        <button type="submit"className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Salvar Quiz</button>
                    </div>
                </form>
            </div>
        </section>
    );
}
