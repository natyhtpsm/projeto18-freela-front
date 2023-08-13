import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const navigate = useNavigate()
  const url = 'http://localhost:4000';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + '/', {
        email,
        password: senha
      });

      console.log('Login bem-sucedido:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /><br />
        
        <button type="submit" onClick={handleLogin}>Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
    </div>
  );
};

export default Login;
