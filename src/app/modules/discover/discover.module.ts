import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverComponent } from './discover/discover.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [DiscoverComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DiscoverModule { }
