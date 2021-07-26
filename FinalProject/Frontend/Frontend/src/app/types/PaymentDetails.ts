import { PassengerData } from './PassengerData';

export class PaymentDetails{
    NumberOfSeats:number=0
    TotalFare:number=0
    ServiceTax:number=0
    ActualFare:number=0
    Paid:boolean=false
    PassengerDetails!:{
        seatNumbers:number[],
        SeatData:PassengerData[]
    }
}