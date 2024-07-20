import React, { useEffect, useState } from 'react';
import { db, collection, query, where, getDocs } from './firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useEmail } from '../context/EmailContext';
import DisplayDate from './formatTimeStamp';

export default function Dashboard({ creatorEmail }) {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { email } = useEmail();

    const handleCreateQuiz = () => {
        navigate('/create-quiz');
    };

    const handleEditQuiz = (quizId) => {
        navigate(`/edit-quiz/${quizId}`);
    };

    const handleOpenQuiz = (quizId) => {
        navigate(`/quiz/${quizId}`);
    };

    const handleCopyLink = (quizId) => {
        const quizUrl = `${window.location.origin}/quiz/${quizId}`;
        navigator.clipboard.writeText(quizUrl).then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
            alert('Erro ao copiar o link.');
        });
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizzesRef = collection(db, 'quizzes');
                const q = query(quizzesRef, where('emailCreator', '==', creatorEmail));
                const querySnapshot = await getDocs(q);
                const quizzesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setQuizzes(quizzesData);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar quizzes: ", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (creatorEmail) {
            fetchQuizzes();
        }
    }, [creatorEmail]);

    if (loading) return (
        <div className="bg-white p-10 rounded-xl shadow-lg">
            <div className='flex justify-between mb-10'>
                <h1 className="text-3xl mb-4">Seus Quizzes</h1>
                <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Criar Quiz</button>
            </div>
            <div className='p-20'><p>Carregando Quizzes...</p></div>
        </div>
    );
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-white p-10 rounded-xl shadow-lg">
            <div className='flex justify-between items-center mb-10 gap-10'>
                <h1 className="text-3xl mb-4">Seus Quizzes</h1>
                <h2 className='text-xl mb-4'>{email}</h2>
                <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Criar Quiz</button>
            </div>
            <hr />
            <div className='p-20'>
                {quizzes.length === 0 ? (<p>Você ainda não tem nenhum Quiz</p>) : (
                    <ul>
                        {quizzes.map((quiz) => (
                            <li key={quiz.id} className="flex items-center gap-10 mb-4">
                                <div className='flex gap-10 items-center'>
                                    <h2 className="text-3xl">{quiz.title}</h2>
                                    <DisplayDate timestamp={quiz.createdAt} />
                                </div>
                                <button 
                                    onClick={() => handleOpenQuiz(quiz.id)} 
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Abrir Quiz
                                </button>
                                <button 
                                    onClick={() => handleCopyLink(quiz.id)} 
                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Copiar Link
                                </button>
                                <button 
                                    onClick={() => handleEditQuiz(quiz.id)} 
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Editar Quiz
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
