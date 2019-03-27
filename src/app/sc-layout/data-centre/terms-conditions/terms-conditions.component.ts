import { Component, OnInit } from '@angular/core';
import { ServerService } from "../../../shared/server.service";
import { ScLayoutComponent } from "../../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { DataCentreComponent } from "../data-centre.component";
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {
  dataLoaded:number=0;
  delcode: any;
  tandc;Edittandc;
  filterText: string;
  code: any;
  EditBtn: any;
  previousValue: any;
  updatedValue: any;
  totalLength: number;
  totalLength1: number;
  editList:any={};
  step = 1;
  step1 = 1;
  p=1;
  p1=1;
  changes:number=0;
  anotherChange:number=0;
  show:number=1;
  radioBtn:number=3;
  EditradioBtn:number;
  currentPage =1;
  currentPage1 =1;
  itemsPerPage =10;
  itemsPerPage1 =10;
  CustomerCondition=[];
  PartnerCondition=[];
  no_title:number=0;
  no_content:number=0;
  not_valid:number=0;
  t_title:string='';
  t_content:string='';
  status = 'ONLINE';
  isConnected = true;
  constructor(public apiCall:ServerService,public parentComponent:ScLayoutComponent,private connectionService: ConnectionService,public pComponent:DataCentreComponent) {
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
        this.status = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.status = "OFFLINE";
      }
    })
   }
  customer_tab(){
    this.show=2;
    this.step1=1;
    this.p1=1;
    this.currentPage1 = 1;
    this.totalLength1 = this.currentPage1 * this.itemsPerPage1;
    if(this.totalLength1 > this.CustomerCondition.length)
    this.totalLength1= this.CustomerCondition.length;
    // var a = document.getElementById('search') as HTMLInputElement;
    // a.value=''
    this.filterText='';
  }
  partner_tab(){
    this.show=1;
    this.step=1;
    this.p=1;
    this.currentPage = 1;
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.PartnerCondition.length)
    this.totalLength= this.PartnerCondition.length;
    // var a = document.getElementById('search') as HTMLInputElement;
    // a.value='';
    this.filterText='';
  }
  validFor(value){
    this.radioBtn = value;
  }
  openpanel(){
  }
  searchPanel(show,event){
    if(show==1){
      if(event == ''){
        this.step=1;
      }else{
        this.step=0;
      }
    }else{
      if(event == ''){
        this.step1=1;
      }else{
        this.step1=0;
      }
    }
   
  }
  EditvalidFor(value){
    
    if(this.EditradioBtn == value){
      this.changes=0;
    }else{
      this.changes=1;
      this.anotherChange=1;
    }
    this.EditradioBtn = value;
  }
  openModal(){
    this.no_content=0;
    this.no_title=0;
    this.radioBtn=3;
    var c = document.getElementById('chk') as HTMLInputElement;
    c.checked = false;
    var c = document.getElementById('chk1') as HTMLInputElement;
    c.checked = false;
    var c = document.getElementById('chk2') as HTMLInputElement;
    c.checked = false;
    var b = document.getElementById('title') as HTMLInputElement
    b.value='';
    var b = document.getElementById('content') as HTMLInputElement
    b.value='';
  }
  AddTermsandCondition(title,content){
    if(title == ''){
      this.no_title=1;
      this.no_content=0;
    }
    else if(content == ''){
      this.no_title=0;
      this.no_content=1;
    }
    else if(this.radioBtn == 3){
      this.not_valid=1;
    }
    else{
      this.tandc="modal";
      this.pComponent.showLoader=2;
      this.dataLoaded=0;
      this.apiCall.addTerms_and_condition(title,content,
        this.radioBtn).subscribe(res=>this.responseOfTermsAndCondition(res,this.radioBtn))
    }
  }
  responseOfdelete(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.parentComponent.showAlert=1;
      this.parentComponent.messageAlert = res.message;
      this.apiCall.fetchTerms_and_condition().subscribe(res=>this.TermsAndCondition(res))
    }else{
      this.parentComponent.showAlert=3;
      this.parentComponent.messageAlert = res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  responseOfTermsAndCondition(res,btn){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      // if(btn == 0){
      //   var a = document.getElementById('partner') as HTMLInputElement;
      //   a.click();
      // }
      // if(btn == 1){
      //   var a = document.getElementById('cust') as HTMLInputElement;
      //   a.click();
      // }
      this.apiCall.fetchTerms_and_condition().subscribe(res=>this.TermsAndCondition(res))
      // if(res.data.valid_for == 0){
      //   this.PartnerCondition.push(res.data[0])
      // }else{
      //   this.CustomerCondition.push(res.data[0])
      // }
      this.parentComponent.showAlert=1;
      this.parentComponent.messageAlert = res.message;
      // this.apiCall.fetchTerms_and_condition().subscribe(res=>this.TermsAndCondition(res))
    }else{
      this.parentComponent.showAlert=3;
      this.parentComponent.messageAlert = res.message;
    }
    this.parentComponent.setNotificationTimer();
  }
  EditpopUp(list){
    this.changes=0;
    this.anotherChange=0;
    var id;
    this.no_content=0;
    this.no_title=0;
    this.code = list.code;
    this.editList = list;
    var a = document.getElementById('edittitle') as HTMLInputElement;
    a.value = list.title;
    var a = document.getElementById('editcontent') as HTMLInputElement;
    a.value = list.content;
    this.EditradioBtn = list.valid_for;
    if(list.valid_for == 0){
      id='pat';
    }else if(list.valid_for == 1){
      id='cus';
    }else{
      id='both';
    }
    var a = document.getElementById(id) as HTMLInputElement;
    a.click();
  }
  ngOnInit() {
    this.pComponent.showLoader=2;
  
    this.show=1;
   
    this.apiCall.fetchTerms_and_condition().subscribe(res=>this.TermsAndCondition(res))
  }
  data=[];
  TermsAndCondition(res){
    if(res.success == true){
      this.data = res.data;
      this.PartnerCondition=[];
      this.CustomerCondition=[];
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].valid_for == 2){
          this.PartnerCondition.push(res.data[i]);
          this.CustomerCondition.push(res.data[i]);
        }
        if(res.data[i].valid_for == 0 ){
          this.PartnerCondition.push(res.data[i]);
        }else if(res.data[i].valid_for == 1){
          this.CustomerCondition.push(res.data[i]);
        }
        
      }
      this.totalLength = this.currentPage * this.itemsPerPage;
      if(this.totalLength > this.PartnerCondition.length)
      this.totalLength= this.PartnerCondition.length;
      this.totalLength1 = this.currentPage1 * this.itemsPerPage1;
      if(this.totalLength1 > this.CustomerCondition.length)
      this.totalLength1 = this.CustomerCondition.length;
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
    }else{
      this.PartnerCondition=[];
      this.CustomerCondition=[];
      this.pComponent.showLoader=0;
      this.dataLoaded=1;
    }
    
    // var b = document.getElementById('partner') as HTMLInputElement;
    // b.click();
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.PartnerCondition.length)
    this.totalLength= this.PartnerCondition.length;
  }
  changed1(event){
    this.currentPage1= parseInt(event);
    this.totalLength1 = this.currentPage1 * this.itemsPerPage1;
    if(this.totalLength1 > this.CustomerCondition.length)
    this.totalLength1= this.CustomerCondition.length;
  }
  DeletepopUp(code){
    this.delcode = code;
  }
  deleteIt(){
    this.pComponent.showLoader=2;
    this.dataLoaded=0;
    this.apiCall.deleteData(this.delcode,'delete_term_and_condition').subscribe(res=>this.responseOfdelete(res))
  }
  ChangeInData(event){
    this.updatedValue = event;
    if(this.updatedValue == this.previousValue){
      this.changes =0;
    }else{
      this.changes =1;
      this.anotherChange =1;
    }
  }
  previousData(editTitle){
    this.previousValue = editTitle;
  }
  UpdateTermsAndCondition(editTitle,editContent){
    if(editTitle == ''){
      this.no_title=1;
    }
    else if(editContent == ''){
      this.no_content=1;
    }
    else{
      this.pComponent.showLoader=2;
      this.dataLoaded=0;
      this.Edittandc='modal';
      this.no_title=0;
      this.no_content=0;
      this.apiCall.editTerms_and_condition(editTitle,editContent,this.EditradioBtn,this.code).subscribe(res=>this.responseOfTermsAndCondition(res,this.EditradioBtn))
    }
  }

}
