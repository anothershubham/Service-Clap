import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADetailsRoutingModule } from './a-details-routing.module';
import { ADetailsComponent } from './a-details.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ApplicationPipesModule } from '../../../application-pipes-module.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
  
    CommonModule,
    ADetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ApplicationPipesModule,
    GooglePlaceModule
  ],
  declarations: [ADetailsComponent]
})
export class ADetailsModule { }
