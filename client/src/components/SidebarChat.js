import React from "react";
import "./SidebarChat.css";

function SidebarChat(props) {
  return (
    <div
      className="sidebarChat"
      onClick={props.onClick}
      id={props.value}
    >
      <img
        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        alt="Avatar"
        className="avatar"
      />
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>{props.lastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
