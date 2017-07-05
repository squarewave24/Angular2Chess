/// ref
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ChessService } from './chess.service';
import { IGameBoard, IBoard, IMoveSquares, IPosition } from './interfaces';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChessBoardComponent implements OnInit {

  positions: string[][];
  highlights: boolean[][] = [];
  currentIndex: number = 0;

  constructor(private svc: ChessService) { }

  ngOnInit() {
    this.initPositions();
  }

  loadBoard() {
    this.svc.getBoard().subscribe(value => this.updateBoard((value.json() as IGameBoard).board));
  }
  loadNext() {
    this.svc.getMoves(this.currentIndex++).subscribe(value => this.updateBoard(value.json() as IBoard));
  }
  
  updateBoard(board:IBoard){
    console.log('updateBoard ', board);
    this.loadPieces(board.pieces);
    this.setHighlight(board.last_move_squares.to.row, board.last_move_squares.to.col);

    if (board.special_square)
      this.setHighlight(board.special_square.row, board.special_square.col );
  }


  initPositions() {
    this.positions = [
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
      ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
      ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
      ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],


    ]
  }
  loadPieces(allPieces: string) {
    console.debug('loadPieces', allPieces);
    allPieces.split('/').forEach((row, idx) => {
      this.positions[idx] = row.split('');
    });
  }
  setHighlight(row: number, column: number) {
    this.highlights[row] = this.highlights[row] || [];
    this.highlights[row][column] = true;
  }
  getHighlight(row: number, column: number) {
    return this.highlights[row] && this.highlights[row][column];
  }

  // getAllPositions() {
  //   // this.positions.forEach(row => row.forEach(cell => ))
  //   var idx = 0;

  //   return this.positions
  //     .reduce((prev, curr) => prev.concat(curr))
  //     .map(pos => {
  //       idx++;
  //       return {
  //         piece: pos,
  //         // idx: idx++,
  //         dark: idx % 2 % Math.floor(idx/8) == 0
  //       }
  //     });
  // }

}
