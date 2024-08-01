import { useEffect, useState } from "react"
import { db, collection, query, where, getDocs, doc, getDoc } from './firebase/firebaseConfig';
import { useParams } from 'react-router-dom';

export default function Question( {questionIndex} ) {
    const { quizId } = useParams();
    const [answers, setAnswers] = useState([])
    const [quizData, setQuizData] = useState([])

    useEffect(()=>{
        const fetchAnswers = async () => {
            const quizRef = doc(db, 'quizzes', quizId)
            const quizDoc = await getDoc(quizRef)
            if (quizDoc.exists()){
                try{
                    const quizData = quizDoc.data()
                    const questions = quizData.questions
                    setAnswers(questions[questionIndex].answers)
                    console.log(answers)
                }
                catch(error){
                    console.error("Erro ao buscar quizzes: ", error);
                }
            }
        }
        fetchAnswers();
    }, [])

    return (
        <>
            <h2>{answers.questionText}</h2>
            <ul>
                {answers.map((answer, index)=>{
                        <li key={index} className="flex items-center gap-10 mb-4">
                        <div className='flex gap-10 items-center'>
                            <h2 className="text-3xl">{answers.index}</h2>
                        </div>
                        </li>
                })}
            </ul>
        </>
    )
}