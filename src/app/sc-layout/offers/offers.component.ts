import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from "../../shared/server.service";
import { TreeModel, TreeNode } from 'angular-tree-component';
import { ConnectionService } from 'ng-connection-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ScLayoutComponent } from "../sc-layout.component";
import { TreeviewConfig, TreeviewItem, DropdownTreeviewComponent, TreeviewHelper } from 'ngx-treeview';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  providers:[DatePipe],
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  /* ngx tree view starts */
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  // dropdownEnabled = false;
    items: TreeviewItem[];
    values: number[];
  onSelectedChange(event){
    const checkedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems;
    let selectedCitiesName = checkedItems.map(item => item.text);
    let selectedCitiesCode = checkedItems.map(item => item.value);
    let selectedCities= [];
    for(let i=0;i<selectedCitiesCode.length;i++){
      let obj = { code: selectedCitiesCode[i], value: selectedCitiesName[i]};
      selectedCities.push(obj);
    }
    this.selected_services = selectedCities
  }
  onFilterChange(event){

  }
   /* ngx tree view ends */
   fetchAllServices(res){
    // this.parentComponent.showLoader=0;
    if(res.success == true){
      this.allServices = res.data;
      this.nodes=[];
      this.nodes= res.data;
      for(let i=0;i<this.nodes.length;i++){
        let temp = new TreeviewItem(this.nodes[i]);
        this.items.push(temp);
      }
    }
    else{
    }
  }
  renderer(){
    this.items.forEach(element =>{
      element.correctChecked()
    })
    this.nodes.forEach(element =>{
      element.correctChecked()
    })
  }
   Service_remove(item){
    // var index = this.selected_services.map(x => {
    //   return x.id;
    // }).indexOf(item.id);
    // this.selected_services.splice(index, 1);
    this.selected_services.forEach(element =>{
      const FoundItem= TreeviewHelper.findItemInList(this.items,item.code);
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
    this.dropdownTreeviewComponent.treeviewComponent.selection.checkedItems.splice(foundItem,1);
    
    this.renderer()
  }
  @ViewChild('tree') tree;
  oncefiltered: number=0;
  user_type = localStorage.getItem('user_type');
  status = 'ONLINE';
  isConnected = true;
  wrong_date:number=0;
  today=new Date();
  p=1;
  currentPage =1;
  itemsPerPage =10;
  totalLength: number;
  apply;
  selected=[];
  selectedcity=[];
  
  count1=0;
  
  
  limiter1 = 3;
  
  leftOptions1;
  selected_cities=[];
  selected_services=[];
  count=0;
  servicearray=[];
  cityArray=[];
  limiter = 3;
  leftOptions;
  allSelected=false;
  selectedAllCityOptions = false;
  allSelected1=false;
  
  selectedAllServicesOptions = false;
  serviceObject: { code: string; };
  options = {
    useCheckbox: true
  };
  offers=[]
  
  allCities=[]
  allServices=[]
  nodes=[];
  searchText='';
  searchText1='';
  filterForm: FormGroup;
  dataLoaded:number=0;
  constructor(public router: Router,public apiCall:ServerService,private connectionService: ConnectionService,private formBuilder: FormBuilder,private datePipe: DatePipe,public parentComponent:ScLayoutComponent) { 
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
        this.parentComponent.showAlert=0;
        this.status = "ONLINE";
      }
      else {
        this.parentComponent.showAlert=4;
        this.status = "OFFLINE";
      }
    })
    this.filterForm = this.formBuilder.group({
      start_date: [''],
      expiry_date: [''],
      user_type: [0]
      // services:['',Validators.required],
      // cities:['',Validators.required]
  });
  // this.apiCall.fetch_all_cities().subscribe(res=>this.fetchedAllCities(res))
  }
  searchTree(event){


  }
  changed(event){
    this.currentPage= parseInt(event);
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.offers.length)
    this.totalLength= this.offers.length;
  }
  // fetchedAllCities(res){
  //   console.log(res);
  //   if(res.success == false){
  //     console.log("hidjc");
  //     this.router.navigate(['../dashboard']);
  //     window.location.reload();
  //   }else{
  //     this.apiCall.fetchAllServices().subscribe(res=>this.fetch_service(res))
  //   }
  // }
  // fetch_service(res){
  //   if(res.success == false){
  //     this.router.navigate(['../dashboard']);
  //     window.location.reload();
  //   }else{
  //     this.ngOnInit();
  //   }
  // }
  ngOnInit() {

    /* ngx treeview */
// this.items = [this.itCategory];
this.items = [];
    /* ngx trreview ends */
    
    this.parentComponent.showLoader=1;
    this.apiCall.fetch_all_services_with_custom().subscribe(res=>this.fetchAllServices(res));
    // this.apiCall.fetch_all_services_with_child().subscribe(res=>this.fetchAllServices(res));
    if(localStorage.getItem('user_type') == '1'){
      this.apiCall.fetch_all_city().subscribe(res=>this.fetchAllCities(res));  
    }else{
      this.apiCall.fetch_all_enabled_cities().subscribe(res=>this.fetchAllCities(res));
    }
    this.apiCall.fetch_offer().subscribe(res=>this.fetchAllOffers(res));

  }
  unfilter(){
    this.oncefiltered=0;
    this.apiCall.fetch_offer().subscribe(res=>this.fetchAllOffers(res));
  }
  fetchAllOffers(res){
    this.parentComponent.showLoader=0;
    this.dataLoaded=1;
    if(res.success == true){
      this.offers = res.data;
    }else{
      this.offers = [];
    }
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.offers.length)
    this.totalLength= this.offers.length;
  }
  
  fetchAllCities(res){
    // this.parentComponent.showLoader=1;
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
  close(){
    this.searchText='';
  }
  filterModal(){
    this.oncefiltered=0;

    for(var i=0;i<this.selected_cities.length;i++){
      this.selected_cities[i].selected = false;
    }
    this.selected_services=[];
    this.selected_cities=[];
    this.selectedAllCityOptions = false;
    var a = document.getElementById('startingOn') as HTMLInputElement
    a.value='';
    var b = document.getElementById('expiringOn') as HTMLInputElement
    b.value=''
    var e = document.getElementById('userType') as HTMLInputElement;
    e.value='-1';
  }
  chooseCity(event){
    var i=event.selectedIndex;
    i= i-1;

    if(this.selectedcity.find(x =>x === this.allCities[i].label))
    {
  
    }
    else{
    this.selectedcity.push(this.allCities[i].label);
   this.serviceObject={code:""};
    this.cityArray.push(event.value);

  }
  }
  // chooseServices(event){
  //   var i=event.selectedIndex;
  //   i= i-1;
  
  //   if(this.selected.find(x =>x === this.allServices[i].label))
  //   {
  
  //   }
  //   else{
  //   this.selected.push(this.allServices[i].label);
  //  this.serviceObject={code:""};
  //   this.servicearray.push(event.value);
  
  // }
  // }
  // remove(x)
  // {
  //   this.servicearray.splice(x,1);
  //   this.selected.splice(x,1);
  
  // }
  removeCity(x){

    this.cityArray.splice(x,1);
    this.selectedcity.splice(x,1);

  }
  ApplyOfferFilter(user_type){

    // fetch_filtered_offer
    var a = document.getElementById('startingOn') as HTMLInputElement
    var b = document.getElementById('expiringOn') as HTMLInputElement
    for(var i=0;i<this.selected_services.length;i++){
      this.servicearray.push(this.selected_services[i].id)
    }


    // this.apiCall.fetch_filtered_offer(a.value,b.value,this.cityArray,this.servicearray,user_type)
  }
  tableToExcel(table, name, filename) {

    let uri = 'data:application/vnd.ms-excel;base64,', 
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', 
    base64 = function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode(parseInt(p1, 16))
      }))
    }
  ,    
        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; })}

      if (!table.nodeType) table = document.getElementById(table)
      var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}

      var link = document.createElement('a');
      link.download = filename;
      link.href = uri + base64(format(template, ctx));
      link.click();
      // var pq = document.getElementById('x') as HTMLInputElement;
      // pq.innerHTML = 'Action';

      
}

