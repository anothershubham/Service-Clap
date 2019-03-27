import { ApplicationPipesModule } from './../../../application-pipes-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { EditOfferRoutingModule } from './edit-offer-routing.module';
import { EditOfferComponent } from './edit-offer.component';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    EditOfferRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    ApplicationPipesModule,
    TreeModule.forRoot(),
    TreeviewModule.forRoot()
  ],
  declarations: [EditOfferComponent]
})
export class EditOfferModule { }
