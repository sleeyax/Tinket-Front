import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModUsersComponent } from './mod-users/mod-users.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule }   from '@angular/forms';
import { FilterPipe} from './filter.pipe';
import { ModUserprofileComponent } from './mod-userprofile/mod-userprofile.component';



@NgModule({
  declarations: [ModUsersComponent, FilterPipe, ModUserprofileComponent],
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
