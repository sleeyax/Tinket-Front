import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '@app/shared/models/review';
import { environment } from '@environments/environment';
import { AuthenticationService } from './authentication.service';
import { User } from '@app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authenticationService : AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe((user) => this.currentUser = user);
  }

  getSkills(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/users/${this.currentUser._id}/reviews`);
  }
}
