import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/shared/models/user';
import { MakerProfile } from '@app/shared/models/makerProfile';
import { CompanyProfile } from '@app/shared/models/companyProfile';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  updateMakerProfile(profile: MakerProfile) {
    return this.http.put(`${environment.apiUrl}/users/me/maker-profile`, profile);
  }

  updateCompanyProfile(profile: CompanyProfile) {
    return this.http.put(`${environment.apiUrl}/users/me/company-profile`, profile);
  }

  updateUser(user: User) {
    return this.http.put(`${environment.apiUrl}/users/me`, user);
  }

  getUser(): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/me`);
  }
}
