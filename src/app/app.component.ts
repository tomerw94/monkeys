import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // template: `

  //   <nb-layout>
  //     <nb-layout-header fixed>Company Name</nb-layout-header>

  //     <nb-sidebar>Sidebar Content</nb-sidebar>

  //     <nb-layout-column>
  //        <button nbButton>Hello World</button>
  //     </nb-layout-column>
  //   </nb-layout>
  // `
})
export class AppComponent {
  title = 'monkeys';
}
