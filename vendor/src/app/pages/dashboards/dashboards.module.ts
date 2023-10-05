import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCarouselModule, NgbAccordionModule, NgbDatepickerModule, NgbRatingModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DefaultComponent } from './default/default.component';
import { mainDashboardComponent } from './blog/mainDashboard.component';


@NgModule({
  declarations: [DefaultComponent, mainDashboardComponent],
  providers:[NgbDropdown],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCarouselModule,
    WidgetModule,
    NgApexchartsModule,
    SimplebarAngularModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    DropzoneModule,
    NgbRatingModule,
  ]
})
export class DashboardsModule { }
