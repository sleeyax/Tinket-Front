import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModAssignmentsComponent } from './mod-assignments/mod-assignments.component';
import { SharedModule } from '@app/shared/shared.module';
import { ModAssignmentDetailComponent } from './mod-assignment-detail/mod-assignment-detail.component';



@NgModule({
  declarations: [ModAssignmentsComponent, ModAssignmentDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModAssignmentsModule { }
