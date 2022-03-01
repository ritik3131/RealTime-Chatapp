import { useEffect, useState } from "react";
import pusherJs from "pusher-js";
import axios from "axios";

import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Starter from "./components/Starter";
import Login from "./components/Login";

function App() {
  const [message, setMessage] = useState([]);
  const [showStarter, setShowStarter] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomUrl, setRoomUrl] = useState("");

  useEffect(() => {
    var pusher = new pusherJs("2569c0364b70125dae1f", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("insert", (data) => {
      setMessage([...message, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [message]);

  const loadMessageHandler = async (roomId) => {
    setShowStarter(false);
    setRoomId(roomId);
    const response = await axios.get(
      `http://localhost:9000/api/v1/room/${roomId}`
    );
    const data = response.data;
    setMessage(data.messages);
    setRoomName(data.name);
    setRoomUrl(data.avatarUrl);
  };

  return (
    <div className="app">
      <Login/>
      <div className="app__body">
        <Sidebar onLoadMessage={loadMessageHandler} />
        {!showStarter ? (
          <Chat
            messages={message}
            roomName={roomName}
            roomId={roomId}
            url={roomUrl}
          />
        ) : (
          <Starter />
        )}
      </div>
    </div>
  );
}

export default App;
