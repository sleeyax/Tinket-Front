import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';
import { ToastService } from '@app/core/services/toast.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReviewService } from '@app/core/services/review.service';
import { Review } from '@app/shared/models/review';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  currentUser: User;
  application: Application;
  retracting = false;
  rectracted = false;
  inputForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService,
    private applicationService: ApplicationService,
    private formBuilder: FormBuilder
  ) {
    const applicationId = this.route.snapshot.paramMap.get("id")

    applicationService.getApplication(applicationId)
      .subscribe((application) => {
        this.application = application
        console.log(application)
      });
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      message: ['', [Validators.required]],
      anonymous: [false, [Validators.required]]
    });
  }

  score = 0;
  onSubmit() {
    this.submitted = true;
    this.loading = true
    if (this.inputForm.valid) {
      const review = {
        anonymous: this.f.anonymous.value,
        score: this.score,
        reviewed: this.application.assignment.createdBy._id,
        description: this.f.message.value,
      }
      this.reviewService.postReview(review).subscribe(() => {
        this.submitted = false;
        this.loading = false;
        this.toastService.toast("Bedankt voor je feedback!")
      },
        error => this.error = error)
    } else {
      this.submitted = false;
      this.loading = false;
    }
  }

  get statusDescription(): String {
    if (!this.application) return "";
    if (this.application.contacted) return "Gefeliciteerd met je nieuwe opdracht! 🥳";
    if (this.application.assignment.archivedAt) return "Opdracht afgerond.";
    if (this.application.assignment.open) return "● Open voor inschrijvingen.";
    return "● Gesloten voor inschrijvingen.";
  }

  get fullStatusDescription(): String {
    if (!this.application) return "";
    if (this.application.contacted) return "Laat je ons na afloop nog even weten wat je van de samenwerking vond?";
    if (this.application.assignment.archivedAt) return "Het is niet meer mogelijk om je in te schrijven. Je werd niet gekozen voor deze opdracht.";
    if (this.application.assignment.open) return "Nieuwe kandidaten kunnen zich nog steeds inschrijven voor deze opdracht.";
    return "Het bedrijf heeft aangegeven dat deze opdracht niet langer nieuwe inschrijvingen ontvangt. Ontvangen inschrijvingen worden nog geëvalueerd.";
  }

  retract() {
    this.retracting = true;

    this.applicationService.retractApplication(this.application._id)
      .subscribe(() => {
        this.retracting = false;
        this.rectracted = true;

        this.toastService.toast('Kandidatuur ingetrokken!')

        this.router.navigate(['/applications']);
      });
  }

  get f() { return this.inputForm.controls; }

  vote(score) {
    this.score = score.rating;
  }
}
