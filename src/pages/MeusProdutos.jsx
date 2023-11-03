import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../constants/Context';
import Header from '../components/Header';
import styled from 'styled-components';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await axios.get(`${url}/meus-produtos`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProducts(response.data);

        const initialSelectedStatus = {};
        response.data.forEach(product => {
          initialSelectedStatus[product.id] = product.status;
        });
        setSelectedStatus(initialSelectedStatus);
      } catch (error) {
        console.error('Erro ao buscar meus produtos:', error);
      }
    };

    fetchMyProducts();
  }, [user]);

  const handleStatusChange = async (productId, newStatus) => {
    setSelectedStatus(prevState => ({
      ...prevState,
      [productId]: newStatus,
    }));
  
    try {
      await axios.put(
        `${url}/atualizar/${productId}`,
        { newStatus }, 
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      console.error('Erro ao atualizar status do produto:', error);
    }
  };
  
  return (
    <Container>
        <Header></Header>
      <h1>Meus Produtos</h1>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product.id}>
            <ProductImage src={product.photo} alt={product.name} />
            <ProductDetails>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductCategory>Categoria: {product.category}</ProductCategory>
              <ProductStatus>
                Status:
                <StatusLabel checked={selectedStatus[product.id] === 'Disponível'}>
                  <input
                    type="checkbox"
                    checked={selectedStatus[product.id] === 'Disponível'}
                    onChange={() => handleStatusChange(product.id, 'Disponível')}
                  />
                  Disponível
                </StatusLabel>
                <StatusLabel checked={selectedStatus[product.id] === 'Não disponível'}>
                  <input
                    type="checkbox"
                    checked={selectedStatus[product.id] === 'Não disponível'}
                    onChange={() => handleStatusChange(product.id, 'Não disponível')}
                  />
                  Não disponível
                </StatusLabel>
              </ProductStatus>
              <ProductPrice>Preço: R$ {product.price}</ProductPrice>
            </ProductDetails>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default MyProducts;

const Container = styled.div`
text-align: center;
h1{
  margin-top: 100px;
    font-size: 50px;
    color: #ff6f61;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
}
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const ProductImage = styled.img`
  height: 200px;

  width: 200px;

`;

const ProductDetails = styled.div`
  flex-grow: 1;
  
`;

const ProductName = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProductCategory = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const ProductStatus = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const StatusLabel = styled.label`
  margin-right: 10px;
  color: ${({ checked }) => (checked ? 'green' : 'red')};
`;

const ProductPrice = styled.p`
  font-size: 16px;
`;