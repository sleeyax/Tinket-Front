import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [ProfileComponent, PasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
