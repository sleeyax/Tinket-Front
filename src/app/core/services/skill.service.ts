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
export class SkillService {
  currentUser : User;

  constructor(
    private http: HttpClient,
    private authenticationService : AuthenticationService
  ) {
    this.authenticationService.currentUser
      .subscribe((user) => this.currentUser = user);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${environment.apiUrl}/skills`);
  }

  updateUserSkills(skills: string[]) {
    return this.http.put<string[]>(`${environment.apiUrl}/users/${this.currentUser._id}/skills`, skills);
  }
}
