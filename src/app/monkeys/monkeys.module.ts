import { CardComponent } from './components/card/card.component';
// import { PlayerHandComponent } from './components/player-hand/player-hand.component';
// import { NbButtonModule, NbThemeModule } from '@nebular/theme';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonkeysRoutingModule } from './monkeys-routing.module';


@NgModule({
  imports: [
    CommonModule,
    // NbThemeModule,
    MonkeysRoutingModule,
    // NbButtonModule
  ],
  declarations: [
    MainMenuComponent,
    // PlayerHandComponent
    // CardComponent
  ]
})
export class MonkeysModule { }
