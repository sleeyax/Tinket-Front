import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ReviewService } from '@app/core/services/review.service';
import { ToastService } from '@app/core/services/toast.service';
import { UserService } from '@app/core/services/user.service';
import { Review } from '@app/shared/models/review';

@Component({
  selector: 'app-mod-deleted-reviews',
  templateUrl: './mod-deleted-reviews.component.html',
  styleUrls: ['./mod-deleted-reviews.component.scss']
})
export class ModDeletedReviewsComponent implements OnInit {
  deletedReviews: Review[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private toastService: ToastService,
    private userService: UserService) {
      this.getReviews()
  }

  getReviews(){
    this.reviewService.getDeletedReviews().subscribe(res => this.deletedReviews = res);
  }

  ngOnInit() {
  }

  resetCounter = 0;
  onDelete(review) {
    console.log(review.reviewId)
    this.resetCounter++;
    if (this.resetCounter == 2) {
      this.reviewService.undoIgnoredReview(review.reviewId).subscribe(() => {
        this.toastService.toast("Review goed gekeurd!")
        this.getReviews();
        this.resetCounter = 0
      })
    } else {
      this.toastService.toast("Klik nogmaals om review alsnog goed te keuren!")
    }

    setTimeout(() => {
      this.resetCounter = 0;
    }, 3000);
  }

}
