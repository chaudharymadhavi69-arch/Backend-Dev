const()

//FileSystem.appendFileSync("test.txt", new Date().toLocaleString())
//const file=FileSystem.readFileSync("test.txt","utf=8")
 const http=require("http")
 const server =http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"application/json"})
    res.end("response is closed")
 })

 server.listen(3000,()=>{  
    console.log("Server is running on port 3000")
 })