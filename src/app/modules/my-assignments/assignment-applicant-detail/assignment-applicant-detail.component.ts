import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
import { UserService } from '@app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ToastService } from '@app/core/services/toast.service';
import * as moment from 'moment';
import 'moment/locale/nl';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReviewService } from '@app/core/services/review.service';

@Component({
  selector: 'app-assignment-applicant-detail',
  templateUrl: './assignment-applicant-detail.component.html',
  styleUrls: ['./assignment-applicant-detail.component.scss']
})
export class AssignmentApplicantDetailComponent implements OnInit {

  selectedUser: User;
  birthday = "";
  age = "";
  location = "";
  currentAssignmentId;
  review = false;
  submitted = false;
  loading = false;
  error = ""
  selectedApplication : Application;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private applicationService: ApplicationService,
    private toastService: ToastService,
    private reviewService : ReviewService,
    private userService: UserService,
    private formBuilder: FormBuilder) {

      this.currentAssignmentId = this.route.snapshot.paramMap.get("id");
      const applicationId = this.route.snapshot.paramMap.get("applicationId");

      this.applicationService.getApplication(applicationId)
        .subscribe(res => {
          this.selectedApplication = res;
          this.selectedUser = res.maker;
          this.birthday = moment(this.selectedUser.makerProfile.dateOfBirth).format("LL");
          this.age = this.calculateAge(this.selectedUser.makerProfile.dateOfBirth);
          if (this.selectedUser.makerProfile.location.city == "" || this.selectedUser.makerProfile.location.postalCode == "" || this.selectedUser.makerProfile.location.country == "") {
            this.location = "Geen locatie"
          } else {
            this.location = this.selectedUser.makerProfile.location.city + ", " + this.selectedUser.makerProfile.location.postalCode + ", " + this.selectedUser.makerProfile.location.country
          }
        });
    }

  acceptUser(userId) {
    this.applicationService.acceptApplication(this.selectedApplication._id)
      .subscribe(() => {
        this.selectedApplication.contacted = true;
        this.toastService.toast('Opgelagen!');
      });
  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar");
  }

  reviewF() {
    this.review = true;
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      message: ['', [Validators.required]],
      anonymous: [false, [Validators.required]]
    });
  }

  inputForm: FormGroup;
  score = 0;
  onSubmit() {
    this.submitted = true;
    this.loading = true
    if (this.inputForm.valid) {
      const review = {
        anonymous: this.f.anonymous.value,
        score: this.score,
        reviewed: this.selectedUser._id,
        description: this.f.message.value,
      }
      this.reviewService.postReview(review).subscribe(() => {
        this.submitted = false;
        this.loading = false;
        this.toastService.toast("Bedankt voor je feedback!")
        this.review = false;
      },
        error => this.error = error)
    } else {
      this.submitted = false;
      this.loading = false;
    }
  }
  get f() { return this.inputForm.controls; }

  vote(score) {
    this.score = score.rating;
  }

}
