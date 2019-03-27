import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { DPartnersRoutingModule } from './d-partners-routing.module';
import { DPartnersComponent } from './d-partners.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DPartnersRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    PipesModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DPartnersComponent]
})
export class DPartnersModule { }
