import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { PipesModule } from '../pipes/pipes.module';
import { ApplicationPipesModule } from 'src/app/application-pipes-module.module';
import { FoodorderDetailComponent } from './foodorder-detail/foodorder-detail.component';
@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    PipesModule,
    ApplicationPipesModule,
    BsDatepickerModule.forRoot()

  ],
  declarations: [OrdersComponent,
  OrderDetailComponent,
  FoodorderDetailComponent
],
  providers:[
  ]
})
export class OrdersModule { }
