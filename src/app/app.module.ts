import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { JwtInterceptor } from '@app/core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '@app/core/interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './modules/security/security.module';
import { DiscoverModule } from './modules/discover/discover.module';
import { ProfileModule } from './modules/profile/profile.module';
import { MyApplicationsModule } from './modules/my-applications/my-applications.module';
import { MyAssignmentsModule } from './modules/my-assignments/my-assignments.module';
import { MyReviewsModule } from './modules/my-reviews/my-reviews.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule,
    SharedModule,
    SecurityModule,
    OnboardingModule,
    DiscoverModule,
    ProfileModule,
    MyApplicationsModule,
    MyAssignmentsModule,
    MyReviewsModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
