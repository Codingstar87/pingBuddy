// import { app } from "./lib/socket.js";
import express from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import { createServer } from 'node:http';
import dotenv from "dotenv" ;
dotenv.config()

const app = express()


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))




const server = createServer(app);
const io = new Server(server
    ,{
    cors : {
        origin : ["http://localhost:5173"],
        credentials : true
    }}
);

export function getReceiverSocketId(userId) {
    return usersSocketMap[userId];
  }
const usersSocketMap = {}

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    const userId = socket.handshake.query.userId ;
    if(userId) usersSocketMap[userId] = socket.id ;

    io.emit("getUsers", Object.keys(usersSocketMap))


    socket.on("disconnected",() => {
        console.log("A user disconnected", socket.id)
        delete usersSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(usersSocketMap));
    })
  });




app.use("/cart" , (req,res) => {
    res.send("Hello c")
})

app.use(express.json({ limit: '500mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

import authRouth from "./routes/auth.routes.js";
app.use("/v1/api/auth", authRouth)

import messageRoutes from "../src/routes/message.routes.js"
app.use("/v1/api/messages", messageRoutes)



export  {app , io , server }
