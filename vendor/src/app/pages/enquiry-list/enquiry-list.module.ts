import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDatepickerModule, NgbDropdown, NgbDropdownModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { EnquiryDetailsComponent } from './enquiry-details/enquiry-details.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ListComponent } from './list/list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EnquiryDataComponent } from './enquiry-data/enquiry-data.component';
import { DndModule } from 'ngx-drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
{path:'enquiry-details',component:EnquiryDetailsComponent},
{path:'enquiry-details/:id',component:EnquiryDetailsComponent},
{path:'enquiries',component:ListComponent},
{path: 'kanban' , component: EnquiryDataComponent},

 ];
 export const enquiryListRouting = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    EnquiryDetailsComponent,ListComponent, EnquiryDataComponent
  ],
  providers:[NgbDropdown],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgxPaginationModule,
    NgbDropdownModule,
    NgbCollapseModule,
    UIModule,
    SimplebarAngularModule,
    PickerModule,
    NgSelectModule,
    NgApexchartsModule,
    NgbModalModule,
    CKEditorModule,
    DndModule,
    enquiryListRouting
  ]
})
export class EnquiryListModule { }
