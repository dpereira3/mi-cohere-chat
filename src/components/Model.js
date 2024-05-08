import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Model = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = 'P7qCosaAIAWwLikSHtiMgYS9GOUaR849nmlmEoXv';

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('https://api.cohere.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${API}`
          }
        });
        setModels(response.data.models);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div>
      <h1>Modelos disponibles en Cohere AI</h1>
      {loading ? (
        <div>Cargando modelos...</div>
      ) : (
        <ul>
          {models.map((model, index) => (
            <li key={index}>{model.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Model;
