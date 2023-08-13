import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Produto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const url = 'http://localhost:4000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/produto/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
      }
    };
    
    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Detalhes do Produto</h1>
      <div>
        <img src={product.photo} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Preço: R$ {product.price}</p>
        <p>Categoria: {product.category}</p>
        <p>Status: {product.status}</p>
        <p>Telefone do Vendedor: {product.phone_seller}</p>
      </div>
    </div>
  );
};

export default Produto;
