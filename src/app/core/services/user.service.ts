import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';
import { MakerProfile } from '@app/shared/models/makerProfile';
import { CompanyProfile } from '@app/shared/models/companyProfile';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser: User;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
  }

  updateMakerProfile(profile: MakerProfile) {
    return this.http.put(`${environment.apiUrl}/users/${this.currentUser._id}/maker-profile`, profile);
  }

  updateCompanyProfile(profile: CompanyProfile) {
    return this.http.put(`${environment.apiUrl}/users/${this.currentUser._id}/company-profile`, profile);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${this.currentUser._id}`, user);
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${this.currentUser._id}`);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: string): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/` + id);
  }

  deleteUser(id: string){
    return this.http.delete<User>((`${environment.apiUrl}/users/` + id));
  }
}
