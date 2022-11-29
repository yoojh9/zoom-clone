import express from "express";
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + '/public'));
app.get("/", (req, res) => res.render("home"));
app.get('/*', (req, res) => res.redirect('/'));

const handleListen = () => console.log('Listening on http://localhost:3000');
// app.listen(3000, handleListen);

const server = http.createServer(app); // http 서버. http 서버 사용 안하면 안 만들어도 됨
const wss = new WebSocket.Server({ server }); // websocket server. http 서버 위에 websocket 서버를 만듦.

wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅")
    socket.send("Hello!!!");
    socket.on("close", () => console.log('Disconnected from Browser ❌'));
    socket.on("message", message => {
        console.log(message.toString('utf8'))
    })
})

server.listen(3000, handleListen);