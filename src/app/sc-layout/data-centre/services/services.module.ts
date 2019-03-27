import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { PipesModule } from "../../pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  imports: [
    CommonModule,
    ServicesRoutingModule,
    PipesModule,
    FormsModule, ReactiveFormsModule,
    TreeModule.forRoot(),
    ImageCropperModule,
  ],
  declarations: [ServicesComponent]
})
export class ServicesModule { }
