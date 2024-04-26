// frontend/src/services/WebSocketService.js

import { useEffect } from 'react';

const WebSocketService = ({ onMessage }) => {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    // Handle WebSocket connection open event
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Handle WebSocket messages from server
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log('Received message from server:', message);
      onMessage(message);
    };

    // Handle WebSocket connection close event
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, [onMessage]);

  return null;
};

export default WebSocketService;