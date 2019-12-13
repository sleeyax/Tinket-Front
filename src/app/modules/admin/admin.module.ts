import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModUsersModule } from './mod-users/mod-users.module';
import { ModReviewsModule } from './mod-reviews/mod-reviews.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModUsersModule,
    ModReviewsModule
  ]
})
export class AdminModule { }
