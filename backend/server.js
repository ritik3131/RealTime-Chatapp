const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Pusher = require("pusher");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session');

require("dotenv").config();

const messageRouter = require("./routes/messageRoute");
const roomRouter = require("./routes/roomRoute.js");
const authRouter = require("./routes/authRoute");

connectDB();
require("./config/passport")(passport);

const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const db = mongoose.connection;

db.once("open", async () => {
  console.log("db Connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "insert", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error Trigger Pusher");
    }
  });

  const roomCollection = db.collection("rooms");
  const roomChangeStream = roomCollection.watch();

  roomChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("rooms", "insert", {
        roomName: roomDetails.roomName,
      });
    } else {
      console.log("Error Trigger Pusher");
    }
  });
});

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cookieParser('random')) ;
app.use(cookieSession({
  keys: ['key1', 'key2']
}));
app.use(
  session({
    secret: "whatsapp_clone",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

//Passwort Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/room", roomRouter);
app.use("/", authRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

//Add auth-> login make user model and in that in message put the id of user
