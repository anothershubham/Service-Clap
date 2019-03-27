import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DPendingOrdersRoutingModule } from './d-pending-orders-routing.module';
import { DPendingOrdersComponent } from './d-pending-orders.component';
import { AgmCoreModule } from '@agm/core';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD5ovD4Nk-o2KHssc0gEzZcHrODFFoWD2U",
      libraries: ["places"]
    }),
    CommonModule,
    FormsModule,ReactiveFormsModule,
    DPendingOrdersRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    PipesModule,
    ImageCropperModule,
  ],
  providers: [DatePipe],
  declarations: [DPendingOrdersComponent]
})
export class DPendingOrdersModule { }
