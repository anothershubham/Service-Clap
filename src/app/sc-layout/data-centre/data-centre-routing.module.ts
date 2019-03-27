import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FoodItemTagComponent } from './food-item-tag/food-item-tag.component';
import { RestaurantCategoriesComponent } from './restaurant-categories/restaurant-categories.component';
import { DataCentreComponent } from './data-centre.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DataCentreComponent,children: [
    {path:'', redirectTo:'advertisement', pathMatch: 'prefix' },
    {path:'advertisement', loadChildren: './home-slider/home-slider.module#HomeSliderModule'},
    {path:'cities', loadChildren: './cities/cities.module#CitiesModule'},
    {path:'services', loadChildren: './services/services.module#ServicesModule'},
    {path:'termsCondition', loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsModule'},
    {path:'restaurantCategories', component: RestaurantCategoriesComponent },
    {path:'foodItemTag', component: FoodItemTagComponent },
    {path:'aboutUs', component: AboutUsComponent },
    {path:'contactUs', component: ContactUsComponent },
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataCentreRoutingModule { }
