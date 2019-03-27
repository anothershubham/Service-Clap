import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../../../shared/server.service';
import { Router } from '@angular/router';
import { ScLayoutComponent } from "../../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
let addFormData=new FormData();
@Component({
  selector: 'app-a-details',
  templateUrl: './a-details.component.html',
  styleUrls: ['./a-details.component.css'],
 
})
export class ADetailsComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  loaded :Promise<boolean>;
  loaded1 :Promise<boolean>;
  filename: any;
  value=1;
  user_name = localStorage.getItem('user_name')
  status ='ONLINE';
  removeImageConfirm = false;
  isConnected = true;
  loading='0';
  id; 
  userData: any;
  updatefile: File;
  type="password"; 
  showw=false;
  editForm: FormGroup;
//editForm:FormGroup;
  submitted = false;
  pswdMessage:number=0;
  password1;
  password2;
  pwdvalue=0;
  match;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileChange = false;  
  cropped = true;
  editSubmit = false;
  editt = true;
  addEvent = false;
  url;
  cl;
  dataLoaded:number=0;
  changes:number=0;
  anotherChange:number=0;
  max; inital; // inital and final page numbers
  imgLoaded = false;
  delcode: any;
  code: any;
  file: File;
  useradd;
  user_code=localStorage.getItem('user_code')
  editcode: any;
  city_label: any;
  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private server : ServerService,public parentComponent:ScLayoutComponent,private connectionService: ConnectionService) {
    this.parentComponent.showLoader=1;
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
    this.route.params.subscribe( params => {
      this.id= params.id;
      
    })
    let temp={ customer_code: this.code};
    this.editForm = this.formBuilder.group({
      Name: [''],
      Mobile: [''],
      email:[''],
      user:[''],
      access:[''], 
      address:[''], 
      password:[''],
      confirm_password:[''],
});

   } 
   selected_cities=[];
   selected_services=[];
   count=0;
   servicearray=[];
   cityArray=[];
   limiter = 3;
   leftOptions;
   allSelected=false;
   selectedAllCityOptions = false;
   ngOnInit() {

    this.server.fetch_specific_admin_details(this.id).subscribe(res => {
      this.setadminDetails(res);
    }) 
                                                               
    for(var i=0;i<this.Customers.length;i++)
    { 
    if(this.id==this.Customers[i].code){
    this.userData=this.Customers[i];
     }
    }
   }
   all_cities:string='';
   user_type_value:number;
   fetchAllCities(res){
    if(res.success ==  true){
      for(var i=0;i<res.data.length;i++){
        var a = this.array_city.includes(res.data[i].code);
       
        if(a == false){
          var obj1 ={code:res.data[i].code,label:res.data[i].city_label,selected:false};
        }else{
          var obj1 ={code:res.data[i].code,label:res.data[i].city_label,selected:true};
        }
        this.allCities.push(obj1);
      }
    }else{
      this.allCities = []; 
    }
  }
  jj(event){
    var fields = event.target.value.split(',');
    this.city_label = fields[0];
  }
  dosomething(){
      this.loading='1';
  }
   setadminDetails(res)
   {
     if(res.success == true){
      this.parentComponent.showLoader=0;
      this.dataLoaded=1;
      this.allCities=[];
      this.server.fetch_all_cities().subscribe(res=>this.fetchAllCities(res));
      this.Customers = res.data;//userData
      this.user_type_value = this.Customers.user_type;
      this.croppedImage = this.Customers.profile_image_url;
      this.editForm = this.formBuilder.group({
        Name: [this.Customers.name, Validators.required],
        Mobile: [this.Customers.mobile, Validators.required],
        email:[this.Customers.email, Validators.email],
        // city:[this.Customers.city_label, Validators.required],
        user:[this.Customers.user_type, Validators.required],
        access:[''], 
        address:[this.Customers.address, Validators.required], 
        password:[this.Customers.password,Validators.required]
  });  
this.city_label = this.Customers.city_label;
this.all_cities="";
  if(res.data.cities.length > 0){
    for(let i=0;i<res.data.cities.length-1;i++){
      this.all_cities = this.all_cities+res.data.cities[i].label+',';
    }
    this.all_cities = this.all_cities+res.data.cities[res.data.cities.length-1].label;
  }
  this.selected_cities=[];
  for(var i=0;i<res.data.cities.length;i++){
    this.array_city.push(res.data.cities[i].code);
    var obj1 ={code:res.data.cities[i].code,label:res.data.cities[i].label,selected:true}
    this.selected_cities.push(obj1);
  }

  this.count = this.selected_cities.length;
   }

  }
   get f() { return this.editForm.controls; }
  abc(event){
   this.match=event;
  }
  array_city=[];
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
 
removeImage(){
  this.croppedImage = '';
  this.croppedImage = '';
  this.cropped = false;
  this.removeImageConfirm = true;
  this.croppedImage = 'assets/images/user (1).svg';
  this.changes=1;
  this.value=0;
}


