import { Router } from '@angular/router';
import { StoreUserLocallyService } from './store-user-locally.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  UserName:string|null=null;
  constructor(private ls:StoreUserLocallyService,private route:Router){
  }
  ngOnInit():void{
  }
}
