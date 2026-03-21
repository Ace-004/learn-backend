import { useEffect,useState } from 'react'

const App = () => {

  const [socket,setSocket]=useState<null | WebSocket>(null);
  const [msg,setMsg]=useState([]);

  const [message,setMessage]=useState<string>('');


  useEffect(()=>{

    const wss=new WebSocket('ws://localhost:8080');

    wss.onopen=()=>{
      console.log('client conected to server');
      setSocket(wss);
    }
    wss.onmessage=({data})=>{//server sends message
      // const parsedData=JSON.parse(data);
      setMsg(prev=>[...prev,data]);
      console.log('set');
      
    }
    wss.onclose=()=>{
      console.log('disconnected');
    }

    return ()=>{
      wss.close();
    }
  },[]);

  const sendMsg=(message:string)=>{
    socket.send(message);
  }

  if(!socket){
    return <div>
      connecting to socket server...
    </div>
  }

  return (
    <div>App

      {msg}

      <form onSubmit={e=>{
        e.preventDefault();
        sendMsg(message);
      }}>
        <input type="text"
        value={message}
        onChange={e=>setMessage(e.target.value)}
        placeholder='enter message'
        />
        <button>
          send
        </button>
      </form>
    </div>
  )
}

export default App