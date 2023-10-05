import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafetyFormComponent } from './safety-form/safety-form.component';
import { SafetyListComponent } from './safety-list/safety-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityModule } from '../utility/utility.module';

const routes: Routes = [
{path: 'list', component:SafetyListComponent},
{path:'form',component: SafetyFormComponent},
{path:'form/:id', component: SafetyFormComponent}

];

export const safetyRulesRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    SafetyFormComponent,
    SafetyListComponent
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
    safetyRulesRouting
  ]
})
export class SafetyRulesModule { }
