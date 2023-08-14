import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validateUser } from '../constants/Validate';
import AuthContext from '../constants/Context';
import { headersAuth } from '../constants/Autenticacao';
import styled from 'styled-components';
import Header from '../components/Header';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Disponível');
    const [price, setPrice] = useState('');
    const { user, setUser } = useContext(AuthContext);

    const url = import.meta.env.VITE_API_URL;

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
            await axios.post(url + '/produto', { name, description, photo, category, status, price }, config);

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
    const availableProducts = products.filter((product) => product.status === 'Disponível');
    return (
        <HomeContainer>
            <Header></Header>
            <h1>Produtos</h1>
            <ProductList>
                <ul>
                    {availableProducts.map(product => (
                        <ProductItem key={product.id}>
                            <StyledLink to={`/produto/${product.id}`}>
                                <ProductImage src={product.photo} alt={product.name} />
                                <div>
                                    <strong>{product.name}</strong>
                                    <p>{product.description}</p>
                                    <p>Preço: R$ {product.price}</p>
                                </div>
                            </StyledLink>
                        </ProductItem>
                    ))}
                </ul>
            </ProductList>
            <ContainerBottom>
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
                            <StatusCheckboxLabel>
                                Disponível
                                <StatusCheckbox
                                    type="checkbox"
                                    value="Disponível"
                                    checked={status === 'Disponível'}
                                    onChange={() => setStatus('Disponível')}
                                />
                            </StatusCheckboxLabel>
                            <StatusCheckboxLabel>
                                Não disponível
                                <StatusCheckbox
                                    type="checkbox"
                                    value="Não disponível"
                                    checked={status === 'Não disponível'}
                                    onChange={() => setStatus('Não disponível')}
                                />
                            </StatusCheckboxLabel>

                            <label>Preço:</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />

                            <CreateProductButton type="submit">Criar Produto</CreateProductButton>
                        </CreateProductForm>
                    ) : (
                        <button onClick={() => setShowForm(true)}>Novo Produto</button>
                    )}
                
            </ContainerBottom>

        </HomeContainer>
    );
};

export default Home;

const ContainerBottom = styled.div`
    margin-bottom: 50px;

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
`

const HomeContainer = styled.div`
  text-align: center;
  background-color: #f2f2f2;
  h1{
    font-size: 50px;
    color: #ff6f61;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  h2{
    font-size: 50px;
    color: #ff6f61;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }


  min-height: 100vh;
`;

const ProductList = styled.div`
  margin-top: 20px;
  display:flex;
  flex-direction: column;
  align-itens: center;
  justify-content: center;
    margin-left: 33vw;
  
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
    width: 300px;
    height: 300px;
  margin-bottom: 20px;
  div{
    color: black;
    text-decoration: none;
  }
  Link{
    text-decoration: none;

  }

  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;
const StatusButton = styled.button``;
const ProductImage = styled.img`
  width: 200px;
  height: 200px;
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

const StatusCheckboxLabel = styled.label`
  /* Estilos do rótulo da caixa de marcação de status */
`;

const StatusCheckbox = styled.input`
  /* Estilos da caixa de marcação de status */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Isso vai herdar a cor do texto do elemento pai */
`;