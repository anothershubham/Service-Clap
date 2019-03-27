// import { PushNotificationsService } from './../../push.notification.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Component, OnInit, ElementRef, NgZone, ViewChild ,Renderer2 } from '@angular/core';
//import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ServerService } from "../shared/server.service";
import { Observable} from 'rxjs';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Http,Headers} from '@angular/http';
import { Router } from '@angular/router';

import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
let addFormData=new FormData();
@Component({
  selector: 'app-sc-layout',
  templateUrl: './sc-layout.component.html',
  styleUrls: ['./sc-layout.component.css']
})
export class ScLayoutComponent implements OnInit {
  filename: any;
  tempCity: any;
  photoName: any;
  @ViewChild('places') places: GooglePlaceDirective;
  message;
  res: any;
  apiname: any;
  delCode='';
  bodyTitle="";
  bodyStatement ="";
  delete_Modal;
  showAlert:number=0;
  showLoader:number=0;
  messageAlert:string='';
  loaded :Promise<boolean>;
  addCity: any[] = [];
  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;
  priceamount:number=0;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  cityName: string="";
  headerData="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI3NTgzMDgzMDgzIiwiaWF0IjoxNTM3MzUyNzcyfQ.B9Yi9MONa4W6WeANyvH3e5qzXf1JOvWXRsmJqGW-8YU";
  private subscription: Subscription;
  private timer:Observable<any>;
  constructor(public apiCall:ServerService,private http: HttpClient,private ngZone: NgZone,public el:ElementRef,public rend:Renderer2,public router: Router) {
    this.searchControl = new FormControl();

  // this.setCurrentPosition();
  // this.zoom = 4;
  // this.latitude = 39.8282;
  // this.longitude = -98.5795;
  // this.searchControl = new FormControl();
  // this.mapsAPILoader.load().then(() => {
  //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //    types: ['(cities)'], componentRestrictions:{country:'in'}
  //  });
  //   autocomplete.addListener("place_changed", () => {
  //     this.ngZone.run(() => {
  //       //get the place result
  //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //       this.cityName = place.name;
  
  //       //verify result
  //       if (place.geometry === undefined || place.geometry === null) {
  //         return;
  //       }

  //       //set latitude, longitude and zoom
  //       this.latitude = place.geometry.location.lat();
  //       this.longitude = place.geometry.location.lng();

  //       var obj = {"lat":this.latitude,"lon":this.longitude};
  //       var obj1 = {"code":JSON.stringify(this.addCity.length +1),"latitude":this.latitude,"longitude":this.longitude,"city_label":this.cityName,"city_code":place.place_id};
  //       if(this.addCity.length == 0){
  //         this.addCity.push(obj1);
  //         this.searchControl = new FormControl();
  //       }else{
  //         var a = this.search(this.cityName,this.addCity);

  //         if(a == false){
  //           this.addCity.push(obj1);

  //           this.searchControl = new FormControl();
  //         }else{
            
  //         }
  //       }
  
  //       this.zoom = 12;
  //     });
  //   });
  // });
}
xx:string='';
onChange(event){
  
  
  this.cityName = event.name;


        var obj1 = {"code":JSON.stringify(this.addCity.length +1),"latitude":event.geometry.location.lat(),"longitude":event.geometry.location.lng(),"city_label":this.cityName,"city_code":event.place_id};
        if(this.addCity.length == 0){
          this.addCity.push(obj1);
          this.searchControl = new FormControl();
        }else{
          var a = this.search(this.cityName,this.addCity);

          if(a == false){
           this.addCity.push(obj1);
           this.searchControl = new FormControl();
          }else{
            
          }

        }
 }
 public changeConfig() { // for google autocomplete places API
  this.places.options.componentRestrictions = new ComponentRestrictions({
      country: "IN"
  });

  this.places.reset();
}
remove(x)
{
  this.addCity.splice(x,1);
}
search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (JSON.stringify(myArray[i].city_label) === JSON.stringify(nameKey)) {
          return true
      }else{
        return false;
      }
  }}
