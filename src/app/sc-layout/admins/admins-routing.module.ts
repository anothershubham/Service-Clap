import { AdminsComponent } from './admins.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminsComponent},
  { path: 'aDetails/:id', loadChildren: './a-details/a-details.module#ADetailsModule'},
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
