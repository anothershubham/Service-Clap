import { ApplicationPipesModule } from './../../application-pipes-module.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { PDetailComponent } from './p-detail/p-detail.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5ovD4Nk-o2KHssc0gEzZcHrODFFoWD2U",
      libraries: ["places"]
    }),
    CommonModule,
    PartnersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    PipesModule,
    ImageCropperModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    ApplicationPipesModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [PartnersComponent,
  PDetailComponent],
})
export class PartnersModule { }
