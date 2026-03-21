// const express=require('express');

import {WebSocketServer} from 'ws';
import http from 'node:http';

const server=http.createServer((req:any,res:any)=>{
  res.end('hii there');
})
// const app =express();

const wss=new WebSocketServer({server});

// const clients:WebSocket[]=[];

wss.on("connection",function connection(ws:any){

  ws.on("error",console.error);
  // clients.push(ws);

  ws.on("message",function message(data:any,isBinary:boolean){
    console.log('data',data.toString());
    // const parsedData=JSON.parse(data.toString());
    wss.clients.forEach(function each(client:any){
      console.log('cccc');
      
      if(client.readyState===WebSocket.OPEN){
        console.log('qqqq');
        client.send(data,{binary:isBinary});
        
      }
    })

  });
  ws.send('hello world');
})

server.listen(8080,()=>{
  console.log('server running on port 8080');
  
})