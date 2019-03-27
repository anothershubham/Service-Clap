import { TreeModel } from 'angular-tree-component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from "../../../shared/server.service";

import { ConnectionService } from 'ng-connection-service';
import { ScLayoutComponent } from "../../sc-layout.component";
import { ITreeOptions, IActionMapping } from 'angular-tree-component';
import { TreeviewItem, DropdownTreeviewComponent, TreeviewConfig, TreeviewHelper } from 'ngx-treeview';
@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  providers:[DatePipe],
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  // @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  // config = TreeviewConfig.create({
  //   hasAllCheckBox: true,
  //   hasFilter: true,
  //   hasCollapseExpand: true,
  //   decoupleChildFromParent: false,
  //   maxHeight: 400
  // });
  //   items: TreeviewItem[];
  //   values: number[];
  // onSelectedChange(event){
  //   this.changes = 1;
  //   const checkedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems;
  //   let selectedCitiesName = checkedItems.map(item => item.text);
  //   let selectedCitiesCode = checkedItems.map(item => item.value);
  //   let selectedCities= [];
  //   for(let i=0;i<selectedCitiesCode.length;i++){
  //     let obj = { code: selectedCitiesCode[i], value: selectedCitiesName[i]};
  //     selectedCities.push(obj);
  //   }
  //   this.selected_services = selectedCities
  // }
  // onFilterChange(event){

  // }
  // same_date: number;
  // e_date: any;
  // s_date: any;
  // user_type = localStorage.getItem('user_type');
  // private sub: any;
  // status = 'ONLINE';
  // isConnected = true;
  // id: number;
  // options = {
  //   useCheckbox: true,
  // };
  // nodes=[];
  // today=new Date();
  // error:number=0;
  // wrong_date:number=0;
  // no_city: number=0;
  // no_services: number=0;
  // no_user_type: number=0;
  // no_discount: number=0;
  // no_expiry_Date: number=0;
  // no_description: number=0;
  // no_startDate: number=0;
  // noTtile: number=0;
  // editForm: FormGroup;
  // changes:number=0;
  // anotherChange:number=0;
  // selected=["Refrigerator"];
  // selectedcity=["raigarh"];
  // servicearray=[];
  // cityArray=[];
  // submitted= false;
  // serviceObject: { code: string; };
  // limiter = 3;
  // limiter1 = 3;
  // leftOptions;
  // leftOptions1;
  // allSelected=false;
  // allSelected1=false;
  // selectedAllCityOptions = false;
  // selectedAllServicesOptions = false;
  // selected_cities=[];
  // selected_services=[];
  // array_city=[];
  // count=2;
  // count1=0;
  // x;y;
  // searchText='';
  // searchText1='';
  // dataLoaded:number=0;
  // // selected=[];
  // offers={}
  // allCities=[]
  // allServices=[{
  //   "code":4,
  //   "label":"Tv Repair",
  //   "selected":false
  // },
  // {
  //   "code":5,
  //   "label":"Refrigerator",
  //   "selected":false
  // },
  // {
  //   "code":6,
  //   "label":"Washing Machine",
  //   "selected":false
  // }]
  
  // constructor(private route: ActivatedRoute,public apiCall:ServerService,public router: Router,private datePipe: DatePipe,private formBuilder: FormBuilder,private connectionService: ConnectionService,public parentComponent:ScLayoutComponent) {
  //   if(localStorage.getItem('isConnected')){
  //     if(localStorage.getItem('isConnected') == 'true')
  //     {
  //       this.parentComponent.showLoader=1;
  //       this.isConnected = true;
  //     }
      
  //     else
  //     this.isConnected = false;
  //   }
  //   this.connectionService.monitor().subscribe(isConnected => {
  //     this.isConnected = isConnected;
  //     if(this.isConnected == true)
  //     localStorage.setItem('isConnected','true');
  //     else
  //     localStorage.setItem('isConnected','false');

      
  //     if (this.isConnected) {
  //       this.parentComponent.showAlert=0;
  //       this.status = "ONLINE";
  //     }
  //     else {
  //       this.parentComponent.showAlert=4;
  //       this.status = "OFFLINE";
  //     }
  //   })
  // }
  // ff(event){

  // }
  // close1(){
  //   this.searchText1='';
  // }
  // setState(event) {
  //   }
  // close(){
  //   this.searchText='';
  // }
  // wrongerror:number=0;
  // wrerror:number =0;
  // discount_value: any;
  // min_Bill: any;
  // chooseDiscountType(event): void { 

  //   let ctrl = this.editForm.get('max_discount_amount')

  //   ctrl.enabled ? ctrl.disable() : ctrl.enable()
  // }
  // minimumBillAmount(event){
  //   this.min_Bill = event;

  // }
  // discountValue(event){
  //   this.discount_value = event;

  // }
  // checkamount(event){
  // }
  // correct:number;
  // max_discount(event){

  //   var a = (this.discount_value/100)*this.min_Bill

  //   if(event > a){
  //     this.correct = 1;
  //   }else{
  //     this.correct = 0;
  //   }

  // }
  // ChooseUserType(event){
  //   this.anotherChange=1;
  // }
  // get f() { return this.editForm.controls; }
  // onSubmit(addformvalue,s_date,e_date){

  //   var d = new Date(s_date);

  //   this.submitted = true;
  //   if(this.selected_services.length ==0){
  //     this.x=1;
  //   }
  //   if(this.selected_cities.length ==0){
  //     this.y=1;
  //   }
  //   else if (this.editForm.invalid) {
  //       return;
  //   }else{
  //     var s_Date = this.datePipe.transform(s_date,"yyyy-MM-dd");
  //     var e_Date = this.datePipe.transform(e_date,"yyyy-MM-dd");
  //     var timeDiff = new Date(e_date).getTime() - new Date(s_date).getTime();
  //     var DaysDiff = timeDiff / (1000 * 3600 * 24);

  //     if(DaysDiff < 0){

  //       this.wrong_date=1;
  //     }
  //     else if(DaysDiff == 0){
  //       this.same_date =1;
  //     }else{



  //       this.servicearray=[];
  //       this.cityArray=[];
  //       var a = JSON.parse(localStorage.getItem('cities'));
  //       for(var k=0;k<this.selected_cities.length;k++){
  //         this.cityArray.push(this.selected_cities[k].code)
  //       }
  //       for(var i=0;i<this.selected_services.length;i++){
  //         this.servicearray.push(this.selected_services[i].code)
  //       }
  //        if(this.correct == 1){
  //         this.error=1;
  //         this.wrongerror=0;
  //       }
  //       else{
  //         if(this.cityArray.length == 0){
  //           this.cityArray = a;
  //         }

  //           if(this.selected_cities.length ==0){

  //             this.y=1;
  //           }else{
  //             if (addformvalue.discount_type == 1){
  //               if(addformvalue.min_bill_amount < addformvalue.discount_value){
  //                 this.wrerror =1;
  //               }else{


  //                 this.apiCall.update_offer(addformvalue,this.cityArray,this.servicearray,s_Date,e_Date,this.id).subscribe(res=>this.Response(res));
  //               }
  //             }else{

  //               this.apiCall.update_offer(addformvalue,this.cityArray,this.servicearray,s_Date,e_Date,this.id).subscribe(res=>this.Response(res));
  //             }
  //           }
          
  //       }
  //     }
      
      
  //   }
  // }
  // Validatekeypress(event:any){
  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
  // changeValue(event){
  //   this.changes=1;
  // }
  // Response(res){

  //   if(res.success == true){
  //     this.router.navigate(['../offer/oDetails/'+this.id]);
  //     this.parentComponent.showAlert=1;
  //   }else{
  //     this.parentComponent.showAlert=3;
  //   }
  //   this.parentComponent.messageAlert=res.message;
  //   this.parentComponent.setNotificationTimer();
  // }
  // ngOnInit() {
  //   this.editForm = this.formBuilder.group({
  //     title: [],
  //     start_date: [],
  //     description: [],
  //     expiry_date: [],
  //     promo_code:[],
  //     discount_value:[],
  //     min_bill_amount:[],
  //     max_discount_amount:[],
  //     user_type:[],
  //     discount_type:[],
  //     services:[],
  //     cities:[]
  // });
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id'];

  //   })
  //   this.parentComponent.showLoader=1;
  //   this.apiCall.fetch_Specific_offer_details(this.id).subscribe(res=>this.fetchOfferDetail(res));
    
  // }
  // fetchAllServices(res){
  
  //   if(res.success == true){
  //     this.allServices = res.data;
  //     this.nodes=[];
  //     this.items= res.data;
  //     for(let i=0;i<this.items.length;i++){
  //       let temp = new TreeviewItem(this.items[i]);
  //       this.nodes.push(temp);
  //     }
  //     }
  //   if(localStorage.getItem('user_type') == '1'){
  //     this.apiCall.fetch_all_city().subscribe(res=>this.fetchAllCities(res));  
  //   }else{
  //     this.apiCall.fetch_all_enabled_cities().subscribe(res=>this.fetchAllCities(res));
  //   }
  // }
  // omit_special_char(event)
  // {   
  //    var k;  
  //    k = event.charCode;
     
  //    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  // }
  // fetchAllCities(res){
    
  //   if(res.success ==  true){
      
  //     for(var i=0;i<res.data.length;i++){
  //       var a = this.array_city.includes(res.data[i].code);
  //       if(a== false){
  //         var obj1 ={code:res.data[i].code,label:res.data[i].city_label,selected:false};
  //       }else{
  //         var obj1 ={code:res.data[i].code,label:res.data[i].city_label,selected:true};
  //       }
  //       this.allCities.push(obj1);
        
  //     }
      
     
  //   }else{
  //     this.allCities = [];
  //   }
  // }
  // service_checked=[];
  // fetchOfferDetail(res){
    
    
    
  //   this.s_date = res.data.starting_date;
  //   this.e_date = res.data.expiry_date;

  //   for(var i=0;i<res.data.services.length;i++){
  //     var obj ={id:res.data.services[i].code,name:res.data.services[i].label}
  //     this.selected_services.push(obj);
  //   }

  //   for(var i=0;i<this.selected_services.length;i++){
  //     this.service_checked.push(this.selected_services[i].id)
  //   }
    
    
    
  //   for(var i=0;i<res.data.cities.length;i++){
  //     this.array_city.push(res.data.cities[i].code);
      
  //     var obj1 ={code:res.data.cities[i].code,label:res.data.cities[i].label,selected:true}
  //     this.selected_cities.push(obj1);
  //   }
  //   this.count = this.selected_cities.length;
  //   this.apiCall.fetch_all_checked_services_with_custom_name(this.service_checked).subscribe(res=>{
  //     this.fetchAllServices(res)
  //   });
  //   var start_date = this.datePipe.transform(res.data.starting_date,"dd-MMM-YYYY");
  //   var expiry_date = this.datePipe.transform(res.data.expiry_date,"dd-MMM-YYYY");
    
  //   this.parentComponent.showLoader=0;
  //   this.dataLoaded =1;
    
  //   this.editForm = this.formBuilder.group({
  //     title: [res.data.title, Validators.required],
  //     start_date: [start_date, Validators.required],
  //     description: [res.data.description, Validators.required],
  //     expiry_date: [expiry_date, Validators.required],
  //     promo_code:[res.data.promocode,Validators.required],
  //     discount_value:[res.data.discount_value,Validators.required],
  //     min_bill_amount:[res.data.min_bill_amount],
  //     max_discount_amount:[res.data.max_discount_amount],
  //     user_type:[res.data.user_type],
  //     discount_type:[res.data.offer_type],
  //     services:[''],
  //     cities:['']
  // });
  // if(res.data.offer_type == 1){
  //   let ctrl = this.editForm.get('max_discount_amount')
  //   ctrl.disable();
  // }
  
  // }

  // cancel(){
  //   this.router.navigate(['../offer/oDetails/'+this.id]);
  // }
  // func(event){

  //   this.changes=1;
  // }
  // removeCity(x){
  //   this.cityArray.splice(x,1);
  //   this.selectedcity.splice(x,1);

  // }



  // selectAllCities() {
  //   this.changes=1;
  //   if(this.selectedAllCityOptions == false){
  //    for(let i= 0;i<this.allCities.length;i++){
  //        if(this.allCities[i].selected == false){
  //            this.selected_cities[this.count]=this.allCities[i];
  //            this.count+=1;
  //            this.allCities[i].selected=true;
  //        }
  //    }
  //    this.selectedAllCityOptions= true;
  //    if(this.selected_cities.length == 0){
  //     this.y=1;
  //   }else{
  //    this.y=0;
  //   }
  //     }
  //     else{   
  //       this.selected_cities.splice(0,this.selected_cities.length);
  //       for(let i= 0;i<this.allCities.length;i++){
  //           this.allCities[i].selected = false;
  //           this.count--;
  //       }
  //       this.selectedAllCityOptions= false;
  //       if(this.selected_cities.length == 0){
  //         this.y=1;
  //       }else{
  //        this.y=0;
  //       }
  //     }
  //     if(this.selected_cities.length > this.limiter-1)
  //     this.leftOptions= this.selected_cities.length - this.limiter;
  //     else{
  //       this.leftOptions = 0;
  //     }
  // }
  // onSelect(event){

  //   this.selected_services.push(event.node.data);

  // }
  // updateChildNodeCheckbox(node, checked,index) {
    
  //   node.data.checked = checked;
  //   if (node.children) {

  //     if(index == 0){
  //       if(checked == true){
  //         this.selected_services.push(node.data)

  //       }else{

  //       }
  //     }
  //     index++;
  //     node.children.forEach((child) => this.updateChildNodeCheckbox(child, checked,index));
  //   }
  // }

  // updateParentNodeCheckbox(node) {
  //   if (!node) {
  //     return;
  //   }

  //   let allChildrenChecked = true;
  //   let noChildChecked = true;

  //   for (const child of node.children) {
  //     if (!child.data.checked || child.data.indeterminate) {
  //       allChildrenChecked = false;
  //     }
  //     if (child.data.checked) {
  //       noChildChecked = false;
  //     }
  //   }

  //   if (allChildrenChecked) {
  //     node.data.checked = true;
  //     node.data.indeterminate = false;
  //   } else if (noChildChecked) {
  //     node.data.checked = false;
  //     node.data.indeterminate = false;
  //   } else {
  //     node.data.checked = true;
  //     node.data.indeterminate = true;
  //   }
  //   this.updateParentNodeCheckbox(node.parent);
  // }
  // check(node,event){
  //   this.updateChildNodeCheckbox(node, event,index);
  //   this.updateParentNodeCheckbox(node.realParent); 
  //   if(event == true){
  //     this.changes=1;
  //     this.selected_services.push(node.data);

  //   }else if(event == false){


  //     this.changes=1;

  //     var index = this.selected_services.map(x => {
  //       return x.id;
  //     }).indexOf(node.data.id);
  //     this.selected_services.splice(index, 1);

  //   }
  // }
  // onDeselect(event){
  //   var index = this.selected_services.map(x => {
  //     return x.id;
  //   }).indexOf(event.node.data.id);
  //   this.selected_services.splice(index, 1);

  // }
  // selectAllServices() {
  //   this.changes=1;
  //   if(this.selectedAllServicesOptions == false){
  //    for(let i= 0;i<this.allServices.length;i++){
  //        if(this.allServices[i].selected == false){
  //            this.selected_services[this.count1]=this.allServices[i];
  //            this.count1+=1;
  //            this.allServices[i].selected=true;
  //        }
  //    }
  //    this.selectedAllServicesOptions= true;
  //    if(this.selected_services.length == 0){
  //      this.x=1;
  //    }else{
  //     this.x=0;
  //    }
  //     }
      
  //     else{   
  //       this.selected_services.splice(0,this.selected_services.length);
  //       for(let i= 0;i<this.allServices.length;i++){
  //           this.allServices[i].selected = false;
  //           this.count1--;
  //       }
  //       this.selectedAllServicesOptions= false;
  //       // 
  //       if(this.selected_services.length == 0){
  //         this.x=1;
  //       }else{
  //        this.x=0;
  //       }
  //       // 
  //     }
  //     if(this.selected_services.length > this.limiter1-1)
  //     this.leftOptions1= this.selected_services.length - this.limiter1;
  //     else{
  //       this.leftOptions1 = 0;
  //     }
  //   }
  // City_remove(item){
  //   this.changes=1;

  //   for(let i=0;i<this.allCities.length;i++){
  //    if(this.allCities[i].code == item.code){
  //     this.allCities[i].selected= false;
  //    }
  //    }
  //    for(let i=0;i< this.count;i++)
  //    {

  //        if(item.code == this.selected_cities[i].code)
  //        {
  //            this.selected_cities.splice(i,1);
  //            this.count--;
  //        }
  //    }
  //    if(this.selected_cities.length == this.allCities.length){

  //     var a = document.getElementById('selectAllCities') as HTMLInputElement;
  //     a.checked = true;
  //     this.selectedAllCityOptions = true;
  //   }else{

  //     var a = document.getElementById('selectAllCities') as HTMLInputElement;
  //     a.checked = false;
  //     this.selectedAllCityOptions = false;
  //   }
  // } 
  // Service_remove(item){
  //   this.changes=1;
  //   this.nodes.forEach(element =>{
  //     const FoundItem= TreeviewHelper.findItemInList(this.nodes,item.code);
  //     FoundItem.checked = false;
  //   })
    
  //   let foundItem;
  //   for(let i=0;i<this.selected_services.length;i++){
  //     if(this.selected_services[i].code == item.code){
  //       foundItem = i;
  //       break;
  //     }
  //   }
  //   this.selected_services.splice(foundItem,1);
  //   foundItem = null;
  //   for(let i=0;i<this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems.length;i++){
  //     if(this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems[i].value == item.code){
  //       foundItem = i;
  //       break;
  //     }
  //   }
  //   if(this.selected_services.length == 0){
  //     this.x=1;
  //   }else{
  //     this.x=0;
  //   }
  //   this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems.splice(foundItem,1);
  //   this.renderer();
  // }
  // renderer(){
  //   this.items.forEach(element =>{
  //     element.correctChecked()
  //   });
  //   this.selected_services.forEach(element =>{
  //     element.correctChecked()
  //   });
  //   this.nodes.forEach(element =>{
  //     element.correctChecked()
  //   });
  // }
  // Cityselec(item){
  //   this.changes=1;
  //   let flag=false;
  //   if(item.selected == false){
  //   for(let i=0;i<this.allCities.length;i++){
  //       if(this.allCities[i].code == item.code){
  //           this.allCities[i].selected= true;
  //           break;
  //       }
  //   }
  //   for(let i=0;i< this.count;i++)
  //   {
  //       if(item.code == this.selected_cities[i].code)
  //       flag=true;
  //   }
  //   if(flag == false){
  //       this.selected_cities[this.count]=item;
  //       this.count+=1;
  //   }
  //   if(this.selected_cities.length == this.allCities.length){

  //     var a = document.getElementById('selectAllCities') as HTMLInputElement;
  //     a.checked = true;
  //     this.selectedAllCityOptions = true;
  //   }
  //   }
  //   else{
  //   for(let i=0;i<this.allCities.length;i++){
  //   if(this.allCities[i].code == item.code){
  //       this.allCities[i].selected= false;
  //       }
  //   }
  //   for(let i=0;i< this.count;i++)
  //   {
  //       if(item.code == this.selected_cities[i].code)
  //       {
  //           this.selected_cities.splice(i,1);
  //           this.count-=1;
  //       }
  //   }
  //   if(this.selected_cities.length == this.allCities.length){

  //     var a = document.getElementById('selectAllCities') as HTMLInputElement;
  //     a.checked = true;
  //     this.selectedAllCityOptions = true;
  //   }else{

  //     var a = document.getElementById('selectAllCities') as HTMLInputElement;
  //     a.checked = false;
  //     this.selectedAllCityOptions = false;
  //   }
  //   }
  //   if(this.selected_cities.length > this.limiter-1)
  //   this.leftOptions= this.selected_cities.length - this.limiter;
  //   else{
  //       this.leftOptions=0;
  //   }
  //   if(this.selected_cities.length ==0){
  //     this.y=1
  //   }else{
  //     this.y=0;
  //   }
  // }
  // Serviceselec(item){
  //   this.changes=1;
  //   let flag=false;
  //   this.searchText1='';
  //   if(item.selected == false){
  //   for(let i=0;i<this.allServices.length;i++){
  //       if(this.allServices[i].code == item.code){
  //           this.allServices[i].selected= true;
  //           break;
  //       }
  //   }
  //   for(let i=0;i< this.count1;i++)
  //   {
  //       if(item.code == this.selected_services[i].code)
  //       flag=true;
  //   }
  //   if(flag == false){
  //       this.selected_services[this.count1]=item;
  //       this.count1+=1;
  //   }
  //   }
  //   else{
  //   for(let i=0;i<this.allServices.length;i++){
  //   if(this.allServices[i].code == item.code){
  //       this.allServices[i].selected= false;
  //       }
  //   }
  //   for(let i=0;i< this.count1;i++)
  //   {
  //       if(item.code == this.selected_services[i].code)
  //       {
  //           this.selected_services.splice(i,1);
  //           this.count1-=1;
  //       }
  //   }
  //   }
  //   if(this.selected_services.length > this.limiter1-1)
  //   this.leftOptions1= this.selected_services.length - this.limiter1;
  //   else{
  //       this.leftOptions1=0;
  //   }
  //   if(this.selected_services.length ==0){
  //     this.x=1
  //   }else{
  //     this.x=0;
  //   }
  // }

  constructor() {
  }

  ngOnInit() {
    
  }

}
