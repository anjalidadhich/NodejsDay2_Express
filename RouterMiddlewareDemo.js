express=require('express');
const app= express();
const router=express.Router();
router.use((req, res,next) => {
   
   console.log("Time:"+ new Date());
   next();
})
router.get("/persons/:id", (req, res,next) => {
    console.log("Request Url:"+ req.originalUrl);
   next();
 },
  (req, res,next) => {
    console.log("Request Method:"+ req.method);
   next();
 },
  (req, res) => {
   // console.log("Request Method:"+ req.method);
  res.json({
      "Name":"Anjali","Id":req.params.id
  })
 });
app.use("/",router);

app.listen(5000,(req,res)=>
{
    console.log("server started on port no. 5000")
})
