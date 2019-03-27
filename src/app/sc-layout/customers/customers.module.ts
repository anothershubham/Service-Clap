import { ApplicationPipesModule } from './../../application-pipes-module.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { CDetailsComponent } from './c-details/c-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PipesModule,
    GooglePlaceModule,
    ApplicationPipesModule 
  ],
  declarations: [CustomersComponent,
    CDetailsComponent,
  ],
  providers: [
  ]
})
export class CustomersModule { }
