const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',async(req,res)=>{
  res.json({
    message:'API RUNNING !!'
  });
});


const apiRoutes=require('./src/routes/apiRoutes');
app.use('/api',apiRoutes);


app.use((error,req,res,next)=>{
  console.log(error);
  next(error);
});

app.use((error,req,res,next)=>{
  res.status(500).json({
    message:error.message,
    stack:error.stack
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
