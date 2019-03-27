import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../shared/excel.service';
import { Router } from '@angular/router';
import { ServerService } from '../../shared/server.service';
import { ScLayoutComponent } from '../sc-layout.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  cities;
  page = 1;
  itemsPerPage = 10;
  listView=true;
  searchIndex = 0;
  cityCode=0;
  gridView=false;
  onlineStatus;
  p=1;
  p1=1;
  currentPage=1; // for list view
  currentPage1=1; // for grid view
  offlineStatus;blockedStatus;unblockedStatus;verifiedStatus;unverifiedStatus;totalStatus=true;
  online;
  initial;
  initial1;
  loaded = false;
  loaded1 = false;
  max; // for list view
  max1; // for grid view
  offline;blocked;unblocked;verified;unverified;total;currentCity = "all_cities";
  data=[];
  filteredData;
  status = 'ONLINE';
  isConnected = true;
  user_type;
  constructor(public parentComponent:ScLayoutComponent, private excelService:ExcelService, private router: Router, private server: ServerService, private connectionService: ConnectionService) { 
    
    this.user_type = localStorage.getItem('user_type');
    if(localStorage.getItem('isConnected')){
      if(localStorage.getItem('isConnected') == 'true'){
        this.isConnected = true;
        this.parentComponent.showLoader =1;
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
        // this.parentComponent.showAlert=0;
      }
      else {
        this.status = "OFFLINE";
        // this.parentComponent.showAlert=4;
      }
    })
    if(localStorage.getItem('partnergridView')){
      this.gridView = true;
      this.listView = false;
    }
    if(localStorage.getItem('partnerlistView')){
      this.gridView = false;
      this.listView = true;
    }
    this.server.fetch_all_cities().subscribe(res => {
      this.setCities(res);
  })
  
  }
  dosomething(data){
      data.loading=1;
  }
  
  ngOnInit() {
    this.parentComponent.showLoader = 1;
  }
  setCities(res){
      this.loaded1 = true;
      if(res.success == true){
      this.cities= res.data;
    }
    else{
    }
    let temp_cities=[];
    let temp;
    if(localStorage.getItem('cities')){
      temp_cities = JSON.parse(localStorage.getItem("cities"));
    }
    if(localStorage.getItem("user_type") == "0"){
      temp = {
        "city_code":[0],
        "user_type": localStorage.getItem("user_type")
        };
    }
    else{
      temp = {
        "city_code":temp_cities,
        "user_type": localStorage.getItem("user_type")
      };
    }
    this.server.fetch_all_partners(temp).subscribe(res =>{
      this.setPartners(res);
  })
  }
  setPartners(res){
      this.loaded= true;
      if(res.success == true)
    {
      this.data = res.data;
      this.filteredData = this.data;
      this.calculate();
      this.PageNumbers();
    }
    else{
      this.data = [];
      this.filteredData = [];
      this.calculate();
    }
    this.parentComponent.showLoader = 0;
  }
  setFilteredPartners(res){
    this.loaded=true;
    if(res.success == true)
  {
    this.data = res.data;
    this.filteredData = this.data;
    this.calculate();
    this.PageNumbers();
  }
  else{
    this.filteredData = [];
    this.calculate();
  }
  this.parentComponent.showLoader = 0;
}
  PageNumbers() {
    this.max = this.currentPage * this.itemsPerPage;
    if(this.max > this.filteredData.length)
    this.max= this.filteredData.length;
    this.initial = ((this.currentPage-1) * 10)+1 ;
    if(this.initial > this.max)
    this.initial = this.max;
    this.max1 = this.currentPage1 * 12;
    if(this.max1 > this.filteredData.length)
    this.max1= this.filteredData.length;
    this.initial1 = ((this.currentPage1-1) * 12)+1 ;
    if(this.initial1 > this.max1)
    this.initial1 = this.max1;
  }
  changelistView(){
    this.listView= true;
    this.gridView= false;
    localStorage.removeItem('partnergridView');
    localStorage.setItem('partnerlistView','true');
  }
  changegridView(){
    this.listView= false;
    this.gridView= true;
    localStorage.removeItem('partnerlistView');
    localStorage.setItem('partnergridView','true');
  }
  exportAsXLSX() {
    let temp= this.data;
    let temp2=[];
    for(let x =0; x < temp.length;x++) {
      let temp1= {"Name":'',"City": '',"Created":'',"Mobile":''};
      if(temp[x].name)
      temp1.Name=temp[x].name;
      if(temp[x].created)
      temp1.Created=temp[x].created;
      if(temp[x].mobile)
      temp1.Mobile=temp[x].mobile;
      if(temp[x].city_label)
      temp1.City=temp[x].city_label;
      temp2.push(temp1);
    }
    this.excelService.exportAsExcelFile(temp2, 'data');
  }
  calculate(){
    this.total= this.filteredData.length;
    this.online=0;
    this.offline=0;
    this.blocked=0;
    this.unblocked=0;
    this.verified=0;
    this.unverified=0
    for( let i =0; i < this.filteredData.length; i++){
      if(this.filteredData[i].block_status == 1) this.blocked++;
      if(this.filteredData[i].active_status == 0) this.online++;
      if(this.filteredData[i].verify_status == 1) this.verified++;
    }
    this.unblocked= this.total-this.blocked;
    this.offline=this.total-this.online;
    this.unverified=this.total- this.verified;
  }
  filterByCity(event){
    var a = document.getElementById('exampleSelect1') as HTMLInputElement;
    a.value = event.target.value;
    this.parentComponent.showLoader = 1;
    this.loaded= false;
    this.searchIndex = event.target.selectedIndex;
    if(this.searchIndex > 0){
    let code = this.cities[this.searchIndex - 1].code;
    this.cityCode=code;
    let temp = {
      "city_code":[code],
      "user_type":localStorage.getItem('user_type')
      };
    
    this.server.fetch_all_partners(temp).subscribe(res =>{
      this.setFilteredPartners(res);
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
    if(localStorage.getItem("user_type") == "0"){
      temp = {
        "city_code":[0],
        "user_type": "0"
        };
    }
    else{
      temp = {
        "city_code":temp_cities,
        "user_type": localStorage.getItem("user_type")
      };
    }
        this.server.fetch_all_partners(temp).subscribe(res =>{
          this.setFilteredPartners(res);
        })
    }
    this.max = this.currentPage * this.itemsPerPage;
    if(this.max > this.filteredData.length)
    this.max= this.filteredData.length;
    this.initial = ((this.currentPage-1) * 10)+1 ;
    if(this.initial > this.max)
    this.initial = this.max;  
    this.max1 = this.currentPage1 * 12;
    if(this.max1 > this.filteredData.length)
    this.max1= this.filteredData.length;
    this.initial1 = ((this.currentPage1-1) * 12)+1 ;
    if(this.initial1 > this.max1)
    this.initial1 = this.max1;
    this.calculate();
  }
  displayTotal(){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    this.onlineStatus=false;
    this.offlineStatus=false;
    this.blockedStatus=false;
    this.unblockedStatus=false;
    this.verifiedStatus=false;
    this.unverifiedStatus=false;
    this.totalStatus=true;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayOnline(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].active_status == 0)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].active_status == 0)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=true;
    this.offlineStatus=false;
    this.blockedStatus=false;
    this.unblockedStatus=false;
    this.verifiedStatus=false;
    this.unverifiedStatus=false;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayOffline(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].active_status == 1)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=false;
    this.offlineStatus=true;
    this.blockedStatus=false;
    this.unblockedStatus=false;
    this.verifiedStatus=false;
    this.unverifiedStatus=false;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayBlocked(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].block_status == 1)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=false;
    this.offlineStatus=false;
    this.blockedStatus=true;
    this.unblockedStatus=false;
    this.verifiedStatus=false;
    this.unverifiedStatus=false;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayUnblocked(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].block_status == 0)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=false;
    this.offlineStatus=false;
    this.blockedStatus=false;
    this.unblockedStatus=true;
    this.verifiedStatus=false;
    this.unverifiedStatus=false;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayVerified(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].verify_status == 1)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=false;
    this.offlineStatus=false;
    this.blockedStatus=false;
    this.unblockedStatus=false;
    this.verifiedStatus=true;
    this.unverifiedStatus=false;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  displayUnverified(city){
    this.filteredData =  this.data;
    let temp = [];
    let count =0;
    if(this.searchIndex > 0)
    {
      for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].city_code == this.cityCode)
      temp[count++] = this.filteredData[i];
    }
    this.filteredData = temp;
    temp= [];
    count = 0;
    }
    if(this.searchIndex == 0)
    this.filteredData = this.data;
    for(let i=0;i<this.filteredData.length;i++){
      if(this.filteredData[i].verify_status == 0)
      temp[count++]=this.filteredData[i];
    }
    this.filteredData=temp;
    this.onlineStatus=false;
    this.offlineStatus=false;
    this.blockedStatus=false;
    this.unblockedStatus=false;
    this.verifiedStatus=false;
    this.unverifiedStatus=true;
    this.totalStatus=false;
    this.PageNumbers();
    this.p =1;
    this.p1 =1;
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.max = this.currentPage * this.itemsPerPage;
    if(this.max > this.filteredData.length)
    this.max= this.filteredData.length;
    this.initial = ((this.currentPage-1) * 10)+1 ;
    if(this.initial > this.max)
    this.initial = this.max;
  }
  changed1(event){
    this.currentPage= parseInt(event);
    this.max1 = this.currentPage1 * 12;
    if(this.max1 > this.filteredData.length)
    this.max1= this.filteredData.length;
    this.initial1 = ((this.currentPage1-1) * 12)+1 ;
    if(this.initial1 > this.max1)
    this.initial1 = this.max1;
  }
}
