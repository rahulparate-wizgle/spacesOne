import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { Page500Component } from './page500/page500.component';


const routes: Routes = [
 
];

export const errorPagesRouting = RouterModule.forChild(routes)
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    errorPagesRouting
  ]
})
export class ErrorPagesModule { }
