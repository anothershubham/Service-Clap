import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BroadcasterRoutingModule } from './broadcaster-routing.module';
import { BroadcasterComponent } from './broadcaster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplicationPipesModule } from 'src/app/application-pipes-module.module';

@NgModule({
  imports: [
    CommonModule,
    BroadcasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ApplicationPipesModule
  ],
  declarations: [
    BroadcasterComponent,
]
})
export class BroadcasterModule { }
