import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { mainDashboardComponent } from './blog/mainDashboard.component';

import { DefaultComponent } from './default/default.component';


const routes: Routes = [
    {
        path: 'default',
        component: DefaultComponent
    },
    // {
    //   path:'blog',
    //   component:BlogComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
