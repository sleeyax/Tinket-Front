import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Assignment } from '@app/shared/models/assignment';
import { SkillService } from '@app/core/services/skill.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastService } from '@app/core/services/toast.service';
import { User } from '@app/shared/models/user';
import { Skill } from '@app/shared/models/skill';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  assignment: Assignment;
  editAssignmentForm: FormGroup;
  error = '';
  currentUser: User;
  selectedSkills: Skill[];
  skills: Skill[] = []
  loading = false;
  submitted = false;
  videoUrl : String = null;


  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private skillSerive: SkillService,
    private toastService: ToastService,
    private router: Router
  ) {
    const assignmentId = this.route.snapshot.paramMap.get("id")

    this.assignmentService.getAssignment(assignmentId)
      .subscribe(
        assignment => {
          this.assignment = assignment;
          this.videoUrl = assignment.videoUrl;
          this.setValues();
        });

    this.skillSerive.getSkills().subscribe(res => { this.skills = res })

  }

  // convenience getter for easy access to form fields
  get f() { return this.editAssignmentForm.controls; }

  setVideoPublicId(url) {
    this.videoUrl = url;
    console.log(url);
  }

  ngOnInit() {
    this.editAssignmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      interest: []
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    const assignment: Assignment = {
      _id: this.assignment._id,
      title: this.f.title.value,
      videoUrl: this.videoUrl,
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
    if (this.editAssignmentForm.valid) {
      this.assignmentService.updateAssignment(this.assignment._id, assignment).subscribe(() => {
        this.toastService.toast("Opdracht geupdate!")
        this.router.navigate([`assignments/${this.assignment._id}`])
        this.loading = false;
      },
        error => {
          this.error = error
          this.loading = false
          this.submitted = false
        }
      )
    } else {
      this.error = "Vul alle velden in!"
      this.loading = false
      this.submitted = false
    }
  }

  archive() {
    var date = new Date();
    const assignment: Assignment = {
      _id: this.assignment._id,
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
      archivedAt: date
    }
    console.log(date)
    if (this.editAssignmentForm.valid) {
      this.assignmentService.updateAssignment(this.assignment._id, assignment).subscribe(() => {
        this.toastService.toast("Opdracht gearchiveerd!")
        this.router.navigate([`assignments/${this.assignment._id}`])
        this.loading = false;
      },
        error => {
          this.error = error
          this.loading = false
          this.submitted = false
        }
      )
    } else {
      this.error = "Vul alle velden in!"
      this.loading = false
      this.submitted = false
    }
  }


  setValues() {
    this.selectedSkills = this.assignment.requiredSkills;
    this.f.interest.setValue("Kies hier...")
    this.f.title.setValue(this.assignment.title);
    this.f.description.setValue(this.assignment.description);
    this.f.country.setValue(this.assignment.location.country);
    this.f.city.setValue(this.assignment.location.city);
    this.f.postalCode.setValue(this.assignment.location.postalCode);
  }

  addSkill() {
    let names = [];
    this.selectedSkills.forEach(element => {
      names.push(element.name)
    });

    if (!names.includes(this.f.interest.value.name)) {
      if (this.f.interest.value !== "Kies hier...") {
        this.selectedSkills.push(this.f.interest.value)
      }
    }
  }

  deleteSkill(deleteskill: Skill) {
    let index = this.selectedSkills.findIndex(skill => skill._id === deleteskill._id);
    this.selectedSkills.splice(index, 1);
  }
}
