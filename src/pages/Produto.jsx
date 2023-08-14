import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';

const Produto = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [sellerInfo, setSellerInfo] = useState({});
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${url}/produto/${id}`);
                setProduct(response.data.product);
                setSellerInfo(response.data.seller);
            } catch (error) {
                console.error('Erro ao buscar detalhes do produto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <Container>
            <Header></Header>
            <ProductContainer>
                <h1>Detalhes do Produto</h1>
                <ProductInfo>
                    <ProductImage src={product.photo} alt={product.name} />
                    <ProductTitle>{product.name}</ProductTitle>
                    <ProductDescription>{product.description}</ProductDescription>
                    <p>Preço: R$ {product.price}</p>
                    <p>Categoria: {product.category}</p>
                    <p>Status: {product.status}</p>
                </ProductInfo>
                <SellerInfo>
                    <SellerTitle>Informações do Vendedor</SellerTitle>
                    <SellerDetails>
                        <p>Nome: {sellerInfo.name}</p>
                        <p>Telefone: {sellerInfo.phone}</p>
                        <p>Email: {sellerInfo.email}</p>
                    </SellerDetails>
                </SellerInfo>
            </ProductContainer>
        </Container>

    );
};

export default Produto;

const Container = styled.div``
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  h1{
    font-size: 50px;
    color: #ff6f61;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  p{
    font-size: 25px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  width: 500px;
  height: 500px;
  height: auto;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  margin-bottom: 10px;
`;

const ProductInfo = styled.div`
  text-align: center;
`;

const SellerInfo = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
  font-size: 30px;
  
`;

const SellerTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-size: 50px;
  color: #ff6f61;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

`;

const SellerDetails = styled.div`
  text-align: center;
`;
