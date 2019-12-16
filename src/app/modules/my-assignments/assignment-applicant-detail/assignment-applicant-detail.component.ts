import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
import { UserService } from '@app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-assignment-applicant-detail',
  templateUrl: './assignment-applicant-detail.component.html',
  styleUrls: ['./assignment-applicant-detail.component.scss']
})
export class AssignmentApplicantDetailComponent implements OnInit {

  selectedUser: User;

  constructor(private router : Router,
    private route : ActivatedRoute,
    private assignmentService : AssignmentService,
    private toastService: ToastService,
    private userService: UserService) {

    let userId = this.route.snapshot.paramMap.get("id")
    this.userService.getUserById(userId).subscribe(res => {
      this.selectedUser = res
    })
  }

  ngOnInit() {
  }

}
