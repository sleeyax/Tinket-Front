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
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-mod-user-detail',
  templateUrl: './mod-user-detail.component.html',
  styleUrls: ['./mod-user-detail.component.scss']
})
export class ModUserDetailComponent implements OnInit {
  selectedUser: User;
  isMaker = false;
  birthday = "";
  age = "";
  location = "";
  reviews: Review[] = [];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private toastService: ToastService) {
    let userId = this.route.snapshot.paramMap.get("id")
    this.userService.getUserById(userId).subscribe(res => {
      this.selectedUser = res
      this.getReviews();
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


  getReviews(){
    this.reviewService.getReviewsById(this.selectedUser._id).subscribe(res => this.reviews = res)
  }

  ngOnInit() {

  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar");
  }

  deleteCounter = 0;
  deleteUser(id) {
    this.deleteCounter++;
    if (this.deleteCounter == 2) {
      this.userService.deleteUser(id).subscribe(() => {
        this.toastService.toast("Gebruiker verwijderd!")
        this.router.navigate(['mod/users'])
      })
    } else {
      this.toastService.toast("Klik nogmaals om te verwijderen")
    }

    setTimeout(() => {
      this.deleteCounter = 0;
    }, 3000);
  }

  goToReviews(id) {
    this.router.navigate([`mod/users/${id}/reviews`])
  }

  onDelete(id) {
    this.deleteCounter++;
    if (this.deleteCounter == 2) {
      this.reviewService.ignoreReview(id.reviewId).subscribe(() => {
        this.toastService.toast("Review verwijderd!")
        this.getReviews();
      })
    } else {
      this.toastService.toast("Klik nogmaals om te verwijderen")
    }

    setTimeout(() => {
      this.deleteCounter = 0;
    }, 3000);
  }
}
