import { Component } from '@angular/core';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tinket-Front';
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      user => this.currentUser = user
    );
  }
}
