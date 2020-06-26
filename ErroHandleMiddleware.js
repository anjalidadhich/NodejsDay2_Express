express =require('express');
app=express();
app.use(function(err,req,res,next){
    console.log(err.stack);
    err.status(500).send("Some Error occur !");
})