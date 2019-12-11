import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module'
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { MenuMobileComponent } from './components/menu/menu-mobile/menu-mobile.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { AuthModule } from './modules/security/auth.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuMobileComponent,
    MenuItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule,
    AuthModule,
    OnboardingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
