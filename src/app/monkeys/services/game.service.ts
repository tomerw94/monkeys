import { Game } from '../models/game';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;
  constructor() { }

}
