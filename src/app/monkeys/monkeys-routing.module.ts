import { MainMenuComponent } from './main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const monkeysPagesRoute: Routes = [
  { path: 'main-menu', component: MainMenuComponent },
  // { path: '', redirectTo: '/main-menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(monkeysPagesRoute)],
  exports: [RouterModule]
})
export class MonkeysRoutingModule { }
