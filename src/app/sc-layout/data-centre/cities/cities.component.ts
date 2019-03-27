import { Component, OnInit, ElementRef, NgZone, ViewChild ,Renderer2 } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ServerService } from "../../../shared/server.service";
import { ScLayoutComponent } from "../../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { DataCentreComponent } from "../data-centre.component";
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  dataLoaded:number=0;
  user_type = localStorage.getItem('user_type');
  statuss = 'ONLINE';
  isConnected = true;
  blockmessage: string='';
  code: any;
  status_code: number;
  delCode: any;
  newcode: any;
  blink: number;
  value_of_i: number;
  cityName: string='';
  totalLength: number;
  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;
  city;
  currentPage =1;
  itemsPerPage =10;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  p=1;
  addCity: any[] = [
    // {
    //   "code":"1",
    //   "label": "Raigarh"
    // },
    // {
    //   "code":"2",
    //   "label": "BHubhaneswar"
    // },
    // {
    //   "code":"3",
    //   "label": "Sivsagar"
    // },
  ]

  CityCard: any[] = []

  constructor(public parentComponent:ScLayoutComponent,public apiCall:ServerService,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,public el:ElementRef,public rend:Renderer2,private connectionService: ConnectionService,public pComponent:DataCentreComponent) {
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.isConnected = true;
        this.pComponent.showLoader=2;     
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
        this.statuss = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.statuss = "OFFLINE";
      }
    })
   }
   doSomething($event){
   }

  ngOnInit() {
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.setCurrentPosition();
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    const searchInput = document.getElementById('search') as HTMLInputElement;
    //create search FormControl
    this.searchControl = new FormControl();
    //set current position
    let hasDownBeenPressed = false;
    
    searchInput.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {
          hasDownBeenPressed = true;
      }
    });
    searchInput.addEventListener('focus', () => {
      hasDownBeenPressed = false;
      searchInput.value = '';
  });
    //load Places Autocomplete
    var options = {
      types: ['(cities)'], componentRestrictions:{country:'in'}
    }
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(searchInput, options);
      
     google.maps.event.addDomListener(searchInput, 'keydown', (e) => {
    
          // Maps API e.stopPropagation();
          e.cancelBubble = true;
      
          // If enter key, or tab key
          if (e.keyCode === 13 || e.keyCode === 9) {
              // If user isn't navigating using arrows and this hasn't ran yet
              if (!hasDownBeenPressed && !e.hasRanOnce) {
                  google.maps.event.trigger(e.target, 'keydown', {
                      keyCode: 40,
                      hasRanOnce: true,
                  });
              }
          }
      });
      autocomplete.addListener("place_changed", () => {
        
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.cityName = place.name;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          var obj = {"lat":this.latitude,"lon":this.longitude};
          var obj1 = {"code":JSON.stringify(this.addCity.length +1),"latitude":this.latitude,"longitude":this.longitude,"city_label":this.cityName,"city_code":place.place_id};
          if(this.addCity.length == 0){
            this.newcode =  Math.max.apply(Math, this.CityCard.map(function(o) {
              return o.code; }))
              obj1.code = this.newcode+1;
            this.addCity.push(obj1);
            this.newcode = obj1.code;
            this.searchControl = new FormControl();
          }else{
            var a = this.search(this.cityName,this.addCity);
            
            if(a == false){
              this.newcode =  Math.max.apply(Math, this.addCity.map(function(o) {
                return o.code; }))
                obj1.code = this.newcode+1;
              this.addCity.push(obj1);
              this.searchControl = new FormControl();
            }else{
              this.blink =1;
              this.showBlink();
            }
          }
          this.zoom = 12;
        });
      });
    });
    this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
  }
  fetchedAllCities(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.CityCard = res.data;
      this.totalLength = this.currentPage * this.itemsPerPage;
      if(this.totalLength > this.CityCard.length)
      this.totalLength= this.CityCard.length;
    }else{
      this.CityCard=[];
      this.parentComponent.callCity();
    }
  }
  showBlink(){
    var f = document.getElementById('city'+this.value_of_i) as HTMLInputElement;
    setTimeout(function() {
      this.blink =0;
    }, 10000);
  }
 
  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (JSON.stringify(myArray[i].city_label) === JSON.stringify(nameKey)) {
          this.value_of_i = i +1;
            return true
        }else{
          return false;
        }
    }}
    AddlocationForm(){
      this.searchControl = new FormControl();
      this.addCity=[];
    }
  addCityLocation(){
    if(this.cityName == ''){

    }
    else
    {
      this.dataLoaded=0;
      this.pComponent.showLoader=2;
      this.city = "modal";
      this.addCity = this.addCity.map(function(obj) {
        return {"latitude":obj.latitude,"longitude":obj.longitude,"city_label":this.toTitleCase(obj.city_label),"city_code":obj.city_code};
        });
    this.apiCall.add_multiple_cities(this.addCity).subscribe(res=>this.addResponse(res))
    }
  }
  toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }
  addResponse(res){
    this.dataLoaded=1;
    this.pComponent.showLoader=0;
    if(res.success == true){
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
      this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
    }else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  remove(x)
  {
    // this.serviceArray.splice(x,1);
    this.addCity.splice(x,1);
  
    // this.lengthselected=this.selected.length;
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  blockUser(){
    this.dataLoaded=0;
    this.pComponent.showLoader=2;
    this.apiCall.change_status_of_city(this.code,this.status_code).subscribe(res=>this.changeResponse(res))
    // var a = document.getElementById('block') as HTMLInputElement;
    // a.checked=false;
  }
  changeResponse(res){
    this.dataLoaded=1;
    this.pComponent.showLoader=0;
    if(res.success == true){
      this.parentComponent.showAlert=1;
      this.parentComponent.messageAlert = res.message;
      this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
    }else{
      this.parentComponent.showAlert=3;
      this.parentComponent.messageAlert = res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  toggle(code,city_status,i){
    this.code = code;
    if(city_status == 1){
      this.blockmessage = "Block";
      this.status_code =0;
      var a = document.getElementById('block'+i) as HTMLInputElement;
      a.checked=true;
    }else{
      this.status_code =1;
      this.blockmessage = "UnBlock";
      var a = document.getElementById('block'+i) as HTMLInputElement;
      a.checked=false;
    }
  }
  // donotBlock(){
  //   var a = document.getElementById('block') as HTMLInputElement;
  //   a.checked=true;
  // }
  delete_pop_Up(code){
    this.delCode = code;
  }
  deleteIt(){
    this.dataLoaded=0;
    this.pComponent.showLoader=2;
    this.apiCall.deleteData(this.delCode,'delete_city').subscribe(res=>this.deleteResponse(res))
    // this.apiCall.deleteData(this.delCode,"delete_city").subscribe(res=>this.deleteResponse(res))
  }
  deleteResponse(res){
    this.dataLoaded=1;
    this.pComponent.showLoader=0;
    if(res.success == true){
      this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
      this.parentComponent.showAlert=1;
      this.parentComponent.messageAlert = res.message;
    }else{
      this.parentComponent.showAlert=3;
      this.parentComponent.messageAlert = res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.CityCard.length)
    this.totalLength= this.CityCard.length;
  }
}
