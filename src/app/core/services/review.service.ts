import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '@app/shared/models/review';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/users/me/reviews`);
  }
}
