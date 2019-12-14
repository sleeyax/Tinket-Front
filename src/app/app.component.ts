import { Component } from '@angular/core';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tinket-Front';
  currentUser: User;
  currentToasts = [];

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.authenticationService.currentUser.subscribe(
      user => this.currentUser = user
    );

    this.toastService.currentToasts.subscribe(
      toasts => this.currentToasts = toasts
    );
  }
}