terminate(image)
{
  this.server.fetch_specific_admin_details(this.id).subscribe(res => {
    this.setadminDetails(res);
  }) 
  this.submitted = false;
  this.cropped = false;
  this.croppedImage = false;
  this.fileChange=false; 
  this.changes=0;
  this.anotherChange=0; 
  this.removeImageConfirm = false;
  this.value=1;
  
}
editFunc(code){
  this.showw = false;
  this.type = 'password';
  this.editcode = code;
  this.cropped = false;
  this.value =0;
  console.log(this.selected_cities);
  this.count = this.selected_cities.length;
  console.log("g"+this.count);
  // this.server.fetch_specific_admin_details(this.id).subscribe(res => {
  //   this.setadminDetails(res);
  // })

}
editdata(){
  console.log(this.selected_cities);
  this.count = this.selected_cities.length;
  console.log("g"+this.count);
  // this.server.fetch_specific_admin_details(this.id).subscribe(res => {
  //   this.setadminDetails(res);
  // }) 
}

newarray:any=[];
  loginValidation(value) {
    this.submitted = true;
    this.newarray=[];
    if (this.editForm.invalid) {
        return;  
    }
    if(value.user == 1){
      if(this.selected_cities.length == 0){
        this.y=1;
      }else{
        this.useradd='modal';
        if(this.removeImageConfirm == false)
        addFormData.append("image", this.file);
        else if(this.removeImageConfirm = true)
        {
          this.file=this.dataURLtoFile(this.server.no_user_image,'no_image');
        addFormData.append("image", this.file);
        }
        for(var i=0;i<this.selected_cities.length;i++){
          var newobj = {code:this.selected_cities[i].code};
          this.newarray.push(newobj);
        }
            this.server.update_my_account(value,addFormData,this.editcode,this.newarray,this.city_label).subscribe(res=>this.response(res))
      }
    }
    else{
    this.selected_cities=[];
    if(this.removeImageConfirm == false)
    addFormData.append("image", this.file);
    else if(this.removeImageConfirm = true)
    {
      this.file=this.dataURLtoFile(this.server.no_user_image,'no_image');
      addFormData.append("image", this.file);
    } 
    this.useradd='modal';
    this.server.update_my_account(value,addFormData,this.editcode,this.selected_cities,this.city_label).subscribe(res=>this.response(res))
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
response(res)
{
  if(res.success==true)
  {
    this.removeImageConfirm = false;
    addFormData=new FormData()
    this.parentComponent.showAlert=1;
    this.server.fetch_specific_admin_details(this.id).subscribe(res => {
      this.setadminDetails(res);
    })
  }
    else{
      this.parentComponent.showAlert=3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
  }
//disable on edit
changeValue(event){
  this.changes=1;
}
func(event){
  this.changes=1;
}
//disable ends
   
editChanged() {
  this.editSubmit = true;
}
notChanged(){
  this.editSubmit = false;
}
allCities=[]
Customer={
  "code": 2,
  //"imageUrl": "../../../assets/icons/user (1).svg",
  "Customer":"Samarthya",
  "UserType": "0",
  "joinedOn":"23 Aug 2018",
  "Mobile":"7583083083",
  "City":"2",
  "EmailID":"sam@gmail.com",
   "password":"123",
   "confirm_password":"123",
   "access":"1",
  } 
  
  Customers:any={

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


  delete(code){
    this.delcode = code;
  }
  deleteAdmin(){
    this.server.delete_Admin(this.delcode).subscribe(res => {
      this.responseDelete(res);
    })
    // this.Customers.splice(0,this.delcode);
  
  }
  responseDelete(res){
    if(res.success== true){
      this.parentComponent.showAlert=1;
      this.router.navigate(['/admin']); 
    
    }
    else{
      this.parentComponent.showAlert=3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
    }
  
   
 
  //eye show
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
//eye show
// fileChangeEvent(event: any): void {
//   this.filename = event.target.value.slice(12, event.target.value.length);
//   this.imageChangedEvent = event;
//   this.readUrl(event);
//   this.editChanged();
//   this.fileChange = true;
//   this.changeCropView();
// }
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
// this.cropped = false;
this.cropped = false;
    this.fileChange = true
}
// imageCropped(image: string) {
//   this.croppedImage = image;
// }
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
y;
selectAllCities() {
  this.changes=1;
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
    this.y=1;
  }else{
   this.y=0;
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
        this.y=1;
      }else{
       this.y=0;
      }
    }
    if(this.selected_cities.length > this.limiter-1)
    this.leftOptions= this.selected_cities.length - this.limiter;
    else{
      this.leftOptions = 0;
    }
}
Cityselec(item){
  this.changes=1;
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
    this.y=1;
  }else{
    this.y=0;
  }
  console.log(this.selected_cities);
}
searchText='';
close(){
  this.searchText='';
}
City_remove(item){
  this.changes=1;
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
   console.log(this.selected_cities);
   if(this.selected_cities.length == this.allCities.length){
      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = true;
      this.selectedAllCityOptions = true;
    }else{

      var a = document.getElementById('selectAllCities') as HTMLInputElement;
      a.checked = false;
      this.selectedAllCityOptions = false;
    }
  //  if(this.selected_cities.length == 0)
  //  {selected_cities.length == 0)
  //  {
  //   this.y=1
  // }else{
  //   this.y=0;
  // }
} 
chooseUserType(event){
  // this.choose_type=event;
  if(event == 0){
    this.user_type_value=0;
  }else if(event == 1){
    this.user_type_value=1;
  }
}
}