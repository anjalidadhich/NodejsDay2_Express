
express=require('express');
app=new express();
app.use(express.static('public'));
app.get("/", (req, res) => {
    //res.send("welcome");
    res.json({"Name":"anjali"});
    console.log("Call get method with custom middle ware");
 });

app.listen(5000,(req,res)=>
 {
     console.log("server started on port no. 5000")
 })