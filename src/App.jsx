// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateQuiz from './components/CreateQuiz';  // Importe o componente CreateQuiz
import EditQuiz from './components/EditQuiz';      // Importe o componente EditQuiz
import { EmailProvider } from './context/EmailContext'; // Importe o EmailProvider
import '@fontsource/roboto';
import Quiz from './components/Quiz';

function App() {
  return (
    <EmailProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-quiz' element={<CreateQuiz />} />   {/* Rota para criar quiz */}
          <Route path='/edit-quiz/:quizId' element={<EditQuiz />} /> {/* Rota para editar quiz */}
          <Route path='/quiz/:quizId' element={<Quiz/>}></Route>
        </Routes>
      </Router>
    </EmailProvider>
  );
}

export default App;
