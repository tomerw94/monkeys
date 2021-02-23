import { GameComponent } from './components/game/game.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const monkeysPagesRoute: Routes = [
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'game/:id', component: GameComponent }
  // { path: '', redirectTo: '/main-menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(monkeysPagesRoute)],
  exports: [RouterModule]
})
export class MonkeysRoutingModule { }
