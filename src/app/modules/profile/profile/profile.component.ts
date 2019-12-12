import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';
import { SkillService } from '@app/core/services/skill.service';
import { Skill } from '@app/shared/models/skill';
import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  isMaker = true;
  skills: Skill[];
  mySkills: Skill[] = [];
  mySkillIds: string[] = [];
  currentUser: User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private skillService: SkillService) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user)
  }


  get f() { return this.profileForm.controls; }

  getSkills() {
    this.authenticationService.refreshCurrentUser;

    this.authenticationService.currentUser.subscribe(res => { // get current user
      this.currentUser = res // set current user locally
      this.skillService.getSkills().subscribe(res => { // get skills from current user
        this.skills = res
        this.mySkills = []
        this.mySkillIds = []
        this.skills.forEach(skill => {
          if (this.currentUser.makerProfile.skills != null) {
            if (this.currentUser.makerProfile.skills.includes(skill._id)) {
              this.mySkills.push(skill);
              this.mySkillIds.push(skill._id);
            }
          }
        });
      })
    });
  }


  ngOnInit() {
    this.getSkills();
    this.profileForm = this.formBuilder.group({
      username: [this.isMaker ? this.currentUser.makerProfile.displayName : this.currentUser.companyProfile.name, [Validators.required]],
      firstname: [this.currentUser.firstname, [Validators.required]],
      lastname: [this.currentUser.lastname, [Validators.required]],
      email: [this.currentUser.email, [Validators.required]],
      mobile: [this.currentUser.makerProfile.contactInfo.phoneNumber],
      birthday: [this.currentUser.makerProfile.dateOfBirth, [Validators.required]],
      country: [this.isMaker ? this.currentUser.makerProfile.location.country : this.currentUser.companyProfile.location.country],
      city: [this.isMaker ? this.currentUser.makerProfile.location.city : this.currentUser.companyProfile.location.city],
      postalCode: [this.isMaker ? this.currentUser.makerProfile.location.postalCode : this.currentUser.companyProfile.location.postalCode],
      bio: [this.isMaker ? this.currentUser.makerProfile.bio : this.currentUser.companyProfile.description],
      experience: [this.currentUser.makerProfile.experience],
      interest: []
    });

    this.f.interest.setValue("Kies hier...")
  }

  addSkill() {
    if (this.mySkillIds != null) {
      if (!this.mySkillIds.includes(this.f.interest.value)) {
        this.mySkillIds.push(this.f.interest.value)
        this.skillService.updateUserSkills(this.mySkillIds).subscribe(() => {
          this.getSkills()
        })
      } else {

      }
    }
  }

  deleteSkill(skill: Skill) {
    let index = this.mySkillIds.findIndex(id => id === skill._id);
    this.mySkillIds.splice(index, 1);
    this.skillService.updateUserSkills(this.mySkillIds).subscribe(() => {
      this.getSkills()
    })
  }
}
