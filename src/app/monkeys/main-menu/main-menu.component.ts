import { WebSocketService } from './../../websocket.service';
import { PlayerService } from '../services/player.service';
import { Minion } from '../models/minion';
import { CardServiceService } from '../services/card-service.service';
import { Card } from '../models/card';
import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  // availableCards: Card[] = [
  //   { name: 'FlameStrike', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 1, type: 'spell' },
  //   { name: 'Ragnaros', manaCost: 7, text: 'Deal 4 damage to all enemy minions', id: 2, type: 'spell' },
  // ];
  // player1: Player = {
  //   hand: this.availableCards,
  //   board: [],
  //   deck: [],
  //   health: 30,
  //   maxHealth: 30,
  //   id: 1
  // }
  startGameSubject: Subscription;
  private socket: any;

  constructor(private router: Router, private webSocketService: WebSocketService, private cardService: CardServiceService, private playerService: PlayerService) { }

  ngOnInit(): void {
    let minion: Minion = {
      name: 'Michal',
      manaCost: 7,
      text: 'EAT SUSHI!',
      attack: 4,
      health: 4,
      maxHealth: 4,
      // attackTimesThisTurn: 0,
      // attacksLeftThisTurn: 0,
      id: 3,
      // type: 'minion'
    }
    this.startGameSubject = this.webSocketService.onStartGameSubject().subscribe(data => {
      this.router.navigateByUrl(`/game/${data}`);
    });
    // this.availableCards.push(minion);

  }

  play() {
    this.webSocketService.connectToServer();
    // this.socket.on("start game", (game: any) => {
    //   console.log("starting game");
    //   console.log(game);
    // })
  }

  // showCards() {
  //   this.player1.hand.forEach(c =>
  //     this.playerService.play(this.player1, c.id));
  // }

}
