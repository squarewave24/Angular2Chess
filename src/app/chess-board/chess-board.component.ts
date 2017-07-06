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

  positions: IPiece[][];
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
    this.setHighlight(to);
    this.setHighlight(from);

    if (board.special_square)
      this.setHighlight(board.special_square);
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
  setHighlight(pos:IPosition) {
    this.getPiece(pos).highlighted = true;
  }
  
  clear() {
    this.positions.forEach(row => row.forEach(piece => piece.highlighted = false));
  }
  move(from:IPosition, to:IPosition){
    var fp = this.getPiece(from)
    this.getPiece(to).code =  fp.code;
    fp.clear();
  }
  
  getPiece(pos: IPosition) : IPiece {
    this.positions[pos.row] = this.positions[pos.row] || [];
    return this.positions[pos.row][pos.col];
  }
  moveTest() {
    this.move(new Position(6,2), new Position(4,2));
  }
}


class Position implements IPosition {
  row:number;
  col:number;
  constructor(row:number,col:number){
    this.row = row;
    this.col = col;
  }
}
class Piece implements IPiece {
    code: string;
    highlighted: boolean;
    constructor(code: string){
        this.code = code;
    }
    clear() {
      this.code = 'e';
      this.highlighted = false;
    }
}