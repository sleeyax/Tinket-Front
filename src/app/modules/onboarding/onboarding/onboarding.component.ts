import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { Skill } from '@app/models/skill';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  isMaker = true;

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
      city: [''],
      town: [''],
      country: [''],
      userType: [false, [Validators.required]]
    });
  }
  selected: any;

  get f() { return this.onboardingForm.controls; }

  switchUserProfile(){
    this.isMaker = this.f.userType.value;
  }

  nextStep() {
    // if (this.onboardingForm.invalid) {
    //   return
    // }
    window.scroll(0,0);
    this.stepTwo = !this.stepTwo;
  }
}
