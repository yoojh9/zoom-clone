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
