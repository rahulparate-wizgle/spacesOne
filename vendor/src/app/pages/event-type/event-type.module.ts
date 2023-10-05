import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypeFormComponent } from './event-type-form/event-type-form.component';
import { EventTypeListComponent } from './event-type-list/event-type-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityModule } from '../utility/utility.module';

const routes: Routes = [
{ path:"form", component:EventTypeFormComponent },
{ path:"form/:id", component:EventTypeFormComponent },
{ path:"list", component:EventTypeListComponent }
  ];

  export const eventTypeRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    EventTypeFormComponent,
    EventTypeListComponent
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
    eventTypeRouting
  ]
})
export class EventTypeModule { }
