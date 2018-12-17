import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Models.User[]> {
    return this.http.get<Models.User[]>('users');
  }

  addUser(user: Models.User): Observable<Object> {
    return this.http.post('users/Register', user);
  }

  login(user: Models.User): Observable<Object> {
    return this.http.post('users/Login', user);
  }

  logout(){
    localStorage.removeItem('JWTtoken');
  }
}
