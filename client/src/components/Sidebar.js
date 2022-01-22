import React from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="Avatar"
          className="avatar"
        />
        <div className="sidebar__headerRight">
          <div className="spinning">
            <i className="fa fa-spinner fa-spin spinning"></i>
          </div>
          <i className="material-icons">chat</i>
          <i className="material-icons">more_vert</i>
        </div>
        </div>
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
            <i class="fa fa-search"></i>
            <input placeholder="Search or start new chat" type="text"/> 
            </div>
      </div>
      <div className="sidebar__chat">
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
      </div>
    </div>
  );
}

export default Sidebar;
