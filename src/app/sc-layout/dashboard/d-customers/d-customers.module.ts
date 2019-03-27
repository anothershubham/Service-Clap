import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { DCustomersRoutingModule } from './d-customers-routing.module';
import { DCustomersComponent } from './d-customers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DCustomersRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    PipesModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [DCustomersComponent]
})
export class DCustomersModule { }
