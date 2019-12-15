import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyApplicationsComponent implements OnInit {
  applications : Application[];

  constructor(
    private applicationService : ApplicationService
  ) {
    applicationService.getMyApplications()
      .subscribe((applications) => this.applications = applications);
  }

  ngOnInit() {
  }

}
