import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home1Component } from './home1/home1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbProgressbarModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Modules
import { DashboardsRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { Home2Component } from './home2/home2.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    Home1Component,
    Home2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgxSliderModule,
    DashboardsRoutingModule,
    SharedModule,
    NgxUsefulSwiperModule,
    NgSelectModule,
    FlatpickrModule.forRoot(),

  ]
})
export class DashboardModule { }
