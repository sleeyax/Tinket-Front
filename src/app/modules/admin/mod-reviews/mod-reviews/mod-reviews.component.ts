import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { ReviewService } from '@app/core/services/review.service';
import { Review } from '@app/shared/models/review';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-mod-reviews',
  templateUrl: './mod-reviews.component.html',
  styleUrls: ['./mod-reviews.component.scss']
})
export class ModReviewsComponent implements OnInit {
  inputForm: FormGroup;
  typeReview: true;
  flaggedReviews: Review[];
  solvedReviews: Review[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private toastService: ToastService,
    private userService: UserService) {
    this.getReviews();
    this.typeReview = true;
  };

  getReviews() {
    this.reviewService.getFlaggedReviews().subscribe(res => this.flaggedReviews = res);
    this.reviewService.getSolvedReviews().subscribe(res => this.solvedReviews = res);
  }

  onDelete(id) {
    this.reviewService.ignoreReview(id.reviewId).subscribe(() => {
      this.toastService.toast("Review verwijderd!")
      this.getReviews();
    })
  }

  solve(solve) {
    if (solve.solve) {
      this.reviewService.solveReview(solve.reviewId).subscribe(() => {
        this.toastService.toast("Flag opgelost!")
        this.getReviews();
      })
    }
    else if (solve.delete) {
      this.reviewService.ignoreReview(solve.reviewId).subscribe(() => {
        this.toastService.toast("Review verwijderd!")
        this.getReviews();
      })
    }
  }


  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      reviewType: [false, [Validators.required]]
    });
  }
  get f() { return this.inputForm.controls; }

  switchReviewType() {
    this.typeReview = this.f.reviewType.value;
    console.log(this.typeReview)
  }


}
