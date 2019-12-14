import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Skill } from '@app/shared/models/skill';
import { UserService } from '@app/core/services/user.service';
import { MakerProfile } from '@app/shared/models/makerProfile';
import { CompanyProfile } from '@app/shared/models/companyProfile';
import { SkillService } from '@app/core/services/skill.service';

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
  skills: Skill[];
  selectedSkills= [];
  currentUser: User;
  selected: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private skillService: SkillService
  ) {
    this.authenticationService.currentUser
      .subscribe(user => {
        this.currentUser = user;

        // check if the user already has a complete profile
        if(user.isMaker || user.representsCompany) {
          this.finish();
        }
      });
  }

  ngOnInit() {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
    })

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

  get f() { return this.onboardingForm.controls; }

  switchUserProfile() {
    this.isMaker = this.f.userType.value;
    this.error = "";
  }

  nextStep() {
    if (this.onboardingForm.invalid) {
      this.error = "Vul alle verplichte velden in!";
      return;
    }
    this.error = "";
    this.stepTwo = !this.stepTwo;
  }

  toggleSkill(skill: Skill){
    if (this.selectedSkills.includes(skill._id)) {
      let index = this.selectedSkills.findIndex( record => record === skill._id );
      this.selectedSkills.splice(index, 1)
    } else{
      this.selectedSkills.push(skill._id)
    }
  }

  onSubmit() {
    this.loading, this.submitted = true;

    const updateHandler = (this.isMaker)
      ? this.userService.updateMakerProfile(
        this.createMakerProfile()
      )
      : this.userService.updateCompanyProfile(
        this.createCompanyProfile()
      );

    updateHandler
      .subscribe(() => {
        this.authenticationService.refreshCurrentUser()
          .then(() => this.finish());
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  finish() {
    this.router.navigate([
      this.currentUser.isMaker ? '/discover' : '/assignments'
    ]);
  }

  createMakerProfile() : MakerProfile {
    const makerProfile: MakerProfile = {
      displayName: this.f.username.value,
      bio: this.f.bio.value,
      experience: this.f.experience.value,
      dateOfBirth: this.f.geboorteDatum.value,
      skills: this.selectedSkills,
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

    return makerProfile;
  }

  createCompanyProfile() : CompanyProfile {
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

    return companyProfile;
  }
}
