let socket = null;

export function connect(cb) {
  socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => console.log("Connected");
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    cb(msg);
  };
  socket.onclose = () => console.log("Closed");
  socket.onerror = (err) => console.log(err);
}

export function sendMsg(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 1, body: message }));
  }
}