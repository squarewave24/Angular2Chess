import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChessService {

    constructor(private http:Http){

    }

    getBoard() {
        var url = 'api/board';
        return this.http.get(url);
    }
    getMoves(idx:number){
        var url = `api/games/${idx}`
        return this.http.get(url);
    }
}