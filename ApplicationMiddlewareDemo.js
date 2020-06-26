 express=require('express');
 //app.use(expree.json());
const app=new express();
 // Custom Middleware----------
 const LoggerMiddleware =(req,res,next)=>{
console.log(`Logged  ${req.url}---    ${req.method}---   ${new Date()}`)
next();
 }
 //Application level Middleware
app.use(LoggerMiddleware);

app.get("/", (req, res) => {
    //res.send("welcome");
    res.json({"Name":"anjali"});
    console.log("Call get method with custom middle ware");
 });

 app.get("/persons", (req, res) => {
    //res.send("welcome");
    res.json({"Name":"anjali"});
    console.log("Call get method with custom middle ware");
 });
 //console.dir(app.locals.title)
 app.listen(5000,(req,res)=>
 {
     console.log("server started on port no. 5000")
 })
const router=express.Router();