import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component'
import { MenuMobileComponent } from './components/menu/menu-mobile/menu-mobile.component'
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component'
import { PopupComponent } from './components/popup/popup.component'
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StarsComponent } from './components/stars/stars.component';
import { ToastComponent } from './components/toast/toast.component';
import { ReviewboxComponent } from './components/reviewbox/reviewbox.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuMobileComponent,
    MenuItemComponent,
    PopupComponent,
    StarsComponent,
    ToastComponent,
    ReviewboxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularSvgIconModule
  ],
  exports: [
    HeaderComponent,
    MenuMobileComponent,
    MenuItemComponent,
    PopupComponent,
    StarsComponent,
    ToastComponent,
    ReviewboxComponent
  ],
})
export class SharedModule { }
