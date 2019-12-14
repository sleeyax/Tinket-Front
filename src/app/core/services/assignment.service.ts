import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';
import { Assignment } from '@app/shared/models/assignment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authenticationService : AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe((user) => this.currentUser = user);
   }

  getMyAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/users/${this.currentUser._id}/assignments`);
  }

}