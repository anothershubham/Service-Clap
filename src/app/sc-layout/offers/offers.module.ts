import { ApplicationPipesModule } from './../../application-pipes-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
    BsDatepickerModule.forRoot(),
    TreeModule.forRoot(),
    NgxPaginationModule,
    PipesModule,
    ApplicationPipesModule,
    FormsModule, 
    ReactiveFormsModule,
    TreeviewModule.forRoot()
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }
