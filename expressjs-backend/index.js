 const express= require("express");

const app= express();

const PORT=8000;

app.get("/users",(req,res)=>{
    res.send("<h1>this is users page</h1>")
})

app.get("/users/:id",(req,res)=>{
    const userId= req.params.id
     res.send(`you are requesting for user:${userId}`)
})

app.listen(PORT, ()=>{
    console.log(`server is running on port:${PORT}`)
})

