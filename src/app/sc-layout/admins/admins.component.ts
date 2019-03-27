import { Component, OnInit,ViewChild  } from '@angular/core';
import {ExcelService} from './excel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../../shared/server.service';
import { ScLayoutComponent } from "../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
let addFormData=new FormData();
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
}) 
export class AdminsComponent implements OnInit {
  filename: any;
  // file(arg0: any, arg1: any): any {
  //   throw new Error("Method not implemented.");
  // }
  // file(arg0: any, arg1: any): any {
  //   throw new Error("Method not implemented.");
  // }
  @ViewChild('places') places: GooglePlaceDirective;
  cropper:number=0;
  removeImageConfirm = false;
  status ='ONLINE';
  isConnected = true;
  errormessage =0;
  city_label: any;
  initial;initial1;
  registerForm: FormGroup;
  useradd;

  changes:number=0;
  loaded :Promise<boolean>;
  loaded1 :Promise<boolean>;
  submitted = false;
  pswdMessage:number=0;
  password;
  updatefile: File;
  password1;
  password2;
  type="password";
  typee="password";
  show=1;
  loading='0';
  Customers=[];
  url = '';
  userData: any;
  error=0;
  pwdvalue=0; 
value=0;
  match;
  dataLoaded:number=0;
  max:number; max1:number;
  currentPage =1;
  currentPage1 =1;
  itemsPerPage =10;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChange = false; 
  cropped = true;
  editSubmit = false;
  editt = true;
  addEvent = false;
  filteredCustomerData=[];
  cl; // inital and final page numbers
  imgLoaded = false;
  file: File;
  showw=false;
  

  user_code=localStorage.getItem('user_code')
  city_code=localStorage.getItem('city_code')
  
  Gallery: any[]=[
    {
      "name":"Customer",
      "type": "User Type",
      "joinedOn":"23 Aug 2018",
      "Mobile":"7583083083",
      "City":"Bengaluru",
      "EmailID":"adam@gmail.com",
    }
  ]
  currentCity="all_cities";
  cities = [
    {
      "code":1,
      "label":"Bangalore",
      "selected":false
    },
    {
      "code":2,
      "label":"Sivasagar",
      "selected":false
    },
    {
      "code":3,
      "label":"raigarh",
      "selected":false
    }
  ];   
 

  

  constructor(private excelService:ExcelService,private formBuilder: FormBuilder,private server: ServerService,public parentComponent:ScLayoutComponent,private connectionService: ConnectionService) {
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
                           
      if (this.isConnected) {
        this.status = "ONLINE";
      }  
      else {
        this.status = "OFFLINE";
      } 
    })
    this.parentComponent.showLoader=1;
   }

  ngOnInit() {
    this.server.fetch_all_Admin().subscribe(res =>{
      this.setAdmin(res);
        
    });
    this.filteredCustomerData= this.Customers;

    this.server.fetch_all_cities().subscribe(res=>this.fetchAllCities(res));
  //   this.server.add_Admin(formvalue,cities).subscribe(res => {
  //     this.setAdmins(res);
  // }); 
  
 
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Mobile: ['', Validators.required],
      email:['', Validators.email],
      // city:['', Validators.required],
      address:[''],
      user:[1],
      access:[''], 
      password:['', Validators.required],
      confirm_password:['',Validators.required]
    });  
    this.Customers= [];
    
    
  }
  
  removeImage(){
    this.croppedImage = '';
    this.croppedImage = '';
    this.cropped = false;
    this.croppedImage = 'assets/icons/user (1).svg';
    this.changes=1;
    this.removeImageConfirm = true;
    this.value=0;
    // addFormData=new FormData()
    // this.updatefile = this.dataURLtoFile(this.server.no_image_url,this.filename);
    // addFormData.append("service_icon", this.updatefile);
  }
  dosomething(){
      this.loading='1';
  }
 
  
  jj(event){
    var fields = event.target.value.split(',');
    this.city_label = fields[0];
  }
  setAdmin(res){
    if(res.success == true)
    {
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;
      this.removeImageConfirm = false;
      this.Customers=res.data;

    //   this.totalLength = this.currentPage * this.itemsPerPage;
    // if(this.totalLength > this.CityCard.length)
    // this.totalLength= this.CityCard.length;



      this.filteredCustomerData= this.Customers;
      this.max = this.currentPage * this.itemsPerPage;
      if(this.max > this.filteredCustomerData.length)
      this.max= this.filteredCustomerData.length;
      this.max1 = this.currentPage1 * this.itemsPerPage;
      if(this.max1 > this.filteredCustomerData.length)
      this.max1= this.filteredCustomerData.length;
    }
    
    else{
      this.Customers=[];
    }
  }

  setCities(res){
    
    if(res.success == true){
      this.cities= res.data;
    }
    else{
    }
  }
  setAdmins(res)
  {

  }  
