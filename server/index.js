let Game = require('./models/game.js').Game
let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
let waitingPlayers = [];
let readyPairs = [];

players = [];
games = [];
preAnimationsGames = [];

////////////////////
//                  GAME DATA               ////////////////////////

function draw(playerId) {
  let gameIndex = games.findIndex(g => g.player1.playerId === playerId || g.player2.playerId === playerId);
  let pagIndex1 = preAnimationsGames.findIndex(pag => pag[0] === playerId);
  let otherPlayerId = games[gameIndex].player1.playerId === playerId ? games[gameIndex].player2.playerId : games[gameIndex].player1.playerId;
  let pagIndex2 = preAnimationsGames.findIndex(pag => pag[0] === otherPlayerId);
  preAnimationsGames[pagIndex1][1].actions.push({
    type: "draw",
    playerId: playerId
  });
  preAnimationsGames[pagIndex2][1].actions.push({
    type: "draw",
    playerId: playerId
  });
  if (games[gameIndex].player1.playerId === playerId) {
    if (games[gameIndex].player1.deck.length > 0) {
      games[gameIndex].player1.hand.push(games[gameIndex].player1.deck[games[gameIndex].player1.deck.length - 1]);
      games[gameIndex].player1.deck.pop();
    }
    else
      console.log("fatigue");
  }
  else {
    if (games[gameIndex].player2.deck.length > 0) {
      games[gameIndex].player2.hand.push(games[gameIndex].player2.deck[games[gameIndex].player2.deck.length - 1]);
      games[gameIndex].player2.deck.pop();
    }
    else
      console.log("fatigue");
  }
  console.log(playerId, " draw");
}
function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function creategame(player1Id, player2Id) {
  let switched = false;

  if (Math.random() > 0.5) {
    switched = true;
    let temp = player2Id;
    player2Id = player1Id;
    player1Id = temp;
  }

  let game = {
    player1: {
      playerId: player1Id,
      hand: [
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 1
        },
        {
          manaCost: 10,
          id: 2,
          attack: 12,
          health: 12,
          maxHealth: 12,
          gameId: 2
        },
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 3
        },
        {
          manaCost: 8,
          id: 3,
          gameId: 4
        },
        {
          manaCost: 5,
          id: 4,
          gameId: 5
        },
      ],
      board: [
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 6
        },
        {
          manaCost: 10,
          id: 2,
          attack: 12,
          health: 12,
          maxHealth: 12,
          gameId: 7
        }
      ],
      deck: [
        {
          manaCost: 8,
          id: 5,
          attack: 8,
          health: 8,
          maxHealth: 8,
          gameId: 17
        },
        {
          manaCost: 8,
          id: 5,
          attack: 8,
          health: 8,
          maxHealth: 8,
          gameId: 19
        },
        {
          manaCost: 8,
          id: 5,
          attack: 8,
          health: 8,
          maxHealth: 8,
          gameId: 20
        }
      ],
      health: 30,
      maxHealth: 30,
      maxMana: 0,
      leftMana: 0

    },
    player2: {
      playerId: player2Id,
      hand: [
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 8
        },
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 9
        },
        {
          manaCost: 5,
          id: 4,
          gameId: 10
        },
      ],
      board: [
        {
          manaCost: 7,
          id: 1,
          attack: 4,
          health: 4,
          maxHealth: 4,
          gameId: 11
        },
        {
          manaCost: 10,
          id: 2,
          attack: 12,
          health: 12,
          maxHealth: 12,
          gameId: 12
        },
        {
          manaCost: 8,
          id: 5,
          attack: 8,
          health: 8,
          maxHealth: 8,
          gameId: 13
        },
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 14
        }
      ],
      deck: [
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 15
        },
        {
          manaCost: 8,
          id: 5,
          attack: 8,
          health: 8,
          maxHealth: 8,
          gameId: 16
        },
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 18
        },
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 21
        },
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 22
        },
        {
          manaCost: 2,
          id: 6,
          attack: 3,
          health: 2,
          maxHealth: 2,
          gameId: 23
        },
      ],
      health: 30,
      maxHealth: 30,
      maxMana: 0,
      leftMana: 0
    },
    turnNumber: 0,
    gameCardId: 0,
    actions: [
      {
        type: 'startGame'
      },
      {
        type: 'startTurn',
        playerId: switched ? player2Id : player1Id
      }
    ]
  }
  return game;
}

////  GAME DATA END ////////


io.on('connection', function (socket) {
  if (socket.handshake.query['playerId'] != undefined) {
  }
  else {
    console.log('user connected');
    players.push(players.length.toString());
    let playerId = players.length - 1;
    if (waitingPlayers.length > 0) {
      // readyPairs.push([playerId, waitingPlayers[0][1]])
      let newGame = creategame(playerId, waitingPlayers[0][1]);
      preAnimationsGames.push([playerId, copyObject(newGame)]);
      preAnimationsGames.push([waitingPlayers[0][1], copyObject(newGame)]);
      games.push(copyObject(newGame));
      draw(games[games.length - 1].player1.playerId);
      games[games.length - 1].actions = [];
      console.log("sending start game to: ", playerId, waitingPlayers[0][1])
      socket.emit("start game", playerId);
      // draw(games[games.length - 1].player1.playerId);
      waitingPlayers[0][0].emit("start game");

      waitingPlayers = [];
      // console.log(`started a game between playerId: ${games[games.length - 1].player1.playerId} and playerId ${games[games.length - 1].player2.playerId}`);
    }
    else {
      socket.emit("wait for opponent", playerId);
      socket.emit("bbb", 42);
      waitingPlayers.push([socket, playerId]);
    }
  }
  socket.on("get game", playerId => {
    // if (games.findIndex(g => g.player1.playerId === playerId || g.player2.playerId === playerId) < 0) {
    let index = preAnimationsGames.findIndex(pag => pag[0] === playerId);
    socket.emit("game data", preAnimationsGames[index][1]);
    preAnimationsGames[index] = [playerId, games.find(g => g.player1.playerId === playerId || g.player2.playerId === playerId)];
    // }
  })

});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});