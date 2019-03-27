import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../shared/server.service';
import { FormGroup, FormControl, Validators,FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ScLayoutComponent } from '../sc-layout.component';
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-broadcaster',
  templateUrl: './broadcaster.component.html',
  styleUrls: ['./broadcaster.component.css']
})
export class BroadcasterComponent implements OnInit {
  searchText;p;
  wordsLimit = 150;
  all_partners = false;
  all_customers = false;
  showmore = true;
  sms = false;
  email= false;
  notification = false;
  date = new Date();
  currentData1;
  currentPage = 1;
  max;
  allowed = true;
  type= true;
  loaded: Promise<boolean>;
  clicked: Promise<boolean>;
  dirty_send= false;
  dirty_type= false;
  broadcaster_history = [];

  status = 'ONLINE';
  isConnected = true;
  
  constructor(private server: ServerService, private fb: FormBuilder, private parentComponent: ScLayoutComponent, private connectionService: ConnectionService) { 
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.parentComponent.showLoader=1;
      this.isConnected = true;
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
    this.server.fetch_all_broadcasts().subscribe(res => {
      this.setBroadcast(res);
    })
  }
  extendLimit(){
    this.wordsLimit = null;
    this.showmore = false;
  }
  removeExtraSpaces(string)
  { return string.replace(/\s{2,}/g, ' ');}
  clearLimit(){
    this.wordsLimit = 100;
    this.showmore = true;
  }
  setBroadcast(res){
    if(res.success == true){
      this.broadcaster_history= res.data;
      this.max = this.currentPage * 10;
      if(this.max > this.broadcaster_history.length)
      this.max= this.broadcaster_history.length;
    }
    else{
      this.broadcaster_history= [];
    }
    this.loaded = res;
    this.parentComponent.showLoader=0;
  }
  newBroadcast = new FormGroup ({
    'title': new FormControl('',Validators.required),
    'message': new FormControl('',Validators.required),
    'all_partners': new FormControl(),
    'all_customers': new FormControl(),
    'sms': new FormControl(),
    'email': new FormControl(),
    'notification': new FormControl()
  });
  
  ngOnInit() {
    this.parentComponent.showLoader=1;
  //for validation
  }
  check() {
    if(this.all_partners == true || this.all_customers == true)
      {
        if(this.sms == true || this.email == true || this.notification == true)
        {
          if(this.newBroadcast.valid == true)
          this.allowed = false;
          else
          this.allowed = true;
        }
        else
          this.allowed= true;
      }
    else
     this.allowed = true;

    if(this.sms == false && this.email == false && this.notification == false)
    this.type= false;
    else if(this.sms == true || this.email == true || this.notification == true)
    this.type= true;
  }
  partnerChange(){
    this.all_partners = !this.all_partners;
    this.dirty_send = true;
    this.check();
  }
  customersChange(){
    this.all_customers = !this.all_customers;
    this.dirty_send = true;
    this.check();
  }
  smsChange() {
    this.sms = !this.sms;
    this.dirty_type= true;
    this.check();
  }
  emailChange() {
    this.dirty_type= true;
    this.email = !this.email;
    this.check();
  }
  notificationChange() {
    this.dirty_type= true;
    this.notification = !this.notification;
    this.check();
  }
  send_toChange(partners)
  {
  }
  resetValues() {
    this.all_partners = false;
    this.all_customers = false;
    this.sms = false;
    this.email= false;
    this.notification = false;
    this.dirty_send= false;
    this.dirty_type= false;
  }
  submit(form){
    let temp_send_to;
    let temp_send_message_type;
    if(form.all_partners == true && form.all_customers ==true)
    temp_send_to = 2;
    else if(form.all_partners == true)
    temp_send_to = 1;
    else if(form.all_customers ==true)
    temp_send_to = 0;
    if(form.sms == null)
    form.sms = false;
    if(form.notification == null)
    form.notification = false;
    if(form.email == null)
    form.email = false;
    if(form.sms == true && form.notification ==true && form.email ==true)
      temp_send_message_type = 6;
    else if(form.email ==true && form.sms == true && form.notification ==false )
      temp_send_message_type = 3;
    else if(form.email ==true && form.sms == false && form.notification ==true )
      temp_send_message_type = 4;
    else if(form.email ==true && form.sms == false && form.notification ==false )
      temp_send_message_type = 1;
    else if(form.email ==false && form.sms == true && form.notification ==true )
      temp_send_message_type = 5;
    else if(form.email ==false && form.sms == true && form.notification ==false )
      temp_send_message_type = 0;
    else if(form.email ==false && form.sms == false && form.notification ==true )
      temp_send_message_type = 2;
    
    form.title = this.removeExtraSpaces(form.title);
    form.message = this.removeExtraSpaces(form.message);
    let temp={
      'send_to': temp_send_to, 'send_message_type':temp_send_message_type,
      'title': form.title,
      'message': form.message,
      'user_code': localStorage.getItem('user_code')
      };
    this.server.addNewBroadcast(temp).subscribe( res => {
      this.addNewBroadcast(res);
    })
    this.allowed = true;
  }
  addNewBroadcast(res){
    if(res.success == true){
      this.server.fetch_all_broadcasts().subscribe(res => {
        this.setBroadcast(res);
      })
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  currentData(data) {
    this.currentData1 = null;
    this.clicked= null;
    this.currentData1 = data;
    this.clicked= this.currentData1;
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.max = this.currentPage * 10;
    if(this.max > this.broadcaster_history.length)
    this.max= this.broadcaster_history.length;
  }

}
