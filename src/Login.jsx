import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AuthContext from './Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const { setUser } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const url = 'http://localhost:4000';

  const handleLogin = async (e) => {
    e.preventDefault();
    const login = { email: email, password: password };
    axios
    .post(url+"/", login)
    .then((res) => {
      const newUser = {
        token: res.data.token,
      };

      const newIdUser = {
        idUser: res.data.userId,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      localStorage.setItem("idUser", JSON.stringify(newIdUser));
      navigate("/home");
    })
    .catch((error) => {
      console.log("erro em SignIn:", error);

    });

  };

  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin}>
        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
        
        <button type="submit">Entrar</button>
      </LoginForm>
      <SignUpLink>
        Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
      </SignUpLink>
    </LoginContainer>
  );
};

export default Login;



const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  h1{
    color: #ff6f61
  }
`;

const LoginForm = styled.form`
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

const SignUpLink = styled.p`
  margin-top: 16px;
  font-size: 14px;

  a {
    color: #ff6f61;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;