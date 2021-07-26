import { APIHandlerService } from './../apihandler.service';
import { PaymentDetails } from './../types/PaymentDetails';
import { SearchBusesData } from './../types/SearchBusesData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  //Inputs and Outputs for communication
  @Input("UserData") UserData:SearchBusesData|null=null;
  @Input("PaymentFinalData") PaymentFinalData:PaymentDetails|null=null;
  @Output("Confirmation") Confirmation=new EventEmitter();
  @Output("triggerSuccess") triggerSuccess= new EventEmitter();
  //Instance Feilds
  form:FormGroup;
  MonthList:string[]=["January","February","March","April","May","June","July","August","September","October","November","December"]
  YearList:number[]=[2021,2022,2023,2024,2025,2026,2027,2028,2029,2030]
  //DI for FormBUilder and APIHandlerService
  constructor(private fb:FormBuilder,private api:APIHandlerService) {
    this.form=fb.group({
      CardType:["",[Validators.required]],
      CardNumber:["",[Validators.required,Validators.pattern("^[0-9]{16}$")]],
      NameOnCard:["",[Validators.required]],
      CVV:["",[Validators.required]],
      ExpiryDate:fb.group({
        Month:["",[Validators.required]],
        Year:["",[Validators.required]]
      })
    })
   }
   //properties
   get CardType(){
     return this.form.get("CardType");
   }
   get CardNumber(){
    return this.form.get("CardNumber");
  }get NameOnCard(){
    return this.form.get("NameOnCard");
  }get CVV(){
    return this.form.get("CVV");
  }get Year(){
    return this.form.get("ExpiryDate")?.get("Year");
  }get Month(){
    return this.form.get("ExpiryDate")?.get("Month");
  }get ExpiryDate(){
    return this.form.get("ExpiryDate");
  }
  ngOnInit(): void {
  }
  // TakesData and only if Form is valid Passes on to next Stage
  submit(){
    this.Confirmation.emit(this.UserData);
    if(this.form.valid && this.UserData){
        this.api.updateBusData(this.UserData)
        .subscribe((res)=>{
          // console.log(res);          
        });
      if(this.PaymentFinalData) this.PaymentFinalData.Paid=true;
      this.triggerSuccess.emit(this.PaymentFinalData)

    }
  }

}
