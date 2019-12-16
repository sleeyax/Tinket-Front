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
import { PasswordComponent } from './modules/profile/password/password.component';
import { ModUsersComponent } from './modules/admin/mod-users/mod-users/mod-users.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ModReviewsComponent } from './modules/admin/mod-reviews/mod-reviews/mod-reviews.component';
import { ModAssignmentsComponent } from './modules/admin/mod-assignments/mod-assignments/mod-assignments.component';
import { AssignmentNewComponent } from './modules/my-assignments/assignment-new/assignment-new.component';
import { AssignmentEditComponent } from './modules/my-assignments/assignment-edit/assignment-edit.component';
import { AssignmentApplicantsComponent } from './modules/my-assignments/assignment-applicants/assignment-applicants.component';
import { AssignmentApplicantDetailComponent } from './modules/my-assignments/assignment-applicant-detail/assignment-applicant-detail.component';
import { ModUserDetailComponent } from './modules/admin/mod-users/mod-user-detail/mod-user-detail.component';
import { ModUserReviewsComponent } from './modules/admin/mod-users/mod-user-reviews/mod-user-reviews.component';
import { ModUserCreateComponent } from './modules/admin/mod-users/mod-user-create/mod-user-create.component';
import { ModDeletedReviewsComponent } from './modules/admin/mod-reviews/mod-deleted-reviews/mod-deleted-reviews.component';
import { ModAssignmentDetailComponent } from './modules/admin/mod-assignments/mod-assignment-detail/mod-assignment-detail.component';

const routes: Routes = [
  // Security
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Onboarding
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard]},

  // Discover
  { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard, MakerGuard]},

  // Applications
  { path: 'applications', component: MyApplicationsComponent, canActivate: [AuthGuard, MakerGuard]},

  // Assignments
  { path: 'assignments', component: MyAssignmentsComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'reviews', component: MyReviewsComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'changePassword', component: PasswordComponent, canActivate: [AuthGuard]},

  { path: 'mod/users', component: ModUsersComponent, canActivate: [AdminGuard]},
  { path: 'mod/users/create', component: ModUserCreateComponent, canActivate: [AdminGuard]},
  { path: 'mod/users/:id', component: ModUserDetailComponent, canActivate: [AdminGuard]},
  { path: 'mod/users/:id/reviews', component: ModUserReviewsComponent, canActivate: [AdminGuard]},
  { path: 'mod/reviews', component: ModReviewsComponent, canActivate: [AdminGuard]},
  { path: 'mod/reviews/ignored', component: ModDeletedReviewsComponent, canActivate: [AdminGuard]},
  { path: 'mod/assignments', component: ModAssignmentsComponent, canActivate: [AdminGuard]},
  { path: 'mod/assignments/:id', component: ModAssignmentDetailComponent, canActivate: [AdminGuard]},

  { path: 'assignments/new', component: AssignmentNewComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'assignments/:id', component: AssignmentDetailComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'assignments/:id/edit', component: AssignmentEditComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'assignments/:id/applicants', component: AssignmentApplicantsComponent, canActivate: [AuthGuard, CompanyGuard]},
  { path: 'assignments/:id/applicants/:id', component: AssignmentApplicantDetailComponent, canActivate: [AuthGuard, CompanyGuard]},

  // Reviews
  { path: 'reviews', component: MyReviewsComponent, canActivate: [AuthGuard, CompanyGuard]},

  // Profile
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'profile/change-password', component: PasswordComponent, canActivate: [AuthGuard]},

  // Messages
  { path: 'messages', component: LandingComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
