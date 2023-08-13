import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import Produto from './Produto';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/produto/:id" element={<Produto/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

