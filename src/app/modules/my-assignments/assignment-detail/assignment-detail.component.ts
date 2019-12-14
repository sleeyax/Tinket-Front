import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private assignmentService : AssignmentService
  ) {
    const assignmentId = this.route.snapshot.paramMap.get("id")

    this.assignmentService.getAssignment(assignmentId)
      .subscribe(
        poll => {
          this.poll = poll;
        });
   }

  ngOnInit() {
  }

}
