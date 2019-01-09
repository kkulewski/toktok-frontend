import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>('user');
  }

  getUserByToken(token: string): Observable<UserDto> {
    return this.http.get<UserDto>('user' + '/' + token);
  }

  getUserNameById(id: number): Observable<string> {
    return this.http.get<string>('username' + '/' + id);
  }

  register(user: UserDto): Observable<Object> {
    return this.http.post('user/register', user);
  }

  login(user: UserDto): Observable<Object> {
    return this.http.post('user/login', user);
  }

  logout() {
    localStorage.removeItem('JWTtoken');
  }

  isLogged(): boolean {
    return localStorage.getItem('JWTtoken') ? true : false;
  }

  getToken(): string {
    return localStorage.getItem('JWTtoken');
  }
}
