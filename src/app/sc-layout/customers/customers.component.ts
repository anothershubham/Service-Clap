import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../shared/server.service';
import { ExcelService } from '../../shared/excel.service';
import { ScLayoutComponent } from '../sc-layout.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  status = 'ONLINE';
  isConnected = true;
  user_type;
  cityCode=0;
  loading='0';
  searchIndex = 0;
  loaded = false;
  loaded1 = false;
  currentCity="all_cities";
  cities = [];
  customerData= [];
  max; max1;
  initial;initial1;
  currentPage =1;
  currentPage1 =1;
  itemsPerPage =10;
  itemsPerPage1 =12;
  filteredCustomerData=[];
  constructor(private parentComponent: ScLayoutComponent, private server : ServerService, private excelService: ExcelService, private connectionService: ConnectionService) {
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
    })
    if(this.user_type == 0)
    this.server.fetch_all_cities().subscribe( res => {
      this.setCities(res);
    })
    else if(this.user_type == 1)
    this.server.fetch_all_city().subscribe( res => {
      this.setCities(res);
    }) 
    
   }  
   
    setCities(res){
     if(res.success == true){
       this.cities = res.data;
     }
     else{
     }
     let temp_cities=[];
    let temp;
    if(localStorage.getItem('cities')){
      let cities = JSON.parse(localStorage.getItem("cities"));
      temp_cities = cities;
    } 
    if(localStorage.getItem('user_type') == "0"){
      temp = {
        "city_code":[0],
        "user_type":localStorage.getItem('user_type')
        };
    } 
    else{
      temp = {
        "city_code":temp_cities,
        "user_type":localStorage.getItem('user_type')
        };
    }
     this.server.fetch_all_customer_city_wise(temp).subscribe(res =>{
      this.setCustomers(res);
      })
    this.loaded = true;

   }
   setCustomers(res){
    this.parentComponent.showLoader = 0;
    if(res.success == true){
      this.customerData = res.data;
      this.filteredCustomerData = res.data;
      this.PageNumbers();
    }
    else{
      this.filteredCustomerData = [];
    }
    this.loaded1 = true;
   }
  date = new Date();
  ngOnInit() {
    this.parentComponent.showLoader = 1;
    this.filteredCustomerData= this.customerData;
    this.PageNumbers();
    if(localStorage.getItem('customerGridView')){
      this.listView = false;
      this.gridView = true;
    }
    if(localStorage.getItem('customerListView'))
    {
      this.listView = true;
      this.gridView = false;
    }
  }
  PageNumbers() {
    this.max = this.currentPage * this.itemsPerPage;
    if(this.max > this.filteredCustomerData.length)
    this.max= this.filteredCustomerData.length;
    this.initial = ((this.currentPage-1) * 10)+1 ;
    if(this.initial > this.max)
    this.initial = this.max;
    this.max1 = this.currentPage1 * 12;
    if(this.max1 > this.filteredCustomerData.length)
    this.max1= this.filteredCustomerData.length;
    this.initial1 = ((this.currentPage1-1) * 12)+1 ;
    if(this.initial1 > this.max1)
    this.initial1 = this.max1;
  }
  listView = true;
  gridView= false;
  changelistView(){
      this.listView = true;
      this.gridView = false;
      localStorage.setItem('customerListView','true');
  }
  changegridView(){
      this.listView = false;
      this.gridView = true;
      localStorage.setItem('customerGridView','true');
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.max = this.currentPage * this.itemsPerPage;
    if(this.max > this.filteredCustomerData.length)
    this.max= this.filteredCustomerData.length;
  }
  changed1(event){
    this.currentPage1= parseInt(event);
    this.max1 = this.currentPage1 * 12;
    if(this.max1 > this.filteredCustomerData.length)
    this.max1= this.filteredCustomerData.length;
  }
  dosomething(data){
      data.loading=1;
  }
  dosomething1(data){
      data.loading=1;
  }
  filterByCity(event){
    var a = document.getElementById('exampleSelect1') as HTMLInputElement;
    a.value = event.target.value;
    this.parentComponent.showLoader = 1;
    this.loaded1= false;
    this.searchIndex = event.target.selectedIndex;
    if(this.searchIndex > 0){
    let code = this.cities[this.searchIndex - 1].code;
    this.cityCode= code;
    let temp = {
      "city_code":[code],
      "user_type":localStorage.getItem('user_type')
      };
    this.server.fetch_all_customer_city_wise(temp).subscribe(res =>{
      this.setCustomers(res);
      })
    }
    if(this.searchIndex == 0){
      this.cityCode = 0;
        let temp_cities=[];
    let temp;
    if(localStorage.getItem('cities')){
      let cities = JSON.parse(localStorage.getItem("cities"));
      temp_cities = cities;
    }
    // console.log(localStorage.getItem("user_type"));
    
    if(localStorage.getItem("user_type") == '0'){
      temp = {
        "city_code": [0],
        "user_type": localStorage.getItem("user_type")
        };
    }
    else{
      temp = {
        "city_code":temp_cities,
        "user_type": localStorage.getItem("user_type")
      };
    }
    
    this.server.fetch_all_customer_city_wise(temp).subscribe(res =>{
      this.setCustomers(res);
      })
    }
  }
  exportAsXLSX(searchText) {
    let temp = this.filteredCustomerData;
    
    let temp2=[];
    for(let x =0; x < temp.length;x++) {
      let temp1= {"Name":'',"Mobile":'',"Email": '',"City": '',"Created":''};
      if(temp[x].name)
      temp1.Name=temp[x].name;
      if(temp[x].created)
      temp1.Created=temp[x].created;
      if(temp[x].mobile)
      temp1.Mobile=temp[x].mobile;
      if(temp[x].city_label)
      temp1.City=temp[x].city_label;
      if(temp[x].email)
      temp1.Email=temp[x].email;
      temp2.push(temp1);
    }
     this.excelService.exportAsExcelFile(temp2, 'data');
  }
}
