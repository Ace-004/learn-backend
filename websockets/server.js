const http = require('http');
const express = require('express');
const {Server}=require('socket.io');
const path=require('path');

const app=express();
const server =http.createServer(app);
const io=new Server(server);

// socket.io

io.on('connection',(socket)=>{
  socket.on('chat message',message=>{
    io.emit('chat message',message);
  })
})

// app.use(express.static(path.resolve('./public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/',(Req,res)=>{
  return res.sendFile('./public/index.html');
})

const PORT=5000;

server.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
  
}); 