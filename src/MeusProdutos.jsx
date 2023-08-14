import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './Context';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const url = 'http://localhost:4000';

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
          `${url}/atualizar/${productId}`, // Correção: /atualizar/${productId} em vez de /atualizar/${productId}
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
    <div>
      <h1>Meus Produtos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <div>
              <img src={product.photo} alt={product.name} />
            </div>
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Categoria: {product.category}</p>
              <p>
                Status:
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStatus[product.id] === 'Disponível'}
                    onChange={() => handleStatusChange(product.id, 'Disponível')}
                  />
                  Disponível
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStatus[product.id] === 'Não disponível'}
                    onChange={() => handleStatusChange(product.id, 'Não disponível')}
                  />
                  Não disponível
                </label>
              </p>
              <p>Preço: R$ {product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProducts;
