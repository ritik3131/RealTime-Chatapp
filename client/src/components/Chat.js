import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";

function Chat({ messages, roomName, roomId, url }) {
  const [input, setInput] = useState("");
  const userName=useSelector(state=>state.user.name)
  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const data = input;
    await axios.post(`http://localhost:9000/api/v1/message/${roomId}/new`, {
      name: userName,
      message: data,
      timestamp: new Date().toISOString(),
      received: true,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <img src={url} alt="Avatar" className="avatar" />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <i className="fa fa-search"></i>
          <i className="material-icons">attachment</i>
          <i className="material-icons">more_vert</i>
        </div>
      </div>
      <div className="chat__body">
        {messages &&
          messages.map((message) => (
            <p
              className={`chat__message ${
                message.name===userName && "chat__received"
              }`}
              key={message._id}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          ))}
      </div>

      <div className="chat__footer">
        <i className=" emoji fa fa-smile-o"></i>
        <form onSubmit={sendMessageHandler}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type a meesage"
          />
          <button type="submit">Send a message</button>
        </form>
        <i className="microphone fa fa-microphone"></i>
      </div>
    </div>
  );
}

export default Chat;
