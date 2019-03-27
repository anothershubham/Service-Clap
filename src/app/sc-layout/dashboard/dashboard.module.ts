import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { PipesModule } from '../pipes/pipes.module';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5ovD4Nk-o2KHssc0gEzZcHrODFFoWD2U",
      libraries: ["places"]
    }),
    CommonModule,
    DashboardRoutingModule,
    FormsModule,ReactiveFormsModule,
    PipesModule,
    ImageCropperModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
