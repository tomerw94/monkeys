import { CardServiceService } from './card-service.service';
import { Minion } from '../models/minion';
import { Player } from '../models/player';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player: Player;
  constructor(private cardService: CardServiceService) { }

  draw(player: Player, amount: number) {
    for (var i = 0; i < amount; i++) {
      if (player.deck.length > 0) {
        if (player.hand.length < 10) {
          player.hand.push(player.deck[player.deck.length - 1]);
        }
        player.deck.pop();
      }
      else {
        console.log("fatigue");
      }
    }
  }

  // play(cardId: number) {
  //   var card = this.player.hand.find(c => c.id === cardId);
  //   if (card != undefined) {
  //     if (card.type === 'minion') {
  //       player.board.push(this.cardService.cardToMinion(card));
  //     }
  //     player.hand = player.hand.filter(c => c.id != cardId);
  //   }
  // }
}
