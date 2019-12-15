import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModReviewsComponent } from './mod-reviews/mod-reviews.component';
import { SharedModule } from '@app/shared/shared.module';
import { ModReviewBoxComponent } from './mod-review-box/mod-review-box.component';
import { ModDeletedReviewsComponent } from './mod-deleted-reviews/mod-deleted-reviews.component';



@NgModule({
  declarations: [ModReviewsComponent, ModReviewBoxComponent, ModDeletedReviewsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModReviewsModule { }
