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
      <section className='bg-gradient-to-r from-violet-600 to-indigo-600'>
        <div className='flex flex-col items-center justify-center h-screen'>
          <form className='bg-white flex flex-col' onSubmit={getProducts}>
            <textarea className='textarea-quizcreator' required rows={4} cols={100} name="enunciado" placeholder='Enunciado'></textarea>

            <div>
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
          <button className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong' onClick={handleSaveQuiz}>Salvar e Compartilhar</button>
        </div>
      </section>
      );
}