import { useEffect, useState } from "react";
import { db, doc, getDoc } from './firebase/firebaseConfig';
import { useParams } from 'react-router-dom';

export default function Question({ questionIndex }) {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const quizRef = doc(db, 'quizzes', quizId);
        const quizDoc = await getDoc(quizRef);
        if (quizDoc.exists()) {
          const quizData = quizDoc.data();
          const fetchedQuestions = quizData.questions;
          setQuestions(fetchedQuestions);
        } else {
          console.error("O documento do quiz não existe.");
        }
      } catch (error) {
        console.error("Erro ao buscar quizzes: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnswers();
  }, [quizId]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  if (loading) {
    return <div className='p-20'><p>Carregando Quizzes...</p></div>;
  }

  const handleAnswer = ( selectedOption ) => {
    
  }

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <h1>{questions[questionIndex]?.questionText}</h1>
          <ul>
            {questions[questionIndex]?.answers.map((answer, ansIndex) => (
              <div className="flex gap-2">
                <button key={ansIndex} onClick={handleAnswer} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">{answer}</button>
              </div> 
            ))}
          </ul>
        </div>
      ) : (
        <p>Nenhuma pergunta encontrada.</p>
      )}
    </div>
  );
}
