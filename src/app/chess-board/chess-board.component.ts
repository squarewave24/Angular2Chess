/// ref
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { ChessService } from './chess.service';
import { IGameBoard, IBoard, IMoveSquares, IPosition, IPiece, IMove } from './interfaces';


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
  highlightTrail: IPiece[] = [];
  highlightLength: number = 4;

  constructor(private svc: ChessService) { }

  ngOnInit() {
    this.initPositions();
    this.svc.moves.subscribe(msg => {
        console.debug('msg ', msg);
    });
    // this.startServer();
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
    ].map(row => row.map(letter => new Piece(letter))) 
  }
  loadPieces(allPieces: string) {
    console.debug('loadPieces', allPieces);
    allPieces.split('/').forEach((row, idx) => {
      this.positions[idx] = row.split('').map(char => new Piece(char));
    });
  }
  setHighlight(pos:IPosition) {
    var p = this.getPiece(pos);
    p.highlighted = true;
    this.highlightTrail.push(p);
  }
  
  clear() {
    this.positions.forEach(row => row.forEach(piece => piece.highlighted = false));
  }
  move(from:IPosition, to:IPosition){
    var fp = this.getPiece(from);
    fp.highlighted = true;
    var tp = this.getPiece(to);
    tp.code =  fp.code;
    tp.highlighted = true;
    fp.code = 'e';

    this.clearHighlights(fp,tp);
  }
  clearHighlights(...pieces:IPiece[]) {
    this.highlightTrail.push(...pieces);
    while (this.highlightTrail.length > this.highlightLength){
      this.highlightTrail.shift().highlighted = false;
    }
  }
  
  getPiece(pos: IPosition) : IPiece {
    this.positions[pos.row] = this.positions[pos.row] || [];
    return this.positions[pos.row][pos.col];
  }
  moveTest() {
    this.move(new Position(6,2), new Position(4,2));
  }
  // startServer() {
  //   this.svc.startGameEngine();
  // }
  startGame(){
    this.initPositions();
    // trigger the game to start on the server
    this.svc.startGame().subscribe(res => {
      console.log('game started');
      // subscribe to the incoming web socket stream 
      this.svc.subscribeMoves().subscribe(data => {
          var move = data as IMove
          console.debug('socket received: ', JSON.stringify( move ));
          this.move(move.from, move.to);
      });
    })
  }
  
}

// local classes 
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