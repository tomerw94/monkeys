import { BoardComponent } from './../board/board.component';
import { Minion } from './../../models/minion';
import { element } from 'protractor';
import { PlayerHandComponent } from './../player-hand/player-hand.component';
import { WebSocketService } from '../../../websocket.service';
import { Card } from '../../models/card';
import { CardComponent } from '../card/card.component';
import { PlayerService } from '../../services/player.service';
import { CardServiceService } from '../../services/card-service.service';
// import { Card } from '../card';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import * as io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  availableCards1: (Card | Minion)[] = [
    { name: 'FlameStrike', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 1 },
    { name: 'Ragnaros', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 2 },
  ];
  availableCards2: (Card | Minion)[] = [
    { name: 'FlameStrike', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 11 },
    { name: 'Ragnaros', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 12 },
  ];
  player = new Player({
    hand: this.availableCards1,
    board: [new Minion(), new Minion()],
    deck: [
      { name: 'FlameStrike2', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 4 },
      { name: 'FlameStrike2', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 5 },
    ],
    health: 30,
    maxHealth: 30,
    id: 1
  });
  enemy = new Player({
    hand: this.availableCards1,
    board: [new Minion(), new Minion(), new Minion(), new Minion()],
    // { name: 'Tomer', manaCost: 10, text: 'Very powerfull', id: 12, attack: 12, maxHealth: 12, health: 12 }),
    // { name: 'Michal', manaCost: 7, text: 'Eat Sushi', id: 13, attack: 4, maxHealth: 4, health: 4 },
    // { name: 'Willy', manaCost: 5, text: 'Battlecry: swim', id: 14, attack: 5, maxHealth: 6, health: 6 },
    // { name: 'Eddie', manaCost: 2, text: 'Deathrattle: die', id: 15, attack: 3, health: 2, maxHealth: 2 },
    deck: [
      { name: 'FlameStrike2', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 14 },
      { name: 'FlameStrike2', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 15 },
    ],
    health: 30,
    maxHealth: 30,
    id: 2
  });
  gameId: number;
  game: Game;
  handDraggedId: number = -1;
  boardDraggedId: number = -1;
  boardHovered: boolean = false;
  constructor(private webSocketService: WebSocketService, private route: ActivatedRoute, private cardService: CardServiceService, private playerService: PlayerService) { }

  ngOnInit() {
    this.player.board[0].name = 'Tomer';
    this.player.board[0].manaCost = 10;
    this.player.board[0].text = 'very powerfull';
    this.player.board[0].id = 22;
    this.player.board[0].attack = 12;
    this.player.board[0].maxHealth = 12;
    this.player.board[0].health = 12;

    this.player.board[1].name = 'Michal';
    this.player.board[1].manaCost = 7;
    this.player.board[1].text = 'Eat Sushi!';
    this.player.board[1].id = 23;
    this.player.board[1].attack = 4;
    this.player.board[1].maxHealth = 4;
    this.player.board[1].health = 4;

    this.enemy.board[0].name = 'Tomer';
    this.enemy.board[0].manaCost = 10;
    this.enemy.board[0].text = 'very powerfull';
    this.enemy.board[0].id = 12;
    this.enemy.board[0].attack = 12;
    this.enemy.board[0].maxHealth = 12;
    this.enemy.board[0].health = 12;

    this.enemy.board[1].name = 'Michal';
    this.enemy.board[1].manaCost = 7;
    this.enemy.board[1].text = 'Eat Sushi!';
    this.enemy.board[1].id = 13;
    this.enemy.board[1].attack = 4;
    this.enemy.board[1].maxHealth = 4;
    this.enemy.board[1].health = 4;

    this.enemy.board[2].name = 'Willy';
    this.enemy.board[2].manaCost = 5;
    this.enemy.board[2].text = 'Battlecry: Swim';
    this.enemy.board[2].id = 113;
    this.enemy.board[2].attack = 5;
    this.enemy.board[2].maxHealth = 6;
    this.enemy.board[2].health = 6;

    this.enemy.board[3].name = 'Eddie';
    this.enemy.board[3].manaCost = 2;
    this.enemy.board[3].text = 'Deathrattle: die';
    this.enemy.board[3].id = 14;
    this.enemy.board[3].attack = 3;
    this.enemy.board[3].maxHealth = 2;
    this.enemy.board[3].health = 2;

    this.gameId = this.route.snapshot.params.id;
    this.getGameData(this.gameId);
    let minion1: Minion = new Minion();
    minion1.id = 3;
    minion1.name = 'Michal2';
    minion1.manaCost = 7;
    minion1.text = 'EAT SUSHI!';
    minion1.maxHealth = 4;
    minion1.health = 4;
    minion1.attack = 4;

    this.availableCards1.push(minion1);
    let minion2: Minion = new Minion();
    minion2.id = 13;
    minion2.name = 'Michal3';
    minion2.manaCost = 7;
    minion2.text = 'EAT SUSHI!';
    minion2.maxHealth = 4;
    minion2.health = 4;
    minion2.attack = 4;
    this.availableCards1.push(minion2);
    // this.socket = io("http://localhost:3000");
    this.game = {
      player: this.player,
      enemy: this.enemy,
      turnNumber: 1
    };
  }

  getGameData(gameId: number) {
    // this.webSocketService.
  }

  setBoardHovered($event: any) {
    this.boardHovered = $event.type === 'mouseenter';
  }

  play(card: Card) {
    console.log(card);
    // this.playerService.
  }
  setHandDragged(id: number) {
    this.handDraggedId = id;
  }
  setBoardDragged(id: number) {
    this.boardDraggedId = id;
  }

  // public ngAfterViewInit() {
  //   this.socket.on("status", () => {
  //     this.enemy.health += 1;
  //     console.log(this.enemy.health);
  //     console.log("data");
  //   });
  // }

}
