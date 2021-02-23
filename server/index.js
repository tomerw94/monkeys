let Game = require('./models/game.js').Game
let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
let waitingPlayers = [];

////////////////////
//                  GAME DATA               ////////////////////////
function creategame(player1Id, player2Id) {
  let game = {
    player1: {
      playerId: player1Id
    },
    player2: {
      playerId: player2Id
    }
  }
  if (Math.random() > 0.5) {
    game.player1.playerId = player2Id;
    game.player2.playerId = player1Id;
  }
  return game;
}

////  GAME DATA END ////////
players = [];
games = [];

io.on('connection', (socket) => {
  console.log('user connected');
  players.push(players.length.toString());
  let playerId = players.length - 1;
  if (waitingPlayers.length > 0) {
    games.push(creategame(playerId, waitingPlayers[0][1]));
    socket.emit("start game", playerId);
    waitingPlayers[0][0].emit("start game");
    waitingPlayers = [];
    console.log(`started a game between playerId: ${games[games.length - 1].player1.playerId} and playerId ${games[games.length - 1].player2.playerId}`);
  }
  else {
    socket.emit("wait for opponent", playerId);
    waitingPlayers.push([socket, playerId]);
  }
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});