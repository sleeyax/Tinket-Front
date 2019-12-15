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
    this.reviewService.getSolvedReviews().subscribe(res => {this.solvedReviews = res
    console.log(res);
    
    });

   
  }

  onDelete(id) {
      this.deleteCounter++;
      if (this.deleteCounter == 2) {
        this.reviewService.ignoreReview(id.reviewId).subscribe(() => {
          this.toastService.toast("Review verwijderd!")
          this.getReviews();
          this.deleteCounter = 0
        })
      } else {
        this.toastService.toast("Klik nogmaals om review alsnog te verwijderen")
      }
  
      setTimeout(() => {
        this.deleteCounter = 0;
      }, 3000);
    }

  solveCounter = 0;
  deleteCounter = 0;
  solve(solve) {
    if (solve.solve) {
      this.solveCounter++;
      if (this.solveCounter == 2) {
        
        this.reviewService.solveReview(solve.reviewId).subscribe(() => {
          this.toastService.toast("Flag opgelost!")
          this.getReviews();
          this.solveCounter = 0;
        })
      } else {
        this.toastService.toast("Klik nogmaals om flag op te lossen!")
      }
    }
    else if (solve.delete) {
      this.deleteCounter++;
      if (this.deleteCounter == 2) {
        console.log(solve.reviewId)
        this.reviewService.ignoreReview(solve.reviewId).subscribe(() => {
          this.toastService.toast("Review verwijderd!")
          this.getReviews();
          this.deleteCounter = 0;
        })
      } else {
        this.toastService.toast("Klik nogmaals om review te verwijderen!")
      }
    }

    setTimeout(() => {
      this.deleteCounter = 0;
      this.solveCounter = 0;
    }, 3000);
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
