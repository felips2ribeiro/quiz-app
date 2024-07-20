import React, { useState, useEffect } from 'react';
import { db, doc, getDoc, updateDoc, deleteDoc } from './firebase/firebaseConfig'; // Assumindo que você exporta o db do firebase.js
import { useNavigate, useParams } from 'react-router-dom'; // Importa o hook useNavigate e useParams para navegação e parâmetros de URL
import { useEmail } from '../context/EmailContext';

export default function EditQuiz() {
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', answers: ['', '', '', ''], correctAnswerIndex: 0 }]);
    const [isEditing, setIsEditing] = useState(true);
    const { email } = useEmail();
    const navigate = useNavigate();
    const { quizId } = useParams(); // Pega o quizId da URL

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const quizDocRef = doc(db, 'quizzes', quizId);
                const quizDoc = await getDoc(quizDocRef);
                if (quizDoc.exists()) {
                    const quizData = quizDoc.data();
                    setQuizTitle(quizData.title);
                    setQuizDescription(quizData.description);
                    setQuestions(quizData.questions);
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

    const deleteQuiz = async () => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este quiz?");
        if (confirmDelete) {
            try {
                const quizDocRef = doc(db, 'quizzes', quizId);
                await deleteDoc(quizDocRef);
                alert('Quiz excluído com sucesso.');
                navigate('/'); // Navega para a página inicial após excluir o quiz
            } catch (error) {
                console.error('Erro ao excluir quiz:', error);
                alert('Erro ao excluir quiz.');
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Atualiza o quiz existente
            const quizDocRef = doc(db, 'quizzes', quizId);
            await updateDoc(quizDocRef, {
                title: quizTitle,
                description: quizDescription,
                questions,
                createdAt: new Date()
            });
            navigate('/'); // Navega para a página inicial após atualizar o quiz
        } catch (error) {
            console.error('Erro ao salvar quiz:', error);
            alert('Erro ao salvar quiz.');
        }
    };

    return (
        <section className='p-20'>
            <div className="bg-white p-10 rounded-xl shadow-lg relative">
                <button
                    onClick={() => navigate("/")} // Navega para a página inicial
                    className="absolute top-4 right-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                    Voltar
                </button>
                <h1 className="text-3xl mb-4">Editar Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Título do Quiz</label>
                        <input
                            id="title"
                            type="text"
                            value={quizTitle}
                            onChange={handleTitleChange}
                            className="p-2 border border-gray-300 rounded-lg w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Descrição do Quiz</label>
                        <textarea
                            id="description"
                            value={quizDescription}
                            onChange={handleDescriptionChange}
                            className="p-2 border border-gray-300 rounded-lg w-full resize-none"
                        />
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
                                        {['a', 'b', 'c', 'd'][answerIndex]}) {/* Adiciona o ')' após a letra */}
                                    </label>
                                    <input
                                        id={`answer-${questionIndex}-${answerIndex}`}
                                        type="text"
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                        required
                                    />
                                    <div className="mt-2 flex items-center">
                                        <input
                                            type="radio"
                                            name={`correct-answer-${questionIndex}`}
                                            value={answerIndex}
                                            checked={question.correctAnswerIndex === answerIndex}
                                            onChange={(e) => handleCorrectAnswerChange(questionIndex, e)}
                                            className="mr-2"
                                        />
                                        <span className='whitespace-nowrap'>Resposta Correta</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className='flex gap-10 mb-4'>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Adicionar Pergunta
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            type='button'
                            onClick={deleteQuiz}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
                        >
                            Excluir Quiz
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
