import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { MakerGuard } from './core/guards/maker.guard';
import { CompanyGuard } from './core/guards/company.guard';

import { LoginComponent } from './modules/security/login/login.component';
import { LandingComponent } from './modules/security/landing/landing.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { OnboardingComponent } from './modules/onboarding/onboarding/onboarding.component';
import { MyApplicationsComponent } from './modules/my-applications/my-applications/my-applications.component';
import { DiscoverComponent } from './modules/discover/discover/discover.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { MyAssignmentsComponent } from './modules/my-assignments/my-assignments/my-assignments.component';
import { AssignmentDetailComponent } from './modules/my-assignments/assignment-detail/assignment-detail.component';
import { MyReviewsComponent } from './modules/my-reviews/my-reviews/my-reviews.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard]},

  { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard, MakerGuard]},
  { path: 'applications', component: MyApplicationsComponent, canActivate: [AuthGuard, MakerGuard]},

  { path: 'assignments', component: MyAssignmentsComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'assignments/:id', component: AssignmentDetailComponent, canActivate: [AuthGuard, CompanyGuard]},


  { path: 'reviews', component: MyReviewsComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: LandingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
