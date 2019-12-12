import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';

import { LoginComponent } from './modules/security/login/login.component';
import { LandingComponent } from './modules/security/landing/landing.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { OnboardingComponent } from './modules/onboarding/onboarding/onboarding.component';
import { MyApplicationsComponent } from './modules/my-applications/my-applications/my-applications.component';
import { DiscoverComponent } from './modules/discover/discover/discover.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard]},

  { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard]},
  { path: 'applications', component: MyApplicationsComponent, canActivate: [AuthGuard]},
  { path: 'interests', component: MyApplicationsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: LandingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
