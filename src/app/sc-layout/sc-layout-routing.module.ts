import { ScLayoutComponent } from './sc-layout.component';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from "@angular/router";

const approutes: Routes = [
    { path: '', component: ScLayoutComponent, children: [
        {path:'', redirectTo:'dashboard', pathMatch: 'prefix'},
      {path:'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data:{title:'Dashboard'}},
      {path:'order', loadChildren: './orders/orders.module#OrdersModule', data:{title:'Orders'}},
     {path:'offer', loadChildren: './offers/offers.module#OffersModule', data:{title:'Offers'}},
        {path:'partner', loadChildren: './partners/partners.module#PartnersModule', data:{title:'Partners'}},
        {path:'customer', loadChildren: './customers/customers.module#CustomersModule', data:{title:'Customers'}},
        {path:'admin', loadChildren: './admins/admins.module#AdminsModule', data:{title:'Admins'}},
      {path:'broadcaster', loadChildren: './broadcaster/broadcaster.module#BroadcasterModule', data:{title:'Broadcast Messages'}},
        {path:'data_centre', loadChildren: './data-centre/data-centre.module#DataCentreModule', data:{title:'Data Center'}},
        {path:'myAccount', loadChildren: './my-account/my-account.module#MyAccountModule', data:{title:'My Account'}},
    ]}
];  

@NgModule({
    imports: [RouterModule.forChild(approutes)],
    exports: [RouterModule]
})
export class ScLayoutRoutingModule {
} 
