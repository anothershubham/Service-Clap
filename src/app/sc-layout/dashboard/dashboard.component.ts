import { Component, OnInit, ElementRef, NgZone, ViewChild ,Renderer2 } from '@angular/core';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ConnectionService } from 'ng-connection-service';
import { ServerService } from 'src/app/shared/server.service';
import { Router } from '@angular/router';
import { ScLayoutComponent } from "../sc-layout.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedItem: any;
  
  photoName: any;
  filename: any;
  status = 'ONLINE';
  isConnected = true;
  showLoader:number;
  
  loaded=false;
  dataLoaded:number=0;
  dashboard: any[] =[ {
      "i":true,    
      "number": null,
      "imageUrl": "../../../assets/icons/clockwise-rotation.svg",
      "label": "Pending Orders",
      "path": "pending_orders"
    },
    {    
      "i":false,
      "number": null,
      "imageUrl": "../../../assets/icons/user (3).svg",
      "label": "Customers",
      "path": "customers"
    },
     {    
      "i":false,
      "number": null,
      "imageUrl": "../../../assets/icons/handshake.svg",
      "label": "Partners",
      "path": "partners"
    },
    {    
      "i":false,
      "number": null,
      "imageUrl": "../../../assets/icons/check.svg",
      "label": "Completed Orders",
      "path": "completed_orders"
    }
  ];
  addCity: any[] = [];
  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;
  priceamount:number=0;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  cityName: string="";
  constructor(private connectionService: ConnectionService,public apiCall:ServerService,public router: Router,public parentComponent:ScLayoutComponent,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,public el:ElementRef,public rend:Renderer2) { 
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.isConnected = true;
        this.parentComponent.showLoader=1;
      }
      
      else
      this.isConnected = false;
    }
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if(this.isConnected == true)
      localStorage.setItem('isConnected','true');
      else
      localStorage.setItem('isConnected','false');
      
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
  listClick(event, newValue) {
    if(newValue.path == 'pending_orders'){

    }else{
      var element = document.getElementById("0") as HTMLInputElement;
      element.classList.remove("bged");
    }
    
    this.selectedItem = newValue; 
}

  ngOnInit() {
    console.log("dc");
    this.parentComponent.showLoader=1;
    this.dashboard[0].number= 0;
      this.dashboard[1].number= 0;
      this.dashboard[2].number= 0;
      this.dashboard[3].number= 0;
    this.apiCall.fetchDashboardData().subscribe(res=>{
      this.fetchedDashboardData(res);
    })
    // this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    
    // this.apiCall.fetchDashboardData().subscribe(res=>{
    //   this.fetchedDashboardData(res);
    // })
  }
  
  fetchedDashboardData(res){
    
    if(res.success == true){
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;
      this.dashboard[0].number= res.pending_orders.length;
      this.dashboard[1].number= res.total_customer.length;
      this.dashboard[2].number= res.total_partner.length;
      this.dashboard[3].number= res.completed_orders.length;  
    }else{
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;
      this.dashboard[0].number= 0;
      this.dashboard[1].number= 0;
      this.dashboard[2].number= 0;
      this.dashboard[3].number= 0;
    }
    
    var element = document.getElementById("0") as HTMLInputElement;
    element.classList.add("bged");
    // this.loaded2 = res;
    
    this.router.navigate(['/pending_orders']);
  }
 
}
