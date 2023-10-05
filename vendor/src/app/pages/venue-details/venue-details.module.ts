import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdown, NgbDropdownModule, NgbNavModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';
import { VenueDetailsComponent } from './venue-details.component';
import { PricingComponent } from './pricing/pricing.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CalenderComponent } from './calender/calender.component';
import { MappingComponent } from './mapping/mapping.component';
import { TermsPoliciesComponent } from './terms-policies/terms-policies.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgSelectModule } from '@ng-select/ng-select';
import { HouseStandardComponent } from './house-standard/house-standard.component';
import { CustomCalenderComponent } from './custom-calender/custom-calender.component';
import { CustomBlockComponent } from './custom-block/custom-block.component';
import { CapacityComponent } from './capacity/capacity.component';
import { AddOnServicesComponent } from './add-on-services/add-on-services.component';
import { ChargeableServicesComponent } from './chargeable-services/chargeable-services.component';
import { ShouldKnowComponent } from './should-know/should-know.component';
import { OtherKeyDetailsComponent } from './other-key-details/other-key-details.component';
import { RoomTncComponent } from './room-tnc/room-tnc.component';


const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'attributes', component: AttributesComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'mapping', component: MappingComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'terms-policies', component: TermsPoliciesComponent },
  {path:'house-standard', component: HouseStandardComponent},
  {path:'custom-block',component:CustomBlockComponent },
  {path:'capacity',component:CapacityComponent },
  {path:'add-on-services',component:AddOnServicesComponent },
  {path:'chargeable-services',component:ChargeableServicesComponent },
  {path:'other-key-details',component:OtherKeyDetailsComponent },
  {path:'should-know',component:ShouldKnowComponent },
  {path:'room-tnc',component:RoomTncComponent },
];
export const venueDetailsRouting = RouterModule.forChild(routes);
@NgModule({
  declarations: [VenueDetailsComponent, GalleryComponent, OverviewComponent, PricingComponent, AttributesComponent, CalenderComponent, MappingComponent, TermsPoliciesComponent, HouseStandardComponent, CustomCalenderComponent, CustomBlockComponent, CapacityComponent, AddOnServicesComponent, ChargeableServicesComponent, ShouldKnowComponent, OtherKeyDetailsComponent, RoomTncComponent],
  providers: [NgbDropdown],
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
    venueDetailsRouting,
    CKEditorModule,
    LeafletModule,
    NgSelectModule,
    NgbNavModule,

  ]
})
export class VenueDetailsModule { }
