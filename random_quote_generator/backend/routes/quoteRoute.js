 const express=require('express');
const qouteController=require('../controller/quoteController')

 const router=express.Router();

 router.get('/quote',qouteController.getQuote);

 module.exports=router;