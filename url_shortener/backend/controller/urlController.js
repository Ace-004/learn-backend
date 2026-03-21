const Url=require('../models/url');
const {nanoid}=require('nanoid')

exports.getUrl=async(req,res)=>{
  const code=req.params.code;
  // const shortCode=url.splice(18);
  try {
    const url=await Url.findOne({shortCode:code});
    if(!url)return res.status(404).json({message:"url not found"});
    res.redirect(url.originalURL);
  } catch (error) {
    res.status(500).json({message:"server error"});
    console.error(error);
  }
};


exports.postUrl=async(req,res)=>{
  const {url}=req.body;
  try {
    const shortCode=createShortUrl(url);
    const newUrl=new Url();
    newUrl.originalURL=url;
    newUrl.shortCode=shortCode;
    await newUrl.save();
    const shortUrl=`http://localhost:5000/${shortCode}`
    res.status(201).json({
      shortUrl:shortUrl
    });
  } catch (error) {
    res.status(500).json({message:error})
    console.error(error);
    
  }
};

const createShortUrl=(url)=>{
  const short=nanoid(6);
  return short;
}