//active toggle
listView = true;
gridView= false;
changelistView(){
  this.listView = true;
  this.gridView = false;
}
changegridView(){
  this.listView = false;
  this.gridView = true;
}  
//active ends
changed(event){
  this.currentPage= parseInt(event);
  this.max = this.currentPage * this.itemsPerPage;
  if(this.max > this.Customers.length)//filteredCustomerData
  this.max= this.Customers.length;//filteredCustomerData
}
changed1(event){
  this.currentPage1= parseInt(event);
  this.max1 = this.currentPage1 * this.itemsPerPage;
  if(this.max1 > this.filteredCustomerData.length)
  this.max1= this.filteredCustomerData.length;
}


cities2 = [
  {id: 1, name: 'Vilnius'}, 
  {id: 2, name: 'Kaunas'},
  {id: 3, name: 'Pavilnys', disabled: true},
  {id: 4, name: 'Pabradė'},
  {id: 5, name: 'Klaipėda'}
];
  get f() { return this.registerForm.controls; }
  abc(event){
   this.match=event;
  }
  cad(event){
    if(this.match==event){
      this.pwdvalue=0;
  }
  else{
    this.pwdvalue=1;
  }
}
aaa(event)
{
  this.pwdvalue=0;
}

terminate(image)
{
  this.submitted = false;
  this.cropped = false;
  this.croppedImage = false;
  this.fileChange=false; 
  this.registerForm.reset();
  this.errormessage = 0;
  this.value=0;

 
}

city_array:any=[];
dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }



  return new File([u8arr], filename, {type:mime});
}
addAdmin(value) {
    
    if(this.selected_cities.length == 0){
      this.errormessage = 1;
      
    } 
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    } 
else{
  if(this.removeImageConfirm == false)
  addFormData.append("image", this.file);
  else if(this.removeImageConfirm == true){
  this.file= this.dataURLtoFile(this.server.no_user_image,'no_image'); 
  addFormData.append("image", this.file);  
  }

  //this.router.navigateByUrl('/login');
 this.useradd='modal';
 if(value.user == 0){
   this.city_array=[];
 }  
   else{
  for(var i=0;i<this.selected_cities.length;i++){
    var obj = {code:this.selected_cities[i].code};
    this.city_array.push(obj);
  }
 } 
 this.server.add_Admin(value,addFormData,this.city_array,this.city_label).subscribe(res=>this.response(res))
 
}
  //  this.registerForm.reset();
 
}
response(res){
  if(res.success==true)
  {
    this.registerForm.reset();
    this.submitted = false;
    this.errormessage = 0;
  this.server.fetch_all_Admin().subscribe(res =>{
    this.setAdmin(res);
  })
  this.parentComponent.showAlert=1;
}
else{
  this.parentComponent.showAlert=3;
}
this.parentComponent.messageAlert = res.message;
this.parentComponent.setNotificationTimer();
  }


