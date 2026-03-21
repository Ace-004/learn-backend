const mongoose=require('mongoose');

const MONGO_URI='mongodb+srv://ace_007:rraannaa@ace.3kmxheq.mongodb.net/url_shortener'

const connectDB=async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connected');
    
  } catch (error) {
    console.error('error while connecting db '+error);
    process.exit(1);
  }
}

module.exports=connectDB;