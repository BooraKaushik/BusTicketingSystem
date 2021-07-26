import { StoreUserLocallyService } from './store-user-locally.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,CanActivateChild {

  constructor(private ls:StoreUserLocallyService, private route:Router) { }
  //This function checks if any user data is present in Local Storage and returns true if already present and vice versa
  canActivate():boolean{
    if(this.ls.loggedIn()) return true;
    else {
      this.route.navigateByUrl("/Login");
      return false;
    }
  }
  //This function checks if any user data is present in Local Storage and returns true if already present and vice versa
  canActivateChild():boolean{
    if(this.ls.loggedIn()) return true;
    else {
      this.route.navigateByUrl("/Login");
      return false;
    }
  }
}
