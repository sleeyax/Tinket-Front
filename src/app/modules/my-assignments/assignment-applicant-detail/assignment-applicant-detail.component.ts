import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user';
import { UserService } from '@app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignmentService } from '@app/core/services/assignment.service';
import { ToastService } from '@app/core/services/toast.service';
import * as moment from 'moment';
import 'moment/locale/nl';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';

@Component({
  selector: 'app-assignment-applicant-detail',
  templateUrl: './assignment-applicant-detail.component.html',
  styleUrls: ['./assignment-applicant-detail.component.scss']
})
export class AssignmentApplicantDetailComponent implements OnInit {

  selectedUser: User;
  birthday = "";
  age = "";
  location = "";
  currentAssignmentId;
  selectedApplication : Application;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private applicationService: ApplicationService,
    private toastService: ToastService,
    private userService: UserService) {

      this.currentAssignmentId = this.route.snapshot.paramMap.get("id");
      const applicationId = this.route.snapshot.paramMap.get("applicationId");

      this.applicationService.getApplication(applicationId)
        .subscribe(res => {
          this.selectedApplication = res;
          this.selectedUser = res.maker;
          this.birthday = moment(this.selectedUser.makerProfile.dateOfBirth).format("LL");
          this.age = this.calculateAge(this.selectedUser.makerProfile.dateOfBirth);
          if (this.selectedUser.makerProfile.location.city == "" || this.selectedUser.makerProfile.location.postalCode == "" || this.selectedUser.makerProfile.location.country == "") {
            this.location = "Geen locatie"
          } else {
            this.location = this.selectedUser.makerProfile.location.city + ", " + this.selectedUser.makerProfile.location.postalCode + ", " + this.selectedUser.makerProfile.location.country
          }
        });
    }

  acceptUser(userId) {
    this.applicationService.acceptApplication(this.selectedApplication._id)
      .subscribe(() => {
        this.selectedApplication.contacted = true;
        this.toastService.toast('Opgelagen!');
      });
  }

  calculateAge(birthday) {
    let date = new Date(birthday)
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs);
    return String(Math.abs(ageDate.getUTCFullYear() - 1970) + " jaar");
  }

  ngOnInit() {
  }

}
