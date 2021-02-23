import { WebSocketService } from './websocket.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import io from "socket.io-client";
// import * as io from 'socket.io-client';

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
export class AppComponent implements OnInit {

  @ViewChild("game")
  private gameCanvas: ElementRef;
  title2 = 'ttt'
  private context: any;
  private socket: any;
  // title = 'monkeys';
  title: string = 'test4';
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.title2 = "test1";
    // this.socket = io("http://localhost:8080", { transports: ['websocket'] });
    // this.socket = io.connect("http://localhost:8080", { transports: ['websocket'] });
    // this.socket = io.connect("http://localhost:8080");
    // this.socket.on('connect', function () {
    //   console.log('CONNECTED');
    // });

  }

  // test() {
  //   console.log("test was done");
  //   this.socket = io.connect("http://localhost:8080");
  // }

  // public ngAfterViewInit() {
  //   this.title = 'test3';


  //   this.context = this.gameCanvas.nativeElement.getContext("2d");
  //   this.context.fillRect(0, 0, 20, 20);
  //   this.context.fillRect(30, 30, 20, 20);
  //   this.context.clearRect(
  //     0,
  //     0,
  //     this.gameCanvas.nativeElement.width,
  //     this.gameCanvas.nativeElement.height
  //   );
  //   this.context.fillRect(10, 10, 20, 20);

  //   this.title = 'test4';
  //   this.socket.on("position", (position: any) => {
  //     this.title = 'test5';
  //     console.log("got position");
  //     this.context.clearRect(
  //       0,
  //       0,
  //       this.gameCanvas.nativeElement.width,
  //       this.gameCanvas.nativeElement.height
  //     );
  //     this.context.fillRect(position.x, position.y, 20, 20);
  //   });
  //   // this.socket.on("status", () => {
  //   //   console.log(status);
  //   //   console.log("data");
  //   // });
  // }

  connectToServer() {
    this.webSocketService.connectToServer();
  }
}
