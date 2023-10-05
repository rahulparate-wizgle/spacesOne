import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { RentComponent } from "./rent/rent.component";
import { SingleV1Component } from "./single-v1/single-v1.component";

const routes: Routes = [
  {
    path: "",
    component: RentComponent
  },
  {
    path: "details/:id",
    component: SingleV1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CatalogRoutingModule { }
