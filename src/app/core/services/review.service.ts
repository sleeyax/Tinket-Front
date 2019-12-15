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

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/users/${this.currentUser._id}/reviews`);
  }

  getReviewsById(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/users/${id}/reviews/`);
  }

  getWrittenReviewsByUserId(id: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${environment.apiUrl}/users/${id}/writtenReviews`)
  }

  flagReview(id: string){
    return this.http.get(`${environment.apiUrl}/reviews/${id}/flag`);
  }

  solveReview(id: string){
    return this.http.get(`${environment.apiUrl}/reviews/${id}/flag/resolve`);
  }

  ignoreReview(id: string){
    return this.http.get(`${environment.apiUrl}/reviews/${id}/flag/ignore`);
  }

  undoIgnoredReview(id: string){
    return this.http.get(`${environment.apiUrl}/reviews/${id}/flag/ignore/undo`);
  }


  getFlaggedReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/flaggedAt`);
  }
  
  getSolvedReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/flagResolvedAt`);
  }
  
  getDeletedReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/deletedAt`);
  }
}
