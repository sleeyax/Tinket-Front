import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
    this.rerender()

    const self = this;
    window.addEventListener('resize', () => { self.rerender() })
    window.addEventListener('orientationchange', () => { self.rerender() })
  }

  /** Fix for Apples BS */
  rerender() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
