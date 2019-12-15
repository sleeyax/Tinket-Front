import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component'
import { MenuMobileComponent } from './components/menu/menu-mobile/menu-mobile.component'
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component'
import { PopupComponent } from './components/popup/popup.component'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StarsComponent } from './components/stars/stars.component';
import { ReviewboxComponent } from './components/reviewbox/reviewbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ApplicationCardComponent } from './components/application-card/application-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuMobileComponent,
    MenuItemComponent,
    PopupComponent,
    StarsComponent,
    ReviewboxComponent,
    FooterComponent,
    ApplicationCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    HeaderComponent,
    MenuMobileComponent,
    MenuItemComponent,
    PopupComponent,
    StarsComponent,
    ReviewboxComponent,
    FooterComponent,
    ApplicationCardComponent
  ],
})
export class SharedModule { }
