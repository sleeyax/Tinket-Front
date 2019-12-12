import { Component, OnInit, Pipe } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { Skill } from '@app/models/skill';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { MakerProfile } from '@app/models/makerProfile';
import { CompanyProfile } from '@app/models/companyProfile';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { SkillService } from '@app/services/skill.service';

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


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getSkills().subscribe(res => {
      this.skills = res;
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
  selected: any;

  get f() { return this.onboardingForm.controls; }

  switchUserProfile() {
    this.isMaker = this.f.userType.value;
    this.error = "";
  }

  nextStep() {
    if (this.onboardingForm.invalid) {
      this.error = "Vul alle verplichte velden in!"
      return
    }
    this.error = "";
    this.stepTwo = !this.stepTwo;
  }

  addSkill(skill: Skill){
    if (this.selectedSkills.includes(skill._id)) {
      let index = this.selectedSkills.findIndex( record => record === skill._id );
      console.log(index);
      this.selectedSkills.splice(index, 1)
    } else{
      this.selectedSkills.push(skill._id)
    }
  }

  currentUser: User;

  onSubmit() {
    this.loading = true;
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
    if (this.isMaker) {
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

      this.userService.updateMakerProfile(makerProfile).subscribe((user) => {
        this.userService.getUser().subscribe(res => this.authenticationService.storeUser(res, res.token));
        this.router.navigate(['discover'])
      },
      error => {
        this.error = error;
        this.loading = false;
      });
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
      },
        error => {
          this.error = error;
          this.loading = false;
        });
    }
  }
}
