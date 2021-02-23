import { Observable, Subject, Subscription } from 'rxjs';
import { io } from 'socket.io-client';
// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
export class WebSocketService {
  private url = 'http://localhost:3000';

  private socket: any;
  private gamegame: any;
  // startGameObservable(): Observable<any> {
  //   console.log("in observable of websocketservice");
  //   return this.gamegame;
  // };
  private startGameSubject: Subject<any> = new Subject();

  constructor() {
    // this.socket = io(this.url, { transports: ['websocket'] });
  }

  connectToServer() {
    this.socket = io(this.url, { transports: ['websocket'] });
    this.socket.on("start game", (playerId: number) => {
      if (playerId) {
        this.gamegame = playerId;
      }
      this.startGame();
    });
    this.socket.on("wait for opponent", (playerId: number) => {
      console.log(`wait for game, your playerId is: ${playerId}`);
      this.gamegame = playerId;

    });
  }

  startGame() {
    this.startGameSubject.next(this.gamegame);
  }

  onStartGameSubject(): Subject<any> {
    return this.startGameSubject;
  }

}