cc(res){
} 
togggleButton()
{
  this.show=2;
}
togggleButton1()
{
  this.show=1;
} 
keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
} 
//filter city
code=[];
filterByCity(event){
  // this.code=[];
  if(event == '0'){
    this.server.fetch_all_Admin().subscribe(res =>{
      this.setAdmin(res);
    }) 
  }
  else{
  
    // this.code.push(event.target.value);
    // this.code=[];
    // this.code.push(JSON.parse(event));
  
    this.server.fetch_all_Admin_cityWise(event).subscribe(res =>{
      this.setAdmin(res);
  })
}
  // let searchText = event.target.value.toLowerCase();
  // this.currentCity= searchText;
  // this.Customers =  this.Customers.filter( it => {

  //  // return it.City.toString().toLowerCase().includes(searchText);
  // });

  // if(searchText == 'all_cities'){
  //   this.Customers = this.Customers;
  // }
  // for fetching customers city wise
  // this.server.fetch_all_customer_city_wise(event).subscribe(res =>{
    //   this.customerData = res;
    // })
}
//end filter city



//image preview

//end image preview
/*allowDrop(ev) {
ev.preventDefault();
}

drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}

drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");
ev.target.appendChild(document.getElementById(data));
}*/
//export to excel

// exportAsXLSX():void {
//     this.excelService.exportAsExcelFile(this.Customers, 'sample');
//   }
     

editChanged() {
  this.editSubmit = true;
}
notChanged(){
  this.editSubmit = false;
}
  //export ends
  //pagination
  p: number = 1;
  //pag ends
  fileChangeEvent(event: any): void {
    this.filename = event.target.value.slice(12, event.target.value.length);
    this.imageChangedEvent = event;
    this.readUrl(event);
    this.editChanged();
    this.fileChange = true;
   this.changeCropView();
  }
  readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
  
    reader.onload = (event: ProgressEvent) => {
      this.url = (<FileReader>event.target).result;
      this.imgLoaded=true;
    }
    
    
    reader.readAsDataURL(event.target.files[0]);
  }
  }
  updateLoaded() {
  this.cl = 'modal';
  this.fileChange = false;
  this.croppedImage = this.userData.profile_image_url;
  this.imageChangedEvent = '';
  this.notChanged();
  this.cancelEddit();
  }
  setEddit() {
  this.editt = true;
  }
  cancelEddit(){
  this.editt =false;
  }
  changeCropView(){
  this.cropped = true;
  this.value=1;
  }
  cancelCropView() {
  // this.cropped = false;
  // this.cropper=1;
  this.cropped = false;
  this.fileChange = true
   
  }

  

  public changeConfig() { // for google autocomplete places API
    this.places.options.componentRestrictions = new ComponentRestrictions({
        country: "IN"
    });

    this.places.reset();
  }

  

