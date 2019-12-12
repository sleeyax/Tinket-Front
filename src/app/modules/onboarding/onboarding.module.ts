import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent} from './onboarding/onboarding.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [OnboardingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class OnboardingModule { }
