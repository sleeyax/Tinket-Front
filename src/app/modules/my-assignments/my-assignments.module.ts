import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAssignmentsComponent } from './my-assignments/my-assignments.component';
import { SharedModule } from '@app/shared/shared.module';
import { AssignmentCardComponent } from './assignment-card/assignment-card.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { AssignmentNewComponent } from './assignment-new/assignment-new.component';
import { AssignmentApplicantsComponent } from './assignment-applicants/assignment-applicants.component';
import { AssignmentApplicantDetailComponent } from './assignment-applicant-detail/assignment-applicant-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyAssignmentsComponent,
    AssignmentCardComponent,
    AssignmentDetailComponent,
    AssignmentEditComponent,
    AssignmentNewComponent,
    AssignmentApplicantsComponent,
    AssignmentApplicantDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class MyAssignmentsModule { }
