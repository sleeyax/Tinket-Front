import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Review } from '@app/shared/models/review';
import { filter } from 'rxjs/operators';
import { ToastService } from '@app/core/services/toast.service';

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
    private toastService: ToastService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser
      .subscribe(user => this.currentUser = user);
      this.getReviews();
  }
  
  getReviews(){
    this.reviewService.getReviews().subscribe((reviews: Review[]) => {
      this.reviews = reviews;
      const scores = [];
      this.reviews.forEach(review => scores.push(review.score));
      this.avarageScore = this.calculateAverage(scores);
    });
  }

  calculateAverage(scores) {
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    return average(scores)
  }



  deleteCounter = 0;
  onDelete(id) {
    this.deleteCounter++;
    if (this.deleteCounter == 2) {
      this.reviewService.flagReview(id.reviewId).subscribe(() => {
        this.toastService.toast("Review gerapporteerd!")
        this.getReviews();
      })
    } else {
      this.toastService.toast("Klik nogmaals om review te rapporteren")
    }

    setTimeout(() => {
      this.deleteCounter = 0;
    }, 3000);
  }

  ngOnInit() {

  }
}
