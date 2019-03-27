import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataCentreRoutingModule } from './data-centre-routing.module';
import { DataCentreComponent } from './data-centre.component';
import { RestaurantCategoriesComponent } from './restaurant-categories/restaurant-categories.component';
import { FoodItemTagComponent } from './food-item-tag/food-item-tag.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  imports: [
    CommonModule,
    DataCentreRoutingModule
  ],
  declarations: [DataCentreComponent, RestaurantCategoriesComponent, FoodItemTagComponent, AboutUsComponent, ContactUsComponent]
})
export class DataCentreModule { }
