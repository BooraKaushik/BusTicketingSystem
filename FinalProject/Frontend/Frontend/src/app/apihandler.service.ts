import { SearchBusesData } from './types/SearchBusesData';
import { UpdateBusDataResponse } from './types/UpdateBusDataResponse';
import { SearchBusesResponse } from './types/SearchBusesResponse';
import { LoginResponse } from './types/LoginResponse';
import { verifyPhone } from './types/verifyPhone';
import { verifyEmail } from './types/verifyEmail';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserResponse } from './types/CreateUserReponse';

@Injectable({
  providedIn: 'root'
})
export class APIHandlerService {

  constructor(private http:HttpClient) { }
  // This method extracts bus data and returns in the form of SearchBusesResponse
  getBusData(data:any):Observable<SearchBusesResponse>{
    return this.http.post<SearchBusesResponse>("http://Localhost:4300/api/BusesQuery",data);
  }
  // This method sends Login Info to Node and returns response in the form of LoginResponse
  postUserLogin(data:any):Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:4300/api/Login",data);
  }
  //the Method is used to create new user in Data Base
  createUser(data:any):Observable<CreateUserResponse>{
    return this.http.post<CreateUserResponse>("http://localhost:4300/api/Users",data);
  }
  //This method checks if the Given Email is already Present in The DB
  uniqueEmail(data:any):Observable<verifyEmail>{
    return this.http.post<verifyEmail>("http://localhost:4300/api/UniqueEmail",data)
  }
  //This method checks if the Given PhoneNumber is already Present in The DB
  uniquePhoneNumber(data:any):Observable<verifyPhone>{
    return this.http.post<verifyPhone>("http://localhost:4300/api/UniquePhoneNumber",data)
  }
  //This method Updates DB with selected seats
  updateBusData(busData:SearchBusesData):Observable<UpdateBusDataResponse>{
    return this.http.put<UpdateBusDataResponse>("http://localhost:4300/api/UpdateBuses",busData)
  }
  
}
