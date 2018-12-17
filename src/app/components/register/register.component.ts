import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  readonly registerSuccessMessage: string = 'Success!';

  newUsername: string;
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

    const user: Models.User = {
      username: this.newUsername,
      password: this.newUserPassword,
    };

    this.userService.addUser(user).subscribe(
      (result: Models.RegisterResult) => {
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
