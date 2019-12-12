import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: User;

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  Register(){
    this.router.navigate(['register']);
  }

  Login(){
    this.router.navigate(['login']);
  }

}
