import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  createMakerProfile(profile) {
    return this.http.put<any>(`${environment.apiUrl}/users/me/maker-profile`, profile);
  }

  createCompanyProfile(profile) {
    return this.http.put<any>(`${environment.apiUrl}/users/me/company-profile`, profile);
  }
}
