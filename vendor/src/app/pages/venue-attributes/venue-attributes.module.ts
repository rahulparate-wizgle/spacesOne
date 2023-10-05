import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UIModule } from "../../shared/ui/ui.module";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './attributes-list/list.component';
import { AttributesAPIService } from './attributes-api.service';
import { AttributesFormComponent } from './attributes-form/attributes-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilityModule } from '../utility/utility.module';


const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'attributes-form', component: AttributesFormComponent },
  { path: 'attributes-form/:id', component: AttributesFormComponent },
];

export const venueAttributesRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    ListComponent,
    AttributesFormComponent,
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
    venueAttributesRouting
  ],
  providers: [AttributesAPIService]
})
export class VenueAttributesModule { }
