import React from 'react';
import './SidebarChat.css'

function SidebarChat() {
  return <div className='sidebarChat'>
     <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="Avatar"
          className="avatar"
        />
    <div className='sidebarChat__info'>
      <h2>Room name</h2>
      <p>This is meassage</p>
    </div>
  </div>;
}

export default SidebarChat;
