const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
  const authHeader=req.headers.authorization;
  if(!authHeader)return res.status(400).json({message:'no token'});
  if(authHeader.split(' ')[0]!=='Bearer')return res.status(400).json({message:'invalid token format'});
  const header=authHeader.split(' ')[1];
  try {
    const decoded=jwt.verify(header,process.env.JWT_SECRET_kEY);
    req.id=decoded.id;
    next();
  } catch (error) {
      res.status(401).json({message:'not authorized'})
  }
}
module.exports=authMiddleware;