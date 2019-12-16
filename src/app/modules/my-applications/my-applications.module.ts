import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';

@NgModule({
  declarations: [
    MyApplicationsComponent,
    ApplicationDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyApplicationsModule { }
