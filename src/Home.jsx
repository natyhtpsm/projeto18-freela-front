import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');

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

    try {
      await axios.post(url + '/produto', {
        name,
        description,
        photo,
        category,
        status,
        price
      });

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

  return (
    <div>
      <h1>Produtos</h1>
      <div>
        <h2>Lista de Produtos</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/produto/${product.id}`}>
                <div>
                  <img src={product.photo} alt={product.name} />
                </div>
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.description}</p>
                  <p>Preço: R$ {product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Criar Novo Produto</h2>
        {showForm ? (
          <form onSubmit={handleCreateProduct}>
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

            <button type="submit">Criar Produto</button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)}>Novo Produto</button>
        )}
      </div>
    </div>
  );
};

export default Home;
