import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Home from './components/Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/SpotAbility' element={<Home />} /> {/* Route for the Home component */}
        </Routes>
    </Router>
  );
}

export default App;
