import React, { useEffect, useState } from 'react';
import { db, collection, addDoc, query, where, getDocs} from './firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ creatorEmail }) {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleCreateQuiz = () => {
        navigate('/create-quiz');
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
                console.log('entrei')
                console.error("Erro ao buscar quizzes: ", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (creatorEmail) {
            fetchQuizzes();
        }
    }, [creatorEmail]);

    

    if (loading) return <div className="bg-white p-10 rounded-xl shadow-lg">
            <div className='flex justify-between mb-10'>
                <h1 className="text-3xl mb-4">Seus Quizzes</h1>
                <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Criar Quiz</button>
            </div>
            <div className='p-20'><p>Carregando Quizzes...</p></div>
            </div>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div className="bg-white p-10 rounded-xl shadow-lg">
            <div className='flex justify-between mb-10'>
                <h1 className="text-3xl mb-4">Seus Quizzes</h1>
                <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Criar Quiz</button>
            </div>
            <hr />
            <div className='p-20'>
                {quizzes.length === 0 ? (<p>Você ainda não tem nenhum Quiz</p>) : (
                    <ul>
                        {quizzes.map((quiz) => (
                            <li key={quiz.id} className="flex items-center gap-10">
                                <h2 className="text-3xl">{quiz.title}</h2>
                                <p className='text-xl'>{quiz.description}</p>
                                <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
