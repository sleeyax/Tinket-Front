import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';
import { Assignment } from '@app/shared/models/assignment';
import { AuthenticationService } from './authentication.service';
import { Application } from '@app/shared/models/application';

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

  getAssignment(id): Observable<Assignment>{
    return this.http.get<Assignment>(`${environment.apiUrl}/assignments/${id}`);
  }

  getApplicationsFromAssignment(id): Observable<Application[]>{
    return this.http.get<Application[]>(`${environment.apiUrl}/assignments/${id}/applications`);
  }

  getUserRecommended(userId): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/users/${userId}/assignments/discover`);
  }

  createAssignment(assignment): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/assignments/`, assignment);
  }

  updateAssignment(id, assignment): Observable<Object> {
    return this.http.put(`${environment.apiUrl}/assignments/${id}`, assignment);
  }

  getMyAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/users/${this.currentUser._id}/assignments`);
  }


  flagAssignment(id: String){
    return this.http.get(`${environment.apiUrl}/assignments/${id}/flag`);
  }

  solveAssignment(id: String){
    return this.http.get(`${environment.apiUrl}/assignments/${id}/flag/resolve`);
  }

  ignoreAssignment(id: String){
    return this.http.get(`${environment.apiUrl}/assignments/${id}/flag/ignore`);
  }

  undoIgnoredAssignment(id: String){
    return this.http.get(`${environment.apiUrl}/assignments/${id}/flag/ignore/undo`);
  }


  getFlaggedAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignments/flaggedAt`);
  }
  
  getSolvedAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignments/flagResolvedAt`);
  }
  
  getDeletedAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignments/deletedAt`);
  }

}
