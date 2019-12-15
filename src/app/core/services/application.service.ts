import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '@app/shared/models/skill';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models/user';
import { AuthenticationService } from './authentication.service';
import { Application } from '@app/shared/models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authenticationService : AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe((user) => this.currentUser = user);
  }

  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.apiUrl}/users/${this.currentUser._id}/applications`);
  }
}
