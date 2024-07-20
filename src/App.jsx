import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import '@fontsource/roboto';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' Component={Home}></Route>
        </Routes>
    </Router>
  );
}

export default App;