private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}
  deleteModal(code,api){
    var a = document.getElementById('delModal') as HTMLInputElement;
    a.click();
    this.delCode = code;
    this.apiname = api;

  }
  setNotificationTimer(){
    this.timer        = timer(5000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        this.showAlert = 0;
    });
  }
  close(){
    this.showAlert=0;
  }
  blockUser(){

      let headerJson = {
        'Content-Type':'application/json',
        'token':this.headerData,
        }
        const addapi=JSON.stringify({
          "city_code": this.delCode
        });
      let headers=new HttpHeaders(headerJson);
      this.http.delete('http://206.189.129.220:2018/secureApi/'+this.apiname,{
          headers : headers
      }).subscribe(res=>this.deleteResponse(res));

    }
    deleteResponse(res){

      this.res = res;
    }
    returnResponse(){
      return this.res;
    }  
  ngOnInit() {

    // this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
    // this.msgService.getPermission();
    // this.msgService.receiveMessage()
    // this.message = this.msgService.currentMessage;
  }
  CityCard:any=[];
  city;
  call(){}
  fetchedAllCities(res){
    if(res.success == true){
      this.CityCard = res.data;
    }else{
      this.CityCard=[];
    }
    if(this.CityCard.length == 0){
      var b= document.getElementById('openCityModal') as HTMLInputElement;
      b.click();
    }else{

      this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
    }
    
  }


