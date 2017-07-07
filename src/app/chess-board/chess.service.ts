import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { WebSocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';
import { IGameBoard, IBoard, IMoveSquares, IPosition, IMove } from './interfaces';


const socketUrl = 'ws://localhost:3006';

@Injectable()
export class ChessService {

    public moves: Subject<IMove> = new Subject<IMove>();
    // public randomData: Subject<number> = new Subject<number>();

    constructor(private http: Http, private socket: WebSocketService) {

        
    }

    getBoard() {
        var url = 'api/board';
        return this.http.get(url);
    }
    getMoves(idx: number) {
        var url = `api/games/${idx}`
        return this.http.get(url);
    }
    startGameEngine(){
        var url = 'api/engine/start';
        return this.http.put(url, 'start').subscribe(result => {
            console.log('engine started ', result.json());
            
        });
    }
    startGame() {
        return this.http.put('api/game/start', '');
    }
    subscribeMoves() {
        console.log('connecting to socket')
        return <Subject<IMove>>this.socket
            .connect(socketUrl)
            .map((response: MessageEvent): IMove => {
                return JSON.parse(response.data);
            });
    }
    unsubscribeMoves() {
        this.socket.disconnect();
    }
    isSubscribed()  {
        return this.socket.IsConnected();
    }
}
