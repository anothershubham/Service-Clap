import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5ovD4Nk-o2KHssc0gEzZcHrODFFoWD2U",
      libraries: ["places"]
    }),
    NgxPaginationModule,
    CommonModule,
    FormsModule,ReactiveFormsModule,
    CitiesRoutingModule,
    PipesModule
  ],
  declarations: [CitiesComponent]
})
export class CitiesModule { }
