import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModAssignmentsComponent } from './mod-assignments/mod-assignments.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [ModAssignmentsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModAssignmentsModule { }
