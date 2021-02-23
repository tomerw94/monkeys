import { FullCardComponent } from './../full-card/full-card.component';
import { CardServiceService } from './../../services/card-service.service';
import { Minion } from './../../models/minion';
import { Card } from '../../models/card';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() set setCard(card: Card) {
    this.card = card;
  };
  @Input() set setFlipped(flip: boolean) {
    this.flipped = flip;
  }
  @Output() hoverEvent = new EventEmitter<number>();
  @Output() dragEvent = new EventEmitter<number>();

  hoverEmit(cardId: number) {
    this.hoverEvent.emit(cardId);
  }
  dragEmit(cardId: number) {
    this.dragEvent.emit(cardId);
  }
  dragged: boolean;
  flipped: boolean;
  card: any;
  cardBackUrl: string;
  frontCardUrl: string;
  hovered = false;

  constructor(private cardService: CardServiceService) { }

  ngOnInit() {
    if (this.card.frontCardUrl == undefined)
      this.card.frontCardUrl = '/assets/images/minions/drBoom.jpg';
    if (this.card.cardBackUrl == undefined)
      this.card.cardBackUrl = '/assets/images/cardbacks/cardBack.png';
    this.dragged = false;
  }

  hover() {
    this.hovered = true;
    this.hoverEmit(this.card.id);
  }

  unhover() {
    this.hovered = false;
    this.hoverEmit(-1);
  }
  typeOfCard(card: Card) {
    return this.cardService.typeOfCard(card);
  }
  drag() {
    this.dragged = true;
    this.dragEmit(this.card.id);
  }
  undrag() {
    this.dragged = false;
    this.dragEmit(-1);
  }

  dragOn() {
    this.dragged = true;
  }
  dragOff() {
    this.dragged = false;
  }
}
