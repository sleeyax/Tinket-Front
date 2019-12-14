import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';
import { Assignment } from '@app/shared/models/assignment';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  constructor(private http: HttpClient) { }

  getMyAssignments(): Observable<Assignment[]>{
    return null;
    //return this.http.get<Assignment[]>(`${environment.apiUrl}/users/me/assignments`);
  }
}
