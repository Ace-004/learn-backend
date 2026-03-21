const express=require('express');
const urlController=require('../controller/urlController');

const router=express.Router();

router.post('/url',urlController.postUrl);


module.exports=router;