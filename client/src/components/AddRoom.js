import axios from "axios";
import React from "react";

function AddRoom(props) {
  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:9000/api/v1/room/new", {
      name: event.target[0].value,
      url: event.target[1].value
    });
    event.target[0].value = "";
    props.OnToggleAddRoom();
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="sidebar__addRoomContainer">
          <input placeholder="Add a new chat" type="text" />
        </div>
        <div className="sidebar__addRoomContainer">
          <input placeholder="Add a Avatar url" type="url" />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddRoom;
