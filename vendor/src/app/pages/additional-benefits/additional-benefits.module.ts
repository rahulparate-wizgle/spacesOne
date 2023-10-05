import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitsFormComponent } from './benefits-form/benefits-form.component';
import { BenefitsListComponent } from './benefits-list/benefits-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityModule } from '../utility/utility.module';



const routes: Routes = [
  {path:'list', component: BenefitsListComponent},
  {path :'form', component: BenefitsFormComponent},
  {path:'form/:id', component: BenefitsFormComponent}

];

export const additionalBenefitsRouting = RouterModule.forChild(routes)
@NgModule({
  declarations: [
    BenefitsFormComponent,
    BenefitsListComponent
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
    additionalBenefitsRouting
  ]
})
export class AdditionalBenefitsModule { }
