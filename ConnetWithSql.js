express=require('express');
joi=require('joi');
app=new express();
app.use(express.json());
//database connectivity  Start--------
sql=require('mssql');

const sqlConfig={
     user:"sa",
     password:"Radixweb@123",
     server:"PC0603",
    database:"DemoDb"

}
//database connectivity  End--------



books=[{bookid:1,Name:"anjali",Price:"700"},{bookid:2,Name:"sita",Price:"800"}];
app.listen(5000,function()
{
    console.log("server is started on port no. 5000");
    // req.send("welcome");
})
   app.get('/', (req, res) => {
       let connection=sql.connect(sqlConfig,(err)=>{
           if(err)
           {
            console.log(err);
           }
           else
           {

            console.log("DB Connected");
            var request = new sql.Request();
            sqlquery='Select * from Demo';
            request.query(sqlquery, function (err, result) {
              if (err) {
                console.log(err);
                res.send(err);
              }
              else {
                // var data = JSON.stringify(result.recordset)
                // recordSet = JSON.parse(data)
                recordSet = JSON.parse(JSON.stringify(result.recordset))
                // res.render('users', { recordSet: recordSet });
                console.log(recordSet);
                res.json(recordSet)
              }
            });
           // console.log("DB Connected");
           }
       })
     // res.send("welcome");
      console.log("Call get method");
   });

   app.get("/books", (req, res) => {
     res.send(books)
     console.log(books)
      console.log("/books Url is invoked ");
   });

   app.get("/books/:id", (req, res) => {
       var book=books.find(x=>x.bookid===parseInt(req.params.id));
    res.send(book)
    console.log(book)
     console.log("/books Url is invoked ");
     res.end();
  });

  app.post("/books", (req, res) => {
      const {error}=validateBook(req.body);
      if(error)
      {
         res.status(400).send(error.details[0].message);
         return;
      }
const book={
    bookid:books.length+1,
    Name:req.body.Name,
    Price:req.body.Price
}
books.push(book);
RunQuery(query)
 res.send(books)
 console.log(books)

 res.end();
});

app.put("/books/:id", (req, res) => {
    console.log(req.body);
    var book=books.find(x=>x.bookid===parseInt(req.params.id));
    const {error}=validateBook(req.body);
    if(error)
    {
       res.status(400).send(error.details[0].message);
       return;
    }

    book.Name=req.body.Name;
    book.Price=req.body.Price;
 res.send(book)
 console.log(books)
  console.log("/books Url is invoked put method ");
  
});

app.delete("/books/:id", (req, res) => {
    console.log(req.body);
    var book=books.find(x=>x.bookid===parseInt(req.params.id));
    
    if(!book)
    {
       res.status(400).send('<h2 style="color: darkred">ID Not Found !</h2>');
       return;
    }

   const index=books.indexOf(book);
   books.splice(index,1);
 res.send(book)
 console.log(books)
  console.log("/books Url is invoked put method ");
  
});

function validateBook(book)
{
const schema={
    Name:joi.string().min(5).required(),
    Price:joi.number(),
}
return joi.validate(book,schema);
}

app.post('/demo',function(req,res)
{   
    

         if (req.body.Name != "") {
            var query = "INSERT INTO Demo (FirstName) VALUES ( " + "'" + req.body.FirstName + "'" + " )";
            console.log(query);
            sql.close();
            sql.connect(sqlConfig, function (err) {
                var request = new sql.Request();
                request.query(query, function (err, result) {
                   console.log(result);
                   //console.log(result.recordset);
                   res.send(result.rowsAffected);
                });
         });
        }
});




// app.delete("/demo/:id", (req, res) => {
//   console.log("demo Id is " + req.params.id);
  
//   const queryString = "DELETE DemoDb WHERE Id =?";
// const connection={
//   user:"sa",
//   password:"Radixweb@123",
//   server:"PC0603",
//  database:"DemoDb"

// }
// connection.query(queryString, [req.params.id], (err, results, fields) => {
//     if (err) {
//       console.log("Could not delete" + err);
//       res.sendStatus(500);
//       return;
//     }
//     console.log("Deleted demo with Id");
//     res.end();
//   });
// });

//Function to connect to database and execute query

app.delete("/demo/:id", function(req , res){
  var query = "DELETE FROM [Demo] WHERE Id=" + req.params.id;
  executeQuery (res, query);
});

app.put("/demo/:id", function(req , res){
  var query = "UPDATE [Demo] SET FirstName= " + req.body.FirstName  +  "   WHERE Id= " + req.params.id;
  executeQuery (res, query);
  res.end("updated");
});

var  executeQuery = function(res, query){             
  sql.connect(sqlConfig, function (err) {
      if (err) {   
                  console.log("Error while connecting database :- " + err);
                  res.send(err);
               }
               else {
                      // create Request object
                      var request = new sql.Request();
                      // query to the database
                      request.query(query, function (err, res) {
                        if (err) {
                                   console.log("Error while querying database :- " + err);
                                  // res.send(err);
                                  }
                                  else {
                                  //  res.send(res);
                                         }
                            });
                    }
   });           
}
