import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { JwtInterceptor } from '@app/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';

import { AppComponent } from './app.component';
import { MenuMobileComponent } from './components/menu/menu-mobile/menu-mobile.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { AuthModule } from './modules/security/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { DiscoverModule } from './modules/discover/discover.module';
import { ProfileModule } from './modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuMobileComponent,
    MenuItemComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule,
    AuthModule,
    OnboardingModule,
    DiscoverModule,
    ProfileModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
