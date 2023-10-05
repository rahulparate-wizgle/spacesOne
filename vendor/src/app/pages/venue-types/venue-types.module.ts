import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityModule } from '../utility/utility.module';
import { VenueTypesApiService } from './venue-types-api.service';
import { VenueTypesFormComponent } from './venuetypes-form/venuetypes-form.component';
import { VenueTypesListcomponent } from './venuetypes-list/venuetypes-list.component';


const routes: Routes = [
  { path: 'venuetype-list', component: VenueTypesListcomponent },
  { path: 'venuetype-form', component: VenueTypesFormComponent },
  { path: 'venuetype-form/:id', component: VenueTypesFormComponent }

];

export const venueTypesRouting = RouterModule.forChild(routes)
@NgModule({
  declarations: [
    VenueTypesFormComponent,
    VenueTypesListcomponent

  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbCollapseModule,
    UtilityModule,
    venueTypesRouting
  ],
  providers: [VenueTypesApiService]
})
export class VenueTypesModule { }
