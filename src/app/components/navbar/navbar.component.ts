import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  getToken(): string {
    return this.userService.getToken();
  }

  private logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
