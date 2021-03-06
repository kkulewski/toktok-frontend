import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  getUserName(): string {
    return this.userService.getStoredUserName();
  }

  private logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
