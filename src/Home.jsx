import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validateUser } from './Validate';
import AuthContext from './Context';
import { headersAuth } from './Autenticacao';
import styled from 'styled-components';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const { user, setUser } = useContext(AuthContext);

  const url = 'http://localhost:4000';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(url + '/home');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };
  
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
    };
    console.log(config);

    try {
      await axios.post(url + '/produto', {name,description,photo,category,status,price}, config);

      fetchProducts();
      setName('');
      setDescription('');
      setPhoto('');
      setCategory('');
      setStatus('');
      setPrice('');
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    validateUser(user, setUser);  
    const isValidUser = (user !== 0 && user);
    isValidUser;
  }, [user]);

  return (
    <HomeContainer>
      <h1>Produtos</h1>
      <ProductList>
        <h2>Lista de Produtos</h2>
        <ul>
          {products.map(product => (
            <ProductItem key={product.id}>
              <Link to={`/produto/${product.id}`}>
                <ProductImage src={product.photo} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.description}</p>
                  <p>Preço: R$ {product.price}</p>
                </div>
              </Link>
            </ProductItem>
          ))}
        </ul>
      </ProductList>
      <div>
        <h2>Criar Novo Produto</h2>
        {showForm ? (
          <CreateProductForm onSubmit={handleCreateProduct}>
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />

            <label>Descrição:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />

            <label>Foto:</label>
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} required /><br />

            <label>Categoria:</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required /><br />

            <label>Status:</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required /><br />

            <label>Preço:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />

            <CreateProductButton type="submit">Criar Produto</CreateProductButton>
          </CreateProductForm>
        ) : (
          <button onClick={() => setShowForm(true)}>Novo Produto</button>
        )}
      </div>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  padding: 20px;
  min-height: 100vh;
`;

const ProductList = styled.div`
  margin-top: 20px;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const CreateProductForm = styled.form`
  margin-top: 20px;
  text-align: left;
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

const CreateProductButton = styled.button`
  background-color: #ff6f61;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff4f3b;
  }
`;