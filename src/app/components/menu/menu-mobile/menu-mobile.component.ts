import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthenticationService } from '@app/services/authentication.service';
import { User } from '@app/models/user';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuMobileComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnInit() {
  }

}
