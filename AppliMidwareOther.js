express=require('express');
const app=new express();

//-------------Practice some more------

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
  })
//-------
  app.disable('trust proxy')
app.get('trust proxy')
//------
app.locals.title = 'My App'
console.dir(app.locals.title)// ??.dir()
//--------
console.log( __dirname );  // ??  //D:\Project\NodeJs\NodejsDay2Express
console.log( __filename );//D:\Project\NodeJs\NodejsDay2Express\AppliMidwareOther.js
function printHello() {
    console.log( "Hello, World!");
 }
 
 // Now call above function after 2 seconds
 setTimeout(printHello, 6000);
//------------

var admin = express()

admin.get('/', function (req, res) {
  console.dir(admin.mountpath) // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage')
})

var secret = express()
secret.get('/', function (req, res) {
  console.log(secret.mountpath) // /secr*t
  res.send('Admin Secret')
})

admin.use('/secr*t', secret) // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin) // load the 'admin' router on '/adm*n' and '/manager', on the parent app

//--------------

//-----------------------




app.get("/", (req, res) => {
   //res.send("welcome");
   res.json({"Name":"anjali"});
   console.log("Call get method with custom middle ware");
});
app.all('/demo', function (req, res, next) {
        console.log('Accessing the secret section ...')
        next() // pass control to the next handler
      })

//console.dir(app.locals.title)
app.listen(5000,(req,res)=>
{
    console.log("server started on port no. 5000")
})
const router=express.Router();