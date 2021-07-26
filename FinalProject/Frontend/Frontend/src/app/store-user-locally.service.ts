import { LoginResponse } from './types/LoginResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreUserLocallyService {

  constructor() { }
  //Stores User Data in Local Storage
  public login(data:LoginResponse){
    localStorage.setItem("Access_token",data.token)
    localStorage.setItem("UserName",data.userData.Name)
    localStorage.setItem("Gender",data.userData.Gender)
  }
  //checks if some user data is present in local storage 
  public loggedIn(){
    return localStorage.getItem("Access_token")!==null;
  }
  //removes user data from Local Storage 
  public logOut(){
    localStorage.removeItem("Access_token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("Gender");
  }
  //Returns JWT 
  public token(){
    return localStorage.getItem("Access_token")
  }
}
