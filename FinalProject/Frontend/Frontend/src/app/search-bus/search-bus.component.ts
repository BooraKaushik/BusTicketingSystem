import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchBusesResponse } from './../types/SearchBusesResponse';
import { Router } from '@angular/router';
import { APIHandlerService } from './../apihandler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  //Instance Variables
  form:FormGroup;
  submit:boolean=false;
  successData:SearchBusesResponse|null=null;
  places:string[]=["Chennai","Hyderabad","Bangalore","Kochi","Warangal","Vishakapatnam","Goa","Trivandrum","Tiruvinantapuram","Mumbai","Delhi","Kolkata","Jaipur"];
  //OUTPUTS P2C communication
  @Output("busData") bus= new EventEmitter();
  newEvent(value:any){
    this.bus.emit(value);
  }
  //COnstructor with DI
  constructor(private fb:FormBuilder,private api:APIHandlerService, private route:Router) {
    this.form=fb.group({
      From:['',[Validators.required,Validators.pattern("[a-z A-Z]+")]],
      To:['',[Validators.required,Validators.pattern("[a-z A-Z]+")]],
      DateOfTravel:["",[Validators.required]],

    })
   }
   //properties
   get From(){
     return this.form.get("From");
   }
   get To(){
    return this.form.get("To");
  }
  get DateOfTravel(){
    return this.form.get("DateOfTravel");
  }

  ngOnInit(): void {
  }
  //Searches Buses and displays it
  SearchBuses(){
    var date=(new Date(this.form.value.DateOfTravel));
    
    if(this.form.valid){
      this.api.getBusData({
        From:this.form.value.From,
        To:this.form.value.To,
        DateOfJourney:(date.getFullYear()+'-' + ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1) )+ '-'+date.getDate()),
      }).subscribe(res=>{  
        this.successData=res    
        console.log(res);
      });
      this.form.controls["From"].disable();
      this.form.controls["To"].disable();
      this.submit= true;
      
    }    
  }
  //Edit Button
  Edit(){
    this.form.controls["From"].enable();
    this.form.controls["To"].enable();
    this.submit=false;
  }
  //Clear Button
  clear(){
    this.form.controls["From"].reset();
    this.form.controls["To"].reset();
    this.form.controls["DateOfTravel"].reset();
    this.form.controls["From"].enable();
    this.form.controls["To"].enable();
    this.submit=false;
  }
}
