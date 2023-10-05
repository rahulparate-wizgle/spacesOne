import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
{path:'Contact-Us', component:ContactUsComponent}
];

export const contactUsRouting = RouterModule.forChild(routes)

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    contactUsRouting,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ContactUsModule { }
