import React from 'react'
import "./Join.css";
import logo from "../../images/logo.png"
import {Link} from "react-router-dom";
import { useState } from 'react';

let user;

const sendUser=() =>{
  user  = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value="";
}

const Join = () => {

  const [name,setname]= useState("");
 
  return (
    <div className ="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo"/>
        <h1>C CHAT</h1>
        <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput"/> {/*input me value jane ke baad jo bhi name hoga vo setname me chala jaega*/}
        <Link onClick = {(event) => !name ? event.preventDefault():null} to="/chat">                  {/* agr koii name present nhi hai input me to link pr click krne se koi next page nhi khulega or link ka default nature prevent ho jaega or agar name hai to null rehne do*/}
        <button onClick={sendUser} className="joinbtn">Login IN</button>  
        </Link>
      </div>
     
    </div>
  )
}

export default Join
export {user}