notify() {
        let data: Array < any >= [];
        data.push({
            'title': 'Approval',
            'alertContent': 'This is First Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Request',
            'alertContent': 'This is Second Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Leave Application',
            'alertContent': 'This is Third Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Approval',
            'alertContent': 'This is Fourth Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'To Do Task',
            'alertContent': 'This is Fifth Alert -- By Debasis Saha'
        });
        // this._notificationService.generateNotification(data);
    }
    toTitleCase(str) {
      return str.replace(
          /\w\S*/g,
          function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
      );
    }
    saveModal(){
      if(this.cityName == ''){
        
        }
        else
        {
          this.city = "modal";
          this.addCity = this.addCity.map(function(obj) {
            return {"latitude":obj.latitude,"longitude":obj.longitude,"city_label":this.toTitleCase(obj.city_label),"city_code":obj.city_code};
            });
  
        this.apiCall.add_multiple_cities(this.addCity).subscribe(res=>this.addResponse(res))
        }
      
    }
    addResponse(res){
      
          if(res.success == true){
            this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
            this.showAlert =1;
            this.messageAlert=res.message;
            
          }else{
            this.showAlert =3;
            this.messageAlert=res.message;
          }
          this.setNotificationTimer();
    }
    call2(){}
    fetch_service(res){
      this.loaded = res;
      if(res.success == true){

        if(res.data.length == 0){
            var a = document.getElementById('openoneServiceModal') as HTMLInputElement;
            a.click();
        }else{
          // this.router.navigate(['/pending_orders']);
        }
      }else{
        var a = document.getElementById('openoneServiceModal') as HTMLInputElement;
        a.click();
      }
    }
    isInArray(array, word) {
      return array.indexOf(word.toLowerCase()) > -1;
    }
    callService(){
      var a = document.getElementById('openoneServiceModal') as HTMLInputElement;
      a.click();
    }
    callCity(){
      var b= document.getElementById('openCityModal') as HTMLInputElement;
      b.click();
    }
    fileExtension: any;
    fileExtensionError: boolean = false;
    showAlertimg: number=0;
    fileChangeEvent(event: any): void {
      this.filename = event.target.value.slice(12, event.target.value.length);
      this.cropimage =1;
      var file = event.target.files[0];
  
      this.photoName = file.name;
      var allowedExtensions = 
         ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG"];
      this.fileExtension = this.photoName.split('.').pop();
      
      if(this.isInArray(allowedExtensions, this.fileExtension)) {
          this.fileExtensionError = false;
          this.showAlertimg=0;
          // addFormData.append("myImage", file);
          var reader = new FileReader();
              reader.onloadend = (e: any) => {
                  var contents = e.target.result;
                  this.imageChangedEvent = event;
              }
              reader.readAsDataURL(file);
        } 
        else 
        {
          
          this.showAlertimg=1;
            // this.alertMessage = "Only photos allowed!!"
            this.fileExtensionError = true;
        }
    }
    imageCroppedBase64(image: string) {
      this.crop=1;
      this.croppedImage = image;
      this.file = this.dataURLtoFile(image,this.filename);

    }
    cropperimage:number=0;
    file: File;
    cropImage(){
     this.crop =0;
     this.cropperimage=1;
     this.cropimage=0;
    }
    RecropImage(){
      this.cropimage =1;
      this.crop=1;
      this.cropperimage=0;
    }
    imageChangedEvent: any = '';
    crop:number=0;
    cropimage:number=1;
  
    // coordinates = {x:0};
    cropperReady = false;
    imageLoaded() {
      this.cropperReady = true;
    }
    imageLoadFailed () {
  
    }
    dataURLtoFile(dataurl, filename) {
      
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
              bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
              u8arr[n] = bstr.charCodeAt(n);
          }
          
          return new File([u8arr], filename, {type:mime});
    }
    serviceName:number=0;
    singleService;
    descriptionArray:any=[{i:0,description:''}];
    blankDescription:number=0;
    croppedImage:any='assets/icons/picture (1).svg';
    addSingleservice(service_name,price,sc_commission){
      if(service_name == ''){
        this.serviceName =1;
      }
      else{
        for(var k=1;k<this.descriptionArray.length;k++){
          if(this.descriptionArray[k].description == ''){
            this.blankDescription =1;
            var a = document.getElementById('desc'+this.descriptionArray[k].i) as HTMLInputElement;
            a.style.display = 'block';
            break;
          }else{
            var a = document.getElementById('desc'+this.descriptionArray[k].i) as HTMLInputElement;
            a.style.display = 'none';
            this.blankDescription =0;
          }
        }
        if(this.blankDescription == 0){
          var obj=[{
            "id":'',
            "service_label":this.toTitleCase(service_name),
            "imageUrl": "../../../../assets/icons/picture (1).svg",
            "price":price,
            "service_commission":sc_commission,
            "description":this.descriptionArray
          }];
          this.singleService='modal';

          if(this.file == undefined){
            addFormData=new FormData();
          }else{
            addFormData.append("image", this.file);
          }
          

          this.apiCall.addmultipleService('0',obj,addFormData).subscribe(res=>this.responseOfService(res))
        }
       
      }
    }
    cancelImage(){
      this.crop=0;
      this.cropperimage=0;
      this.cropimage =0;
      this.croppedImage = this.apiCall.no_image_url;
      this.file = this.dataURLtoFile(this.croppedImage,"no_image_url.png");

    }
    responseOfService(res){
      addFormData=new FormData();
      if(res.success == true){
        
        this.showAlert=1;
        // this.router.navigate(['/pending_orders']);
      }else{
        this.showAlert=3;
      }
      this.messageAlert = res.message;
      this.setNotificationTimer();
    }
    insertDescription(i,event){

      this.descriptionArray[i].description = this.toTitleCase(event);

    }
    removeDiv(i){
      for (var p = 0; p < this.descriptionArray.length; p++) {
        var obj = this.descriptionArray[p];
        if (obj.i == i) {

          this.descriptionArray.splice(p, 1);

          // this.i = this.descriptionArray.length;
        }
      }
     
    }
    blank_error:number=0;
    addRow(descriptionArray){

      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      var obj;
      for (var a=this.descriptionArray.length-1; a>=0; a--) {
          tmp = this.descriptionArray[a].i;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
          obj = {i:highest+1,description:''} 
      }
      for(var i=0;i<this.descriptionArray.length;i++){
        if(this.descriptionArray[i].description == ''){
          this.blank_error =1;
          break;
        }else{
          this.blank_error =0;
        }
      }
      if(this.blank_error == 0){
        this.descriptionArray.push(obj);
      }



    }
}
