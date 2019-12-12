import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { UserService } from '@app/services/user.service';
import { SkillService } from '@app/services/skill.service';
import { Skill } from '@app/models/skill';
import { User } from '@app/models/user';

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
    private skillService: SkillService) { }
  get f() { return this.profileForm.controls; }

  getSkills() {
    this.authenticationService.currentUser.subscribe(res => {
      this.currentUser = res
      this.skillService.getSkills().subscribe(res => {
        this.skills = res
        this.mySkills = []
        this.mySkillIds = []
        this.skills.forEach(skill => {
          if (this.currentUser.makerProfile.skills.includes(skill._id)) {
            this.mySkills.push(skill);
            this.mySkillIds.push(skill._id);
          }
        });
        console.log(this.mySkillIds)
        console.log(this.mySkills)
      })
    })
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
    if (!this.mySkillIds.includes(this.f.interest.value)) {
      this.mySkillIds.push(this.f.interest.value)
      console.log(this.mySkillIds);
      this.getSkills()
    } else {

    }
  }

}
