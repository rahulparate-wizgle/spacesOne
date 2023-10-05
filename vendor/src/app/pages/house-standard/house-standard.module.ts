import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardFormComponent } from './standard-form/standard-form.component';
import { StandardListComponent } from './standard-list/standard-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityModule } from '../utility/utility.module';

const routes: Routes = [

{path:'list', component: StandardListComponent},
{path:'form', component: StandardFormComponent},
{path:'form/:id', component:StandardFormComponent}
];

export const houseStandardRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    StandardFormComponent,
    StandardListComponent
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
    houseStandardRouting
  ]
})
export class HouseStandardModule { }
