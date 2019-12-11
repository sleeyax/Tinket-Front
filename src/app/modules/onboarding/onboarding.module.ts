import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent} from './onboarding/onboarding.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  declarations: [OnboardingComponent, PopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OnboardingModule { }
