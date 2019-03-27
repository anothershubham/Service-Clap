import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ScLayoutComponent } from "../../sc-layout.component";
import { ServerService } from "../../../shared/server.service";
import { ConnectionService } from 'ng-connection-service';
@Component({
  selector: 'app-o-detail',
  templateUrl: './o-detail.component.html',
  styleUrls: ['./o-detail.component.css']
})
export class ODetailComponent implements OnInit {
  // status = 'ONLINE';
  // dataLoaded:number=0;
  // isConnected = true;
  // all_services: string='';
  // all_cities:string='';
  // offer: any={};
  // private sub: any;
  // id: number;
  // offers=[];
  // user_code = localStorage.getItem('user_code');
  // user_name=localStorage.getItem('user_name');
  // constructor(private route: ActivatedRoute,public router: Router,public parentComponent:ScLayoutComponent,public apiCall:ServerService,private connectionService: ConnectionService) {
  //   if(localStorage.getItem('isConnected')){
  //     if(localStorage.getItem('isConnected') == 'true'){
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
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id'];
  //   })
  //   this.parentComponent.showLoader=1;
  //   this.apiCall.fetch_Specific_offer_details(this.id).subscribe(res=>this.fetchOfferDetail(res));
  //  }
  //  EditOffer(){
  //   this.router.navigate(['../offer/eOffer/'+this.id]);
  //  }
  //  blockUser(){
  //    this.apiCall.deleteData(this.id,'delete_offer').subscribe(res=>this.Response(res))
  //  }
  //  Response(res){
  //    if(res.success == true){
  //      this.parentComponent.showAlert=1;
  //      this.router.navigate(['../offer']);
  //    }else{
  //      this.parentComponent.showAlert=3;
  //    }
  //    this.parentComponent.messageAlert=res.message;
  //    this.parentComponent.setNotificationTimer();
  //  }
   constructor() {
   }
  ngOnInit() {
   
  }
  // show:number;
  // fetchOfferDetail(res){
  //   this.offer = res.data;
  //  if(localStorage.getItem('user_type') == '0'){
  //   this.show=1;
  //  }else{
  //    if(this.offer.created_by == localStorage.getItem('user_code')){
  //     this.show=1;
  //    }else{
  //     this.show=0;
  //    }
  //  }
    
  //   if(res.data.services.length > 0){
  //     for(let i=0;i<res.data.services.length-1;i++){
  //       this.all_services = this.all_services+res.data.services[i].label+', ';
  //     }
  //     this.all_services = this.all_services+res.data.services[res.data.services.length-1].label;
  //   }
  //   if(res.data.cities.length > 0){
  //     for(let i=0;i<res.data.cities.length-1;i++){
  //       this.all_cities = this.all_cities+res.data.cities[i].label+', ';
  //     }
  //     this.all_cities = this.all_cities+res.data.cities[res.data.cities.length-1].label;
  //   }
  //   this.parentComponent.showLoader=0;
  //   this.dataLoaded=1;
  // }
}
