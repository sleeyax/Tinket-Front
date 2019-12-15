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
  avarageScore = 0;
  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser
      .subscribe(user => this.currentUser = user);

    this.reviewService.getReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
      console.log(this.reviews)
      const scores = [];
      console.log(this.reviews)
      this.reviews.forEach(review => scores.push(review.score));
      this.avarageScore = this.calculateAverage(scores);

    });
  }

  calculateAverage(scores) {
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    return average(scores)
  }

  ngOnInit() {

  }
}
