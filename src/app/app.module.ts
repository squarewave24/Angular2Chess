import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { ChessBoardComponent } from './chess-board/chess-board.component';

// import { Ng2UploaderModule } from 'ng2-uploader';
import { ChessService } from './chess-board/chess.service';
import { WebSocketService } from './chess-board/websocket.service'

// Define the routes
const ROUTES = [
  {
    path: 'chess',
    component: ChessBoardComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    ChessBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
    
  ],
  providers: [
    PostsService,
    ChessService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
