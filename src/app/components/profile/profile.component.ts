import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  userName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('name');
  }

}
