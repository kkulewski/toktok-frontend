import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/message.dto';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>('message');
  }

  add(message: MessageDto): Observable<Object> {
    return this.http.post('message', message);
  }

}
