import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class AuthGuardComponent implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        // console.log(localStorage.getItem('isloggedinsc2v13'));
        
        if (localStorage.getItem('isloggedinsc2v13')) {
            // console.log("canactivate");
            
            return true;
        }
        else{
            // console.log("canactivate not");
            this.router.navigate(['/login']);
            return false;
        }
        
    }
}
