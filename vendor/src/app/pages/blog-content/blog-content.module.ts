import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { RouterModule, Routes } from '@angular/router';
import { UIModule } from "../../shared/ui/ui.module";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
// import { VenueListComponent } from './venue-list/venue-list.component';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {path:'list', component:ListComponent},
  {path:'blog-form',component:BlogFormComponent},
  {path:'blog-details/:id', component:BlogDetailsComponent},
  // {path: '',redirectTo:'list', pathMatch:'full'},
  {path: 'blog-form/:id', component:BlogFormComponent},
  {path: 'blog-category', component:BlogCategoryComponent},


  ];

  export const blogContentRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [
   ListComponent,
    BlogDetailsComponent,
    BlogFormComponent,
    BlogCategoryComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgbDropdownModule,
    NgbPaginationModule,
    DropzoneModule,
    NgbCollapseModule,
    NgSelectModule,
    blogContentRouting
  ]
})
export class BlogContentModule { }
