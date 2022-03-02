import { useEffect, useState } from "react";
import pusherJs from "pusher-js";
import axios from "axios";

import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Starter from "./components/Starter";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./components/Logout";
import { userAction } from "./store";

function App() {
  const [message, setMessage] = useState([]);
  const [showStarter, setShowStarter] = useState(true);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomUrl, setRoomUrl] = useState("");
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

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

  // const getCurrentUser = async () => {
  //   const response = await axios.get(
  //     "http://localhost:9000/api/v1/message/user"
  //   );
  //   const data = response.data;
  //   console.log(data);
  //   if (data.isAuth)
  //     dispatch(userAction.login({ name: data.name, mailId: data.mailId }));
  // };

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
  // const {isAuthLocal,name,mailId} = JSON.parse(localStorage.getItem('isAuth'));
  const LocalStorage = localStorage.getItem("isAuth");
  if (LocalStorage) {
    const { isAuthLocal, name, mailId } = JSON.parse(LocalStorage);
    console.log({ isAuthLocal, name, mailId });
    dispatch(userAction.login({ isAuth: isAuthLocal, name, mailId }));
  }

  return (
    <div className="app">
      {!isAuth && <Login />}
      {isAuth && (
        <>
          {" "}
          <Logout />
          <div className="app__body" style={{ marginTop: "-2rem" }}>
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
        </>
      )}
    </div>
  );
}

export default App;
