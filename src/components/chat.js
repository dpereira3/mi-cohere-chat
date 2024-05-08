import React, { useState } from 'react';


const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const API = 'P7qCosaAIAWwLikSHtiMgYS9GOUaR849nmlmEoXv';
  const Model = 'da9dfc4e-9d43-432b-8c65-4c4a2c10ea0d';


  const handleSendMessage = async () => {
    if (message) {
      try {
        const response = await fetch(`https://api.cohere.com/v1/models/${Model}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API}`
          },
          body: JSON.stringify({
            inputs: {
              text: message
            }
          })
        });

        const data = await response.text(); // Obtener la respuesta como texto
        console.log(data); // Imprimir la respuesta en la consola
        const parsedData = JSON.parse(data); // Analizar la respuesta como JSON
        const responseMessage = parsedData.results[0].generated_text;
        setMessages([...messages, { user: 'bot', message: responseMessage }]);
        setMessage('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <h1>Chat con Cohere</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <strong>{message.user}:</strong> {message.message}
          </div>
        ))}
      </div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
