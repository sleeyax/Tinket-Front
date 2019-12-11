import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models/user';
import { MakerProfile } from '@app/models/makerProfile';
import { CompanyProfile } from '@app/models/companyProfile';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  createMakerProfile(profile: MakerProfile) {
    return this.http.put(`${environment.apiUrl}/users/me/maker-profile`, profile);
  }

  createCompanyProfile(profile: CompanyProfile) {
    return this.http.put(`${environment.apiUrl}/users/me/company-profile`, profile);
  }
}