import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/models/user';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser && !this.currentUser.isAdmin) {
      this.router.navigate(['/discover']);
    } else if (this.currentUser.isAdmin) {
      this.router.navigate(['/mod/reviews']);
    }
  }

  ngOnInit() {  }

  Register(){
    this.router.navigate(['register']);
  }

  Login(){
    this.router.navigate(['login']);
  }

}
