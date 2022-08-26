import { Injectable } from '@angular/core';

import {Socket} from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { }

  onCreate(room:string){
    this.socket.emit('create', room)
  }

  onJoin(room:string){
    this.socket.emit('join', room)
  }

  onMessage( mess:any){
    this.socket.emit('message',mess)
  }

  onPrivate():Observable<string>{
    return this.socket.fromEvent('message private')
  }

  onRoom():Observable<string>{
    return this.socket.fromEvent('newRoom')
  }
}
