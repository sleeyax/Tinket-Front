import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '@app/core/services/assignment.service';
import { Assignment } from '@app/shared/models/assignment';

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.scss']
})
export class MyAssignmentsComponent implements OnInit {
  assignments = [];

  get visibleAssignments() : Assignment[] {
    return this.assignments
      .filter((assignment) => !assignment.archivedAt);
  }

  get archivedAssignments() : Assignment[] {
    return this.assignments
      .filter((assignment) => assignment.archivedAt);
  }

  constructor(
    private assignmentService : AssignmentService
  ) {
    this.assignmentService.getMyAssignments()
      .subscribe((assignments : Assignment[]) =>
        this.assignments = assignments
      );
  }

  ngOnInit() {
  }

}
