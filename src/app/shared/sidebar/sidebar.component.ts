import { filter, map, switchMap } from 'rxjs/operators';
import { DataService } from './../data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ServerService } from "../server.service";
import { HeaderComponent } from "../header/header.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers:[HeaderComponent],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  profile: any={name: ''};
  user_type = localStorage.getItem('user_type');
  username = localStorage.getItem('user_name');
  image_url = localStorage.getItem('image_url');
  usercode = localStorage.getItem('user_code');
  label;
  loaded = false;
  loading='0';
  callOnInit = false;
  profileName;
  profile_image;
  user_code=localStorage.getItem('user_code')
  @Output() messageEvent = new EventEmitter<string>();
  sidemenus: any[] = [
    {
      "label": "Dashboard",
      "imageUrl": "assets/icons/dashboard.svg",
      "imageUrl1": "assets/icons/dashboard1.svg",
      "alt": "Dashboard",
      "path": "/dashboard",
      "user_type":'',
      "rla": "#rla1",
      "hidden": "hidden"
    },
    {
      "label": "Orders",
      "imageUrl": "assets/icons/shopping-bag (2).svg",
      "imageUrl1": "assets/icons/shopping-bag (2) - Copy.svg",
      "alt": "Orders",
      "path": "/order",
      "user_type":'',
      "rla": "#rla2"
    },
    {
      "label": "Offers",
      "imageUrl": "assets/icons/discount-sticker-with-percentage.svg",
      "imageUrl1": "assets/icons/discount-sticker-with-percentage1.svg",
      "alt": "Offers",
      "path": "/offer",
      "user_type":'',
      "rla": "rla3",
      "hidden": "hidden"
    },
    {
      "label": "Partners",
      "imageUrl": "assets/icons/handshake (1).svg",
      "imageUrl1": "assets/icons/handshake1.svg",
      "alt": "Partners",
      "path": "/partner",
      "user_type":this.user_type,
      "rla": "rla4"
    },
    {
      "label": "Customers",
      "imageUrl": "assets/icons/user (4).svg",
      "imageUrl1": "assets/icons/user1.svg",
      "alt": "Customers",
      "path": "/customer",
      "user_type":'',
      "rla": "rla5"
    },
    {
      "label": "Restaurants",
      "imageUrl": "assets/icons/restaurant.svg",
      "imageUrl1": "assets/icons/restaurant1.svg",
      "alt": "Restaurants",
      "path": "/restaurants",
      "user_type":'',
      "rla": "rla9"
    },
    {
      "label": "Delivery Boys",
      "imageUrl": "assets/icons/gift.svg",
      "imageUrl1": "assets/icons/gift1.svg",
      "alt": "Delivery Boys",
      "path": "/beliveryBoy",
      "user_type":'',
      "rla": "rla10",
      "hidden": "hidden"
    },
    {
      "label": "Admins",
      "imageUrl": "assets/icons/user (5).svg",
      "imageUrl1": "assets/icons/user (5)1.svg",
      "alt": "Admins",
      "path": "/admin",
      "user_type":this.user_type,
      "rla": "rla6",
      "hidden": "hidden"
    },
    // {
    //   "label": "Reports",
    //   "imageUrl": "assets/icons/progress-report.svg",
    //   "alt": "Reports",
    //   "path": ""
    // },
    {
      "label": "Broadcaster",
      "imageUrl": "assets/icons/megaphone.svg",
      "imageUrl1": "assets/icons/megaphone1.svg",
      "alt": "Broadcaster",
      "path": "/broadcaster",
      "user_type":this.user_type,
      "rla": "rla7",
      "hidden": "hidden"
    },
    {
      "label": "Data Centre",
      "imageUrl": "assets/icons/database.svg",
      "imageUrl1": "assets/icons/database1.svg",
      "alt": "Data Centre",
      "path": "/data_centre",
      "user_type":this.user_type,
      "rla": "rla8",
      "hidden": "hidden"
    },
    {
      "label": "Settings",
      "imageUrl": "assets/icons/settings-work-tool.svg",
      "imageUrl1": "assets/icons/settings-work-tool1.svg",
      "alt": "Settings",
      "path": "/settings",
      "user_type":'',
      "rla": "rla11",
      "hidden": "hidden"
    },
  ] 
 
  @Output() collapsedEvent = new EventEmitter<boolean>();
  msg: any;
  constructor(private router: Router, private data: DataService, private activatedRoute: ActivatedRoute,public server:ServerService,public callHeader:HeaderComponent,private _http: HttpClient) {
    this.router.events
        .pipe(
         filter(event => event instanceof NavigationEnd),
         map(() => this.activatedRoute),
         map(route => route.firstChild),
         switchMap(route => route.data),
         map(data => this.label = data 
         ),
         ).subscribe( data =>{
           this.data.changeMessage(this.label.title);
         })
        //   var usercode = localStorage.getItem('user_code');
        //   this.server.fetch_specific_admin_details(usercode).subscribe(res =>{
        //   this.ngOnInit();
        // })
        // this.profileName=localStorage.getItem('user_name');
        // data.itemValue.subscribe((nextValue) => {
        //   alert(nextValue);  // this will happen on every change
        //   this.profileName=nextValue;
        // })   10 din 
        // data.itemValue1.subscribe((nextValue) => {
        //   alert(nextValue);  // this will happen on every change
        //   this.profile_image=nextValue;
        // })
        this.data.name.subscribe(name => this.profileName = name);
        this.data.image.subscribe(image => this.profile_image = image);
        this.user_type
        if(this.profileName == undefined || this.profileName == ''){
          this.profileName = localStorage.getItem('user_name');
        }
        if(this.profile_image == undefined || this.profile_image == ''){
          this.profile_image = localStorage.getItem('image_url');
        }
        
        this.loaded = true;
  }

