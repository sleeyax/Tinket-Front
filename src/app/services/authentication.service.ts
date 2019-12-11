import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    const storedUser : any = JSON.parse(localStorage.getItem('currentUser'));

    if(storedUser) {
      let {token, ...userDetails} = storedUser;
      this.storeUser(userDetails, token);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map(response => this.storeUser(response.user, response.token)));
  }

  register(firstname: string, lastname: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users`, { firstname, lastname, email, password })
      .pipe(map(response => this.storeUser(response.user, response.token)));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  storeUser(userDetais, token) {
    const user: User = new User({
      _id: userDetais._id,
      email: userDetais.email,
      firstname: userDetais.firstname,
      lastname: userDetais.lastname,
      onboardingCompletedAt: userDetais.onboardingCompletedAt,
    }, token);

    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUserSubject.next(user);

    return user;
  }
}