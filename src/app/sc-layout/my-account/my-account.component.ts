import { DataService } from './../../shared/data.service';
import { SidebarComponent } from './../../shared/sidebar/sidebar.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from "../../shared/server.service";
import { ScLayoutComponent } from "../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { DataCentreComponent } from "../data-centre/data-centre.component";
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
let addFormData=new FormData();
@Component({
  providers: [DataCentreComponent],
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  city_label(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any): any {
    throw new Error("Method not implemented.");
  }
  //loader
  loaded :Promise<boolean>;
  loaded1 :Promise<boolean>;
  //loader
  @ViewChild('places') places: GooglePlaceDirective;
  filename: any;
  removeImageConfirm = false;
  status = 'ONLINE';
  searchText='';
  isConnected = true;
  cityLabelItem = '';
  selectedAllCityOptions = false;
  selectedAllServicesOptions = false;
  editForm: FormGroup;
  submitted = false;
  submittedd = false;
  updatefile: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChange = false; 
  cropped = false;
  editSubmit = false;
  editt = true;
  city_array:any=[];
  errormessage=0;
  addEvent = false;
  url;
  value=0;
  cropimage:number=1;
  imgCropped:any ='';
  type="password";
  typee="password";
  typeee="password";
showw=false;
shoow=false;
showww=false;
count=0;
leftOptions;
limiter = 3;
loading='0';
cropView = false;
dataLoaded:number=0;//loader
  x;y;
useradd;
  ediittForm: FormGroup;
  cl; 
  imgLoaded = false;
  userData: any;
  changes:number=0;
  anotherChange:number=0;
  pwdvalue=0;
  match;
  user_code=localStorage.getItem('user_code')
  file: File;
  allCities=[];
  selected_cities=[];
  user_type = localStorage.getItem('user_type');
  password: any;
  crop:number=0;
  fields: any;
  constructor(private formBuilder: FormBuilder,public server:ServerService,public parentComponent:ScLayoutComponent,public pComponent:DataCentreComponent,private connectionService: ConnectionService, public data: DataService) {
    this.editForm = this.formBuilder.group({
      Name: [''],
      Mobile: [''],
      email:[''],
      address:[''],
      city: [''],
      access:[''], 
    });
    this.parentComponent.showLoader=1;//loader
    this.server.fetch_specific_admin_details(this.user_code).subscribe(res =>{
      this.setAdmin(res);
    })
    //no internet connection
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
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
        
      }
    })
   }
   //no connection ends
  
  Gallery:any={}
  dataURLtoFile(dataurl, filename) {
   
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    // console.log(new File([u8arr], filename, {type:mime}));
    return new File([u8arr], filename, {type:mime});
  }
  Profile={
    "imageUrl": "../../../assets/icons/user (1).svg",
    "name":"samarthya",
    "Mobile":"7583083083",
    "EmailID":"sam@gmail.com",
    "address":"kotra road",
    "City":"0",
    } 



  ngOnInit() {
   
    
    
    this.ediittForm = this.formBuilder.group({
     
       password:['',Validators.required],
       oldpassword:['',Validators.required],
       confirm_password:['',Validators.required],
    });
    
    this.server.fetch_all_cities().subscribe(res=>this.fetchAllCities(res));
  }
  fetchAllCities(res){
    if(res.success ==  true){
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
  close(){
    this.searchText='';
  }

 //multiselect

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
  this.changes =1;
  this.changes =1;
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
  console.log();
  
}

City_remove(item){
  this.changes = 1;
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
  removeImage(){
    this.croppedImage = ''; 
    this.removeImageConfirm = true;
    this.croppedImage = '';
    this.cropped = false;
    this.croppedImage = 'assets/icons/user (1).svg';
    this.changes=1; 
    this.value=0;
    
    // addFormData=new FormData()
    // this.updatefile = this.dataURLtoFile(this.server.no_image_url,this.filename);
    // addFormData.append("assets/icons/user (1).svg", this.updatefile);
  } 



  public changeConfig() { // for google autocomplete places API
    this.places.options.componentRestrictions = new ComponentRestrictions({
        country: "IN"
    });

    this.places.reset();
  }

  removeExtraSpaces(string)
  { return string.replace(/\s{2,}/g, ' ');}

  
   setAdmin(res){
    // console.log(res);
    if(res.success==true)
    {
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;//loader
      this.Gallery=res.data;//loader
// this.sidebar.setSidebar(this.Gallery.name);
      if(this.Gallery.cities.length != 0){
        this.cityLabelItem='';
        for(let i=0;i<this.Gallery.cities.length-1;i++){
          this.cityLabelItem = this.cityLabelItem+this.Gallery.cities[i].label+', ';
        }
        this.cityLabelItem = this.cityLabelItem+this.Gallery.cities[this.Gallery.cities.length-1].label;
      }
      this.croppedImage = this.Gallery.profile_image_url;
      this.password = this.Gallery.password//image detail to edit
      this.editForm = this.formBuilder.group({
        Name: [this.Gallery.name, Validators.required],
        Mobile: [this.Gallery.mobile, Validators.required],
        email:[this.Gallery.email, Validators.email],
        address:[this.Gallery.address], 
        // city:[this.Gallery.city_label, Validators.required],
      });
    }
    else{
      this.loaded1 = res;
      }
  }
 
  get f() { return this.editForm.controls; }
  get f1() { return this.ediittForm.controls; }
  get f2() { return this.ediittForm.controls; }
 
  editValidation(value) {
    if(this.selected_cities.length == 0){
      this.errormessage = 1;
    }
    this.submitted = true;
   
    
    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    } 
else{
 
  

  
 //this.router.navigateByUrl('/login');

this.useradd='modal';
if(this.removeImageConfirm == true){
  this.file=this.dataURLtoFile(this.server.no_user_image,'image');
  addFormData.append("image", this.file);
}
else if(this.removeImageConfirm == false)
addFormData.append("image", this.file);
if(value.user == 0){
  this.city_array=[];
}  
  else{
    this.city_array=[];
 for(var i=0;i<this.selected_cities.length;i++){
   var obj = {code:this.selected_cities[i].code, label: this.selected_cities[i].label};
   this.city_array.push(obj);
 }
}
this.server.update_my_profile(value,addFormData,this.user_code,this.password,this.city_array).subscribe(res=>{
  this.response(res);
});
}
  //  this.editForm.reset();
}
dosomething(){
 
    this.loading='1';
}
response(res)
{  
 
  if(res.success==true)
  {
    addFormData=new FormData();
    
      this.data.changeName(res.data.name);
      this.data.changeImage(res.data.profile_image_url);
     
      localStorage.removeItem('user_name');
      localStorage.removeItem('image_url');
      localStorage.setItem('image_url',res.data.profile_image_url);
      localStorage.setItem('user_name',res.data.name);
      //this.sidebar.ngOnInit();
      this.server.fetch_specific_admin_details(this.user_code).subscribe(res =>{
      this.setAdmin(res);
      this.removeImageConfirm = false;
      this.city_array = [];
   }) 
   this.parentComponent.showAlert=1;
  }
  else{
   
    this.parentComponent.showAlert=3;
  }
  this.parentComponent.messageAlert = res.message;
  this.parentComponent.setNotificationTimer();
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
passwordShow1()
{
this.showww=!this.showww;
if(this.showww){
this.typeee="text";
}
else{
  this.typeee="password"
}
}
passwordShow2()
{
this.shoow=!this.shoow;
if(this.shoow){
this.typee="text";
}
else{
  this.typee="password"
}
}

addValidation(value) {
   
    
  this.submittedd = true;

  // stop here if form is invalid
  if (this.ediittForm.invalid) {
    
      return;
    
      
  }
else{
  this.useradd='modal';
   this.server.change_password(value,this.user_code).subscribe(res => {
     this.setPassword(res);
    
   })
//this.router.navigateByUrl('/login');

}
 

 //this.ediittForm.reset();
}

   
setPassword(res)
{
  if(res.success == true){
    
    this.parentComponent.showAlert = 1;
    this.ediittForm.reset();
  }else{
    this.parentComponent.showAlert = 3;
  }
 this.parentComponent.messageAlert= res.message;
 this.parentComponent.setNotificationTimer();
  
}
editChanged() {
  this.editSubmit = true;
} 
notChanged(){
  this.editSubmit = false;
}
fileChangeEvent(event: any): void {
  this.filename = event.target.value.slice(12, event.target.value.length);
 
  this.changes=1;
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
this.cropped = false;
this.fileChange = true
}
editcancelImage(){
  this.imgCropped = "";
  this.crop=0;
  this.cropimage=3;
}
imageCropped(image: string) {
  this.croppedImage = image;
  this.file = this.dataURLtoFile(image,this.filename);
 
}
imageLoaded() {
this.croppedImage;
  // show cropper
}
loadImageFailed() {
  // show message
}
changeValue(event){
  this.changes=1;
 
}
jj(event){
 

  var fields = event.target.value.split(',');
  
  this.city_label = fields[0];
}
func(event){
  this.changes=1;
}
terminate(image)
{
  this.submittedd = false;
  this.cropped = false;
  this.croppedImage = false;
  this.fileChange=false;
  this.changes=0;
  this.anotherChange=0;
  this.removeImageConfirm = false;
  this.value=0;
}
terminatee()
{
  this.submittedd = false;
 this.ediittForm.reset();
}

abc(event){
  
 this.match=event;
//  console.log(this.match);
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
editdata(){
  this.server.fetch_specific_admin_details(this.user_code).subscribe(res =>{
    this.setAdmin(res);
  })
}
}
