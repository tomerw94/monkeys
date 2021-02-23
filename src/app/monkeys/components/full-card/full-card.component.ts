import { Minion } from './../../models/minion';
import { CardServiceService } from './../../services/card-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-full-card',
  templateUrl: './full-card.component.html',
  styleUrls: ['./full-card.component.scss']
})
export class FullCardComponent implements OnInit {
  @Input() set setCard(card: Card) {
    this.card = card;
  };
  card: any;
  cardBackUrl: string;
  frontCardUrl: string;

  constructor(
    private cardService: CardServiceService
  ) { }

  ngOnInit() {
  }

  typeOfCard(card: Card) {
    return this.cardService.typeOfCard(card);
  }

}
