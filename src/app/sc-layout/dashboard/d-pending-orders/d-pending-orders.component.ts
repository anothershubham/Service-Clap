import { Component, OnInit, ElementRef, NgZone, ViewChild ,Renderer2 } from '@angular/core';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ServerService } from "../../../shared/server.service";
import { ConnectionService } from 'ng-connection-service';
import { ScLayoutComponent } from "../../sc-layout.component";
import { DashboardComponent } from "../dashboard.component";
let addFormData=new FormData();
@Component({
  selector: 'app-d-pending-orders',
  templateUrl: './d-pending-orders.component.html',
  providers:[DatePipe],
  styleUrls: ['./d-pending-orders.component.css']
})
export class DPendingOrdersComponent implements OnInit {
  dataLoaded:number=0;
  type: any;
  filterType: number=0;
  tdayDate: string;
  errorMessage:string='';
  tdate: string="0";
  fdate: string;
  showAlert: number=0;
  showCustom:number=0;
  dateErrorMessage: string;
  dateerror:number=0;
  cityName: string="";
  price: any;
  singleService;
  result:number=0;
  priceamount:number=0;
  f_date:number=0;
  t_date:number=0;
  servicePic: any;
  photoName: any;
  fileExtension: any;
  fileExtensionError: boolean = false;
  filename: any;
  file: File;
  imageChangedEvent: any = '';
  crop:number=0;
  cropimage:number=1;
  croppedImage: any = '';
  // coordinates = {x:0};
  cropperReady = false;
  serviceName:number=0;
  city_code:number;
  filtercloseModal;
  today=new Date();
  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  insertid: any;
  name: any;
  p=1;
  currentPage =1;
  itemsPerPage =10;
  totalLength: number;
  status = 'ONLINE';
  isConnected = true;
  CityCard=[];
  city;
  addCity: any[] = [
    // {
    //   "code":1,
    //   "label": "Raigarh"
    // },
    // {
    //   "code":2,
    //   "label": "Bangalore"
    // },
    // {
    //   "code":3,
    //   "label": "Bhubhaneswar"
    // },
  ];
  Services1: any[] = [
    {
      "id":'',
      "name":"",
      "imageUrl": "../../../../assets/icons/picture (1).svg",
      "price":""
    }
  ]
  p_order: any[] = [];

dates: any[] = [
  {
    "code":"1",
    "type": "Today"
  },
  { 
    "code":"2",
    "type": "Last 30 days"
  },
  { 
    "code":"3",
    "type": "Last 7 days"
  },
  { 
    "code":"4",
    "type": "Yesterday"
  },   
  { 
    "code":"5",
    "type": "Custom"
  },
]
openFilterModal(){
  this.clearForm();
}

remove(x)
{
  // this.serviceArray.splice(x,1);
  this.addCity.splice(x,1);
  

  // this.lengthselected=this.selected.length;
}
clearFilterModal(){
  this.filterType=0;
  this.dataLoaded=0;
  this.pComponent.showLoader=2;
  this.apiCall.fetchDashboardData().subscribe(res=>this.fetchedDashboardData(res))
}
FilterData(){
  console.log(this.type);
  var firstOption = document.getElementById('exampleFormControlSelect1') as HTMLInputElement;
  var a = document.getElementById('fromDate') as HTMLInputElement;
  var b = document.getElementById('toDate') as HTMLInputElement;
  if(firstOption.value == '5'){
    if(a.value !='' && b.value !=''){

      var d1 = new Date(a.value);
      var d2 = new Date(b.value);
      this.fdate = this.datePipe.transform(d1,"yyyy-MM-dd");
      this.tdate = this.datePipe.transform(d2,"yyyy-MM-dd");


      var timeDiff = d2.getTime() - d1.getTime();
      var DaysDiff = timeDiff / (1000 * 3600 * 24);

      if(a.value == b.value){
        this.t_date=1;
        this.errorMessage = "Both date field cannot be same";
      }
      else if(DaysDiff < 0){

        this.t_date=1;
        this.errorMessage = "From date is greater than to date";
      }
      else{
        this.t_date =0;

        this.filtercloseModal = 'modal';
        this.filterType = this.type;
        this.apiCall.filterDashboardData(this.city_code,this.fdate,this.tdate).subscribe(res=>this.fetchedDashboardData(res));
      }

    }
    else{
      if(a.value == ''){
        this.f_date = 1;
      }
      if(b.value == ''){
        this.t_date=1;
        this.errorMessage = "To date is required";  
      }
      this.filtercloseModal = '';
    }
  }
  else {
    if(firstOption.value == '1'){
      this.tdate='0'
    }


    this.filtercloseModal = 'modal';
    this.filterType = this.type;
    this.apiCall.filterDashboardData(this.city_code,this.fdate,this.tdate).subscribe(res=>this.fetchedDashboardData(res));
  }
  
  
  
  
}
addSingleservice(service_name,price){
  if(service_name == ''){
    this.serviceName =1;
  }
  else if(price == ''){
    this.priceamount =1;
  }
  else{
    var obj={
      "id":'',
      "name":service_name,
      "imageUrl": "../../../../assets/icons/picture (1).svg",
      "price":price
    }
    this.singleService='modal';
    addFormData.append("image", this.file);
    this.apiCall.addmultipleService(0,obj,addFormData).subscribe(res=>this.responseOfService(res));
  }
}
responseOfService(res){
  if(res.success == true){
    this.parentComponent.showAlert=1;
  }else{
    this.parentComponent.showAlert=3;
  }
  this.parentComponent.messageAlert = res.message;
  this.parentComponent.setNotificationTimer();
}
ChooseDate(event){
  var currentdate=new Date();
  this.today = currentdate;
  this.fdate = this.datePipe.transform(this.today,"yyyy-MM-dd");
  this.tdayDate = this.fdate;
  this.type = event.value;
  if(event.value == '1'){
    this.showCustom=0;
    this.fdate = this.datePipe.transform(this.today,"yyyy-MM-dd");

    this.tdate = "0";

  }else if(event.value == '4'){
    this.showCustom=0;
    currentdate.setDate(currentdate.getDate()-1);
    this.fdate = this.datePipe.transform(currentdate,"yyyy-MM-dd");
    this.tdate = "0";


  }
  else if(event.value == '2'){
    this.showCustom=0;
    let newDate = new Date(currentdate.setDate(currentdate.getDate()-30))
    this.fdate = this.datePipe.transform(newDate,"yyyy-MM-dd");
    this.tdate = this.tdayDate;


  }
  else if(event.value == '3'){
    this.showCustom=0;
    let newDate = new Date(currentdate.setDate(currentdate.getDate()-7))
    this.fdate = this.datePipe.transform(newDate,"yyyy-MM-dd");
    this.tdate = this.tdayDate;


  }
  else if(event.value == '5'){
    this.showCustom=1;
    this.f_date=0;
    this.t_date=0;
  }
  
}

CheckInput(fromDate){
  if(fromDate == 'fromDate'){
    this.f_date=0;
  }

  if(fromDate == 'toDate'){

    this.t_date=0;
  }

}
clearForm(){
  var c = document.getElementById('exampleFormControlSelect1') as HTMLInputElement;
  c.value ='1';
  var currentdate=new Date();
  this.fdate = this.datePipe.transform(currentdate,"yyyy-MM-dd");
  this.t_date=0;
  // this.filterType=0;
  this.type=1;
  if(this.showCustom ==1){
    
    var a = document.getElementById('fromDate') as HTMLInputElement;
    a.value='';
    var b = document.getElementById('toDate') as HTMLInputElement;
    b.value='';
    this.showCustom =0;
  }else{
    this.showCustom =0;
    
  }
  
}
  constructor(public apiCall:ServerService,private datePipe: DatePipe,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,public el:ElementRef,public rend:Renderer2,private connectionService: ConnectionService,public parentComponent:ScLayoutComponent,public pComponent:DashboardComponent) { 
    var currentdate=new Date();
    this.pComponent.showLoader=2;
    this.fdate = this.datePipe.transform(currentdate,"yyyy-MM-dd");
    // this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
  }
  fetchedAllCities(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.CityCard = res.data;

    }else{
      this.CityCard=[];
    }
    if(this.CityCard.length == 0){
      var b= document.getElementById('openCityModal') as HTMLInputElement;
      b.click();
    }
  }
  Validatekeypress(event:any){
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  insertName(event,idname,i){
    if(i==0){
      this.insertid =0;
    }
    if(idname == 'serviceName'){
      var a = document.getElementById(idname+i) as HTMLInputElement;
      a.value = event;
      if(event == ''){
        this.Services1[i].name = '';
      }else{
        this.name = event;
        this.Services1[i].id = this.insertid ;
        this.Services1[i].name = this.name;
      }
    }
    if(idname == 'price'){
      var b = document.getElementById(idname+i) as HTMLInputElement;
      b.value = event;
      if(event == ''){
        this.Services1[i].price = '';
      }else{
        this.price = event;
        this.Services1[i].id = this.insertid;
        this.Services1[i].price = this.price;
      }
    }

  }
  call(){}
  call1(){}
  call2(){}
  saveModal(){
    if(this.cityName == ''){
      
      }
      else
      {
        this.city = "modal";
        this.addCity = this.addCity.map(function(obj) {
          return {"latitude":obj.latitude,"longitude":obj.longitude,"city_label":obj.city_label,"city_code":obj.city_code};
          });

      this.apiCall.add_multiple_cities(this.addCity).subscribe(res=>this.addResponse(res))
      }
    
  }
  addResponse(res){

    if(res.success == true){
      this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
      
    }else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  fetch_service(res){
    if(res.success == true){
      if(res.data.length == 0){
          var a = document.getElementById('openoneServiceModal') as HTMLInputElement;
          a.click();
      }
    }
  }
  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.p_order.length)
    this.totalLength= this.p_order.length;
  }
  fetchedDashboardData(res){
    if(res.success == true){
      this.p_order = res.pending_orders;
      this.totalLength = this.currentPage * this.itemsPerPage;
      if(this.totalLength > this.p_order.length)
      this.totalLength= this.p_order.length;
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
      this.totalLength = this.currentPage * this.itemsPerPage;
      if(this.totalLength > this.p_order.length)
      this.totalLength= this.p_order.length;
    }else{
      this.p_order = [];
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
    }
    
  }
  ngOnInit() {
    this.city_code = 3;
    this.type=1;
    this.pComponent.showLoader=2;
    this.dataLoaded=0;

    // this.apiCall.fetchDashboardData();
    
    this.apiCall.fetchDashboardData().subscribe(res=>this.fetchedDashboardData(res))
    
    this.croppedImage = "../../../../assets/icons/picture (1).svg";
    
    // // var c = document.getElementById('openoneServiceModal') as HTMLInputElement;
    // // c.click(); 
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
    //       var obj1 = {"code":JSON.stringify(this.addCity.length +1),"label":this.cityName};
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
  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {

        if (JSON.stringify(myArray[i].label) === JSON.stringify(nameKey)) {

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
  fs(){

  }
  openpicker(){
    var a = document.getElementById('fromDate') as HTMLInputElement;
    a.click();
  }
  addMultipleField(){

   
    var len = this.Services1.length -1;
  

    var a = document.getElementById('serviceName'+len) as HTMLInputElement;

    var b = document.getElementById('price'+len) as HTMLInputElement;

    if(a.value == ''){

    }else if(b.value == ''){

    }else{

      this.insertid =  Math.max.apply(Math, this.Services1.map(function(o) {
        return o.id; }))
        this.insertid = this.insertid +1;
      var obj = {
        "id":this.insertid,
        "name":"",
        "imageUrl": "../../../../assets/icons/picture (1).svg",
        "price":""
      }
      this.Services1.push(obj);

    }
  
  }
  popList(i){


    if(this.Services1.length == 1){

    }else{
      this.Services1 = this.Services1.filter(function( obj ) {
        return obj.id !== i;
    });
    }
  

  }
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }
  fileChangeEvent(event: any): void {
    this.filename = event.target.$$currentValue.slice(12, event.target.$$currentValue.length);
    this.cropimage =1;
    var file = event.target.files[0];

    this.photoName = file.name;
    var allowedExtensions = 
       ["jpg","jpeg","png","JPG","JPEG","JFIF","SVG"];
    this.fileExtension = this.photoName.split('.').pop();
    
    if(this.isInArray(allowedExtensions, this.fileExtension)) {
        this.fileExtensionError = false;
        this.showAlert=0;
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
        
        this.showAlert=1;
          // this.alertMessage = "Only photos allowed!!"
          this.fileExtensionError = true;
      }
  }
  imageCroppedBase64(image: string) {
    this.crop=1;
    this.croppedImage = image;
    this.file = this.dataURLtoFile(image,this.filename);

  }
  cropImage(){
    this.crop=0;
    this.cropimage=0;
  }
  RecropImage(){
    this.cropimage =1;
    this.crop=1;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {

  }
}
