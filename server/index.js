const http=require("http");
const express=require("express")
const cors = require("cors");
const socketIO = require("socket.io");
const { log } = require("console");

const app=express();
const port= 4500 || process.env.PORT;   /*4500 mila to thik hai wrna .env se jo port milega use use kr lenge*/

const users=[{}];
app.use(cors());
app.get("/" , (req,res) => {
      res.send("HELL ITS WORKING");
})
const server=http.createServer(app); 

const io=socketIO(server);  /*connection ho gya humne ek circuitbana dia io naam ka*/

io.on("connection",(socket)=>{        
      console.log("New Connection");

      socket.on('joined', ({user}) => {
            users[socket.id]=user;
            console.log(`${user} has joined`);
            socket.broadcast.emit('userJoined',{ user:"Admin", message:`${users[socket.id]} has joined the chat`});
            socket.emit('welcome' ,{user:"Admin" , message:`Welcome to the chat, ${users[socket.id]}`});
            
      })

      socket.on('message',({message,id}) =>{
            console.log(`Message recieved from ${id}: ${message}`);
            io.emit('sendMessage',{user:users[id],message,id});

      })
      socket.on('disconn' ,() =>{
           
            socket.broadcast.emit('leave', {user: "Admin" , message:`${users[socket.id]} has left the chat`});
            console.log(`${users[socket.id]} has left the chat`);
            
            
      })
 
      
});


server.listen(port,()=>{
      console.log(`server is working on http://localhost:${port}`);
}
)