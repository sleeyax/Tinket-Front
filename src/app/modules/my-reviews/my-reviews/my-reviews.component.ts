import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Review } from '@app/shared/models/review';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  currentUser: User;
  avarageScore: number;
  isMaker = true;
  reviews: Review[] = []
  scores = []

  constructor(private reviewService: ReviewService, private authenticationService: AuthenticationService) {
    var avarage;
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user)
    if (this.currentUser.companyProfile != null) {
      this.isMaker = false;
    }
    this.reviewService.getSkills().subscribe((res) => {
      this.reviews = res;
      this.reviews.forEach(review => {
        this.scores.push(review.score);
      });
      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
      avarage = Number(average(this.scores));
    })
    this.avarageScore = avarage//Werkt wel
  }

  ngOnInit() {

  }
}
