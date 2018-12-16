import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }
  
  users: Models.User[];

  newUsername: string;
  newUserPassword: string;
  newUserPasswordConfirmed: string;

  ngOnInit() {
    this.fetchUsers();
  }

  private fetchUsers() {
    // fetch from endpoint (API)
    this.userService.getUsers().subscribe(
      (users) => { this.users = users; }, // on success - assign messages
      () => { console.log('Cannot fetch users!'); } // on fail - log error
    );
  }

  private postUser() {
    if(this.newUserPassword == this.newUserPasswordConfirmed){
      const user = {
        username: this.newUsername,
        password: this.newUserPassword,
      };
      this.userService.addUser(user).subscribe(
        () => { console.log('User created'); this.fetchUsers(); },
        () => { console.log('User could not be created'); } // on fail: log error
      );
    }
    else{
      console.log('Passwords mismatch');
    }
  }
}
