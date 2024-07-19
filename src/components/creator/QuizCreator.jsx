import React, { useState } from 'react';
import {collection, getDocs } from 'firebase/firestore';


export default function QuizCreator() {
    const [questions, setQuestions] = useState([]);

    const getProducts = async () => {
      };

    const handleSubmit = () => {

    }

    const handleSaveQuiz = () => {

    }

    const addQuestion = (question) => {
        setQuestions([...question, question]);
        console.log([...question])
    }



    return (
        <div className='container-quiz-creator'>
          <form className='form-quizcreator' onSubmit={getProducts}>
            <textarea className='textarea-quizcreator' required rows={4} cols={100} name="enunciado" placeholder='Enunciado'></textarea>
            <div className='input-div-quiz-creator'>
                <input className='input-quizcreator' required type="text" placeholder='Opção A' />
                <label><input type="radio" required name="Opção Correta" id=""/> Opção Correta</label>
            </div>

            <div className='input-div-quiz-creator'>
                <input className='input-quizcreator' required type="text" placeholder='Opção B' />
                <label><input type="radio" required name="Opção Correta" id=""/> Opção Correta</label>
            </div>

            <div className='input-div-quiz-creator'>
                <input className='input-quizcreator' required type="text" placeholder='Opção C' />
                <label><input type="radio" required name="Opção Correta" id=""/> Opção Correta</label>
            </div>

            <div className='input-div-quiz-creator'>
                <input className='input-quizcreator' required type="text" placeholder='Opção D' />
                <label><input type="radio" required name="Opção Correta" id=""/> Opção Correta</label>
            </div>

            <button className='button-quizcreator' type="submit">Adicionar Pergunta</button>
          </form>
          <button onClick={handleSaveQuiz}>Salvar e Compartilhar</button>
        </div>
      );
}