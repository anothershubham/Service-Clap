import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  // children: [
    // {path:'', redirectTo:'pending_orders', pathMatch: 'prefix' },
    // {path:'pending_orders', loadChildren: './d-pending-orders/d-pending-orders.module#DPendingOrdersModule'},
    // {path:'customers', loadChildren: './d-customers/d-customers.module#DCustomersModule'},
    // {path:'partners', loadChildren: './d-partners/d-partners.module#DPartnersModule'},
    // {path:'completed_orders', loadChildren: './d-completed-orders/d-completed-orders.module#DCompletedOrdersModule'}
  // ]}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
