import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent} from './onboarding/onboarding.component';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [OnboardingComponent, PopupComponent],
  imports: [
    GooglePlaceModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OnboardingModule { }
