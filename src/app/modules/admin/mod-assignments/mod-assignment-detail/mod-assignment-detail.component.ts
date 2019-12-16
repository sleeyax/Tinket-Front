import { Component, OnInit } from '@angular/core';
import { Assignment } from '@app/shared/models/assignment';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-mod-assignment-detail',
  templateUrl: './mod-assignment-detail.component.html',
  styleUrls: ['./mod-assignment-detail.component.scss']
})
export class ModAssignmentDetailComponent implements OnInit {

  assignment: Assignment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private toastService: ToastService
  ) {
    const assignmentId = this.route.snapshot.paramMap.get("id")

    this.assignmentService.getAssignment(assignmentId)
      .subscribe(
        assignment => {
          this.assignment = assignment;
          console.log(assignment)
        });
  }

  changeStatus(newStatus) {
    const update = {
      ...this.assignment,
      open: Number.parseInt(newStatus) ? true : false
    };

    this.assignmentService.updateAssignment(
      this.assignment._id, update
    ).subscribe(() => {
      this.toastService.toast('Status aangepast!');
    });
  }
  ngOnInit() {
  }

}
