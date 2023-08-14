import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from './Context';
import LogoImage from './assets/mecansei2.png'; // Importe a imagem da logo

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
`;

const Logo = styled.img`
  width: 120px; /* Ajuste o tamanho da logo conforme necessário */
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HeaderContainer>
      <Button onClick={handleLogout}>Logout</Button>
      <Logo src={LogoImage} alt="Logo da Empresa" /> {/* Adicione o Logo com a imagem */}
      <Link to="/meus-produtos">
        <Button>Meus Produtos</Button>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
