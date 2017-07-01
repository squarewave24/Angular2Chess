import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChessBoardComponent implements OnInit {

  positions:string[][];

  constructor() { }



  ngOnInit() {
    this.initPositions();
  }


  initPositions() {
    this.positions = [
      ['R','K','B','Q','K','B','K','R'],
      ['P','P','P','P','P','P','P','P'],
      ['e','e','e','e','e','e','e','e'],
      ['e','e','e','e','e','e','e','e'],
      ['e','e','e','e','e','e','e','e'],
      ['e','e','e','e','e','e','e','e'],
      ['p','p','p','p','p','p','p','p'],
      ['r','k','b','q','k','b','k','r'],
      
      
    ]
  }
  getAllPositions() {
    // this.positions.forEach(row => row.forEach(cell => ))
    return this.positions.reduce((prev,curr) => prev.concat(curr));
  }

}
