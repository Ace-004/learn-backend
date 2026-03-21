const express=require('express');
const cors=require('cors');
const quoteRoutes=require('./routes/quoteRoute')

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',quoteRoutes);

const PORT=5000;
app.listen(PORT,()=>{
  console.log(`server in running on http://localhost:${PORT}`);
  
})