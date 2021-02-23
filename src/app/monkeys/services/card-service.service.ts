import { Card } from '../models/card'
import { Minion } from '../models/minion';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  showCard(card: Card) {
    console.log("here");
    console.log(card.name + ": cost " + card.manaCost + " mana");
  }

  cardToMinion(card: any): Minion {
    let m: Minion = {
      attack: card.attack,
      health: card.health,
      maxHealth: card.maxHealth,
      manaCost: card.manaCost,
      text: card.text,
      name: card.name,
      // attackTimesThisTurn: card.attackTimesThisTurn,
      // attacksLeftThisTurn: card.attacksLeftThisTurn,
      // type: 'minion',
      id: card.id
    };
    return m;
  }

  typeOfCard(card: Card) {
    if (card instanceof Minion)
      return 'minion';
    if (card instanceof Card)
      return 'card';
    return 'spell';
  }

}
