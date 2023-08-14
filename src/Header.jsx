import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe o useNavigate
import styled from 'styled-components';
import AuthContext from './Context';
import LogoImage from './assets/mecansei2.png';

const Header = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleLogoutClick = async () => {
    try {
      await handleLogout(); 
      navigate('/'); 
    } catch (error) {
      console.error('Erro ao efetuar logout:', error);
    }
  };

  return (
    <HeaderContainer>
      <Button onClick={handleLogoutClick}>Logout</Button>
      <Logo src={LogoImage} alt="Logo da Empresa" />
      <Link to="/meus-produtos">
        <Button>Meus Produtos</Button>
      </Link>
    </HeaderContainer>
  );
};

export default Header;


const HeaderContainer = styled.div`
  display: flex;
  top: 0px;
  left: 0px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
`;

const Logo = styled.img`
  width: 100px;
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  font-size: 30px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;