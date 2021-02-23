import { Minion } from './../../models/minion';
import { Card } from './../../models/card';
import { CardComponent } from './../card/card.component';
import { Game } from '../../models/game';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-player-hand',
  templateUrl: './player-hand.component.html',
  styleUrls: ['./player-hand.component.scss']
})
export class PlayerHandComponent implements OnInit {

  @Input() set setGame(game: Game) {
    this.game = game;
  };
  @Input() set setHover(hoveredId: number) {
    this.hoveredId = hoveredId;
  };
  @Input() set setDrag(draggedId: number) {
    this.draggedId = draggedId;
  };
  @Input() set setBoardHovered(boardHovered: boolean) {
    this.boardHovered = boardHovered;
  }
  @Input() set setBoardDraggedId(id: number) {
    this.boardDraggedId = id;
  }
  boardDraggedId: number = -1;
  boardHovered: boolean;
  @Output() dragEvent = new EventEmitter<number>();
  draggedId: number = -1;
  game: Game;
  hoveredId: number;
  constructor() { }

  ngOnInit() {
  }
  drop(event: CdkDragDrop<Card[]>) {
    this.draggedId = -1;
    if (event.previousContainer === event.container) {
      if (this.boardHovered) {
        let card = this.game.player.hand[event.previousIndex];
        if (!(card instanceof Minion)) {
          this.game.player.hand.splice(event.previousIndex, 1);
        }
      }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  noReturnPredicate() {
    return false;
  }
  setHovered($event: number) {
    this.hoveredId = $event;
  }
  setDragged($event: number) {
    this.draggedId = $event;
  }
  unDrag() {
    this.draggedId = -1;
  }
  dragStart(id: number) {
    this.dragEvent.emit(id);
  }

  handCardMove() {
    console.log("moved");
  }

}
