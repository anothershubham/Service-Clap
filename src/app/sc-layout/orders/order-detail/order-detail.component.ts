import { ConnectionService } from 'ng-connection-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from '../../../shared/server.service';
import { ScLayoutComponent } from '../../sc-layout.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  id;
  step =1 ;
  searchText;searchText1;
  date = new Date();
  loaded: Promise<boolean>;
  loaded1: Promise<boolean>;
  loaded2: Promise<boolean>;
  loaded3: Promise<boolean>;
  cities = [
    { code: null, city_label: ''},
  ];
  selectedPartner;
  customerData;
  loading= '0';
  loading1= '0';
  status = 'ONLINE';
  isConnected = true;
  selectedPartnertrue;
  order =
    {
      code: null ,customer_code: null, order_address: '', longitude: null, lattitude: null, total_amount: null, name:'', mobile: '', email:'', address: '', city_label: '', city_code: null,description: '', service_label: '', service_icon: '', service_price: null,order_request_date_time: this.date, order_assign_date_time: this.date, order_current_status_date_time: this.date,order_current_status: null, visit_date_time: this.date, work_started_date_time: this.date,work_cancelled_date_time: this.date, work_finished_date_time: this.date,work_duration: null, paid_amount: null, amount_paid_status: null, partner_code: null, order_cancelled_by: '', admin_code: null, created: this.date, modified: this.date, service_code: null
    };
    partners_history=[];
  all_partners= [];
  constructor(private parentComponent: ScLayoutComponent, private route: ActivatedRoute, private router: Router, private server: ServerService, private connectionService: ConnectionService) {
    this.route.params.subscribe( params => {
      this.ngOnInit()
    })
   }
  dosomething(){
      this.loading= '1';
  }
  dosomething1(){
      this.loading1= '1';
  }
   setCities(res)
   {
    this.loaded2 = res;
    if(res.success == true){
      this.cities = res.data;
     }
     else{
     }
   }
   setOrder(res){
    this.parentComponent.showLoader = 0;
    if(res.success == true){
      this.order = res.data;
      this.partners_history = res.data.partners_history;
      let activeTemp= {
        "service_code": this.order.service_code,
        "city_code": this.order.city_code,
      }
      this.server.fetch_all_active_partner(activeTemp).subscribe(res => {
        this.setPartners(res);
      });
      let temp={ customer_code: this.order.customer_code };
      this.server.fetch_specific_customer_details(temp).subscribe(res =>{
        this.setCustomer(res);
      })

     }
     else if(res.success == false){
      // for(var k in this.order) if(!this.order[k].constructor.toString().match(/^function Function\(/)) delete this.order[k];
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
      this.router.navigate(['/order']);
     }
    this.loaded1 = res;
    this.parentComponent.setNotificationTimer();
   }
   setCustomer(res){
     if(res.success == true){
       this.customerData = res.customer_data;
     }
     else{
     }
    this.loaded = res;
   }
   setPartners(res){
    if(res.success == true){
      
      this.all_partners = res.data;
     }
     else{
     }
    this.loaded3 = res;
   }
   savePartnerDet(current_partner){
     this.selectedPartner = current_partner;
     this.selectedPartnertrue = true;
   }
   showPartner(){
     for( let i=0;i< this.all_partners.length;i++){
       if(this.all_partners[i].code == this.order.partner_code)
       this.selectedPartner = this.all_partners[i];
     }
   }
   switchPartner(){
    let temp = {
      user_code: localStorage.getItem('user_code'),
      partner_code: this.selectedPartner.code,
      order_code: this.order.code
    }
    this.emptySelectedPartner();
    this.server.switch_partner(temp).subscribe(res =>{
      
     let temp={ order_code: this.id};
     this.server.fetchSpecificOrder(temp).subscribe(res => {
       this.setOrder(res);
     });
    })
  }
   assignPartner(){
     let temp = {
       user_code: localStorage.getItem('user_code'),
       partner_code: this.selectedPartner.code,
       order_code: this.order.code
     }
     this.emptySelectedPartner();
     this.server.assign_partner(temp).subscribe(res =>{
       
      let temp={ order_code: this.id};
      this.server.fetchSpecificOrder(temp).subscribe(res => {
        this.setOrder(res);
      });
     })
   }
   emptySelectedPartner(){
     this.selectedPartner = null;
     this.selectedPartnertrue = false;
   }
  ngOnInit() {
    this.parentComponent.showLoader = 1;
    // this.partners_history=[];
    // this.cities=[];
    let temp_cities=[];
    let temp1;
    if(localStorage.getItem('cities')){
      let cities = JSON.parse(localStorage.getItem("cities"));
      temp_cities = cities;
    }
    if(temp_cities.length == 0){
      temp1 = {
        "city_code":[0],
        "user_type": localStorage.getItem("user_type")
        };
    }
    else{
      temp1 = {
        "city_code":temp_cities,
        "user_type": localStorage.getItem("user_type")
        };
    }
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
    
    this.route.params.subscribe( params => {
      this.id= params.id;
    })
    
    this.server.fetch_all_cities().subscribe(res => {
      this.setCities(res);
    })
    let temp={ order_code: this.id};
    this.server.fetchSpecificOrder(temp).subscribe(res => {
      this.setOrder(res);
    });
  }

  cancelOrder(){
    let temp = {
        user_code: localStorage.getItem('user_code'),
        order_code: this.id,
        user_type: localStorage.getItem('user_code'),
    }
    this.server.cancelOrder(temp).subscribe( res =>{
      this.setCancel(res);
    })
    
  }
  setCancel(res){
    if(res.success == true){
      let temp= { order_code: this.id};
      this.server.fetchSpecificOrder(temp).subscribe(res => {
      this.setOrder(res);
    }) 
    }
    else{
      this.parentComponent.showAlert =3;
      this.parentComponent.messageAlert=res.message;
     }
     this.parentComponent.setNotificationTimer();
  }
  deleteOrder() {
      this.server.deleteOrder(this.id).subscribe( res =>{
      })
      this.router.navigate(['order']);
  }

}