logout() {
  // localStorage.removeItem('isLoggedInSC2V5');
  localStorage.clear();
  this.router.navigate(['/login']);
}
response(res){
  this.loaded =true;
  this.profile = res.data;
}
  ngOnInit() {
    const loginapi=JSON.stringify({
      "mobile":localStorage.getItem('user_mobile'),
      "password":localStorage.getItem('user_password'),
      });
    this._http.post('http://206.189.129.220:2018/api/login',loginapi,{
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(data =>this.loginResponse(data));
    var usercode = localStorage.getItem('user_code');
    // this.server.fetch_specific_admin_details(usercode).subscribe(res =>{
    //   this.response(res);
    // })
  this.user_type = localStorage.getItem('user_type');
  this.username = localStorage.getItem('user_name');
  this.image_url = localStorage.getItem('image_url');
  this.usercode = localStorage.getItem('user_code');
  }
  loginResponse(res)
  {
    let array=[];
    if(res.success == true){
      localStorage.setItem('user_code',res.data.code);
      localStorage.setItem('token',res.token);
      localStorage.setItem('user_name',res.data.name);
      localStorage.setItem('user_mobile',res.data.mobile);
      localStorage.setItem('user_password',res.data.password);
      localStorage.setItem('image_url',res.data.profile_image_url);
      for(var i=0;i<res.data.cities.length;i++){
        array.push(res.data.cities[i].code);
      }
      localStorage.setItem('city_code',JSON.stringify(array));
      localStorage.setItem('cities',JSON.stringify(array));
      localStorage.setItem('city_label',res.data.city_label);
      localStorage.setItem('user_type',res.data.user_type);
      localStorage.setItem('isloggedinsc2v13','true');
    } 
    else {
      this.router.navigate(['/login']);
      localStorage.clear();
    }
  }
  // setSidebar(res){
  //   this.profile.name = res;
  //   // var usercode = localStorage.getItem('user_code');
  //   // this.server.fetch_specific_admin_details(usercode).subscribe(res =>{
  //   //   // this.setResponse(res);
  //   // })
  // }
  // setResponse(res){
  //   this.loaded= false;
  //   if(res.success == true){
  //     // this.profile={};
      
  //   }
  //   this.loaded =true;
  // }
  // setAdmin(res){
  //   if(res.success==true)
  //   {
    
  //     this.Gallery=res.data;//loader
  //     this.croppedImage = this.Gallery.profile_image_url;
  //     this.password = this.Gallery.password//image detail to edit
  //     this.editForm = this.formBuilder.group({
  //     });
  //   }
  //   else{
     
  //   }
  // }
 
  dosomething(){
      this.loading='1';  
  }
  call(){
    let temp;
    this.callHeader.changeRoute();
  }
}  