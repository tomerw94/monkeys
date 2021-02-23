import { Player } from '../models/player';
export interface Game {
    player: Player;
    enemy: Player;
    turnNumber: number;
}
