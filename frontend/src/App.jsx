import { useState,useEffect } from 'react'
import './App.css'

function App() {
  //useState can be used for AI Selection
  const attachFile = (e) => {
      e.preventDefault();
      console.log("Default prevented");
  }
  async function getAI(msg){
    let response = await fetch("http://127.0.0.1:5000/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "message": msg
      })
    })
    let data = await response.text();
    return data;
  }
  const formHandler = async (e) => {
      e.preventDefault();
      const inputMessage = document.getElementById('input-message');
      const userResponse = inputMessage.value;
      inputMessage.value = "";

      const userChild = document.createElement('div');
      userChild.textContent = userResponse;
      userChild.className = "message user-message";
      document.getElementById('chat-window').append(userChild);

      const aiChild = document.createElement('div');
      aiChild.className = "message ai-message";
      aiChild.innerHTML = `<img src="loading.gif" style="height: "30%""  />`
      document.getElementById('chat-window').append(aiChild);
      
      const aiResponse = await getAI(userResponse);
      aiChild.innerHTML = "";
      aiChild.textContent = aiResponse;
      
  }

  
  //need to set up onclick for plus button
  
  return (
    <>
      <div className='app'>
          <div className='chat-window' id='chat-window'>
            
          </div>
          <div className='text-field'>
            <form action="" className='my-form' onSubmit={formHandler}>
              <button className='short-button' onClick={attachFile}><img src="plus.svg" alt="" className='image' /></button>
              <input type="text" id='input-message' placeholder='Type a message' autoComplete='off' />
              <button type='submit' className='short-button'> <img src="send.svg" alt="" height={"80%"} width={"80%"} /> </button>
            </form>
              
          </div>
      </div>
      <button onClick={getAI}>Ok</button>
      
    </>
  )
}

export default App
