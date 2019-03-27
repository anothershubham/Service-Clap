import { ApplicationPipesModule } from './../application-pipes-module.module';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { environment } from './../../environments/environment';
import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { HeaderComponent } from './../shared/header/header.component';
import { ScLayoutRoutingModule } from './sc-layout-routing.module';
import { ScLayoutComponent } from './sc-layout.component';
// import { AngularDraggableModule } from 'angular2-draggable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import { PipesModule } from './pipes/pipes.module';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5ovD4Nk-o2KHssc0gEzZcHrODFFoWD2U",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScLayoutRoutingModule,
    GooglePlaceModule,
    GooglePlaceModule,
    ApplicationPipesModule,
    PipesModule,
    ImageCropperModule,
  ],
  declarations: [
    ScLayoutComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  providers: [
    Title,GoogleMapsAPIWrapper
  ]
})
export class ScLayoutModule {
 }
