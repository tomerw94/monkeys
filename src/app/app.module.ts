import { MonkeysModule } from './monkeys/monkeys.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
// import { NbButtonModule } from '@nebular/theme';
// import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    // NbSidebarModule,
    BrowserModule,
    MonkeysModule,
    // NbThemeModule.forRoot({ name: 'default' }),
    // NbButtonModule,
    // NbLayoutModule,
    AppRoutingModule,


  ],
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
