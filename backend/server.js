const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Pusher = require("pusher");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const messageRouter = require("./routes/messageRoute");
const roomRouter = require("./routes/roomRoute.js");
const authRouter = require("./routes/authRoute");

connectDB();

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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser("mySecretKey"));
app.use(
  session({
    secret: "secretsssss",
    rolling: false,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName:'sessions'
    }),
    cookie: {
      secure:false,
      sameSite: false, // i think this is default to false
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  //console.log("session ",req.session);
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then((user) => {
      console.log("user",user)
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/vi/google", authRouter);

app.listen(port, () => console.log(`Listening on ${port}`));

//Add auth-> login make user model and in that in message put the id of user
