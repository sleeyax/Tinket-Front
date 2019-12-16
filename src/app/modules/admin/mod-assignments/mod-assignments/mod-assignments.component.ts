import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { ToastService } from '@app/core/services/toast.service';
import { UserService } from '@app/core/services/user.service';
import { Assignment } from '@app/shared/models/assignment';
import { AssignmentService } from '@app/core/services/assignment.service';

@Component({
  selector: 'app-mod-assignments',
  templateUrl: './mod-assignments.component.html',
  styleUrls: ['./mod-assignments.component.scss']
})
export class ModAssignmentsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private assignmentService: AssignmentService,
    private toastService: ToastService,
    private userService: UserService) {
    this.assignmentService.getFlaggedAssignments().subscribe(res => {
      this.flaggedAssignments = res
      console.log(res)
    })
    this.assignmentService.getSolvedAssignments().subscribe(res => this.solvedAssignments = res)
  }

  solvedAssignments: Assignment[];
  flaggedAssignments: Assignment[];


  inputForm: FormGroup;
  typeReview = true;
  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      reviewType: [false, [Validators.required]]
    });
  }
  get f() { return this.inputForm.controls; }

  switchReviewType() {
    this.typeReview = this.f.reviewType.value;
    console.log(this.typeReview)
  }
}
