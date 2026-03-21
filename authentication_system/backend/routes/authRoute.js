const express=require('express');
const authController=require('../controller/authController')

const router=express.Router();

router.post('/login',authController.postLogin);
router.post('/register',authController.postRegister);

module.exports=router;