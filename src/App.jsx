import React from 'react';
import Quiz from './components/Quiz';
import QuizCreator from './components/creator/QuizCreator';
import QuizzesPanel from './components/creator/QuizzesPanel';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' Component={QuizCreator}></Route>
        </Routes>
    </Router>
  );
}

export default App;
