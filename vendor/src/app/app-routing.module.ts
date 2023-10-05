import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { MaintenanceComponent } from './pages/error-pages/maintenance/maintenance.component';
import{Page404Component} from'./pages/error-pages/page404/page404.component';
import{Page500Component} from'./pages/error-pages/page500/page500.component';


const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

  { path:'maintenance',component:MaintenanceComponent },
  { path:'page500', component:Page500Component },

  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },

  { path: '**', component: Page404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
