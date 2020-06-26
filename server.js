express=require('express');
joi=require('joi');
app=new express();
app.use(express.json());

books=[{bookid:1,Name:"anjali",Price:"700"},{bookid:2,Name:"sita",Price:"800"}];
app.listen(5000,function()
{
    console.log("server is started on port no. 5000");
    // req.send("welcome");
})
   app.get("/", (req, res) => {
      res.send("welcome");
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




// app.get("/", (req, res, next) => {
//     res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//    });
