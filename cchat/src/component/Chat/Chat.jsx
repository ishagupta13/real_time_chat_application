import React from 'react'
import "./Chat.css";
import socketIo from "socket.io-client"
import { useEffect } from 'react';
import sendLogo from "../../images/send.png";
import {user} from "../Join/Join";
import { useState } from 'react';
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";

let socket;

const ENDPOINT ="http://localhost:4500/";

const Chat = () => {
   const [id, setId] = useState("");
   const [messages, setMessages] = useState([]);
   
   const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = "";
}

  
console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT , { transports: ['websocket']});    /*initializing a WebSocket connection using socket.io*/

    socket.on('connect' ,() => {
      alert('Connected to the Chat');
      setId(socket.id);
      
    });
    
     /*data bhejna to server*/
     console.log(socket);
     socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    /*welcome ka msg recieve krne ke liye emit se send hota hai aur on se recieve*/
    socket.on('userJoined',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on('leave',(data) => {
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    });
    
    return () => {
      socket.emit('disconn');
      socket.off();
    };
  },[]);
   
  useEffect(() => {
    socket.on('sendMessage',(data) => {
      setMessages([...messages, data]);
      console.log(data.user,data.message,data.id);
    })
    return () => {
      socket.off();
    }
  } ,[messages]);
  
  
  
  return (
    <div className="chatPage">
      <div className="chatContainer"> 
        <div className="header">
          <h2>C CHAT</h2>
          <a href="/">
          <img src={closeIcon} alt="Close"/></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item,i) => <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
          <button onClick={send} className ="sendBtn"><img src={sendLogo} alt="Send"/></button>
        </div>
      </div>
    </div>
  )
}

export default Chat