// Serviceselec(item){
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
// }



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
  }
  // for(var i=0;i<this.selected_cities.length;i++){

  // }
  if(this.selected_cities.length == this.allCities.length){
    var a = document.getElementById('selectAllCities') as HTMLInputElement;
    a.checked = true;
    this.selectedAllCityOptions = true;
  }else{
    var a = document.getElementById('selectAllCities') as HTMLInputElement;
    a.checked = false;
    this.selectedAllCityOptions = false;
  }
  if(this.selected_cities.length > this.limiter-1)
  this.leftOptions= this.selected_cities.length - this.limiter;
  else{
      this.leftOptions=0;
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
} 
// Service_remove(item){
//   for(let i=0;i<this.allServices.length;i++){
//    if(this.allServices[i].code == item.code){
//     this.allServices[i].selected= false;
//    }
//    }
//    for(let i=0;i< this.count1;i++)
//    {
//        if(item.code == this.selected_services[i].code)
//        {
//            this.selected_services.splice(i,1);
//            this.count1--;
//        }
//    }
// }  
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
    }
    else{

      this.selected_cities.splice(0,this.selected_cities.length);
      for(let i= 0;i<this.allCities.length;i++){
          this.allCities[i].selected = false;
          this.count--;
      }
      this.selectedAllCityOptions= false;
    }
    if(this.selected_cities.length > this.limiter-1)
    this.leftOptions= this.selected_cities.length - this.limiter;
    else{
      this.leftOptions = 0;
    }
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
  onSelect(event){

    this.selected_services.push(event.node.data);
  }
  onDeselect(event){

    var index = this.selected_services.map(x => {
      return x.id;
    }).indexOf(event.node.data.id);
    this.selected_services.splice(index, 1);

  }
  
  onSubmit(formvalue){
    var s_Date = this.datePipe.transform(formvalue.start_date,"yyyy-MM-dd");
    var e_Date = this.datePipe.transform(formvalue.expiry_date,"yyyy-MM-dd");
    if(formvalue.expiry_date  == ''){
      var timeDiff =0;
    } else if(formvalue.start_date == ''){
      var timeDiff =0;
    }else{
      var timeDiff = formvalue.expiry_date.getTime() - formvalue.start_date.getTime();
    }
    
    var DaysDiff = timeDiff / (1000 * 3600 * 24);
    if(DaysDiff < 0){
      this.wrong_date=1;
    }else{
      this.apply = 'modal';
      this.wrong_date=0;
      this.servicearray=[];
      this.cityArray=[];
      this.oncefiltered =1;
      for(var i=0;i<this.selected_services.length;i++){
        this.servicearray.push(this.selected_services[i].code);
      }
      for(var i=0;i<this.selected_cities.length;i++){
        this.cityArray.push(this.selected_cities[i].code);
      }

      
      this.apiCall.fetch_filtered_offer(s_Date,e_Date,formvalue.user_type,this.cityArray,this.servicearray).subscribe(res=>this.fetchAllOffers(res));
    }
  }
}
