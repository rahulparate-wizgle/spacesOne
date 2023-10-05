import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UIModule } from "../../shared/ui/ui.module";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './rules-list/list.component';
import { RulesAPIService } from './rules-api.service';
import { RulesDetailsComponent } from './rules-details/rules-details.component';
import { RulesFormComponent } from './rules-form/rules-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FontawesomeComponent } from '../icons/fontawesome/fontawesome.component';
import { UtilityModule } from '../utility/utility.module';


const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'rules-form', component: RulesFormComponent },
  { path: 'rules-details/:id', component: RulesDetailsComponent },
  { path: 'rules-form/:id', component: RulesFormComponent },
];

export const venueRulesRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    ListComponent,
    RulesDetailsComponent,
    RulesFormComponent,
    FontawesomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgSelectModule,
    NgxPaginationModule,
    Ng2OrderModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbCollapseModule,
    UtilityModule,
    venueRulesRouting
  ],
  providers: [RulesAPIService]
})
export class VenueRulesModule { }
