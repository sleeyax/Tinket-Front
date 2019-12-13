import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  currentUser: User; 
  gemiddeldeScore = 1;
  isMaker = true;

  constructor(private reviewService: ReviewService, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user)
    if (this.currentUser.companyProfile != null) {
      this.isMaker = false;
    }
  }

  ngOnInit() {

  }

}
