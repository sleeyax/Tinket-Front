import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/shared/models/user';
import { FilterPipe} from '../filter.pipe';


@Component({
  selector: 'app-mod-users',
  templateUrl: './mod-users.component.html',
  styleUrls: ['./mod-users.component.scss']
})
export class ModUsersComponent implements OnInit {

  currentUser: User;
  users: User[];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
    this.userService.getUsers().subscribe(res => this.users = res)
  }

  ngOnInit() {
  }

  goToProfile(userId){
    this.router.navigate([`mod/users/${userId}`])
  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar,");
  }
}
