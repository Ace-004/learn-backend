import { WebSocket, WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 8080 });

const rooms = {};

const RELAYER_URL = "ws://localhost:5000";

const relayersocket = new WebSocket(RELAYER_URL);

relayersocket.onmessage = (event) => {
  console.log("data"+event.data);
  
  const parsedData = JSON.parse(event.data);
  console.log('parsed data ',parsedData);
  
  const room = parsedData.room;

  if(!rooms[room]){
    return null;
  }

    if(parsedData.type=='chat'){
      rooms[room].sockets.forEach((socket) => {
      socket.send(event.data.toString());
      console.log(event.data.toString());
      
    });
    }
};

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    const parsedData = JSON.parse(data.toString());
    const room = parsedData.room;

    if (parsedData.type == "join-room") {
      if (!rooms[room]) {
        rooms[room] = {
          sockets: [],
        };
      }
      rooms[room].sockets.push(ws);
    }
    if(parsedData.type=="chat"){
      if(relayersocket.readyState===WebSocket.OPEN){
        console.log("server1 forwarding to relay");
        relayersocket.send(data);
      }
    }
  });
});
