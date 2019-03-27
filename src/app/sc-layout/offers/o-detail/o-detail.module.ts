import { ApplicationPipesModule } from './../../../application-pipes-module.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ODetailRoutingModule } from './o-detail-routing.module';
import { ODetailComponent } from './o-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ODetailRoutingModule,
    ApplicationPipesModule
  ],
  declarations: [ODetailComponent]
})
export class ODetailModule { }
