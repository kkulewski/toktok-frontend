import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/user.dto';
import { RegisterResultDto } from '../../dto/register.result.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  readonly registerSuccessMessage: string = 'Success!';

  newUserName: string;
  newUserPassword: string;
  newUserPasswordConfirmed: string;

  registerSuccess: boolean;
  registerErrors: string[];

  ngOnInit() { }

  private postUser() {

    if (this.newUserPassword !== this.newUserPasswordConfirmed) {
      this.registerErrors = [ 'Passwords mismatch.' ];
      this.registerSuccess = false;
      return;
    }

    const user: UserDto = {
      id: 0,
      userName: this.newUserName,
      password: this.newUserPassword,
    };

    this.userService.register(user).subscribe(
      (result: RegisterResultDto) => {
        this.registerErrors = result.errors;
        this.registerSuccess = result.success;
        if (this.registerSuccess) { this.router.navigateByUrl('/login'); }
      },
      () => {
        this.registerErrors = [ 'Unknown error' ];
        this.registerSuccess = false;
      }
    );
  }
}
