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
  
  isLogged: boolean;

  ngOnInit() {
    if(localStorage.getItem('JWTtoken')){
      //console.log("Token: "+ localStorage.getItem('JWTtoken'))
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }
  }

  private logout(){
    this.userService.logout();
    window.location.reload();
  }
}
