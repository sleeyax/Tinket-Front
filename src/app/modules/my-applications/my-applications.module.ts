import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    MyApplicationsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyApplicationsModule { }
