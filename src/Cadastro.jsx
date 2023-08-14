import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


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
    <CadastroContainer>
      <h1>Cadastro</h1>
      <CadastroForm onSubmit={handleCadastro}>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setNome(e.target.value)} required />
        
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        
        <label>Telefone:</label>
        <input type="text" value={phone} onChange={(e) => setTelefone(e.target.value)} required />
        
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setSenha(e.target.value)} required />
        
        <button type="submit">Cadastrar</button>
      </CadastroForm>
    </CadastroContainer>
  );
};

export default Cadastro;


const CadastroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  h1{
    color: #ff6f61;
  }
`;

const CadastroForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    background-color: #ff6f61;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff4f3b;
    }
  }
`;