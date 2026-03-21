import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 5000 });

const servers=[];
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  servers.push(ws)

  ws.on("message", function message(data) {
    // servers.filter(server=> server!=ws).map(sokcket=>sokcket.send(data));
    // const message = typeof data === 'string' ? data : data.toString();
  console.log("relay received:", data.toString());
  const parsedData=JSON.parse(data.toString())
  // const v_servers=servers.filter(server=>)
    servers.map(socket=>{
      console.log("relay forwarding to other servers");
      socket.send(data)
    });//sends data back to all servers
  });
});
