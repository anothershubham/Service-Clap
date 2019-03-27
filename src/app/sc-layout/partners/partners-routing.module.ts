import { PartnersComponent } from './partners.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PDetailComponent } from './p-detail/p-detail.component';

const routes: Routes = [
  { path: '', component: PartnersComponent },
  { path:'pDetails/:id', component: PDetailComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
