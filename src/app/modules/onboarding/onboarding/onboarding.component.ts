import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { Skill } from '@app/models/skill';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { MakerProfile } from '@app/models/makerProfile';

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
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

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

  switchUserProfile() {
    this.isMaker = this.f.userType.value;
  }

  nextStep() {
    // if (this.onboardingForm.invalid) {
    //   return
    // }
    window.scroll(0, 0);
    this.stepTwo = !this.stepTwo;
  }

  onSubmit() {
    const date = new Date('August 19, 1975');

    if (this.isMaker) {
      const makerProfile: MakerProfile = {
        displayName: "test",
        bio: "test",
        experience: "test",
        dateOfBirth: date,
        skills: "test",
        contactInfo: {
          email: "test",
          linkedIn: "test",
          phoneNumber: "test"
        }, 
        location: {
          country: "test",
          city: "test",
          street: "test"
        }
      }

      this.userService.createMakerProfile(makerProfile).subscribe(() => {
        this.router.navigate(['discover']);
      })
    }
    console.log("test")
  }
}
