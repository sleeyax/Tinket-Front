import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/helpers/auth.guard';

import { LoginComponent } from './modules/security/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { OnboardingComponent } from './modules/onboarding/onboarding/onboarding.component';
import { DiscoverComponent } from './modules/discover/discover/discover.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard]},

  { path: 'discover', component: LandingComponent, canActivate: [AuthGuard]},
  { path: 'interests', component: LandingComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: LandingComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: LandingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
