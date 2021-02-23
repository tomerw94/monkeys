import { Card } from './card';
export class Minion extends Card {
    manaCost: number;
    id: number;
    text: string;
    name: string;
    attack: number;
    health: number;
    maxHealth: number;
    cardBackUrl?: string;
    frontCardUrl?: string;
}
