import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

Injectable()
export class WebSocketService {
    private socket: Subject<MessageEvent>;
    
    public connect(url): Subject<MessageEvent> {
        if (!this.socket) {
            this.socket = this.create(url);
        }
        return this.socket;
    }
    public disconnect() {
        this.socket.unsubscribe();
    }
    public IsConnected() {
        return this.socket && this.socket.isStopped;
    }

    private create(url): Subject<MessageEvent> {
        let ws = new WebSocket(url);
        let observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            }
        );
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };
        return Subject.create(observer, observable);
    }
}