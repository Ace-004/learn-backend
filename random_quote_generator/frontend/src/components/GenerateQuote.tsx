import { useState } from "react"
import api from "../service/api";

const GenerateQuote = () => {
  const [quote,setQuote]=useState('');
  const handler=async()=>{
    const response=await api.get('/quote');
    // const quote=await response.json();
    setQuote(response.data);
  }
  return (
    <div>
      <h2>{quote}</h2>
      <button onClick={handler}>
        generate
      </button>
    </div>
  )
}

export default GenerateQuote