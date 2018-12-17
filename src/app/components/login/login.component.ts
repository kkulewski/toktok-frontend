import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  loginUsername: string ='';
  loginPassword: string ='';
  loginSuccess: boolean;
  loginErrors: string[];
  isLogged: boolean;

  ngOnInit() {
    this.isLogged = localStorage.getItem('JWTtoken') ? true : false;
  }

  private login() {
    if(this.loginUsername == "" || this.loginPassword == ""){
      this.loginErrors = [ 'Login and Password is required' ];
      this.loginSuccess = false;
      return;
    }
    const user: Models.User = {
      username: this.loginUsername,
      password: this.loginPassword,
    };
    this.userService.login(user).subscribe(
      (result: Models.LoginResult) => {
        this.loginErrors = result.errors;
        this.loginSuccess = result.success;
        if (this.loginSuccess) { 
          localStorage.setItem('JWTtoken', result.token);
          window.location.reload();
        }
      },
      () => {
        this.loginErrors = [ 'Unknown error' ];
        this.loginSuccess = false;
      }
    );
  }
}
