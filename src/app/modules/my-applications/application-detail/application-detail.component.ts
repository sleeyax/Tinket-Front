import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  currentUser : User;
  application : Application;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private authenticationService : AuthenticationService,
    private applicationService : ApplicationService
  ) {
    const applicationId = this.route.snapshot.paramMap.get("id")

    applicationService.getApplication(applicationId)
      .subscribe((application) => this.application = application);
  }

  ngOnInit() {
  }

}
