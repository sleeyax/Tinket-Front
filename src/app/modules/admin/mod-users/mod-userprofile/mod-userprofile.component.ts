import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/shared/models/user';
import * as moment from 'moment';
import 'moment/locale/nl';
import { Review } from '@app/shared/models/review';
import { ReviewService } from '@app/core/services/review.service';

@Component({
  selector: 'app-mod-userprofile',
  templateUrl: './mod-userprofile.component.html',
  styleUrls: ['./mod-userprofile.component.scss']
})
export class ModUserprofileComponent implements OnInit {
  selectedUser: User;
  isMaker = false;
  birthday = "";
  age = "";
  location = ""
  reviews: Review[] = []
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute) {
    let userId = this.route.snapshot.paramMap.get("id")
    this.userService.getUserById(userId).subscribe(res => {
      this.selectedUser = res
      this.reviewService.getReviewsById(res._id).subscribe(res => this.reviews = res)
      if (this.selectedUser.makerProfile) {
        this.isMaker = true;
        this.birthday = moment(this.selectedUser.makerProfile.dateOfBirth).format("LL");
        this.age = this.calculateAge(this.selectedUser.makerProfile.dateOfBirth)

        if (this.selectedUser.makerProfile.location.city == "" || this.selectedUser.makerProfile.location.postalCode == "" || this.selectedUser.makerProfile.location.country == "") {
          this.location = "Geen locatie"
        } else {
          this.location = this.selectedUser.makerProfile.location.city + ", " + this.selectedUser.makerProfile.location.postalCode + ", " + this.selectedUser.makerProfile.location.country
        }
      } else {
        if (this.selectedUser.companyProfile.location.city == "" || this.selectedUser.companyProfile.location.postalCode == "" || this.selectedUser.companyProfile.location.country == "") {
          this.location = "Geen locatie"
        } else {
          this.location = this.selectedUser.companyProfile.location.city + ", " + this.selectedUser.companyProfile.location.postalCode + ", " + this.selectedUser.companyProfile.location.country
        }
      }
    });
  }

  ngOnInit() {

  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar");
  }
}
