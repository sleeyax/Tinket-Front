import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { SkillService } from '@app/core/services/skill.service';
import { Skill } from '@app/shared/models/skill';
import { User } from '@app/shared/models/user';
import { CompanyProfile } from '@app/shared/models/companyProfile';
import { MakerProfile } from '@app/shared/models/makerProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  loadingSkills = false;
  submitted = false;
  error = '';
  isMaker = true;
  skills: Skill[];
  mySkills: Skill[] = [];
  mySkillIds: string[] = [];
  currentUser: User;
  toast = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private skillService: SkillService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user)
    if (this.currentUser.companyProfile != null) {
      this.isMaker = false;
    }
  }

  get f() { return this.profileForm.controls; }

  getSkills() {
    this.authenticationService.refreshCurrentUser().then(() => {
      this.skillService.getSkills().subscribe(res => {
        this.skills = res
        this.mySkills = this.currentUser.makerProfile.skills
        this.mySkillIds = []
        this.mySkills.forEach(skill => {
          this.mySkillIds.push(skill._id)
        });
        this.loadingSkills = false
      })
    });
  }

  ngOnInit() {

    if (this.isMaker) {
      this.getSkills();
    }

    this.profileForm = this.formBuilder.group({
      username: [this.isMaker ? this.currentUser.makerProfile.displayName : this.currentUser.companyProfile.name, [Validators.required]],
      firstname: [this.currentUser.firstname, [Validators.required]],
      lastname: [this.currentUser.lastname, [Validators.required]],
      email: [this.currentUser.email, [Validators.required]],
      mobile: [this.isMaker ? this.currentUser.makerProfile.contactInfo.phoneNumber : this.currentUser.companyProfile.contactInfo.phoneNumber],
      birthday: [this.isMaker ? this.currentUser.makerProfile.dateOfBirth : '', [Validators.required]],
      country: [this.isMaker ? this.currentUser.makerProfile.location.country : this.currentUser.companyProfile.location.country],
      city: [this.isMaker ? this.currentUser.makerProfile.location.city : this.currentUser.companyProfile.location.city],
      postalCode: [this.isMaker ? this.currentUser.makerProfile.location.postalCode : this.currentUser.companyProfile.location.postalCode],
      bio: [this.isMaker ? this.currentUser.makerProfile.bio : this.currentUser.companyProfile.description],
      experience: [this.isMaker ? this.currentUser.makerProfile.experience : ''],
      interest: []
    });
    this.f.interest.setValue("Kies hier...")
  }

  addSkill() {
    this.loadingSkills = true
    if (this.mySkills == null || !this.mySkillIds.includes(this.f.interest.value)) {
      this.mySkillIds.push(this.f.interest.value)
      this.skillService.updateUserSkills(this.mySkillIds).subscribe(() => {
        this.getSkills()
      })
    } else {
      this.loadingSkills = false;
    }
  }

  deleteSkill(skill: Skill) {
    this.loadingSkills = true
    let index = this.mySkillIds.findIndex(id => id === skill._id);
    this.mySkillIds.splice(index, 1);
    this.skillService.updateUserSkills(this.mySkillIds).subscribe(() => {
      this.getSkills()
    })
  }

  changePassword() {
    this.router.navigate(['changePassword']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  onSubmit() {
    this.loading = true
    if (this.isMaker) {
      var updateMakerProfile: MakerProfile = {
        displayName: this.f.username.value,
        bio: this.f.bio.value,
        experience: this.f.experience.value,
        dateOfBirth: this.f.birthday.value,
        skills: this.mySkillIds,
        contactInfo: {
          email: this.f.email.value,
          linkedIn: "linkedInAccount",
          phoneNumber: this.f.mobile.value
        },
        location: {
          country: this.f.country.value,
          city: this.f.city.value,
          postalCode: this.f.postalCode.value
        }
      }
    } else {
      var updateCompanyProfile: CompanyProfile = {
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
    }

    const user: User = new User({
      _id: this.currentUser._id,
      email: this.f.email.value,
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      isAdmin: this.currentUser.isAdmin,
      companyProfile: updateCompanyProfile,
      makerProfile: updateMakerProfile,
    }, this.currentUser.token)

    this.userService.updateUser(user).subscribe(() => {
      this.authenticationService.refreshCurrentUser().then(() => {
        this.loading = false;
        this.toast = true;
        setTimeout( () => { this.toast = false }, 2000 )
      })
    });
  }
}
