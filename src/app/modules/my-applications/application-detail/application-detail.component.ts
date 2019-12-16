import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { User } from '@app/shared/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '@app/core/services/application.service';
import { Application } from '@app/shared/models/application';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  currentUser : User;
  application : Application;
  retracting = false;
  rectracted = false;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private toastService : ToastService,
    private authenticationService : AuthenticationService,
    private applicationService : ApplicationService
  ) {
    const applicationId = this.route.snapshot.paramMap.get("id")

    applicationService.getApplication(applicationId)
      .subscribe((application) => this.application = application);
  }

  get statusDescription() : String {
    if(!this.application) return "";
    if(this.application.contacted) return "Gefeliciteerd met je nieuwe opdracht! 🥳";
    if(this.application.assignment.archivedAt) return "Opdracht afgerond.";
    if(this.application.assignment.open) return "● Open voor inschrijvingen.";
    return "● Gesloten voor inschrijvingen.";
  }

  get fullStatusDescription() : String {
    if(!this.application) return "";
    if(this.application.contacted) return "Laat je ons na afloop nog even weten wat je van de samenwerking vond?";
    if(this.application.assignment.archivedAt) return "Het is niet meer mogelijk om je in te schrijven. Je werd niet gekozen voor deze opdracht.";
    if(this.application.assignment.open) return "Nieuwe kandidaten kunnen zich nog steeds inschrijven voor deze opdracht.";
    return "Het bedrijf heeft aangegeven dat deze opdracht niet langer nieuwe inschrijvingen ontvangt. Ontvangen inschrijvingen worden nog geëvalueerd.";
  }

  retract() {
    this.retracting = true;

    this.applicationService.retractApplication(this.application._id)
      .subscribe(() => {
        this.retracting = false;
        this.rectracted = true;

        this.toastService.toast('Kandidatuur ingetrokken!')

        this.router.navigate(['/applications']);
      });
  }

  ngOnInit() {
  }

}
