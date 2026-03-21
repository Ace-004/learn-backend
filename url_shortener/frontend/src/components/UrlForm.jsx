import React from 'react'
import { useState } from 'react'
import api from '../services/axios'

const UrlForm = () => {
  const [url,setUrl]=useState('');
  const [shortUrl,setShortUrl]=useState('');
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res=await api.post('/url',{
      url
    });
    setShortUrl(res.data.shortUrl);
    setUrl('');
  }
  return (
   <>
   <form onSubmit={handleSubmit}>
    <input type="text"
    value={url}
    onChange={e=>setUrl(e.target.value)}
    placeholder='enter url'
    required
    />
    <br />
    <button>
      generate short url
    </button>
   </form>
   {
    shortUrl&& <p>
      <a href={shortUrl} target="_blank">
        {shortUrl}
      </a>
    </p>
   }
   </>
  )
}

export default UrlForm