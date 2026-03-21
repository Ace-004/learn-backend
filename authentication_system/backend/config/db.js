const mongoose=require('mongoose');

const MONGODB_URI=process.env.MONGO_URI;

const connectDB=async()=>{
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('mongodb connected');
  } catch (error) {
    console.error('error occured while connecting to db '+error);
    process.exit(1);
  }
}

module.exports=connectDB;