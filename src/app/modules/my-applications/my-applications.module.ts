import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications/my-applications.component';

import { SharedModule } from '@app/shared/shared.module';
import { ApplicationCardComponent } from './application-card/application-card.component';

@NgModule({
  declarations: [
    MyApplicationsComponent,
    ApplicationCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MyApplicationsModule { }
