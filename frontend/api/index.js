var socket = new WebSocket("ws://localhost:8080/ws")

let connect = () => {
    console.log("successfully connected");

    socket.onopen = () => {
        console.log("Succesfully Connected");
    };

    socket.onmessage = msg => {
        console.log(msg);
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("sending msg: ", msg);
        socket.send(msg);
    };
};

let sendMsg = msg => {
    console.log("sending msg: ", msg);
    socket.send(msg);
};

export { connect, sendMsg };