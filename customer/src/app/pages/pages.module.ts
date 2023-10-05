import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from "../shared/shared.module";

// Light Box
import { LightboxModule } from 'ngx-lightbox';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListYourVenueComponent } from './list-your-venue/list-your-venue.component';

@NgModule({
  declarations: [
    ListYourVenueComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LightboxModule,
    NgSelectModule,
    FlatpickrModule.forRoot(),

  ]
})
export class PagesModule { }
