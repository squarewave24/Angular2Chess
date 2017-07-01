import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './posts.service';
import { ChessBoardComponent } from './chess-board/chess-board.component';


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
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
