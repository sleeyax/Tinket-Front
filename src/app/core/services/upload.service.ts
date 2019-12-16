import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '@app/shared/models/skill';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { User } from '@app/shared/models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authenticationService : AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe((user) => this.currentUser = user);
  }

  upload(formData) : Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/upload`, formData);
  }

  checkStatus(uploadId) : Observable<any>  {
    return this.http.get<any>(`${environment.apiUrl}/upload/${uploadId}`);
  }
}
