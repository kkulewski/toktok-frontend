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
    return this.http.get<UserDto>('token/' + token);
  }

  getUserNameById(id: number): Observable<string> {
    return this.http.get<string>('name/' + id);
  }

  register(user: UserDto): Observable<Object> {
    return this.http.post('user/register', user);
  }

  login(user: UserDto): Observable<Object> {
    return this.http.post('user/login', user);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
  }

  isLogged(): boolean {
    return localStorage.getItem('auth_token') ? true : false;
  }

  getStoredToken(): string {
    return localStorage.getItem('auth_token');
  }

  getStoredUserName(): string {
    return localStorage.getItem('user_name');
  }
}
