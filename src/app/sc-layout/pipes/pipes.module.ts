import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CategoryPipe} from './category.pipe';
import {OrderrByPipe} from './orderBy.pipe';
import {SortPipe} from './sortpipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@NgModule({
  imports: [
    CommonModule,
   FormsModule,ReactiveFormsModule
  ],
  declarations: [CategoryPipe,OrderrByPipe,SortPipe],
  exports:[CategoryPipe,OrderrByPipe,SortPipe]
})
export class PipesModule { }