validatemobile(event)
{
  event = (event) ? event : window.event;
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}


  imageCropped(image: string) {
    this.croppedImage = image;
    this.file = this.dataURLtoFile(image,this.filename);
  }
  imageLoaded() {
  this.croppedImage;
    // show cropper
  }
  cropCancelled(){
    this.cropped = false;
    this.croppedImage = '';
    // this.tempCity = '';
  }
  passwordShow()
  {
  this.showw=!this.showw;
  if(this.showw){
  this.type="text";
  }
  else{
    this.type="password"
  }
}
passwordShoww()
{
this.showw=!this.showw;
if(this.showw){
this.typee="text";
}
else{
  this.typee="password"
}
}
  loadImageFailed() {
    // show message
  }
  exportAsXLSX(searchText) {
    let temp;
    if(!searchText)
    temp = this.filteredCustomerData;
    else {
      searchText = searchText.toString().toLowerCase();
      temp = this.filteredCustomerData.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(searchText);
    });
    }
    temp.forEach(function(v){ 
      delete v.code;
      delete v.address;
     
      delete v.city_code;
      delete v.modified;
      delete v.created_by;
      delete v.status;
     });
     this.excelService.exportAsExcelFile(temp, 'data');
  }
  searchText='';
  selected_cities=[];
  selected_services=[];
  count=0;
  servicearray=[];
  cityArray=[];
  limiter = 3;
  leftOptions;
  allSelected=false;
  selectedAllCityOptions = false;
  allCities=[]
  close(){
    this.searchText='';
  }

  selectAllCities() {
    if(this.selectedAllCityOptions == false){
     for(let i= 0;i<this.allCities.length;i++){
         if(this.allCities[i].selected == false){
             this.selected_cities[this.count]=this.allCities[i];
             this.count+=1;
             this.allCities[i].selected=true;
         }
     }
     
     
     this.selectedAllCityOptions= true;
     if(this.selected_cities.length == 0){
      this.errormessage=1;
    }else{
     this.errormessage=0;
    }
      }
      else{   
        this.selected_cities.splice(0,this.selected_cities.length);
        for(let i= 0;i<this.allCities.length;i++){
            this.allCities[i].selected = false;
            this.count--;
        }
        this.selectedAllCityOptions= false;
        if(this.selected_cities.length == 0){
          this.errormessage=1;
        }else{
         this.errormessage=0;
        }
      }
      if(this.selected_cities.length > this.limiter-1)
      this.leftOptions= this.selected_cities.length - this.limiter;
      else{
        this.leftOptions = 0;
      }
  }
  Cityselec(item){
    let flag=false;
    if(item.selected == false){
    for(let i=0;i<this.allCities.length;i++){
        if(this.allCities[i].code == item.code){
            this.allCities[i].selected= true;
            break;
        }
    }
    for(let i=0;i< this.count;i++)
    {
        if(item.code == this.selected_cities[i].code)
        flag=true;
    }
    if(flag == false){
        this.selected_cities[this.count]=item;
        this.count+=1;
    }
    if(this.selected_cities.length == this.allCities.length){
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = true;
      this.selectedAllCityOptions = true;
    }
    }
    else{
    for(let i=0;i<this.allCities.length;i++){
    if(this.allCities[i].code == item.code){
        this.allCities[i].selected= false;
        }
    }
    for(let i=0;i< this.count;i++)
    {
        if(item.code == this.selected_cities[i].code)
        {
            this.selected_cities.splice(i,1);
            this.count-=1;
        }
    }
    if(this.selected_cities.length == this.allCities.length){
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = true;
      this.selectedAllCityOptions = true;
    }else{
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = false;
      this.selectedAllCityOptions = false;
    }
    }
    if(this.selected_cities.length > this.limiter-1)
    this.leftOptions= this.selected_cities.length - this.limiter;
    else{
        this.leftOptions=0;
    }
    if(this.selected_cities.length ==0){
      this.errormessage=1
    }else{
      this.errormessage=0;
    }
  }
  
  City_remove(item){
    for(let i=0;i<this.allCities.length;i++){
     if(this.allCities[i].code == item.code){
      this.allCities[i].selected= false;
     }
     }
     for(let i=0;i< this.count;i++)
     {
         if(item.code == this.selected_cities[i].code)
         {
             this.selected_cities.splice(i,1);
             this.count--;
         }
     }
     if(this.selected_cities.length == this.allCities.length){
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = true;
      this.selectedAllCityOptions = true;
    }else{
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = false;
      this.selectedAllCityOptions = false;
    }
  }
  fetchAllCities(res){
   
    if(res.success ==  true){
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;;
      this.allCities = res.data;
      this.allCities = this.allCities.map(function(el) {
        var o = Object.assign({}, el);
        o.selected = false;
        return o;
      })
    }else{
      // this.allCities = res.data;
    }
  } 
  choose_type:number=0;
  chooseUserType(event){
    // this.choose_type=event;
    if(event == 0){
      this.choose_type=1;
    }else if(event == 1){
      this.choose_type=0;
    }
  }
} 
