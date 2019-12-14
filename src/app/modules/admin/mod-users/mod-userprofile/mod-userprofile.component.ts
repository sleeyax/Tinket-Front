import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-mod-userprofile',
  templateUrl: './mod-userprofile.component.html',
  styleUrls: ['./mod-userprofile.component.scss']
})
export class ModUserprofileComponent implements OnInit {
  selectedUser: User;
  isMaker = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private route: ActivatedRoute) {
    let userId = this.route.snapshot.paramMap.get("id")
    this.userService.getUserById(userId).subscribe(res => {
      this.selectedUser = res
      if (this.selectedUser.makerProfile) {
        this.isMaker = true;
      }
    });
  }

  ngOnInit() {

  }
}
