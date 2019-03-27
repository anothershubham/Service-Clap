import { OrderDetailComponent } from './../../sc-layout/orders/order-detail/order-detail.component';
import { ScLayoutComponent } from './../../sc-layout/sc-layout.component';
import { Title } from '@angular/platform-browser';
import { DataService } from './../data.service';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { ServerService } from './../server.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { filter, map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showId = true;
  title;
  showId1 = false;
  show = false;
  unseen = 0;
  loaded: Promise<boolean>;
  showdropdown:number=0;
  toggleId() {
    this.showId1 = !this.showId1;
    this.showId = !this.showId;
    this.showdropdown=0;
    localStorage.setItem('magnify','1');
    
  }
  receiveMessage($event) {
    this.title = $event;
  }
  changeRoute(){
    // console.log(localStorage.getItem('magnify'));
    if(localStorage.getItem('magnify') == '1'){
      var a = document.getElementById('clk') as HTMLInputElement;
      a.click();
      localStorage.removeItem('magnify');
    }
    
    if(localStorage.getItem('dropdown') == '1'){
      var a = document.getElementById('clk') as HTMLInputElement;
      a.click();
      localStorage.removeItem('dropdown');
    }
  }
  toggleId1() {
    this.showId = !this.showId;
    this.showId1 = !this.showId1;
    localStorage.removeItem('dropdown');
  }

  Notifications1: any[] = []

  searchSuggestion: any[] = []


    pushRightClass: string = 'push-right';

  constructor(private router: Router, private server: ServerService, private data: DataService,private titleService: Title, private activatedRoute: ActivatedRoute, private parentComponent: ScLayoutComponent) {
    let temp = {
      user_code: localStorage.getItem('user_code'),
      user_type: [2]
    }
    this.server.fetch_all_notification(temp).subscribe(res =>{
      this.setNotification(res);
    }) 
    this.data.currentMessage.subscribe(message => this.title = message)
   }
   setNotification(res){
    this.loaded= res;
     if(res.success == true){
      this.Notifications1 = res.data;
      this.unseen = 0;
      
      for(let i=0;i<this.Notifications1.length;i++){
        if(this.Notifications1[i].seen == 0)
          this.unseen++;
      }
     }
     else{

     }
   }
   readAllNotification(){
     let temp=[];
     for(let i=0;i<this.Notifications1.length;i++){
       if(this.Notifications1[i].code != undefined){
         temp[i] = this.Notifications1[i].code;
       }
     }
     let temp1 ={
      "notification_codes": temp
     }
     let temp2 = {
      user_code: localStorage.getItem('user_code'),
      user_type: [2]
    }
     this.server.setAllReadNotification(temp1).subscribe( res =>{
      this.server.fetch_all_notification(temp2).subscribe(res =>{
        this.setNotification(res);
      })
     })
   }
   setRouter(path,path1){
    let temp = [];
    temp[0]=path1;
    let temp1 ={
      "notification_codes": temp
     }
    let temp2 = {
      user_code: localStorage.getItem('user_code'),
      user_type: [2]
    }
    
     this.server.setAllReadNotification(temp1).subscribe( res =>{

      this.server.fetch_all_notification(temp2).subscribe(res =>{
        this.setNotification(res);
      })
      
     })
     this.router.navigateByUrl('order/orderDetail/'+path);

   }
  ngOnInit() {
    this.router.events
        .pipe(
         filter(event => event instanceof NavigationEnd),
         map(() => this.activatedRoute),
         map(route => route.firstChild),
         switchMap(route => route.data),
         )
  }
  signout() {
    localStorage.removeItem('isloggedinsc2v13');
    this.router.navigate(['login']);
  }
    isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
    }
    ff(){}
    toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
    }
    
    GlobalSearch(event){
      if(event.length == 0){
        this.showdropdown =0;
        localStorage.setItem("dropdown",'0');
      }
      if(event.length > 2){
        // var a = document.getElementById('menu1') as HTMLInputElement;
        // a.click();
        this.showdropdown=1;
        localStorage.setItem("dropdown",'1');
        this.server.global_Search(event).subscribe(res =>{
          this.responseOfGlobalSearch(res);
        })
      }
    }
    nodata:number=0;
    newarray=[];
    responseOfGlobalSearch(res){
      this.newarray=[];
      if(res.success == true){
        this.admins = res.data[3].admin;
        this.customers = res.data[2].customers;
        this.partners = res.data[0].partners;
        this.orders = res.data[1].orders;
        console.log(this.admins);
        if(this.admins.length > 0){
          for(var i=0;i<this.admins.length;i++){
            this.newarray.push(this.admins[i]);
          }
        }
        if(this.customers.length > 0){
          for(var i=0;i<this.customers.length;i++){
            this.newarray.push(this.customers[i]);
          }
          // this.newarray.push(this.customers);
        }
        if(this.partners.length > 0){
          for(var i=0;i<this.partners.length;i++){
            this.newarray.push(this.partners[i]);
          }
          // this.newarray.push(this.partners);
        }
        if(this.orders.length > 0){
          for(var i=0;i<this.orders.length;i++){
            this.newarray.push(this.orders[i]);
          }
          // this.newarray.push(this.orders);
        }
        console.log(this.newarray);
      }else{
        this.nodata=1;
      }
      var l = this.newarray.length -1;
      // var a = document.getElementById('l') as HTMLInputElement;
      // a.style.display='none';
    }
    admins=[];
    customers=[];
    partners=[];
    orders=[];
    routerlink(link,code){
      var newlink = link+code;
      var a = document.getElementById('clk') as HTMLInputElement;
      a.click();
      localStorage.removeItem('dropdown');
      localStorage.removeItem('magnify');
      this.router.navigate([newlink]);
    }
    hideNotification(){
      this.show = false;
    }
    showNotification(){
      this.show = true;
    }
}
