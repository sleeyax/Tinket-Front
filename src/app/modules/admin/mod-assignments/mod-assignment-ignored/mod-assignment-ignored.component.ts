import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ToastService } from '@app/core/services/toast.service';
import { Assignment } from '@app/shared/models/assignment';

@Component({
  selector: 'app-mod-assignment-ignored',
  templateUrl: './mod-assignment-ignored.component.html',
  styleUrls: ['./mod-assignment-ignored.component.scss']
})
export class ModAssignmentIgnoredComponent implements OnInit {

  deletedAssignments: Assignment[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private toastService: ToastService) {
    this.assignmentService.getDeletedAssignments().subscribe(res => this.deletedAssignments = res)
  }
  ngOnInit() {
  }

}
