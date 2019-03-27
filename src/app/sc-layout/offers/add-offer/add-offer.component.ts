import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from "../../../shared/server.service";
import { TreeModel, TreeNode } from 'angular-tree-component';
import { ScLayoutComponent } from "../../sc-layout.component";
import { ConnectionService } from 'ng-connection-service';
import { ITreeOptions } from 'angular-tree-component';
import { DropdownTreeviewComponent, TreeviewConfig, TreeviewItem, TreeviewHelper } from 'ngx-treeview';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  providers:[DatePipe],
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  choosed: number=0;
  /* ngx tree view starts */
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500
 });
  // dropdownEnabled = false;
    items: TreeviewItem[];
    values: number[];
  

  onFilterChange(event){
  }
  /* ngx tree view ends */
  discount_value: any;
  min_Bill: any;
  same_date:number=0;
  offer_type:number=0;
  user_type = localStorage.getItem('user_type');
  today= new Date();
  tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  bill_amount: any;
  status = 'ONLINE';
  isConnected = true;
  city_array:any=[];
  service_array=[];
  addForm: FormGroup;
  newcode: any;
  service_name: string;
  no_city: number=0;
  wrong_date:number=0;
  no_services: number=0;
  no_user_type: number=0;
  no_discount: number=0;
  no_expiry_Date: number=0;
  no_description: number=0;
  no_startDate: number=0;
  noTtile: number=0;
  selected=[];
  selectedcity=[];
  servicearray=[];
  cityArray=[];
  serviceObject: { code: string; };
  limiter = 3;
  limiter1 = 3;
  leftOptions;
  leftOptions1;
  allSelected=false;
  allSelected1=false;
  selectedAllCityOptions = false;
  selectedAllServicesOptions = false;
  selected_cities=[];
  selected_services=[];
  count=0;
  count1=0;
  x;y;
  max_disc:boolean=false;
  error:number=0;
  wrerror:number=0;
  wrongerror:number=0;
  dataLoaded:number=0;
  nodes : TreeviewItem[]=[];
  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  options: ITreeOptions = {
    useCheckbox: true
  };
  allCities=[{
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
  }]
  allServices=[];
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
  searchText='';
  searchText1='';
  submitted = false;
  constructor(public apiCall:ServerService,public router: Router,private datePipe: DatePipe,private formBuilder: FormBuilder,public parentComponent:ScLayoutComponent,private connectionService: ConnectionService) {
    if(localStorage.getItem('isConnected')){
      this.parentComponent.showLoader=1;
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
        this.parentComponent.showAlert=0;
        this.status = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.status = "OFFLINE";
      }
    })
   }
  // clearAddForm(){
  //   this.no_city=0;;
  //   this.no_services=0;
  //   this.no_user_type=0;
  //   this.no_discount=0;
  //   this.no_expiry_Date=0;
  //   this.no_description=0;
  //   this.no_startDate=0;
  //   this.noTtile=0;
  // }
  check(node,event){
    if(event == true){
      this.selected_services.push(node.data);
    }else if(event == false){
      var index = this.selected_services.map(x => {
        return x.id;
      }).indexOf(node.data.id);
      this.selected_services.splice(index, 1);
    }
  }

  chooseDiscountType(event): void {
    this.offer_type = event;
    let ctrl = this.addForm.get('max_discount_amount')
    ctrl.enabled ? ctrl.disable() : ctrl.enable()
  }
  minimumBillAmount(event){
    this.min_Bill = event;
  }
  discountValue(event){
    this.discount_value = event;
  }
  checkamount(event){
    // if(event < this.min_Bill){
    //   this.wrongerror=0;
    // }else{
    //   this.wrongerror=1;
    // }
  }
  correct:number;
  max_discount(event){
    var a = (this.discount_value/100)*this.min_Bill
    if(event > a){
      this.correct = 1;
      // this.error =1;
    }else{
      this.correct = 0;
      // this.error =0;
    }

    // if(event)
  }
  onValueChange(event){
    console.log("ddcs");
  }
  onSelectedChange(event){
    const checkedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems;
    let selectedServicesName = checkedItems.map(item => item.text);
    let selectedServicesCode = checkedItems.map(item => item.value);
    let selectedServices= [];
    for(let i=0;i<selectedServicesCode.length;i++){
      this.choosed =1;
      let obj = { code: selectedServicesCode[i], value: selectedServicesName[i]};
      selectedServices.push(obj);
    }
    this.selected_services = selectedServices;
    console.log(this.selected_services);
    if(this.choosed ==1){
      if(this.selected_services.length >0){
        this.x=0;
      }else{
        this.x=1;
      }
    }
    
  }
  ngOnInit() {
    this.parentComponent.showLoader=1;
  
    // this.selected_services.length = ;
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      description: ['', Validators.required],
      expiry_date: ['', Validators.required],
      promo_code:['', Validators.required],
      discount_value:['',Validators.required],
      min_bill_amount:[''],
      max_discount_amount:[''],
      user_type:[0],
      discount_type:[0],
      // services:['',Validators.required],
      // cities:['',Validators.required]
  });
  if(localStorage.getItem('user_type') == '1'){
    this.apiCall.fetch_all_city().subscribe(res=>this.fetchAllCities(res));  
  }else{
    this.apiCall.fetch_all_enabled_cities().subscribe(res=>this.fetchAllCities(res));
  }
  // this.apiCall.fetch_all_enabled_cities().subscribe(res=>this.fetchAllCities(res));
  this.apiCall.fetch_all_services_with_custom().subscribe(res=>this.fetchAllServices(res));
  }
  ss=[];
  fetchAllServices(res){
    this.parentComponent.showLoader=0;
    this.dataLoaded =1;
    if(res.success == true){
      this.allServices = res.data;
      this.nodes=[];
      this.items= res.data;
      for(let i=0;i<this.items.length;i++){
        let temp = new TreeviewItem(this.items[i]);
        this.nodes.push(temp);
      }
      }
    else{
      
    }
  }
  fetchAllCities(res){
    // this.parentComponent.showLoader=0;
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
  close1(){
    this.searchText1='';
  }
  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;

     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  close(){
    this.searchText='';
  }
  get f() { return this.addForm.controls; }
  onSubmit(addformvalue){
    this.submitted = true;
   if(this.selected_services.length ==0){
      this.x=1;
    }
    if(this.selected_cities.length ==0){
      this.y=1;
    }

    else if (this.addForm.invalid) {
        return;
    }else{
      var s_Date = this.datePipe.transform(addformvalue.start_date,"yyyy-MM-dd");
      var e_Date = this.datePipe.transform(addformvalue.expiry_date,"yyyy-MM-dd");
      var timeDiff = addformvalue.expiry_date.getTime() - addformvalue.start_date.getTime();
      var DaysDiff = timeDiff / (1000 * 3600 * 24);
      if(DaysDiff < 0){
        this.wrong_date=1;
      }
      else if(DaysDiff == 0){
        this.same_date =1;
      }
     else{
        addformvalue.discount_type = this.offer_type;
        this.wrong_date=0;
        this.city_array=[];
        this.service_array=[];
        var a = JSON.parse(localStorage.getItem('cities'));
        for(var i=0;i<this.selected_cities.length;i++){
          this.city_array.push(this.selected_cities[i].code);
        }
        for(var i=0;i<this.selected_services.length;i++){
          this.service_array.push(this.selected_services[i].code);
        }
        if(addformvalue.max_discount_amount == ''){
          addformvalue.max_discount_amount = 0;
        }

        if(this.correct == 1){
          this.error=1;
        }
        else{
          if(this.city_array.length == 0){
            this.city_array = a;
          }
            if(this.selected_cities.length ==0){
              this.y=1;
            }
            else{

              
              if (addformvalue.discount_type == 1){
                if(addformvalue.min_bill_amount < addformvalue.discount_value){
                  this.wrerror =1;
                }else{
                  console.log("sdd");
                  console.log(this.service_array);
                  if(this.service_array.length == 0){
                    
                  }else{
                    this.apiCall.add_offer(addformvalue,this.city_array,this.service_array,s_Date,e_Date).subscribe(res=>this.add_offerResponse(res))
                  }
                  
                }
              }else{
                console.log("sddsd");
                console.log(this.service_array);
                if(this.service_array.length == 0){

                }else{
                  this.apiCall.add_offer(addformvalue,this.city_array,this.service_array,s_Date,e_Date).subscribe(res=>this.add_offerResponse(res))
                }
                
              }
            }
        }
      }
    }
  }
  add_offerResponse(res){
    if(res.success == true){
      this.router.navigate(['../offer']);
      this.parentComponent.showAlert=1;
    }else{
      this.parentComponent.showAlert=3;
    }
    this.parentComponent.messageAlert = res.message;
    this.parentComponent.setNotificationTimer();
  }
  onEvent(event){
  }
 
  checkAndAdd(name) {
    var id = this.selected_services.length + 1;
    var found = this.selected_services.some(function (el) {
      return el.id === name;
    });
  }
 
  onSelect(event){
    this.selected_services.push(event.node.data);
    this.x=0;
  }
  onDeselect(event){
    var index = this.selected_services.map(x => {
      return x.id;
    }).indexOf(event.node.data.id);
    this.selected_services.splice(index, 1);
    if(this.selected_services.length == 0){
      this.x=1
    }else{
      this.x=0;
    }
  }
  search(nameKey, myArray){
    // for (var i=0; i < myArray.length; i++) {
    
      for (var i=0; i < myArray.length; i++) {
        if (myArray[i].code === nameKey) {
            return myArray[i];
        }
    }

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

  // selectAllServices() {
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
  
  Service_remove(item){
    // var index = this.selected_services.map(x => {
    //   return x.id;
    // }).indexOf(item.id);
    // this.selected_services.splice(index, 1);
    this.selected_services.forEach(element =>{
      const FoundItem= TreeviewHelper.findItemInList(this.nodes,item.code);
      FoundItem.checked = false;
    })

    let foundItem;
    for(let i=0;i<this.selected_services.length;i++){
      if(this.selected_services[i].code == item.code){
        foundItem = i;
        break;
      }
    }
    this.selected_services.splice(foundItem,1);
    foundItem = null;
    for(let i=0;i<this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems.length;i++){
      if(this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems[i].value == item.code){
        foundItem = i;
        break;
      }
    }
    if(this.selected_services.length == 0){
      this.x=1;
    }else{
      this.x=0;
    }
    this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems.splice(foundItem,1);
    this.renderer();
  }
  renderer(){
    this.nodes.forEach(element =>{
      element.correctChecked()
    })
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
      this.y=1
    }else{
      this.y=0;
    }
  }
 
  Validatekeypress(event:any){
    const pattern = /[0-9]/;
    // const pattern = /(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
 
  cancel(){
    this.router.navigate(['../offer']);
  }
  filterFn(value: string, treeModel: TreeModel) {
    treeModel.filterNodes((node: TreeNode) => this.fuzzysearch(value, node.data.name));
  }
  fuzzysearch (needle: string, haystack: string) {
    const haystackLC = haystack.toLowerCase();
    const needleLC = needle.toLowerCase();
  
    const hlen = haystack.length;
    const nlen = needleLC.length;
  
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needleLC === haystackLC;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needleLC.charCodeAt(i);
  
      while (j < hlen) {
        if (haystackLC.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }
}
