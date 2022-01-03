const express= require("express");
const socket=require("socket.io");
const app=express();

app.use(express.static("public"));
let port=5000;
let server=app.listen(port,function(){
    console.log("listening to port "+port);
});

let io=socket(server);

io.on("connection",function(socket){
    console.log("made connection");
    socket.on("beginpath",(data)=>{
        io.sockets.emit("beginpath",data);
    });
    socket.on("movepath",(data)=>{
        io.sockets.emit("movepath",data);
    });
    socket.on("uppath",(data)=>{
        io.sockets.emit("uppath",data);
    });
    socket.on("rect",(data)=>{
        io.sockets.emit("rect",data);
    })
});