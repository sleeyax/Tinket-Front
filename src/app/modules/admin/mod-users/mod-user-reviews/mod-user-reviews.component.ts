import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/core/services/toast.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { ReviewService } from '@app/core/services/review.service';
import { Review } from '@app/shared/models/review';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-mod-user-reviews',
  templateUrl: './mod-user-reviews.component.html',
  styleUrls: ['./mod-user-reviews.component.scss']
})
export class ModUserReviewsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.getReviews();
    this.userService.getUserById(this.userId).subscribe(res => this.selectedUser = res)
  }

  userId: string;
  selectedUser: User;
  reviews: Review[];
  ngOnInit() {
  }

  getReviews() {
    this.reviewService.getWrittenReviewsByUserId(this.userId).subscribe(res => {
      this.reviews = res
      console.log(this.reviews)
    })
  }

  deleteCounter = 0;
  onDelete(id) {
    this.deleteCounter++;
    if (this.deleteCounter == 2) {
      this.reviewService.deleteReview(id.reviewId).subscribe(() => {
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

