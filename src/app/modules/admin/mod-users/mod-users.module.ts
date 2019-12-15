import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModUsersComponent } from './mod-users/mod-users.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule }   from '@angular/forms';
import { FilterPipe} from './filter.pipe';
import { ModUserDetailComponent } from './mod-user-detail/mod-user-detail.component';
import { ModUserReviewsComponent } from './mod-user-reviews/mod-user-reviews.component';



@NgModule({
  declarations: [
    ModUsersComponent,
    FilterPipe,
    ModUserDetailComponent,
    ModUserReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ],
    exports: [
      FilterPipe
    ]
})
export class ModUsersModule { }
