import { Router } from '@angular/router';
import { APIHandlerService } from './../apihandler.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  //Instance Variables
  form:FormGroup
  submitted:boolean=false;
  validPhone:boolean=false;
  validEmail:boolean=false;
  //Constructor with Dependency Injction of FormBuilder, APIHandlerService, Router Classes
  constructor(private fb:FormBuilder,private api:APIHandlerService, private route:Router) {
    //instanciates Form 
    this.form=fb.group({
      Name:['',[Validators.required]],
      Email:['',[Validators.required,Validators.email],[this.emailValidator.bind(this)]],
      PhoneNumber:['',[Validators.required,Validators.pattern("\\+?\\d[\\d -]{8,12}\\d")],[this.phoneNumberValidator.bind(this)]],
      Password:["",[Validators.required]],
      DOB:["",[Validators.required]],
      Gender:["",[Validators.required]],
    })
   }
   //gets Properties
   get Name(){
     return this.form.get("Name");
   }
   get Email(){
    return this.form.get("Email");
  }
  get PhoneNumber(){
    return this.form.get("PhoneNumber");
  }
  get Password(){
    return this.form.get("Password");
  }
  get DOB(){
    return this.form.get("DOB");
  }
  get Gender(){
    return this.form.get("Gender");
  }

  ngOnInit(): void {
  }

  // Async Function that checks if a Given Email is unique
  emailValidator(control:FormControl){
    return new Promise((resolve, reject)=>{
      if(control.value.length>0){
        this.api.uniqueEmail({Email:control.value})
        .subscribe((res)=>{
          if(!res.success) resolve ({"uniqueEmailValidator":true});
          else resolve(null)
        },()=>{resolve (null);})
      }
      else resolve(null)
  });
  }
  // Async Function that checks if a Given Phone Number is unique
  phoneNumberValidator(control:FormControl){
    return new Promise((resolve, reject)=>{
      if(control.value.length>0){
        this.api.uniquePhoneNumber({PhoneNumber:Number(control.value)})
        .subscribe((res)=>{
          if(!res.success)  resolve ({"uniquePhoneNumber":true});
          else resolve(null);
        },()=>{resolve (null);})
      }
      else resolve(null)
  });
  }
  // Creates an Account only if the form is valid
  CreateAccount(){
    this.submitted=true;
    if(this.form.valid){ 
      this.api.createUser(
        {DOB: this.form.value.DOB,
        EmailId: this.form.value.Email,
        Gender: this.form.value.Gender,
        Name: this.form.value.Name,
        Password: this.form.value.Password,
        PhoneNumber: this.form.value.PhoneNumber
      })
      .subscribe((res)=>{
        if(res.success){
          this.route.navigateByUrl("/Login");
        }
      });      
    }  
    
  }

}
