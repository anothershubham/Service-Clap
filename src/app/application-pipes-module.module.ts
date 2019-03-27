import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreloadDirective } from './image-preload.directive';
import { SearchFilterPipe } from './search-filter.pipe';
import { TextSlicerPipe } from './text-slicer.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ 
    ImagePreloadDirective,
    SearchFilterPipe,
    TextSlicerPipe
  ],
  exports: [
    ImagePreloadDirective,
    SearchFilterPipe,
    TextSlicerPipe
  ]
})
export class ApplicationPipesModule { }
