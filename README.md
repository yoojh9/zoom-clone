# Noom

Zoom clone using NodeJS, WebRTC and Websockets.

<br>

# 0. Introduction

## 1) Server Setup

```
$ npm i nodemon -D
$ npm i @babel/cord @babel/cli @babel/node @babel/preset-env -D
$ npm install express
$ npm install pug
```

## 2) Front Setup

-   [MVP.css](https://andybrewer.github.io/mvp/)
-   MVP.css를 쓰면 기본 HTML 태그들을 다 예쁘게 바꿔준다.
-   https://github.com/yoojh9/zoom-clone/commit/8f6d09841a58ff987029d786bf2a2a382e178ef1

<br><br>

# 1. Chat With WebSockets

## 1) HTTP vs WebSockets

-   WebSocket 덕분에 실시간 chat, notification 같은 real-time을 만들 수 있다.
-   HTTP와 WebSocket은 모두 프로토콜이다.
-   HTTP는 **stateless**이다. 그 말은 즉 backend가 유저를 기억하지 못한다는 의미이다. request와 response 과정 뒤에 backend는 유저를 잊어버린다.
-   HTTP에서 서버는 request를 받을 때만 response를 준다.

-   WebSocket은 http와 전혀 다른 프로토콜로 real-time이 가능하다. 브라우저가 서버로 WebSocket request를 보내면 서버가 accept(받거나) 하거나 deny(거절) 한다. 브라우저는 WebSocket을 통해 서버와 connect 되어 있으므로 서버는 유저가 누군인지 기억할 수 있다.
-   또한 연결되어 있기 때문에 원한다면 서버가 유저에게 메세지를 보낼 수 있다. 이는 bi-directional(양방향의) 연결이기 때문이다.
-   다시 말하지만 이 모든 것들은 connection(연결) 중 일 때만 발생한다.
-   WebSocket은 어떤 프로그래밍 언어에 국한되어 있지 않다. 단지 protocol이다.

<br>

## 2) WebSockets in NodeJS

-   [ws](https://www.npmjs.com/package/ws)
-   ws는 WebSocket의 implementation으로 핵심 core 기능만 있고 부가적인 기능이 없다.

```
$ npm i ws
```

-   express에 WebSocket 서버를 추가할 수 있다.

-   이렇게 하면 localhost는 동일한 포트에서 http, ws request 두 개를 처리할 수 있다.
-   https://github.com/yoojh9/zoom-clone/commit/7d1e2035d0a07d96e227757afa3a950ae021716e

<br>

```javascript
import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

// ...생략

const handleListen = () => console.log("Listening on http://localhost:3000");
// app.listen(3000, handleListen);

const server = http.createServer(app); // http 서버. http 서버 사용 안하면 안 만들어도 됨
const wss = new WebSocket.Server({ server }); // websocket server. http 서버 위에 websocket 서버를 만듦.

server.listen(3000, handleListen);
```

<br>

## 3) WebSocket Event

-   ws를 사용해서 backend와 frontend 사이의 connection을 만든다.
-   프론트에서는 아무것도 설치할 필요 없이 브라우저에서 제공한다.
-   https://developer.mozilla.org/ko/docs/Web/API/WebSocket
-   webSocket은 브라우저와 서버 사이의 연결로, real-time으로 소통할 수 있다.
-   backend와 frontend는 실시간으로 메세지를 주고 받을 수 있다.
-   프로젝트에서 server.js(backend)의 socket은 연결된 브라우저를 뜻한다. app.js(front)의 socket은 서버로의 연결을 의미한다.
-   https://github.com/yoojh9/zoom-clone/commit/cd7f40a4c39aa7b7cde6548c69abca2505a3c4a3

<br>

## 4) WebSocket Messages

-   https://github.com/yoojh9/zoom-clone/commit/b7c41ba85730672897e088a284ca0c8f8dfc3d35

<br>

## 5) Recap

### (1) backend (server.js)

-   WebSocket 서버를 만들고, connection이라는 이벤트를 listen하고 있다. connection이 생기면 socket에서 누가 연결했는지 알 수 있다. - socket이 connection을 종료(close)시키면, 예를 들어서 브라우저의 탭을 닫거나 컴퓨터가 잠자기 모드에 들어가는지 알 수 있고, 특정 socket에서 메세지를 받기를 기다릴 수 있다.
-   backend에서는 특정 socket에 event listener를 등록했다. (! 서버에 eventListener를 등록한게 아님) 왜냐하면 이 event listener는 backend와 연결된 브라우저를 위한 것이다. 그러므로 새로운 브라우저가 서버에 들어오면 같은 이벤트 리스너를 등록시켜준다.
-   socket.send()를 통해 backend에서 frontend로 메세지를 보낼 수 있다.

### (2) frontend (app.js)

-   브라우저에서는 backend와 connection을 열어준다.
-   그리고 event listner를 등록했다.
-   또한 socket.send()를 통해 frontend에서 backend로 메세지를 보낼 수도 있다.
