import { FoodorderDetailComponent } from './foodorder-detail/foodorder-detail.component';
import { OrdersComponent } from './orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'orderDetail/:id', component: OrderDetailComponent, pathMatch: 'full', data: {reuse: true}},
  { path: 'foodorderDetail', component: FoodorderDetailComponent, pathMatch: 'full' }

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
