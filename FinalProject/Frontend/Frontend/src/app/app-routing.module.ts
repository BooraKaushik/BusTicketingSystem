import { PaymentsComponent } from './payments/payments.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { AuthGuardService } from './auth-guard.service';
import { SearchBusComponent } from './search-bus/search-bus.component';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"",pathMatch:'full',redirectTo:'/Home'},
  {path:'Login',component:LoginComponent},
  {path:'Createaccount',component:CreateAccountComponent},
  {path:'Home',component:HomeComponent,canActivate:[AuthGuardService],canActivateChild:[AuthGuardService],
  children:[
    {path:'Bus',component:SearchBusComponent},
    {path:'Selectseat',component:SelectSeatComponent},
    {path:'Payments',component:PaymentsComponent},
  ]
},

// {path:'Selectseat',component:SelectSeatComponent},
// {path:'Confirmation',component:ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
