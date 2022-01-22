import { useEffect, useState } from "react";
import pusherJs from "pusher-js";
import axios from "axios";

import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    var pusher = new pusherJs(process.env.PUSHER_KEY, {
      cluster: process.env.PUSHER_SECRET,
    });

    var channel = pusher.subscribe("messages");
    channel.bind("insert",(data)=> {
      setMessage([...message, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [message]);
  useEffect(() => {
    const loadMessage = async () => {
      const response = await axios.get(
        "http://localhost:9000/api/v1/message/getMessage"
      );
      const data = response.data;
      setMessage(data);
    };

    loadMessage();
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={message}/>
      </div>
    </div>
  );
}

export default App;
