/// ref
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ChessService } from './chess.service';
import { IGameBoard, IBoard, IMoveSquares, IPosition, IPiece } from './interfaces';


@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChessBoardComponent implements OnInit {

  positions: Piece[][];
  currentIndex: number = 0;
  boardSummary: string;

  constructor(private svc: ChessService) { }

  ngOnInit() {
    this.initPositions();
  }

  loadBoard() {
    this.clear();
    this.svc.getBoard().subscribe(value => this.updateBoard((value.json() as IGameBoard).board));
  }
  loadNext() {
    this.clear();
    var idx = this.currentIndex++;
    this.svc.getMoves(idx).subscribe(value => this.updateBoard(value.json() as IBoard, `Board ${idx}`));
  }
  
  updateBoard(board:IBoard, title:string = null){
    console.log('updateBoard ', board);
    var from = board.last_move_squares.from;
    var to = board.last_move_squares.to;

    this.boardSummary = `${title || 'Main Board'} last:${from.row}:${from.col}-${to.row}:${to.col} ${board.pieces}`
    this.loadPieces(board.pieces);
    this.setHighlight(to.row, to.col);
    this.setHighlight(from.row, from.col);

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
    ].map(row => row.map(letter => new Piece(letter))) // convert string[][] to Piece[][]
  }
  loadPieces(allPieces: string) {
    console.debug('loadPieces', allPieces);
    allPieces.split('/').forEach((row, idx) => {
      this.positions[idx] = row.split('').map(char => new Piece(char));
    });
  }
  setHighlight(row: number, column: number) {
    this.getPiece(row,column).highlighted = true;
  }
  
  clear() {
    this.positions.forEach(row => row.forEach(piece => piece.highlighted = false));
  }
  // move(from:IPosition, to:IPosition){
  //   this.positions[from.row][from.col] = 'e';
  //   if (this.positions[to.col, to.row])
  // }
  getPiece(col:number,row:number) : Piece {
    this.positions[row] = this.positions[row] || [];
    return this.positions[row][col];
  }
}

export class Piece implements IPiece {
    code: string;
    highlighted: boolean;
    constructor(code: string){
        this.code = code;
    }
}