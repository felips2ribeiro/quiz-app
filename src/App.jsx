// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateOrEditQuiz from './components/CreateOrEditQuiz';
import { EmailProvider } from './context/EmailContext'; // Importe o EmailProvider
import '@fontsource/roboto';

function App() {
  return (
    <EmailProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-quiz' element={<CreateOrEditQuiz />} />
        </Routes>
      </Router>
    </EmailProvider>
  );
}

export default App;
