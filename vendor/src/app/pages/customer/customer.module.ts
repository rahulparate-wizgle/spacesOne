import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { SimplebarAngularModule } from 'simplebar-angular';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: 'list', component: CustomerListComponent },
  { path: 'details', component: CustomerDetailsComponent },
  { path: 'customer-form', component: CustomerFormComponent },
  { path: 'customer-form/:id', component: CustomerFormComponent },
  { path: 'details/:id', component: CustomerDetailsComponent },
];

export const customerRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent,
    CustomerFormComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule ,
    NgbTooltipModule,
    NgbPaginationModule,
    NgxPaginationModule,
    CKEditorModule,
    NgbDropdownModule,
    NgbCollapseModule,
    TranslateModule,
    ClickOutsideModule,
    SimplebarAngularModule,
    customerRouting
  ]
})
export class CustomerModule { }




