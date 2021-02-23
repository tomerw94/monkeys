// import { Card } from './../../models/card';
import { Minion } from './../../models/minion';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card';
import { Game } from '../../models/game';
import { type } from 'os';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() set setGame(game: Game) {
    this.game = game;
  };
  @Input() set setHandDraggedId(id: number) {
    this.handDraggedId = id;
    this.handDraggedType = this.typeOfHandCard(id);
  }
  handDraggedType: string;
  handDraggedId: number = -1;
  game: Game;
  @Input() set setHover(hoveredId: number) {
    this.hoveredId = hoveredId;
  };
  @Input() set setBoardHovered(boardHovered: boolean) {
    this.boardHovered = boardHovered;
  }
  @Output() dragEvent = new EventEmitter<number>();

  boardHovered: boolean;
  hoveredId: number;
  draggedId: number = -1;
  enemyMinionHoveredId: number = -1;

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<Minion[]>) {
    if (event.previousContainer === event.container) {
      console.log("moved friendly minion");
      if (this.enemyMinionHoveredId === -1)
        console.log("but nothing happended");
      else
        console.log(this.game.player.board[event.previousIndex].name + ' attacked ' + this.game.enemy.board.find(m => m.id === this.enemyMinionHoveredId)?.name);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let playedCard = this.game.player.hand[event.previousIndex];
      if (playedCard instanceof Minion) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      else {
        if (this.boardHovered)
          console.log('this.game.player.hand.splice(event.previousIndex, 1)');
      }
    }
  }
  enterBoard() {
    return true;
  }

  setHovered($event: number) {
    this.hoveredId = $event;
  }
  setHoveredEnemyMinionId($event: any) {
    this.enemyMinionHoveredId = $event;
  }

  // sortPredicate(index: number, item: CdkDrag<number>) {
  //   console.log("here");
  //   console.log(index);
  //   console.log(item);
  //   return true;
  // }

  typeOfHandCard(id: number) {
    if (this.game && id > -1) {
      let card = this.game.player.hand.find(c => c.id === id);
      if (card instanceof Minion) {
        return 'Minion';
      }
      return 'Spell';
    }
    return 'no game';
  }
  isMinionPredicate(id: number) {
    return (drag: CdkDrag, drop: CdkDropList): any => {
      return this.typeOfHandCard(id) === 'Minion';
    };
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

}
