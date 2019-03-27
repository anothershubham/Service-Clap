import { Http } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit, Renderer2, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../../shared/server.service';
import { ExcelService } from '../../../shared/excel.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScLayoutComponent } from '../../sc-layout.component';
@Component({
  selector: 'app-p-detail',
  templateUrl: './p-detail.component.html',
  styleUrls: ['./p-detail.component.css'],
})
export class PDetailComponent implements OnInit {
  id;
  date = new Date();
  date1 = new Date('2005/01/01');
  blink: number;
  loading1='0';
  workingDays;
  removeImageConfirm = false;
  loading='0';
  loading2='0';
  imageFileChanged = false;
  userData={code:null,name:'',mobile: '',email: '',profile_image_url: '',address:'',city_code: null,created: '',modified:'',created_by: '',verify_status: null,block_status: null,active_status: '',total_count:'',blocked_count:'',unblocked_count: '',verified_count: '',nonverified_count:'',active_count: '',inactive_count: '',secondary_mobile: ''};
  services=[{service_label:'',service_code:''}]; 
  total_orders=[{code:'',order_id:'',city_code:'',customer_code:'',customer_name:'',mobile:'',service_code:'',service_name:'',city_label:'',status:null,time_of_status:'',created:'',total_amount:''}];
  url;
  service_cities=[{code:'',city_label:'',created_by:'',created:'',longitude:'',latitude:'',status:''}];
  cl;
  file;
  dataLoaded = 0;
  filename;
  removePurpose='';
  addPurpose='';
  status = false;
  loaded: Promise<boolean>;
  loaded1: Promise<boolean>;
  loaded2: Promise<boolean>;
  currentPage=1;
  max; initial; // initial and final page numbers
  imgLoaded = false;
  close= 'modal';
  assignedStatus;
  requestedStatus;
  remaining_balance = 0;
  filteredOrders=[];
  deleteCityCode;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  servicesALL='';
  value_of_i: number;
  newcode: any;
  addCity: any[] = [];
  cityName: string='';
  assigned=0;requested=0;completed=0;declined=0;cancelled=0;going_on=0;total=0;
  fileChange = false;  cropped = false;  editSubmit = false;  editt = true;
  addEvent = false;  addModal = false;  deductModal = false;  deductEvent = false;  showVerify = false;  finalCroppedImage='';
  editForm;
  addForm = new FormGroup ({
    amount: new FormControl('',Validators.required),
    purpose: new FormControl('', Validators.required),
    remarks: new FormControl()
  });
  deductForm = new FormGroup ({
    amount: new FormControl('',Validators.required),
    purpose: new FormControl('',Validators.required),
    remarks: new FormControl()
  });
  checkCity = true;
  status1 = 'ONLINE';
  isConnected = true;
  //for displaying currently selected item
  completedStatus=false;declinedStatus=false;cancelledStatus=false;goingOnStatus=false;totalStatus=true;
  wallet_history = [{amount :null, code: null, created: this.date, created_by:14, purpose:"cancelled Order",remark:"description",transaction_type: 0}];
  //all partners list 
  doSomething($event){
  }
  cities = [];
  constructor(private route: ActivatedRoute,private router: Router, private server : ServerService, private excelService: ExcelService, public parentComponent:ScLayoutComponent, private connectionService: ConnectionService) {
    this.route.params.subscribe( params => {
      this.ngOnInit();
    })
   }
   setCities(res)
   {
      this.loaded2= res;
      if(res.success == true){
       this.cities = res.data;
     }  
     else{
     }
     this.server.fetch_specific_partner_details(this.id).subscribe(res => {
      this.setPartnerDetails(res);
    })
    this.server.fetch_wallet_history(this.id).subscribe(res => {
      
      this.setWalletDetails(res);
    })
    this.url=this.userData.profile_image_url;
   }
   setPartnerDetails(res){ // for setting the data of partner from server
    this.parentComponent.showLoader = 0;
    this.dataLoaded=1;
      this.loaded1= res;
      if(res.success == true){
       this.userData = res.partner_data;
       this.services= res.partner_services;
       this.service_cities = res.service_cities;
       this.filteredOrders = res.total_order;
       this.total_orders=res.total_order;
       this.workingDays=res.partner_data.working_days_in_week.split('');
       //for setting services provided by partner
       if(this.services.length > 0){
         this.servicesALL='';
        for(let i=0;i<this.services.length-1;i++){
          this.servicesALL = this.servicesALL+this.services[i].service_label+', ';
        }
        this.servicesALL = this.servicesALL+this.services[this.services.length-1].service_label;
      }
      //end
       this.editForm = new FormGroup ({
        name: new FormControl(this.userData.name,Validators.required),
        mobile: new FormControl(this.userData.mobile,[Validators.required,Validators.minLength(10)]),
        secondaryMobile: new FormControl(this.userData.secondary_mobile),
        email: new FormControl(this.userData.email),
        address: new FormControl(this.userData.address),
      });
      this.filteredOrders = this.total_orders;
      this.max = this.currentPage * 10;
      if(this.max > this.filteredOrders.length)
      this.max= this.filteredOrders.length;
      this.initial= ((this.currentPage-1) * 10)+1;
      if(this.initial > this.max)
      this.initial = this.max;
      this.url=this.userData.profile_image_url;
      this.loaded = res.partner_data;
      this.calculate();
     }
     else{
       this.router.navigate(['/partner']);
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
     }
    //  this.parentComponent.setNotificationTimer();
   }
   setWalletDetails(res){// for setting the data of partner's wallet from server
    this.loaded = res
    if(res.success == true){
      this.wallet_history = res.data;
      this.remaining_balance=+res.remaining_balance;
      for(let i=0;i<this.wallet_history.length;i++){
        if(this.wallet_history[i].remark == "null")
        this.wallet_history[i].remark= '';
      }
    }
    else{
      this.wallet_history = [];
    }
  }
  removeExtraSpaces(string)
  { return string.replace(/\s{2,}/g, ' ');}
  ngOnInit() {
    
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
        this.status1 = "ONLINE";
        this.parentComponent.showAlert=0;
      }
      else {
        this.status1 = "OFFLINE";
        this.parentComponent.showAlert=4;
      }
    })
    this.route.params.subscribe( params => {
      this.id= params.id;
    })
    this.server.fetch_all_cities().subscribe(res => {
      this.setCities(res);
    })
    
      this.parentComponent.showLoader = 1; //for loader show
      this.editForm = new FormGroup ({
        name: new FormControl('',Validators.required),
        mobile: new FormControl('',[Validators.required,Validators.minLength(10)]),
        secondaryMobile: new FormControl(''),
        email: new FormControl(''),
        address: new FormControl(''),
        city: new FormControl('',Validators.required)
      })
  }
  fileChangeEvent(event: any): void {//executed after the file is opened in edit form
      this.imageChangedEvent = event;
      this.readUrl(event);
      this.filename = event.target.value.slice(12, event.target.value.length);
      // this.fileChange = true;
      this.changeCropView();
      this.imageFileChanged = true;
      // this.removeImageConfirm = false;
  }
  readUrl(event:any) { //for converting the image in data url form
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        this.imgLoaded=true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  validatemobile(event) { //for allowing only number to be entered
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
  loadImage(){
    // this.finalCroppedImage = this.userData.profile_image_url;
  }
  updateLoaded() { //nulling values after submission of form
    this.cl = 'modal';
    this.fileChange = false;
    this.croppedImage = '';
    this.finalCroppedImage = '';
    this.imageChangedEvent = '';
    this.cancelEddit();
    this.removeImageConfirm = false;
    this.imageFileChanged = false;
  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  setEddit() {
    this.editt = true;
    this.removeImageConfirm = false;
    this.imageFileChanged = false;
  }
  cancelEddit(){
    this.editt =false;
  }
  changeCropView(){
    this.cropped = true;
    this.croppedImage = this.finalCroppedImage;
    this.imageFileChanged = true;
  }
  cropCancelled(){
    this.cropped = false;
    this.croppedImage = '';
  }
  cancelCropView() {
    this.cropped = false;
    this.fileChange = true
    this.finalCroppedImage = this.croppedImage;
    this.removeImageConfirm = false;
    // this.imageFileChanged = false;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
      this.file = this.dataURLtoFile(image,this.filename);
  }
  uploadFile(event){
    // addFormData.append("myImage",target.files[0]);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
      // this.newsPic = event.target.result;
       
      }
      reader.readAsDataURL(event.target.files[0]);
    } 
  }
  removeImage(){
    this.removeImageConfirm = true;
    this.imageFileChanged = true;
    this.finalCroppedImage = '';
    this.croppedImage = '';
    this.cropped = false;
  }
  imageLoaded() {
    this.croppedImage;
      // show cropper
  }
  loadImageFailed() {
      // show message
  }
  calculate(){
    this.total= this.total_orders.length;
    this.completed=0;this.declined=0;this.cancelled=0;this.going_on=0;
    for(let i =0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 5)
      this.declined++;
      if(this.total_orders[i].status == 4)
      this.cancelled++;
      if(this.total_orders[i].status == 3)
      this.completed++;
      if(this.total_orders[i].status  == 2)
      this.going_on++;
      if(this.total_orders[i].status  == 1)
      this.assigned++;
      if(this.total_orders[i].status  == 0)
      this.requested++;
    }
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_total(){
    this.filteredOrders=[];
    this.filteredOrders= this.total_orders;
    this.completedStatus=false;this.declinedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=true;this.assignedStatus =false;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_assigned(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 1){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=false;this.declinedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false; this.assignedStatus =true;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_requested(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 0){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=false;this.declinedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false; this.requestedStatus =true; this.assignedStatus = false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_completed(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 3){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=true;this.declinedStatus=false;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false;this.assignedStatus =false;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_declined(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 5){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=false;this.declinedStatus=true;this.cancelledStatus=false;this.goingOnStatus=false;this.totalStatus=false;this.assignedStatus =false;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_cancelled(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 4){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=false;this.declinedStatus=false;this.cancelledStatus=true;this.goingOnStatus=false;this.totalStatus=false;this.assignedStatus =false;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  display_going_on(){
    let count=0;
    this.filteredOrders=[];
    for(let i=0;i<this.total_orders.length;i++){
      if(this.total_orders[i].status == 2){
        this.filteredOrders[count++]=this.total_orders[i];
      }
    }
    this.completedStatus=false;this.declinedStatus=false;this.cancelledStatus=false;this.goingOnStatus=true;this.totalStatus=false;this.assignedStatus =false;this.requestedStatus =false;
    this.max = this.currentPage * 10;
   if(this.max > this.filteredOrders.length)
   this.max= this.filteredOrders.length;
   this.initial= ((this.currentPage-1) * 10)+1;
   if(this.initial > this.max)
   this.initial = this.max;
  }
  verifyPartner(){
    let temp= { verify_status: 1, user_code: 12, partner_code: this.id};
    this.server.update_verify_status_of_partner(temp).subscribe( res => {
      this.setVerify(res);
    })	
    this.hideModal();
  }
  setVerify(res){
    if(res.success == true){
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
    this.changeVerify();
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
      
    }
    this.parentComponent.setNotificationTimer();
  }
  changeVerify(){
    this.userData.verify_status = 1;
  }
  showModal() {
    this.showVerify = true;
  }
  hideModal() {
    let pushRightClass='modal-open';
    this.showVerify = false;
    let dom = document.getElementsByClassName('modal-backdrop');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
    let dom1 = document.querySelector('body');
      dom1.classList.toggle(pushRightClass);
      dom1.removeAttribute('style')
  }
  totitlecase(str){
    let strSplit= str.split(' ');
    for(let i=0;i<strSplit.length;i++){
      strSplit[i]=strSplit[i].charAt(0).toUpperCase()+strSplit[i].slice(1);
    }
    return strSplit.join(' ');
  }
  update_partner_details(editForm : FormGroup){
    if(this.imageFileChanged == true || editForm.dirty == true){
      let form = new FormData();
      if(this.removeImageConfirm == false)
      form.append("image", this.file);
      if(this.removeImageConfirm == true)
      {
        let img = this.dataURLtoFile(this.server.no_user_image,'no_image');
        form.append("image",img);
      }
      editForm.value.name = this.removeExtraSpaces(editForm.value.name);
      editForm.value.address = this.removeExtraSpaces(editForm.value.address);
      editForm.value.name = this.totitlecase(editForm.value.name);
      editForm.value.email=editForm.value.email.toLowerCase();
      let temp={ "name": editForm.value.name,"mobile": this.userData.mobile,"secondary_mobile": editForm.value.secondaryMobile,"email":editForm.value.email, "address": editForm.value.address, partner_code: parseInt(this.id)};
      this.server.update_partner_details(temp, form).subscribe(res => {
        this.UpdateDetails(res,editForm);
      })
      let dom = document.getElementsByClassName('modal-backdrop fade show');
      while(dom.length > 0){
        dom[0].classList.remove('modal-backdrop');
      }
      let pushRightClass='modal-open';
      let dom1 = document.querySelector('body');
      dom1.classList.toggle(pushRightClass);
      dom1.removeAttribute('style');
    }
    else{
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert="No Changes Made";
    }
    this.parentComponent.setNotificationTimer();
  }
  UpdateDetails(res,editForm){
    if(res.success == true){
    this.server.fetch_specific_partner_details(this.id).subscribe(res => {
      this.setPartnerDetails(res);
    })    
    this.parentComponent.showAlert =1;
    this.parentComponent.messageAlert=res.message;
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }  
  dosomething(){
      this.loading='1';
  }
  dosomething1(){
      this.loading1='1';
  }
  dosomething2(){
      this.loading2='1';
  }
  blockUser(event){
    
    this.status = true;
    event.target.classList.add('close');
    let temp_status;
    if(this.userData.block_status == 0){
      temp_status = 1;
    }
    else{
      temp_status = 0;
    }
    let temp= { block_status: temp_status, user_code: localStorage.getItem('user_code'), partner_code: this.id};
    this.server.changeBlockStatus(temp).subscribe( res => {
      this.setBlockStatus(res);
    })
  }
  setBlockStatus(res){
    if(res.success == true){
      if(this.userData.block_status == 1)
    {
      this.userData.block_status = 0;
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert="Partner unblocked successfully";
    }
    else if(this.userData.block_status == 0)
    { 
      this.userData.block_status = 1;
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert="Partner blocked successfully";
    }
      
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
      this.userData.block_status= !this.userData.block_status;
    }
    this.parentComponent.setNotificationTimer();
  }
  changeStatus(){
    this.status = false;
  }
  validatePrice1(event){
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    this.deductEventChange();
    return true;
  }
  validatePrice(event){
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    this.addEventChange();
    return true;
  }
  deductMoney(deductForm){
    
    let temp={
      partner_code:this.id,
      order_code:12,
      purpose:deductForm.value.purpose,
      remarks:deductForm.value.remarks,
      amount:deductForm.value.amount,
      transaction_type:0,
      user_code:14
    };
    this.server.transactMoney(temp).subscribe( res => {
      this.updateDeductMoney(res,deductForm);
    });
    
    this.cancelDeductModal();
    this.cancelDeductEventChange();
  }
  updateDeductMoney(res,deductForm){
    if(res.success == true){
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
      this.server.fetch_wallet_history(this.id).subscribe(res => {
        this.setWalletDetails(res);
      })
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  deductEventChange() {
    this.deductEvent = true;
  }
  cancelDeductEventChange() {
    this.deductEvent = false;
    this.cancelDeductModal();
  }
  showDeductModal() {
    this.deductModal = true;
  }
  cancelDeductModal(){
    this.deductModal = false;
    let dom = document.getElementsByClassName('modal-backdrop fade show');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
  }
  addMoney(addform){
    let temp={
      partner_code:this.id,
      order_code:12,
      purpose:addform.value.purpose,
      remarks:addform.value.remarks,
      amount:addform.value.amount,
      transaction_type:1,
      user_code:14
    };
    this.server.transactMoney(temp).subscribe( res => {
      this.updateAddMoney(res,addform);
    });
    this.cancelAddModal();
    this.cancelEventChange();
  }
  updateAddMoney(res,addform){
    if(res.success == true){
      this.server.fetch_wallet_history(this.id).subscribe(res => {
        this.setWalletDetails(res);
      })
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
      this.server.fetch_wallet_history(this.id).subscribe(res => {
        
        this.setWalletDetails(res);
      })
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  addEventChange() {
    this.addEvent = true;
  }
  addPurposeChange(event){
    let searchIndex = event.target.selectedIndex;
    if(searchIndex == 1){
      this.addPurpose = 'Cash Refund';
    }
    else if(searchIndex == 2){
      this.addPurpose = 'Order Refund';
    }
    else if(searchIndex == 3){
      this.addPurpose = 'Other';
    }
    this.addForm.patchValue({purpose : this.addPurpose});
  }
  deductPurposeChange(event){
    let searchIndex = event.target.selectedIndex;
    if(searchIndex == 1){
      this.removePurpose = 'Order Commission';
    }
    else if(searchIndex == 2){
      this.removePurpose = 'Order Cancellation';
    }
    else if(searchIndex == 3){
      this.removePurpose = 'Other';
    }
    this.deductForm.patchValue({purpose : this.removePurpose});
  }
  cancelEventChange() {
    this.addEvent = false;
    this.cancelAddModal();
  }
  showAddModal() {
    this.addModal = true;
  }
  cancelAddModal(){
    this.addModal = false;
    let dom = document.getElementsByClassName('modal-backdrop fade show');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
  }
  deletePartner() {
    let temp= this.userData.code;
    this.server.deletePartner(temp).subscribe(res => {
      this.setDelete(res);
    })
    let dom = document.getElementsByClassName('modal-backdrop fade show');
    while(dom.length > 0){
      dom[0].classList.remove('modal-backdrop');
    }
  }
  setDelete(res){
    if(res.success == true){
      this.parentComponent.showAlert =1;
      this.parentComponent.messageAlert=res.message;
      this.router.navigate(['partner']);
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
      
    }
    this.parentComponent.setNotificationTimer();
  }
  exportExcel() {
    if(this.filteredOrders.length > 0)
    {
      let temp = this.filteredOrders;
      temp.forEach(function(v){ 
        delete v.city_code;
        delete v.customer_code;
        delete v.service_code;
       });
      this.excelService.exportAsExcelFile(temp, 'data');
    }
    else
    alert('No Data Found');
  }
  saveLocation(currentLoc){
  this.deleteCityCode = currentLoc;
  }  
  emptyLocation(){
    this.deleteCityCode = 0;
  }
  deleteCity(){
    this.server.deleteServingCity(this.deleteCityCode).subscribe( res => {
      this.setServingCity(res);
    })
  }
  setServingCity(res){
    if(res.success == true){
      for(let i =0;i<this.service_cities.length; i++){
        if(this.service_cities[i].code == this.deleteCityCode)
        this.service_cities.splice(i,1);
      }
    this.emptyLocation();
    }
    else{
      this.emptyLocation();
     }
  }
}
