import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-mod-reviews',
  templateUrl: './mod-reviews.component.html',
  styleUrls: ['./mod-reviews.component.scss']
})
export class ModReviewsComponent implements OnInit {
  inputForm: FormGroup;
  typeReview: true;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }


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
