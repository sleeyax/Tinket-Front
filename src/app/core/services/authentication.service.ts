import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';

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

  changePassword(oldpassword: string, newpassword: string){
    return this.http.put<any>(`${environment.apiUrl}/users/me/change-password`, { password: oldpassword, newPassword: newpassword })
    .pipe(map(() => this.refreshCurrentUser()));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  async refreshCurrentUser() {
    return new Promise((resolve) => {
      this.http.get(`${environment.apiUrl}/users/me`)
        .subscribe((user => {
          const currentToken = this.currentUserValue.token;
          this.storeUser(
            user,
            currentToken
          );
          resolve(user);
        }));
    });
  }

  storeUser(userDetais, token) {
    const user: User = new User({
      _id: userDetais._id,
      email: userDetais.email,
      firstname: userDetais.firstname,
      lastname: userDetais.lastname,
      isAdmin: userDetais.isAdmin,
      companyProfile: userDetais.companyProfile,
      makerProfile: userDetais.makerProfile
    }, token);

    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUserSubject.next(user);

    return user;
  }
}