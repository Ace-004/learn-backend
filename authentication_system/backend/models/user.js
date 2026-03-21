const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
  },
  lastName:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
},{timestamps:true});

userSchema.pre('save',async function () {
  if(!this.isModified('password')) return;
  this.password=await bcrypt.hash(this.password,12);
})

module.exports=mongoose.model('User',userSchema);