import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServerService } from '../../../shared/server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../../../shared/excel.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ScLayoutComponent } from '../../sc-layout.component';

@Component({
  selector: 'app-c-details',
  templateUrl: './c-details.component.html',
  styleUrls: ['./c-details.component.css']
})
export class CDetailsComponent implements OnInit {
  code;
  searchText;
  p;
  date = new Date();
  total=0;completed=0;cancelled=0;going_on=0;assigned=0;requested=0;
  completedStatus=false;cancelledStatus=false;goingOnStatus=false;totalStatus=true;
  assignedStatus = false; requestedStatus = false;
  currentPage =1;
  max;
  loaded:Promise<boolean>;
  loaded1:Promise<boolean>;
  url;
  imgLoaded;
  removeImageConfirm = false;
  loading='0';
  loading1='0';
  loading2='0';
  fileImageChanged = false;
  initial;
  profileForm;
  finalCroppedImage = '';
  showEditModal = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropView = false;
  cropped = false;
  cities = [];
  file;
  filename;
  customerData={ code: null, name: '',mobile: '', address: '',profile_image_url: '', email: '', created: this.date,modified: this.date, created_by: '',status: null};
  filteredOrders=[];
  orders=[];
  status = 'ONLINE';
  isConnected = true;
  newcode: any;
 addCity: any[] = []
  doSomething($event){
  }
  constructor(private server: ServerService, private route: ActivatedRoute, private excel: ExcelService, private parentComponent: ScLayoutComponent, private connectionService: ConnectionService, private router: Router) {
    this.route.params.subscribe( params => {
      this.ngOnInit();
    });
   }
   setCustomerDetails(res){
    this.parentComponent.showLoader = 0;
     if(res.success == true){
      this.customerData= res.customer_data;
      this.orders =res.total_order;
      this.filteredOrders = this.orders;
      this.calculate();
      this.max = this.currentPage * 10;
      if(this.max > this.filteredOrders.length)
      this.max= this.filteredOrders.length;
      this.initial = ((this.currentPage-1) * 10)+1;
      if(this.initial> this.max)
      this.initial = this.max;
     }
     else{
      this.router.navigate(['/customer']);
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
     }
    this.loaded=res;
    this.parentComponent.setNotificationTimer();
   }
   dosomething1(){
      this.loading1='1';
  }
  dosomething2(){
      this.loading2='1';
  }
   setCity(res){
     if(res.success == true){
       this.cities = res.data;
     }
     else{
     }
    this.loaded1 = res;
   }
  ngOnInit() {
    this.parentComponent.showLoader = 1;
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.isConnected = true;
        this.parentComponent.showLoader = 1;
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
        this.status = "ONLINE";
        this.parentComponent.showAlert=0;
      }
      else {
        this.status = "OFFLINE";
        this.parentComponent.showAlert=4;
      }
    })
        this.route.params.subscribe( params => {
          this.code= params.id;
        });
        let temp={ customer_code: this.code};
      this.server.fetch_all_cities().subscribe(res =>{
        this.setCity(res);
        this.server.fetch_specific_customer_details(temp).subscribe(res =>{
          this.setCustomerDetails(res);
        });
      });
    
    this.profileForm = new FormGroup({
      name: new FormControl(this.customerData.name, [
        Validators.required
      ]),
      mobile: new FormControl(this.customerData.mobile, [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      email: new FormControl(this.customerData.email),
      address: new FormControl(this.customerData.address),
    });
  const emailField = this.profileForm.get('email');
  emailField.valueChanges
  .forEach(email => {
    if (!email) {
      emailField.setValidators([]);
    } else {
      emailField.setValidators([Validators.email]);
    }
  });

  }
  removeExtraSpaces(string)
  { return string.replace(/\s{2,}/g, ' ');}
  validatemobile(event)
  {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;  
    }
    return true;
  }
  display_total(){
    this.filteredOrders=[];
    this.filteredOrders= this.orders;
    this.completedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=true;
    this.assignedStatus=false; this.requestedStatus = false;
    this.pageCalculate();
  }
  display_assigned(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].status == 1){
        this.filteredOrders[count++]=this.orders[i];
      }
    }
    this.completedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false; this.assignedStatus = true; this.requestedStatus = false;
    this.pageCalculate();
  }
  display_requested(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].status == 0){
        this.filteredOrders[count++]=this.orders[i];
      }
    }
    this.completedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false; this.assignedStatus = false;this.requestedStatus = true;
    this.pageCalculate();
  }
  display_completed(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].status == 3){
        this.filteredOrders[count++]=this.orders[i];
      }
    }
    this.completedStatus=true;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false;this.assignedStatus = false;this.requestedStatus = false;
    this.pageCalculate();
  }
  display_cancelled(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].status == 4){
        this.filteredOrders[count++]=this.orders[i];
      }
    }
    this.completedStatus=false;this.cancelledStatus=true;this.goingOnStatus=false;this.totalStatus=false; this.assignedStatus= false; this.requestedStatus= false;
    this.pageCalculate();
  }
  display_going_on(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.orders.length;i++){
      if(this.orders[i].status == 2){
        this.filteredOrders[count++]=this.orders[i];
      }
    }
    this.completedStatus=false;this.cancelledStatus=false;this.goingOnStatus=true;this.totalStatus=false; this.assignedStatus= false;this.requestedStatus= false;
    this.pageCalculate();
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.pageCalculate();
  }
  calculate(){
    this.total=this.filteredOrders.length;
    this.completed=0;this.cancelled=0;this.going_on=0; this.assigned = 0; this.requested=0;
    for(let i =0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].status == 4)
      this.cancelled++;
      if(this.filteredOrders[i].status == 3)
      this.completed++;
      if(this.filteredOrders[i].status  == 2)
      this.going_on++;
      if(this.filteredOrders[i].status  == 1)
      this.assigned++;
      if(this.filteredOrders[i].status  == 0)
      this.requested++;
    }
}
pageCalculate() {
  this.max = this.currentPage * 10;
  if(this.max > this.filteredOrders.length)
  this.max= this.filteredOrders.length;
  this.initial = ((this.currentPage-1) * 10)+1;
  if(this.initial> this.max)
  this.initial = this.max;
}
dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
dosomething(){
    this.loading='1';
}
updateCustomer(profileForm){
  if(profileForm.dirty == true || this.fileImageChanged == true){
  this.showEditModal = false;
  let form = new FormData();
  if(this.removeImageConfirm == false)
  form.append("image", this.file);
  if(this.removeImageConfirm == true)
  {
    let img = this.dataURLtoFile(this.server.no_user_image,'no_image');
    form.append("image",img);
  }
  profileForm.value.name = this.removeExtraSpaces(profileForm.value.name);
  profileForm.value.email = this.removeExtraSpaces(profileForm.value.email);
  profileForm.value.address = this.removeExtraSpaces(profileForm.value.address);
  profileForm.value.name = this.totitlecase(profileForm.value.name);
  profileForm.value.address = this.totitlecase(profileForm.value.address);
  profileForm.value.email = profileForm.value.email.toLowerCase();
    let temp={ "name": profileForm.value.name,"mobile": profileForm.value.mobile,"email":profileForm.value.email, "address": profileForm.value.address, customer_code: parseInt(this.code)};
    
  this.server.update_customer_details(temp,form).subscribe( res => {
    this.updateCustomerDet(res);
  })
  let dom = document.getElementsByClassName('modal-backdrop fade show');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
    let pushRightClass='modal-open';
    let dom1 = document.querySelector('body');
    dom1.classList.toggle(pushRightClass);
    dom1.removeAttribute('style');
  this.finalCroppedImage = '';
  this.croppedImage = '';
  }
  else{
    this.showEditModal = false;
    this.parentComponent.showAlert =1;
    this.parentComponent.messageAlert="No Changes Made";
    let dom = document.getElementsByClassName('modal-backdrop fade show');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
    let pushRightClass='modal-open';
    let dom1 = document.querySelector('body');
    dom1.classList.toggle(pushRightClass);
    dom1.removeAttribute('style');
    this.finalCroppedImage = '';
    this.croppedImage = '';
  }
  this.parentComponent.setNotificationTimer();
}
totitlecase(str){
  let strSplit= str.split(' ');
  for(let i=0;i<strSplit.length;i++){
    strSplit[i]=strSplit[i].charAt(0).toUpperCase()+strSplit[i].slice(1);
  }
  return strSplit.join(' ');
}
updateCustomerDet(res){
  if(res.success == true){
  this.cancelCropView();
  let temp={ customer_code: this.code};
      this.server.fetch_specific_customer_details(temp).subscribe(res =>{
        this.setCustomerDetails(res);
      });
  this.parentComponent.showAlert =1;
  this.parentComponent.messageAlert=res.message;
}
  else{
  this.parentComponent.showAlert =3;
  this.parentComponent.messageAlert=res.message;
  }
  this.parentComponent.setNotificationTimer();
}
exportToXLSX() {
  let temp= this.filteredOrders;
    let temp2=[];
    for(let x =0; x < temp.length;x++) {
      let temp1= {"Order_ID": null,'Customer_Mobile':'',"Partner":'',"Service":'',"Created": ''};
      if(temp[x].order_id)
      temp1.Order_ID=temp[x].order_id;
      if(temp[x].order_date)
      temp1.Created=temp[x].order_date;
      if(temp[x].mobile)
      temp1.Customer_Mobile=temp[x].mobile;
      if(temp[x].partner)
      temp1.Partner=temp[x].partner;
      temp2.push(temp1);
    }
    this.excel.exportAsExcelFile(temp2, 'data');
}
fileChangeEvent(event: any): void {
  this.filename = event.target.value.slice(12, event.target.value.length);
  this. imageChangedEvent = event;
  this.showCropView();
  this.readUrl(event);
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
openEditModal() {
  this.showEditModal = true;
  this.profileForm = new FormGroup({
    name: new FormControl(this.customerData.name, [
      Validators.required
    ]),
    mobile: new FormControl(this.customerData.mobile, [
      Validators.required, 
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),
    email: new FormControl(this.customerData.email),
    address: new FormControl(this.customerData.address),
  });
}
showCropView(){
  this.cropView = true;
}
removeImage(){
  this.removeImageConfirm = true;
  this.fileImageChanged = true;
  this.finalCroppedImage = '';
  this.croppedImage = '';
  this.cropped = false;
}
cancelCropper() {
  this.cropView = false;
  this.croppedImage= '';
  this.file='';
  this.filename= '';
  this.finalCroppedImage='';
  this.removeImageConfirm = false;
  this.fileImageChanged = false;
}
cancelCropView()
{
  this.cropped = true;
  this.cropView = false;
  this.finalCroppedImage = this.croppedImage;
  this.fileImageChanged = true;
  // let dom = document.getElementsByClassName('modal-backdrop fade show');
  //   while(dom.length > 0){
  //     dom[0].classList.remove('modal-backdrop');
  //   }
}
imageCropped(image: string) {
  this.croppedImage = image;
  this.file = this.dataURLtoFile(image,this.filename);
}
imageLoaded() {
  this.croppedImage;
}
loadImageFailed() {
    // show message
}
}
