import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { ScLayoutComponent } from "../sc-layout.component";
@Component({
  selector: 'app-data-centre',
  templateUrl: './data-centre.component.html',
  styleUrls: ['./data-centre.component.css']
})
export class DataCentreComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;
  showLoader:number=0;
  data_centre: any[] = [
    {
      "label": "Advertisement",
      "path": "advertisement"
    },
    {
      "label": "Cities",
      "path": "cities"
    },
    {
      "label": "Services",
      "path": "services"
    },
    {
      "label": "Terms & Conditions",
      "path": "termsCondition"
    },
    {
      "label": "Restaurant Categories",
      "path": "restaurantCategories"
    },
    {
      "label": "Food Item Tag",
      "path": "foodItemTag"
    },
    {
      "label": "About Us",
      "path": "aboutUs"
    },
    {
      "label": "Contact Us",
      "path": "contactUs"
    }
  ]

  constructor(private connectionService: ConnectionService,public parentComponent:ScLayoutComponent) {
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true')
      this.isConnected = true;
      else
      this.isConnected = false;
    }
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if(this.isConnected == true)
      localStorage.setItem('isConnected','true');
      else
      localStorage.setItem('isConnected','false');
      // console.log(this.isConnected);
      
      if (this.isConnected) {
        this.parentComponent.showAlert=0;
        this.status = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.status = "OFFLINE";
      }
    })
   }

  ngOnInit() {
  }

}
