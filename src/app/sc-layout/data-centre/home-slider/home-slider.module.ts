import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeSliderRoutingModule } from './home-slider-routing.module';
import { HomeSliderComponent } from './home-slider.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    HomeSliderRoutingModule,
    ColorPickerModule,
    ImageCropperModule,
    PipesModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [HomeSliderComponent]
})
export class HomeSliderModule { }
