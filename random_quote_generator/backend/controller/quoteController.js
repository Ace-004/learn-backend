exports.getQuote=(req,res)=>{
  const quote=generateRandomQuote();
  res.status(201).json(quote);
}

const generateRandomQuote=()=>{
  const quotes=[
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "Life is what happens when you're busy making other plans.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't be afraid to give up the good to go for the great.",
  "Do stuff. Be clenched, curious. Attention is vitality.",
  "Lighten up, just enjoy life, smile more, laugh more.",
  "Don't cry because it's over, smile because it happened."
];

return quotes[Math.floor(Math.random()*quotes.length)]
}