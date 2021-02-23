import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NbButtonModule, NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

const logRoutes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      logRoutes
      , { enableTracing: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
