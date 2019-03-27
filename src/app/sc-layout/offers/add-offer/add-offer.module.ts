import { ApplicationPipesModule } from './../../../application-pipes-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddOfferRoutingModule } from './add-offer-routing.module';
import { AddOfferComponent } from './add-offer.component';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    AddOfferRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,ReactiveFormsModule,
    TreeModule.forRoot(),
    ApplicationPipesModule,
    TreeviewModule.forRoot()
  ],
  declarations: [AddOfferComponent]
})
export class AddOfferModule { }
