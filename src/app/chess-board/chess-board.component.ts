import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { Ng2UploaderModule } from 'ng2-uploader';



@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChessBoardComponent implements OnInit {

  positions: string[][];
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:10050/upload'
  };
  sizeLimit = 2000000;

  constructor() { }


  handleUpload(data): void {
    console.debug('handleUpload', data);
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    console.debug('beforeUpload ', uploadingFile);
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }



  ngOnInit() {
    this.initPositions();
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
  getAllPositions() {
    // this.positions.forEach(row => row.forEach(cell => ))
    var idx = 0;

    return this.positions
      .reduce((prev, curr) => prev.concat(curr))
      .map(pos => {
        idx++;
        return {
          piece: pos,
          // idx: idx++,
          dark: idx % 2 % Math.floor(idx/8) == 0
        }
      });
  }

}
