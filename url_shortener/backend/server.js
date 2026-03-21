const express = require('express');
const cors=require('cors');
const connectDB=require('./config/db')
const urlRoutes=require('./routes/urlRoutes');
const urlController=require('./controller/urlController');

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',urlRoutes);
app.get('/:code',urlController.getUrl);


const PORT=5000;
const startServer=async()=>{
  try {
    await connectDB();
    app.listen(PORT,()=>{
      console.log(`backend running on http://localhost:${PORT}`);
    })
  } catch (error) {
    console.error(error);
  }

}

startServer();
