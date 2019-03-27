import { ODetailComponent } from './o-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ODetailComponent },
  { path: 'eOffer', loadChildren: './edit-offer/edit-offer.module#EditOfferModule'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ODetailRoutingModule { }
