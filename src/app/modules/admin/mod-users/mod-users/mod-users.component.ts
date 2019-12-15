import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/shared/models/user';
import { FilterPipe } from '../filter.pipe';
import { ToastService } from '@app/core/services/toast.service';


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
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res
    })
  }

  ngOnInit() {
  }

  goToProfile(userId) {
    this.router.navigate([`mod/users/${userId}`])
  }

  deleteCounter = 0
  deleteUser(userId) {
    this.deleteCounter++;
    if (this.deleteCounter == 2) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.toastService.toast("Gebruiker verwijderd!")
        this.getUsers();
        this.deleteCounter = 0
      })
    } else {
      this.toastService.toast("Klik nogmaals om te verwijderen")
    }

    setTimeout(() => {
      this.deleteCounter = 0;
    }, 3000);
  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar, ");
  }

  create(){
    this.router.navigate(['mod/users/create'])
  }
}
