import { AuthGuardComponent } from './shared/auth-guard/auth-guard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const approutes: Routes =[
{ path: '', loadChildren: './sc-layout/sc-layout.module#ScLayoutModule', canActivate: [AuthGuardComponent] },
{ path: 'login', component: LoginComponent },
{
    path: '**', component: PageNotFoundComponent
}
];

@NgModule({
    imports: [RouterModule.forRoot(approutes,{useHash: true})],
    exports: [RouterModule]
})
export class MainRoutingModule {

}