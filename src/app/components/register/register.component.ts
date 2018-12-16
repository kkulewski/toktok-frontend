import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }
  
  newUsername: string;
  newUserPassword: string;
  newUserPasswordConfirmed: string;

  ngOnInit() {
  }

  private postUser() {
    if(this.newUserPassword == this.newUserPasswordConfirmed){
      const user = {
        username: this.newUsername,
        password: this.newUserPassword,
      };
      this.userService.addUser(user).subscribe(
        () => { console.log('User created'); },
        () => { console.log('User could not be created'); } // on fail: log error
      );
    }
    else{
      console.log('Passwords mismatch');
    }
  }
}
