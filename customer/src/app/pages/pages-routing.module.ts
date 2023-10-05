import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home1Component } from "./dashboard/home1/home1.component";
import { ListYourVenueComponent } from './list-your-venue/list-your-venue.component';

const routes: Routes = [
  {
    path: "",
    component: Home1Component
  },

  {
    path: "listYourVenue",
    component: ListYourVenueComponent
  },

  {
    path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'venues', loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtraPagesModule)
  },
  {
    path: 'static-pages', loadChildren: () => import('./static-pages/static-pages.module').then(m => m.StaticPagesModule)
  },
  {
    path: 'chat', loadChildren: () => import('./chat/chat.module').then(m=> m.ChatModule)
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
