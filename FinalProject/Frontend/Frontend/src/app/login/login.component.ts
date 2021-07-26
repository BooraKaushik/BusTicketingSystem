import { StoreUserLocallyService } from './../store-user-locally.service';
import { APIHandlerService } from './../apihandler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Instance Feilds
  form:FormGroup;
  message:String="";
  submitted:boolean=false;
  //COnstructor with DI FormBuilder, APIHandlerService, StoreUserLocallyService, Router
  constructor(private fb:FormBuilder,private api:APIHandlerService,private route:Router, private ls:StoreUserLocallyService) {
    this.form=fb.group({
      UserName:['',[Validators.required]],
      Password:["",[Validators.required]]
    })
   }

  ngOnInit(): void {
  }
  //properties
  get UserName(){
    return this.form.get('UserName');
  }
  get Password(){
    return this.form.get('Password');;
  }
  //LOGIN Method
  Login(){
    this.submitted=true;
    console.log(this.form.valid);
    if(this.form.valid){
    this.api.postUserLogin(
        {
          "UserName":Number(this.form.value.UserName)!==NaN?Number(this.form.value.UserName):(this.form.value.UserName),
          "Password":this.form.value.Password
        }).subscribe((res)=>{
          if(res.success) {
            this.ls.login(res);
            this.route.navigateByUrl("/Home");
          }
          else this.message=res.message;
        })
    }      
  }
}
