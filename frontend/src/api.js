// WebSocket connection
let ws = null;

export function connect() {
  ws = new WebSocket("ws://localhost:8080/ws");
  
  ws.onopen = () => {
    console.log("Connected to server");
  };
  
  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };
  
  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
  
  ws.onclose = () => {
    console.log("Disconnected from server");
  };
}

export function sendMsg(message) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error("WebSocket is not connected");
  }
}
