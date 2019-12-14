import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Assignment } from '@app/shared/models/assignment';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  assignment : Assignment;
  editAssignmentForm: FormGroup;
  error = '';

  constructor(
    private assignmentService : AssignmentService,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    const assignmentId = this.route.snapshot.paramMap.get("id")

    this.assignmentService.getAssignment(assignmentId)
      .subscribe(
        assignment => {
          this.assignment = assignment;
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.editAssignmentForm.controls; }

  ngOnInit() {
    this.editAssignmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required]
    });
  }

}
