import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { SkillService } from '@app/core/services/skill.service';
import { User } from '@app/shared/models/user';
import { Skill } from '@app/shared/models/skill';
import { ToastService } from '@app/core/services/toast.service';
import { Assignment } from '@app/shared/models/assignment';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-new',
  templateUrl: './assignment-new.component.html',
  styleUrls: ['./assignment-new.component.scss']
})
export class AssignmentNewComponent implements OnInit {
  newAssignmentForm: FormGroup;
  error = '';
  currentUser: User;
  selectedSkills: Skill[] = []
  skills: Skill[] = []
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private skillSerive: SkillService,
    private toastService: ToastService,
    private assignmentService: AssignmentService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(res => this.currentUser = res)
    this.skillSerive.getSkills().subscribe(res => this.skills = res)
  }

  // convenience getter for easy access to form fields
  get f() { return this.newAssignmentForm.controls; }

  onSubmit() {
    var assignment: Assignment = {
      _id: '',
      title: this.f.title.value,
      videoUrl: "videoPath",
      description: this.f.description.value,
      requiredSkills: this.selectedSkills,
      location: {
        country: this.f.country.value,
        city: this.f.city.value,
        postalCode: this.f.postalCode.value,
      },
      open: true,
      createdBy: this.currentUser,
    }
    this.submitted = true;

    if (this.newAssignmentForm.valid) {
      this.loading = true;
      this.assignmentService.createAssignment(assignment).subscribe(() => {
        this.toastService.toast("Opdracht gemaakt!")
        this.router.navigate(['/assignments'])
      },
        error => {
          this.error = error
          this.loading = false
          this.submitted = false;
          document.getElementById('outlet').scrollTop = 0;
        })
    }
  }

  ngOnInit() {
    this.newAssignmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      interest: []
    });
    this.f.interest.setValue("Kies hier...")

  }

  addSkill() {
    if (this.selectedSkills == null || !this.selectedSkills.includes(this.f.interest.value)) {
      if (this.f.interest.value !== "Kies hier...") {
        console.log(this.f.interest.value)
        this.selectedSkills.push(this.f.interest.value)
      }
    }
  }

  deleteSkill(deleteskill: Skill) {
    let index = this.selectedSkills.findIndex(skill => skill._id === deleteskill._id);
    this.selectedSkills.splice(index, 1);
  }
}
