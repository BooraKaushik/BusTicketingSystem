import { StoreUserLocallyService } from './store-user-locally.service';
import { HttpInterceptor, HttpClientModule, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService  implements HttpInterceptor{

  constructor(private injector:Injector) { }
  //this method adds Bearer token to Authorization key of Header
  intercept(req:HttpRequest<any>,next:HttpHandler){
    let ls=this.injector.get(StoreUserLocallyService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: "Bearer "+ls.token()
      }
    })
    return next.handle(tokenizedReq)
  }
}
