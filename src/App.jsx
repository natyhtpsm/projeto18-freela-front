import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Produto from './pages/Produto';
import AuthContext from './constants/Context';
import MyProducts from './pages/MeusProdutos';
import { useState, useContext } from 'react';

const App = () => {
  const [user, setUser] = useState(0);
  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/produto/:id" element={<Produto/>} />
            <Route path="/meus-produtos" element={<MyProducts/>} />
          </Routes>
        </div>
        </Router>
      </AuthContext.Provider>
    </div>

  );
};

export default App;

