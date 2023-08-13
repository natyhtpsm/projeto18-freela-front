import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const [name, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const url =  'http://localhost:4000';
  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + '/cadastro', {
        name,
        phone,
        email,
        password
      });
      console.log('Usuário cadastrado:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setNome(e.target.value)} required /><br />

        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required /><br />

        <label>Telefone:</label>
        <input type="text" value={phone} onChange={(e) => setTelefone(e.target.value)} required /><br />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setSenha(e.target.value)} required /><br />

        <button type="submit" onClick={handleCadastro}>Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;
