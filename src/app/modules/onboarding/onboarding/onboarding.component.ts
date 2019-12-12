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
import { userInfo } from 'os';
import { CompanyProfile } from '@app/models/companyProfile';

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
      geboorteDatum: ['', [Validators.required]],
      mobile: [''],
      bio: [''],
      experience: [''],
      city: [''],
      postalCode: [''],
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
    if (this.onboardingForm.invalid) {
      return
    }
    window.scroll(0, 0);
    this.stepTwo = !this.stepTwo;
  }

  currentUser: User;

  onSubmit() {
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
    if (this.isMaker) {
      const makerProfile: MakerProfile = {
        displayName: this.f.username.value,
        bio: this.f.bio.value,
        experience: this.f.experience.value,
        dateOfBirth: this.f.geboorteDatum.value,
        skills: this.skills,
        contactInfo: {
          email: this.currentUser.email,
          linkedIn: "linkedInAccount",
          phoneNumber: this.f.mobile.value
        },
        location: {
          country: this.f.country.value,
          city: this.f.city.value,
          postalCode: this.f.postalCode.value
        }
      }

      this.userService.updateMakerProfile(makerProfile).subscribe((user) => {
        this.userService.getUser().subscribe(res => this.authenticationService.storeUser(res, res.token));
        this.router.navigate(['discover'])
      })
    }
    else {
      const companyProfile: CompanyProfile = {
        name: this.f.username.value,
        description: this.f.bio.value,
        contactInfo: {
          email: this.currentUser.email,
          linkedIn: "linkedInAccount",
          phoneNumber: this.f.mobile.value
        },
        location: {
          country: this.f.country.value,
          city: this.f.city.value,
          postalCode: this.f.postalCode.value
        }
      }
      this.userService.updateCompanyProfile(companyProfile).subscribe(() => {
        this.userService.getUser().subscribe(res => this.authenticationService.storeUser(res, res.token));
        this.router.navigate(['discover']);
      })
    }
  }
}
