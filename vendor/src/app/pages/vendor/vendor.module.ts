import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdown, NgbDropdownModule, NgbNavModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';



const routes: Routes = [
  { path: 'vendor-profile', component: VendorComponent },

];

export const VendorRouting = RouterModule.forChild(routes)


@NgModule({
  declarations: [
    VendorComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    CommonModule,
    FullCalendarModule,
    UiSwitchModule,
    ColorPickerModule,
    VendorRouting,
    CKEditorModule,
    LeafletModule,
    NgSelectModule
  ]
})
export class VendorModule { }
