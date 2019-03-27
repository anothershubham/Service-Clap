import { CustomersComponent } from './customers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CDetailsComponent } from './c-details/c-details.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path:'cDetails/:id', component: CDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
