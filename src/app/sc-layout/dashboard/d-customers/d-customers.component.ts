import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ServerService } from "../../../shared/server.service";
import { ScLayoutComponent } from "../../sc-layout.component";
import { DashboardComponent } from "../dashboard.component";
@Component({
  selector: 'app-d-customers',
  templateUrl: './d-customers.component.html',
  providers:[DatePipe],
  styleUrls: ['./d-customers.component.css']
})
export class DCustomersComponent implements OnInit {
  type: any;
  loading='0';
  city_code=[];
  filterType: number=0;
  errorMessage: string='';
  t_date: number=0;
  f_date: number=0;
  tdayDate: string;
  tdate: string="0";
  fdate: string;
  showCustom:number=0;
  dateErrorMessage: string;
  dateerror:number=0;
  date: string;
  filtercloseModal;
  today=new Date();
  p=1;
  currentPage =1;
  itemsPerPage =12;
  totalLength: number;
  dataLoaded:number=0;
  customers: any[] = [];
  dates: any[] = [
    {
      "code":"1",
      "type": "Today"
    },
    { 
      "code":"2",
      "type": "Last 30 days"
    },
    { 
      "code":"3",
      "type": "Last 7 days"
    },
    { 
      "code":"4",
      "type": "Yesterday"
    },   
    { 
      "code":"5",
      "type": "Custom"
    },
  ]

  constructor(private datePipe: DatePipe,public apiCall:ServerService,public parentComponent:ScLayoutComponent,public pComponent:DashboardComponent) {
    var currentdate=new Date();
    this.pComponent.showLoader=2;
    this.fdate = this.datePipe.transform(currentdate,"yyyy-MM-dd");
    this.totalLength=12;
    this.apiCall.fetchDashboardData().subscribe(res=>this.fetchedDashboardData(res))
   }
   sdf(event){
   }
  openFilterModal(){
    this.clearForm();
  }
  dosomething(){
    this.loading='1';
  }
  clearFilterModal(){
    this.filterType=0;
    this.dataLoaded=0;
    this.pComponent.showLoader=2;
    this.apiCall.fetchDashboardData().subscribe(res=>this.fetchedDashboardData(res))
  }
  changed(event){
    this.currentPage= parseInt(event);
    this.totalLength = this.currentPage * this.itemsPerPage;
    if(this.totalLength > this.customers.length)
    this.totalLength= this.customers.length;
  }
  FilterData(){
    var firstOption = document.getElementById('exampleFormControlSelect1') as HTMLInputElement;
    var a = document.getElementById('fromDate') as HTMLInputElement;
    var b = document.getElementById('toDate') as HTMLInputElement;
    if(firstOption.value == '5'){
      if(a.value !='' && b.value !=''){
        var d1 = new Date(a.value);
        var d2 = new Date(b.value);
        this.fdate = this.datePipe.transform(d1,"yyyy-MM-dd");
        this.tdate = this.datePipe.transform(d2,"yyyy-MM-dd");
        var timeDiff = d2.getTime() - d1.getTime();
        var DaysDiff = timeDiff / (1000 * 3600 * 24);
        if(a.value == b.value){
          this.t_date=1;
          this.errorMessage = "Both date field cannot be same";
        }
        else if(DaysDiff < 0){
          this.t_date=1;
          this.errorMessage = "From date is greater than to date";
        }
        else{
          this.t_date =0;
          this.filtercloseModal = 'modal';
          this.filterType = this.type;
          this.apiCall.filterDashboardData(this.city_code,this.fdate,this.tdate).subscribe(res=>this.fetchedDashboardData(res));
        }
  
      }
      else{
        if(a.value == ''){
          this.f_date = 1;
        }
        if(b.value == ''){
          this.t_date=1;
          this.errorMessage = "To date is required";  
        }
        this.filtercloseModal = '';
      }
    }
    else{
      if(firstOption.value == '1'){
        this.tdate='0'
      }
      this.filtercloseModal = 'modal';
      this.filterType = this.type;
      this.apiCall.filterDashboardData(this.city_code,this.fdate,this.tdate).subscribe(res=>this.fetchedDashboardData(res));
    }
    
  
  
    
  }
  ChooseDate(event){
    var currentdate=new Date();
    this.today = currentdate;
    this.fdate = this.datePipe.transform(this.today,"yyyy-MM-dd");
    this.tdayDate = this.fdate;
    this.type = event.value;
    if(event.value == '1'){
      this.showCustom=0;
      this.fdate = this.datePipe.transform(this.today,"yyyy-MM-dd");
      this.tdate = "0";
    }else if(event.value == '4'){
      this.showCustom=0;
      currentdate.setDate(currentdate.getDate()-1);
      this.fdate = this.datePipe.transform(currentdate,"yyyy-MM-dd");
      this.tdate = "0";
    }
    else if(event.value == '2'){
      this.showCustom=0;
      let newDate = new Date(currentdate.setDate(currentdate.getDate()-30))
      this.fdate = this.datePipe.transform(newDate,"yyyy-MM-dd");
      this.tdate = this.tdayDate;
    }
    else if(event.value == '3'){
      this.showCustom=0;
      let newDate = new Date(currentdate.setDate(currentdate.getDate()-7))
      this.fdate = this.datePipe.transform(newDate,"yyyy-MM-dd");
      this.tdate = this.tdayDate;
    }
    else if(event.value == '5'){
      this.showCustom=1;
      this.f_date=0;
      this.t_date=0;
    }
    
  }
  CheckInput(fromDate){
    if(fromDate == 'fromDate'){
      this.f_date=0;
    }
    if(fromDate == 'toDate'){
      this.t_date=0;
    }
  
  }
  clearForm(){
    var c = document.getElementById('exampleFormControlSelect1') as HTMLInputElement;
    c.value ='1';
    // this.filterType=0;
    this.type=1;
    if(this.showCustom ==1){
      
      var a = document.getElementById('fromDate') as HTMLInputElement;
      a.value='';
      var b = document.getElementById('toDate') as HTMLInputElement;
      b.value='';
      this.showCustom =0;
    }else{
      this.showCustom =0;
      
    }
    
  }
  ngOnInit() {
    this.pComponent.showLoader=2;
    this.type=1;
    this.city_code = [3,5];

    
  }
  fetchedDashboardData(res){
    this.pComponent.showLoader=0;
    this.dataLoaded=1;
   
    if(res.success == true){
      this.customers = res.total_customer;
      this.totalLength = this.currentPage * this.itemsPerPage;
      if(this.totalLength > this.customers.length)
      this.totalLength= this.customers.length;
    }else{
      this.customers = [];
    }
    
  }
}
