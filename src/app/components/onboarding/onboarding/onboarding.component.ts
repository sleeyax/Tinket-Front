import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {
  onboardingForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  stepTwo = false;

  skills = ["Fotografie", "Webdesign", "Marketing", "Webshops", "Dierenarts", "Technieker", "Loodgieter", "Bouw", "Bakker", "Prog", "Netwerken", "IoT"]

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.onboardingForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      date: ['', [Validators.required]],
      mobile: [''],
      bio: [''],
      experience: [''],
      userType: [false, [Validators.required]]
    });
  }
  selected :any;

  nextStep() {
    // if (this.onboardingForm.invalid) {
    //   return
    // }
    this.stepTwo = !this.stepTwo;
  }
}
