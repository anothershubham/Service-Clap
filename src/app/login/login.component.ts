import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerService } from "../shared/server.service";
import { Http, Headers,RequestOptions } from '@angular/http';
import { Response} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { ScLayoutComponent } from "../sc-layout/sc-layout.component";
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Observable} from 'rxjs';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { ConnectionService } from 'ng-connection-service';      
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[ScLayoutComponent],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  url= "http://139.59.93.31:2018/";
  status = 'ONLINE';
  isConnected = true;
  showLoader = 0;
  submitted = false;
  subbmitted = false;
  subbbmitted = false;
  submittedd=false;
  register: FormGroup;
  registers: FormGroup;

  validate: FormGroup;
  registerForm: FormGroup;
  password1;
  password2;
  password;
  show=1;
  error=0;
  pwdvalue=0;
  match;
  mobilevalue=0; 
  otpvalue:number;
  showAlert:number=0;
  messageAlert:string='';
  mobile: any;
  res: any;

  constructor(private router: Router,private formBuilder: FormBuilder,private apicall: ServerService,
    public http:Http, public _http:HttpClient, private parentComponent: ScLayoutComponent,private connectionService: ConnectionService) {
    localStorage.clear();
    if(localStorage.getItem('isConnected')){
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
        this.status = "ONLINE";
      }
      else {
        this.status = "OFFLINE";
      }
    })
   }
  
  move(){
  
    this.show=2;
    this.registerForm.reset();
  }

  ngOnInit() {  
    localStorage.clear();
    //if(localStorage.getItem('isLoggedInSC2V1'))
    this.registerForm = this.formBuilder.group({
      Mobile: ['', Validators.required,],
      // email: ['',  Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });  

    this.register= this.formBuilder.group({
      Mobile: ['', Validators.required],
     });

     this.registers= this.formBuilder.group({
      Mobile: ['', Validators.required],   
     });
     this.validate= this.formBuilder.group({
      password:['', Validators.required],
      confirm_password:['',Validators.required],
     });
     
  }
  /*
set()
{
 
  this.password.reset();
}*/

 
  get f() { return this.registerForm.controls;}
  get f1() { return this.register.controls;}
  get f3() { return this.registers.controls;}
  get f4() { return this.validate.controls;}

  abc(event){
    // console.log(event);
   this.match=event;
  //  console.log(this.match); 
  }
  cad(event){
 
    if(this.match==event){
     
      this.pwdvalue=0;
  }
  else{
    this.pwdvalue=1;
   
  }
}
aaa(event)
{
  this.pwdvalue=0;
}

//login starts
private subscription: Subscription;
  private timer:Observable<any>;
setNotificationTimer(){
  this.timer        = timer(5000); // 5000 millisecond means 5 seconds
  this.subscription = this.timer.subscribe(() => {
      this.showAlert = 0;
  });
}
  loginValidation(formvalue) {
   
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
  else{
    let headers=new Headers();
  headers.append('Content-Type', 'application/json');
    const loginapi=JSON.stringify({
    "mobile":formvalue.Mobile,
    "password":formvalue.password,
    });
   
    this._http.post(this.url+'api/login',loginapi,{
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(data =>this.loginResponse(data));
    
     
    } 
 }
 
   
 array=[]; 
 loginResponse(res)
 {
   if(res.success == true){
     this.showAlert=1;
     localStorage.setItem('user_code',res.data.code);
     localStorage.setItem('token',res.token);
     localStorage.setItem('user_name',res.data.name);
     localStorage.setItem('user_mobile',res.data.mobile);
     localStorage.setItem('user_password',res.data.password);
     localStorage.setItem('image_url',res.data.profile_image_url);
     for(var i=0;i<res.data.cities.length;i++){
       this.array.push(res.data.cities[i].code);
     }
     localStorage.setItem('city_code',JSON.stringify(this.array));
     localStorage.setItem('cities',JSON.stringify(this.array));
     localStorage.setItem('city_label',res.data.city_label);
     localStorage.setItem('user_type',res.data.user_type);
     this.router.navigate(['/dashboard']); 
     localStorage.setItem('isloggedinsc2v13','true');
    //  console.log(localStorage.getItem('isloggedinsc2v13'));
     this.router.navigate(['/dashboard']); 
   }  
   else{
    this.showAlert=3;
    this.messageAlert= res.message;
    this.setNotificationTimer();
   } 
 }
//login ends


movee()
{
  this.show=1; 
  //this.error=0;
  this.registerForm.reset();
  this.register.reset();
  this.registers.reset();
 
  // this.show =0;
  this.submitted = false;
  this.subbmitted = false;//it works for error
  //this.registerForm.setErrors(null);
  //this.formGroup.clear();
  this.submittedd = false; 
  this.subbbmitted=false;
}

//forgot password starts
frgtPassword(formvalue) 
{
 
  this.subbmitted = true; 
  // stop here if form is invalid
  if (this.register.invalid) {
      return;

  }
  else{
  //  this.show=3;
  
   //this.register.reset();
   let headers=new Headers();
   headers.append('Content-Type', 'application/json');
     const loginapi=JSON.stringify({
     "mobile":formvalue.Mobile,
     });
   
     this.mobile = formvalue.Mobile;
     this._http.post(this.url+'api/send_otp',loginapi,{
       headers : new HttpHeaders({'Content-Type': 'application/json'})
     }).subscribe(data =>this.forgotResponse(data));
      // localStorage.setItem('isLoggedInSC2V1','true');
     // this.router.navigateByUrl('/dashboard');
     
   }   

  }  
  forgotResponse(res)
 {

 
   if(res.success == true){
   
    this.otpvalue= res.data.otp;//otp from console
    this.registers= this.formBuilder.group({//otp directly comes verify
      Mobile: [this.otpvalue, Validators.required],//otp directly comes verify
     });
    
  
     localStorage.setItem('user_code',res.data.user_code);
     localStorage.setItem('token',res.data.token);
     
    //  localStorage.setItem('user_name',res.data.name);
     this.show=3; 
   }  
   else{
   
    this.showAlert=3;
    this.messageAlert= res.message;
    this.setNotificationTimer();
   }
 } 
 // forgot ends
 resendOtp(formvalue) 
{
  
   //this.show=3;
   //this.registers.reset();
   let headers=new Headers();
   headers.append('Content-Type', 'application/json');
     const loginapi=JSON.stringify({
     "mobile":this.mobile,
    
     });
    
     this._http.post(this.url+'api/send_otp',loginapi,{
       headers : new HttpHeaders({'Content-Type': 'application/json'})
     }).subscribe(data =>this.resendResponse(data));
      // localStorage.setItem('isLoggedInSC2V1','true');
     // this.router.navigateByUrl('/dashboard');
    
     

  }  
  resendResponse(res)
 {
 
   this.registers= this.formBuilder.group({//otp directly comes verify
    Mobile: [res.data.otp, Validators.required],//otp directly comes verify
   });
 
   
   if(res.success == true){
    this.otpvalue= res.data.otp;//console to input box
    //localStorage.setItem('user_code',res.data.user_code);
    localStorage.setItem('token',res.data.token);
    //console.log(localStorage.getItem('token'));
   //  localStorage.setItem('user_name',res.data.name);
    //this.show=3; 
  }  
 } 

 //reset passwords starts

resetPwd(formvalue) 
{
 
  this.submittedd = true; 
  
  // stop here if form is invalid
  if (this.validate.invalid) {
      return;
  }  
  else{
    //this.validate.reset();
    let headerJson = {
      'Content-Type':'application/json',
      'token':localStorage.getItem('token'),
      }
   
    let headers=new HttpHeaders(headerJson);
     headers.append('Content-Type', 'application/json');
        const loginapi=JSON.stringify({
      "password":formvalue.password,
      "user_code":localStorage.getItem('user_code'),
      });
      
       this._http.post(this.url+'secureApi/reset_password',loginapi,{
        headers : headers
    }).subscribe(data =>this.forResponse(data));
       
    }   
  }
  
   
    forResponse(res)
    {
    
    
      if(res.success == true){
       
        localStorage.setItem('user_code',res.data.user_code);
        localStorage.setItem('token',res.data.token);
     
       //  localStorage.setItem('user_name',res.data.name);
      this.showAlert=1;
      this.messageAlert= res.message;
      this.setNotificationTimer();
     this.movee()
       {
         this.show=1; 
         //this.error=0;
        // this.registerForm.reset();
        // this.register.reset();
         //this.registers.reset();
       
         // this.show =0;
         this.submitted = false;//it works for error
         //this.registerForm.setErrors(null);
         //this.formGroup.clear();

       } 
      }
      else{
        this.showAlert=3;
    this.messageAlert= res.message;
    this.setNotificationTimer();
      }

  }  





//verify otp starts
verifyOtp(formvalue)
{

  this.subbbmitted = true;
  // stop here if form is invalid
  if (this.registers.invalid) {
      return;  
  }
  else{
  //  this.show=4;
   //this.registers.reset();
   let headerJson = {
    'Content-Type':'application/json',
    'token':localStorage.getItem('token'),
    }
  let headers=new HttpHeaders(headerJson);
   headers.append('Content-Type', 'application/json');
     const loginapi=JSON.stringify({
     "user_code":localStorage.getItem('user_code'),
     "otp":formvalue.Mobile,
     "token":localStorage.getItem('token')
     });
    
     this._http.post(this.url+'api/verify_otp_for_password_reset_of_admin',loginapi,{
      headers : headers
  }).subscribe(data =>this.verifyResponse(data));
      // localStorage.setItem('isLoggedInSC2V1','true');
     // this.router.navigateByUrl('/dashboard');
    
   }   

  }  
  

verifyResponse(res)
 {
  
   if(res.success == true){
    
    //  localStorage.setItem('user_code',res.data.user_code);
    //  localStorage.setItem('token',res.token);
    //  localStorage.setItem('user_name',res.data.name);
     this.show=4;
   }
   else{
    this.showAlert=3;
    this.messageAlert= res.message;
    this.setNotificationTimer();
   }
 }

 //verify otp ends



 
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    
    }
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
 
      reader.onload = (event: ProgressEvent) => {
      //  this.url = (<FileReader>event.target).result;
    }
 
      reader.readAsDataURL(event.target.files[0]);
    }
  }
 

}


