import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {CheckPasswordDirective } from './check-password-directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { ApplicationPipesModuleModule} from '../../application-pipes-module.module';
//import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PipesModule } from '../pipes/pipes.module';
import { ApplicationPipesModule } from './../../application-pipes-module.module';

@NgModule({
  imports: [
   
    CommonModule,
    AdminsRoutingModule,
    Ng2SearchPipeModule ,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPasswordToggleModule,
    ImageCropperModule,
    ApplicationPipesModule,
    PipesModule,
    // ApplicationPipesModuleModule,
    GooglePlaceModule
  ],
  declarations: [AdminsComponent,CheckPasswordDirective ]
})
export class AdminsModule { }

