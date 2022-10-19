import axios from "axios";
import React, { useEffect, useState } from "react";
import pusherJs from "pusher-js";

import Logout from "./Logout";

import AddRoom from "./AddRoom";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

/* <button onClick={handleOpen}>Dropdown</button> */

<img
    role="button"
    tabIndex="0"
    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    alt="Avatar"
    className="avatar"
/>;

function Sidebar(props) {
    const [showNewRoom, setShowNewRoom] = useState(false);
    const [roomDetails, setRoomDetails] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
        console.log("Pressed");
    };

    useEffect(() => {
        const loadRooms = async () => {
            const response = await axios.get(
                "http://localhost:9000/api/v1/room"
            );
            const data = response.data;
            setRoomDetails(data);
        };
        loadRooms();
    }, []);

    useEffect(() => {
        var pusher = new pusherJs("2569c0364b70125dae1f", {
            cluster: "ap2",
        });

        var channel = pusher.subscribe("rooms");
        channel.bind("insert", (data) => {
            setRoomDetails([...roomDetails, data]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [roomDetails]);

    // const getLastMessage=async(messageId)=>{
    //   const response = await axios.get(`http://localhost:9000/api/v1/message/${messageId.toString()}`);
    //   const data = response.data;
    //   console.log(data);
    // }
    const addRoomHandler = () => {
        setShowNewRoom((prevState) => !prevState);
    };

    const toggleRoomsHandler = (event) => {
        props.onLoadMessage(event.target.id);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="dropdown">
                    <button className="profile" onClick={handleOpen}>
                        
                        <img
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                            alt="Avatar"
                            className="avatar"
                        />
                        ;
                    </button>
                    {open ? (
                        <ul className="menu">
                            <li className="menu-item">
                                    <Logout/>
                            </li>
                        </ul>
                    ) : null}
                    {open ? <div></div> : <div className="loggedIn">Logged In</div>}
                </div>

                <div className="sidebar__headerRight">
                    <div className="spinning">
                        <i className="fa fa-spinner fa-spin spinning"></i>
                    </div>
                    <i className="material-icons">chat</i>
                    <i className="material-icons">more_vert</i>
                </div>
            </div>

            <div className="sidebar__addRoom">
                <h3 onClick={addRoomHandler}>Add new Chat</h3>
                {showNewRoom && <AddRoom OnToggleAddRoom={addRoomHandler} />}
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <i className="fa fa-search"></i>
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chat">
                {roomDetails.map((room) => (
                    <SidebarChat
                        onClick={toggleRoomsHandler}
                        key={room._id}
                        avatarUrl={room.roomName.avatarUrl}
                        name={room.roomName.name}
                        value={room._id}
                        lastMessage={
                            room.roomName.messages.length == 0 &&
                            //getLastMessage( room.roomName.messages[0])
                            "No chat yet"
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
