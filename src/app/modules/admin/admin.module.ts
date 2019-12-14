import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModUsersModule } from './mod-users/mod-users.module';
import { ModReviewsModule } from './mod-reviews/mod-reviews.module';
import { SharedModule } from '@app/shared/shared.module';
import { ModAssignmentsModule } from './mod-assignments/mod-assignments.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModUsersModule,
    ModReviewsModule,
    SharedModule,
    ModAssignmentsModule
  ]
})
export class AdminModule { }
