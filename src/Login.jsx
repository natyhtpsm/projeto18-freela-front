import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você deve adicionar a lógica para autenticar o usuário
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        
        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /><br />
        
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
    </div>
  );
};

export default Login;
