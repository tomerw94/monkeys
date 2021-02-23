import { BoardComponent } from './monkeys/components/board/board.component';
import { FullCardComponent } from './monkeys/components/full-card/full-card.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from './websocket.service';
import { CardComponent } from './monkeys/components/card/card.component';
import { PlayerHandComponent } from './monkeys/components/player-hand/player-hand.component';
import { MonkeysModule } from './monkeys/monkeys.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
// import { NbButtonModule } from '@nebular/theme';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { GameComponent } from './monkeys/components/game/game.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

// const routes: Routes = [
//   { path: 'log-in', component: LogInComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '', redirectTo: '/log-in', pathMatch: 'full' }
// ];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { useHash: true }),
    // NbSidebarModule,
    BrowserModule,
    MonkeysModule,
    CommonModule,
    DragDropModule,
    NbThemeModule.forRoot(),
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    AppRoutingModule,

  ],
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    GameComponent,
    BoardComponent,
    CardComponent,
    FullCardComponent,
    PlayerHandComponent,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
