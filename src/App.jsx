import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';
import Home from './Home';
import Produto from './Produto';
import AuthContext from './Context';
import MyProducts from './MeusProdutos';
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

