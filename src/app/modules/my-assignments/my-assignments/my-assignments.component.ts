import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Assignment } from '@app/shared/models/assignment';

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.scss']
})
export class MyAssignmentsComponent implements OnInit {
  assignments : Assignment[];

  constructor(
    private assignmentService : AssignmentService
  ) {
    return;
    this.assignmentService.getMyAssignments()
      .subscribe((assignments : Assignment[]) =>
        this.assignments = assignments
      );
  }

  ngOnInit() {
  }

}
