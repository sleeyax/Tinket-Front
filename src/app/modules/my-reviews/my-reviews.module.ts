import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [MyReviewsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyReviewsModule { }
