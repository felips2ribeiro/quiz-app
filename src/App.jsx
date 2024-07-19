import React from 'react';
import Quiz from './components/Quiz';
import './App.css';
import QuizCreator from './components/creator/QuizCreator';
import QuizzesPanel from './components/creator/QuizzesPanel';

function App() {
  return (
    <div className="App">
      <QuizCreator/>
      <QuizzesPanel/>
    </div>
  );
}

export default App;
