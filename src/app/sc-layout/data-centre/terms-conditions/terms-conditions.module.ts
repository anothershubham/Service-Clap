import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsConditionsComponent } from './terms-conditions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    MatExpansionModule,
    NgxPaginationModule,
    PipesModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [TermsConditionsComponent]
})
export class TermsConditionsModule { }
