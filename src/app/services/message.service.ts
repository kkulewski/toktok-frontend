import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {
  }

  getMessages(): Observable<Models.Message[]> {
    return this.http.get<Models.Message[]>('message');
  }

}
