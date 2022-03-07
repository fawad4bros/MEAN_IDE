import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IDEService {
  private clientSocket: socketIo.Socket;
  constructor(private http: HttpClient) {
    this.clientSocket = socketIo.connect("http://localhost:3000", {
    reconnection: true,
    reconnectionDelay: 4000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: 5,
    withCredentials: true,
    transports: ['websocket'],
    });
  }
  listenToServer(connection: any): Observable<any>{
    return new Observable((subscribe) => {
      console.log(subscribe);
      this.clientSocket.on(connection, (data: any) => {
        console.log(data)
      subscribe.next(data);
      });
    });
  }

  emitToServer(connection: any, data: any): void {
    this.clientSocket.emit(connection, data);
  }

  runCode(body:any){
    console.log('body',body)
    return this.http.post("http://localhost:3000/attempts", body);
  }

  emitUser(){
      this.clientSocket.emit('join',{id:1});
  }
}
