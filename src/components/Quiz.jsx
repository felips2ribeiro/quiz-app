import React, { useState, useEffect } from "react";
import EmailInput from './EmailInput';
import { db, collection, query, where, getDocs, doc, getDoc } from './firebase/firebaseConfig';
import Question from './Question'
import { useEmail } from '../context/EmailContext';
import { useParams } from 'react-router-dom';


export default function Quiz() {
    const [isEmailTyped, setIsEmailTyped] = useState(false) 
    const { email } = useEmail(); // Obtemos o email do contexto
    const { quizId } = useParams();
    const [quizData, setQuizData] = useState([])
    const [loading, setLoading] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const quizRef = doc(db, 'quizzes', quizId);
          const quizDoc = await getDoc(quizRef);
          if (quizDoc.exists()) {
            const quizData = quizDoc.data();
            setQuizData(quizData);
            setLoading(false);
          } else {
            console.error("O documento do quiz não existe.");
          }
        } catch (error) {
          console.error("Erro ao buscar quizzes: ", error);
        }
      };
  
      fetchQuestions();
    }, [db, quizId]);

    if (loading) return (
          <div className='p-20'><p>Carregando Quizzes...</p></div>
  );

    return(
        <section className="relative h-screen bg-gray-100 flex items-center justify-center">
        <div className={`absolute inset-0 ${isEmailTyped ? 'blur-none' : 'blur-xl'} flex items-center justify-center`}>
          <div className="bg-white p-10 rounded-xl shadow-lg">
              <div className='flex justify-between items-center mb-10 gap-10'>
                <h1 className="text-3xl mb-4">{quizData.title}</h1>
              </div>
              <hr />
                <div className='p-2'>
                  <Question questionIndex={questionIndex}/>
                </div>
            </div>
      </div>
      {!isEmailTyped && (
        <div className="relative z-10">
          <EmailInput isParticipating = {true} setIsEmailTyped = {setIsEmailTyped} />
        </div>
      )}
    </section>
    )
}
