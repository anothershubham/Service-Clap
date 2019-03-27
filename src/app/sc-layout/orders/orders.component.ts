import { AuthGuardComponent } from './../../shared/auth-guard/auth-guard.component';
// import { MessagingService } from './../../messaging.service';
import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../shared/server.service';
import { ExcelService } from '../../shared/excel.service';
import { ScLayoutComponent } from '../sc-layout.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  maxList; maxGrid; currentPageList= 1; currentPageGrid =1; ListItemsPerPage= 10; GridItemsPerPage = 12;
  initialPageList; initialPageGrid;
  listView = true; gridView=false;
  status = 'ONLINE';
  p = 1;
  p1= 1;
  isConnected = true;
  user_type;
  loaded = false;
  loaded1 = false;
  totalStatus = true;completedStatus;requestedStatus;assignedStatus;goingOnStatus;cancelledStatus;
  total=0;completed=0;requested=0;assigned=0;going_on=0;cancelled=0;
  currentCity = "all_cities";
  date = new Date();
  cities=[];
  code = 0;
  orders = 
  [
    {code: null, customer_code: null, name: '', mobile: '', email: '', address: '', city_code: null, city_label: '', description: '', service_label: '', service_icon: '', service_price: null, order_request_date_time: this.date, order_assign_date_time: this.date, order_current_status_date_time: this.date, order_current_status: null, visit_date_time: this.date, work_started_date_time: this.date, work_finished_date_time: this.date, work_duration: '', paid_amount: null, amount_paid_status: null, partner_code: null, order_cancelled_by: '', admin_code: null, created: this.date, modified: this.date, partners_history:
    [
      {code: null, created: this.date, profile_image_url: '', status: '', status_time: this.date, mobile: '', name: ''}
    ]
   }
  ]
  filteredOrders=this.orders;
  constructor(public auth: AuthGuardComponent,private parentComponent: ScLayoutComponent, private server: ServerService, private excelService: ExcelService, private connectionService: ConnectionService) {
    this.user_type = localStorage.getItem('user_type');
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
    });
  }
  setCities(res){
     if(res.success == true){
      this.cities = res.data;
       this.calculate();
     }
     else{
     }
    let temp_cities=[];
    let temp;
    if(localStorage.getItem('cities')){
      let cities = JSON.parse(localStorage.getItem("cities"));
      temp_cities = cities;
    }
    if(this.user_type == "0"){
      temp = {
        "from_date": "",
        "to_date": "",
        "city_code":[0],
        "user_type": this.user_type
        };
    }
    else{
      temp = {
        "from_date": "",
        "to_date": "",
        "city_code":temp_cities,
        "user_type": this.user_type
        };
    }
    this.server.fetchAllOrders(temp).subscribe( res => {
      this.setOrder(res);
    })
    this.loaded1=true;
   }
   dosomething(data){
      data.loading=1;
  }
   setOrder(res){
    if(res.success == true){
      this.orders = res.data;
      this.filteredOrders = this.orders;
      this.calculate();
      this.PageNumbersList();
      this.PageNumbersGrid();
    }
    else{
      this.orders= [];
      this.filteredOrders = this.orders;
    }
    this.loaded=true;
    this.parentComponent.showLoader = 0;
   }
  ngOnInit() {
    this.parentComponent.showLoader = 1;
    if(localStorage.getItem('ordersgridView')){
      this.gridView = true;
      this.listView = false;
    }
    if(localStorage.getItem('orderslistView')){
      this.gridView = false;
      this.listView = true;
    }
    if(this.user_type == 0)
    this.server.fetch_all_cities().subscribe(res => {
      this.setCities(res);
    })
    else if(this.user_type == 1)
    this.server.fetch_all_city().subscribe(res => {
      this.setCities(res);
    })
  }
  changelistView(){
    this.listView= true;
    this.gridView= false;
    localStorage.removeItem('ordersgridView');
    localStorage.setItem('orderslistView','true');
  }
  changegridView(){
    this.listView= false;
    this.gridView= true;
    localStorage.removeItem('orderslistView');
    localStorage.setItem('ordersgridView','true');
  }
  PageNumbersList() {
    this.maxList = this.currentPageList * this.ListItemsPerPage;
    if(this.maxList > this.filteredOrders.length)
    this.maxList= this.filteredOrders.length;
    this.initialPageList = ((this.currentPageList-1) * 10)+1 ;
    if(this.initialPageList > this.maxList)
    this.initialPageList = this.maxList;
  }
  PageNumbersGrid() {
    this.maxGrid = this.currentPageGrid * 12;
    if(this.maxGrid > this.filteredOrders.length)
    this.maxGrid= this.filteredOrders.length;
    this.initialPageGrid = ((this.currentPageGrid-1) * 12)+1 ;
    if(this.initialPageGrid > this.maxGrid)
    this.initialPageGrid = this.maxGrid;
  }
  changedList(event){
    this.currentPageList= parseInt(event);
    this.PageNumbersList();
  }
  changedGrid(event){
    this.currentPageGrid= parseInt(event);
    this.PageNumbersGrid();
  }
  exportAsXLSX():void {
    let temp= this.filteredOrders;
    let temp2=[];
    for(let x =0; x < temp.length;x++) {
      let temp1= {"Order_ID":null,"Created": this.date,"Service":'','Customer_Mobile':'',"City":'',"Status":''};
      if(temp[x].code)
      temp1.Order_ID=temp[x].code;
      if(temp[x].created)
      temp1.Created=temp[x].created;
      if(temp[x].service_label)
      temp1.Service=temp[x].service_label;
      if(temp[x].city_label)
      temp1.City=temp[x].city_label;
      if(temp[x].mobile)
      temp1.Customer_Mobile=temp[x].mobile;
      if("data.order_current_status == 0")temp1.Status='Requested';
      if("data.order_current_status == 1")temp1.Status='Assigned';     
      if("data.order_current_status == 3")temp1.Status='Completed';
      if("data.order_current_status == 4")temp1.Status='Cancelled';
      if("data.order_current_status == 2")temp1.Status='Going On';
      temp2.push(temp1);
    }
    this.excelService.exportAsExcelFile(temp2, 'data');
  }
  //for calculating the couont of different order status
  calculate(){
    this.total= this.filteredOrders.length;
    this.completed=0;
    this.requested=0;
    this.assigned=0;
    this.going_on=0;
    this.cancelled=0;
    for( let i =0; i < this.filteredOrders.length; i++){
      if(this.filteredOrders[i].order_current_status == 0) this.requested++;
      if(this.filteredOrders[i].order_current_status == 1) this.assigned++;
      if(this.filteredOrders[i].order_current_status == 2) this.going_on++;
      if(this.filteredOrders[i].order_current_status == 3) this.completed++;
      if(this.filteredOrders[i].order_current_status == 4) this.cancelled++;
    }
  }
  //for displaying different filters and styles
  displayTotal(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    this.completedStatus=false;
    this.requestedStatus=false;
    this.assignedStatus=false;
    this.goingOnStatus=false;
    this.cancelledStatus=false;
    this.totalStatus=true;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  displayCompleted(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    for(let i=0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].order_current_status == 3)
      temp[count++]=this.filteredOrders[i];
    }
    this.filteredOrders=temp;
    this.completedStatus=true;
    this.requestedStatus=false;
    this.assignedStatus=false;
    this.goingOnStatus=false;
    this.cancelledStatus=false;
    this.totalStatus=false;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  displayRequested(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    for(let i=0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].order_current_status == 0)
      temp[count++]=this.filteredOrders[i];
    }
    this.filteredOrders=temp;
    this.completedStatus=false;
    this.requestedStatus=true;
    this.assignedStatus=false;
    this.goingOnStatus=false;
    this.cancelledStatus=false;
    this.totalStatus=false;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  displayAssigned(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    for(let i=0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].order_current_status == 1)
      temp[count++]=this.filteredOrders[i];
    }
    this.filteredOrders=temp;
    this.completedStatus=false;
    this.requestedStatus=false;
    this.assignedStatus=true;
    this.goingOnStatus=false;
    this.cancelledStatus=false;
    this.totalStatus=false;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  displayGoingOn(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    for(let i=0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].order_current_status == 2)
      temp[count++]=this.filteredOrders[i];
    }
    this.filteredOrders=temp;
    this.completedStatus=false;
    this.requestedStatus=false;
    this.assignedStatus=false;
    this.goingOnStatus=true;
    this.cancelledStatus=false;
    this.totalStatus=false;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  displayCancelled(){
    this.filteredOrders = this.orders;
    let temp = [];
    let count = 0;
    if(this.code != 0)
    {
      for(let i = 0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].city_code == this.code)
      temp[count++]= this.filteredOrders[i];
      }
    this.filteredOrders = temp;
    }
    else if(this.code == 0)
    this.filteredOrders = this.orders;
    temp=[];
    count = 0;
    for(let i=0;i<this.filteredOrders.length;i++){
      if(this.filteredOrders[i].order_current_status == 4)
      temp[count++]=this.filteredOrders[i];
    }
    this.filteredOrders=temp;
    this.completedStatus=false;
    this.requestedStatus=false;
    this.assignedStatus=false;
    this.goingOnStatus=false;
    this.cancelledStatus=true;
    this.totalStatus=false;
    this.PageNumbersList();
    this.PageNumbersGrid();
    this.p =1;
    this.p1 =1;
  }
  //for filtering by city
  filterByCity(event){
    this.loaded = false;
    this.parentComponent.showLoader = 1;
    let searchIndex = event.target.selectedIndex;
    if(searchIndex > 0){
    this.code = this.cities[searchIndex - 1].code;
    let temp = [];
    let count = 0;
    this.filteredOrders = this.orders;
     for(let i = 0; i < this.filteredOrders.length; i++){
       if(this.filteredOrders[i].city_code == this.code)
        temp[count++]=this.filteredOrders[i];
     }
     this.filteredOrders = temp;
     temp = [];
    }
    if(searchIndex == 0){
      this.code = 0;
      this.filteredOrders = this.orders;
    }
    this.PageNumbersGrid();
    this.PageNumbersList();
    this.calculate();
    this.p =1;
    this.p1 =1;
    this.loaded = true;
    this.parentComponent.showLoader = 0;
  }
}
