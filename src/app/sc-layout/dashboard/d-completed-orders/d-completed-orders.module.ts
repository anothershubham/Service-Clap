import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { DCompletedOrdersRoutingModule } from './d-completed-orders-routing.module';
import { DCompletedOrdersComponent } from './d-completed-orders.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DCompletedOrdersRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    PipesModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DCompletedOrdersComponent]
})
export class DCompletedOrdersModule { }
