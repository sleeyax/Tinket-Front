import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/security/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { OnboardingComponent } from './modules/onboarding/onboarding/onboarding.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent},

  { path: 'discover', component: LandingComponent},
  { path: 'interests', component: LandingComponent},
  { path: 'profile', component: LandingComponent},
  { path: 'messages', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
