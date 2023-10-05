import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbRatingModule, NgbTooltipModule, NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Youtube Player
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Google Map
import { AgmCoreModule } from '@agm/core';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Component
import { CatalogRoutingModule } from "./catalog-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { RentComponent } from './rent/rent.component';
import { SingleV1Component } from './single-v1/single-v1.component';
import { SortByPipe } from '../catalog/sort-by.pipe';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgxCarouselModule } from 'ngx-light-carousel'

@NgModule({
  declarations: [
    RentComponent,
    SingleV1Component,
    SortByPipe
  ],
  providers:[],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgxYoutubePlayerModule,
    NgxSliderModule,
    NgxCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),

    CatalogRoutingModule,
    SharedModule,
    NgxUsefulSwiperModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    HttpClientModule
  ]
})
export class CatalogModule { }
