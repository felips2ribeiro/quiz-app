import React, { useEffect, useState } from "react";
import { firebaseApp } from '../firebase/firebaseConfig'
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default function QuizzesPanel(){
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const quizzesCollection = collection(db,'quizzes');
                const quizzesSnapshot = await getDocs(quizzesCollection)
                const quizzesData = quizzesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setQuizzes(quizzesData);
            } catch (err) {
                setError('Failed to fetch quizzes.');
                console.error(err);
            } finally {
                setLoading(false);
            }
            }; 

            fetchQuizzes();
        }, []);

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

    return (
        <div className="">
            <h1 className="h1-panel">Quizzes Criados</h1>
            <ul>
                {quizzes.map(quiz => (
                <li key={quiz.id}>
                    <strong>{quiz.title}</strong> {quiz.description}
                </li>
                ))}
            </ul>
        </div>
    );
}