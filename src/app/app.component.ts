import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AdminTemplate';
  status= true;
  constructor() {
    if(navigator.onLine) { 
      this.status= true;
    }
    else{
      this.status=false;
    }
  }
  ngOnInit(){
  }
}
