import { OffersComponent } from './offers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditOfferComponent } from "./edit-offer/edit-offer.component";
const routes: Routes = [
  { path: '', component: OffersComponent },
  { path: 'oDetails', loadChildren: './o-detail/o-detail.module#ODetailModule'},
  { path: 'aOffer', loadChildren: './add-offer/add-offer.module#AddOfferModule'},
  { path: 'eOffer', loadChildren: './edit-offer/edit-offer.module#EditOfferModule'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
