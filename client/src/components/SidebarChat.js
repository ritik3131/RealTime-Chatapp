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
        src={props.avatarUrl}
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
