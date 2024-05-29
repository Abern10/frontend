// frontend/src/App.js

import React, { useState } from 'react';
import WebSocketService from './services/WebSocketService';
import Graph from './components/Graph';

function App() {
  const [historicalPrices, setHistoricalPrices] = useState(null);

  // Callback function to handle incoming messages from WebSocketService
  const handleWebSocketMessage = message => {
    console.log('Received message from server:', message);

    if (message.type === 'historicalPrices') {
      console.log('Historical prices data:', message.data);
      setHistoricalPrices(message.data);
    }
    // Add handling for other message types if needed
  };

  return (
    <div className="App">
      <h1>Cryptocurrency Price Predictor</h1>
      {/* Render the Graph component and pass historicalPrices as props */}
      <Graph historicalPrices={historicalPrices} />
      
      {/* Initialize WebSocketService and pass handleWebSocketMessage callback */}
      <WebSocketService onMessage={handleWebSocketMessage} />
    </div>
  );
}

export default App;