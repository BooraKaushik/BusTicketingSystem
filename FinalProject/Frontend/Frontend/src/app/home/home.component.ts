import { PaymentDetails } from './../types/PaymentDetails';
import { SearchBusesData } from './../types/SearchBusesData';
import { Router } from '@angular/router';
import { StoreUserLocallyService } from './../store-user-locally.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Instance Variables 
  UserName:string|null=null;
  busDataExtracted:SearchBusesData|null=null;
  paymentDataExtracted:SearchBusesData|null=null;
  PaymentFinalData:PaymentDetails|null=null;
  confirmation:SearchBusesData|null=null;
  triggerSuccess:PaymentDetails|null=null;
  // Constructor with DI Router and StoreUserLocallyService
  constructor(private ls:StoreUserLocallyService,private route:Router){
  }
  //Methods to get Output Data from child components
  getBusData(value: SearchBusesData){
    this.busDataExtracted=value;
    console.log(this.busDataExtracted);    
  }
  getPaymentData(value:SearchBusesData){
    this.paymentDataExtracted=value;
    console.log(this.paymentDataExtracted);
    
  }
  getConfirmation(value:SearchBusesData){
    this.confirmation=value;
    console.log(this.confirmation);
    
  }
  getPaymentDataFinalPage(value:PaymentDetails){
    this.PaymentFinalData=value;
    console.log(this.PaymentFinalData);
    
  }
  getTriggerSuccess(value:PaymentDetails){
    this.triggerSuccess=value;
    console.log(this.triggerSuccess);
    
  }
  //Checks if user is already logged in
  ngOnInit():void{
    this.UserName=localStorage.getItem("UserName");
  }
  //Logs out
  logOut(){    
    this.ls.logOut();
    // this.route.navigateByUrl("/Login");
    window.location.reload();
  }

}
