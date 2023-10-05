import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersFormComponent } from './users-form/users-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateModule } from '@ngx-translate/core';
import { SimplebarAngularModule } from 'simplebar-angular';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'users-detail', component: UsersDetailComponent },
  { path: 'users-form', component: UsersFormComponent },
  { path: 'users-form/:id', component: UsersFormComponent },
  { path: 'users-detail/:id', component: UsersDetailComponent },
];

export const usersRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailComponent,
    UsersFormComponent

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
    CKEditorModule,
    NgbDropdownModule,
    NgbCollapseModule,
    TranslateModule,
    ClickOutsideModule,
    SimplebarAngularModule,
      usersRouting
  ]
})
export class UsersModule { }
