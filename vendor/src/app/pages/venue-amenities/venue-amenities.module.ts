import { UtilityModule } from './../utility/utility.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UIModule } from "../../shared/ui/ui.module";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './amenities-list/list.component';
import { AmenitiesAPIService } from './amenities-api.service';
import { AmenitiesFormComponent } from './amenities-form/amenities-form.component';
import { NgSelectModule } from '@ng-select/ng-select';



const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'amenities-form', component: AmenitiesFormComponent },
  { path: 'amenities-form/:id', component: AmenitiesFormComponent },
];

export const venueAmenitiesRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    ListComponent,
    AmenitiesFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbCollapseModule,
    UtilityModule,
    venueAmenitiesRouting
  ],
  providers: [AmenitiesAPIService]
})
export class VenueAmenitiesModule { }
