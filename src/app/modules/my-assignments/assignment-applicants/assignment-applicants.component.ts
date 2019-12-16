import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '@app/shared/models/assignment';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Application } from '@app/shared/models/application';

@Component({
  selector: 'app-assignment-applicants',
  templateUrl: './assignment-applicants.component.html',
  styleUrls: ['./assignment-applicants.component.scss']
})
export class AssignmentApplicantsComponent implements OnInit {
  assignment: Assignment;
  applications: Application[];

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
  ) {
    const assignmentId = this.route.snapshot.paramMap.get("id")

    this.assignmentService.getAssignment(assignmentId)
      .subscribe(
        assignment => {
          this.assignment = assignment;
        });

    this.assignmentService.getApplicationsFromAssignment(assignmentId).subscribe(res => {
      this.applications = res
      console.log(res)
    })
  }

  ngOnInit() {
  }

}
