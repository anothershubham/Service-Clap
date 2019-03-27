import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ApplicationPipesModule } from '../../application-pipes-module.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
@NgModule({
  imports: [
   
    CommonModule,
    MyAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxPasswordToggleModule,
    ApplicationPipesModule,
    GooglePlaceModule
  ],
  declarations: [MyAccountComponent]
}) 
export class MyAccountModule { }
