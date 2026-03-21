const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoute');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth',authRoutes);

const PORT = process.env.PORT || 5000;

const startServer=async()=>{
  try {
    await connectDB();
app.listen(PORT, () => {
    console.log(`server running on http://127.0.0.1:${PORT}`);
  })
  } catch (error) {
    console.error('error occured'+error);
    
  }
}

startServer();