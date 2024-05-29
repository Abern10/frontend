import { useEffect } from 'react';

let ws;

const WebSocketService = ({ onMessage }) => {
  useEffect(() => {
    // Create WebSocket connection if it doesn't exist
    if (!ws) {
      ws = new WebSocket('ws://localhost:8001');

      // Handle WebSocket connection open event
      ws.onopen = () => {
        console.log('WebSocket connection established client print');
      };

      // Handle WebSocket messages from server
      ws.onmessage = event => {
        const message = JSON.parse(event.data);
        console.log('Received message from server:', message);
        onMessage(message);
      };

      // Handle WebSocket connection close event
      ws.onclose = event => {
        console.log('WebSocket connection closed client print');
        console.log('Close code:', event.code);
        console.log('Reason:', event.reason);
        ws = null; // Reset ws to allow reconnection
      };
    }

    // Clean up WebSocket connection on component unmount
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [onMessage]);

  return null;
};

export default WebSocketService;
