import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../dto/user.dto';
import { LoginResultDto } from '../../dto/login.result.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  loginUserName = '';
  loginPassword = '';
  loginSuccess: boolean;
  loginErrors: string[];
  isLogged: boolean;

  ngOnInit() { }

  private login() {

    if (this.loginUserName === '' || this.loginPassword === '') {
      this.loginErrors = [ 'Login and password are required' ];
      this.loginSuccess = false;
      return;
    }

    const user: UserDto = {
      id: 0,
      userName: this.loginUserName,
      password: this.loginPassword,
    };

    this.userService.login(user).subscribe(
      (result: LoginResultDto) => {
        this.loginErrors = result.errors;
        this.loginSuccess = result.success;
        if (this.loginSuccess) {
          localStorage.setItem('auth_token', result.token);
          localStorage.setItem('user_name', result.userName);
          this.router.navigateByUrl('/');
        }
      },
      () => {
        this.loginErrors = [ 'Unknown error' ];
        this.loginSuccess = false;
      }
    );
  }
}
