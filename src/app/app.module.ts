
import { AngularDraggableModule } from 'angular2-draggable';
import { ApplicationPipesModule } from "./application-pipes-module.module";
import { AuthGuardComponent } from './shared/auth-guard/auth-guard.component';
import { MainRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { ActivationComponent } from './shared/activation/activation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {  BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from './sc-layout/admins/excel.service';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // ActivationComponent,
    PageNotFoundComponent,
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    GooglePlaceModule,
    AngularDraggableModule,
    ColorPickerModule, 
    ImageCropperModule,
    NgxPaginationModule,
    NgxPasswordToggleModule,
    HttpModule,
    TreeModule.forRoot(),
  ],
  
  providers: [AuthGuardComponent,ExcelService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
