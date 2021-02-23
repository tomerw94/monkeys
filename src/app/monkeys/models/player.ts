import { Minion } from './minion';
import { Card } from './card';

export class Player {
    deck: Card[];
    hand: Card[] = [];
    board: Minion[] = [];
    health: number = 30;
    maxHealth: number = 30;
    id: number;

    constructor(player: any) {
        this.board = player.board;
        this.deck = player.deck;
        this.hand = player.hand;
        this.maxHealth = player.maxHealth;
        this.health = player.health;
        this.id = player.id;
    }

    play(cardId: number) {
        var card = this.hand.find(c => c.id === cardId);
        if (card instanceof Minion) {
            this.board.push(card);
            this.hand.splice(this.hand.indexOf(card), 1);
        }
    }

    draw(amount: number) {
        for (var i = 0; i++; i < amount) {
            if (this.deck.length > 0) {
                if (this.hand.length < 10) {
                    this.hand.push(this.deck[this.deck.length - 1]);
                }
                this.deck.pop()
            }
            else {
                console.log("fatigue");
            }
        }
    }
}
