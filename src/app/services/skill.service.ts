import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '@app/models/skill';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${environment.apiUrl}/skills`);
  }
}
