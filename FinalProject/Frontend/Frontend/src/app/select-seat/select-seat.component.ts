import { PaymentDetails } from './../types/PaymentDetails';
import { APIHandlerService } from './../apihandler.service';
import { SearchBusesData } from './../types/SearchBusesData';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent implements OnInit {
  //Input Outputs for P2C communication
  @Input("Data") busData: SearchBusesData | null = null;
  @Output("PaymentData") paymentData = new EventEmitter();
  @Output("PaymentDataFinalPage") PaymentDataFinalPage = new EventEmitter();
  //instance Variables
  halfValue: number = 0;
  rowCount: number = 0;
  row: boolean[][][] = [];
  Availability: boolean[] = [];
  colCount: number = 0;
  updatedSeats: number[] = [];
  fare: number = 0;
  tax: number = 0;
  totalFare: number = 0;
  enableSubmit: boolean = false;
  seatDataExport: any[] = [];
  PaymentDataExport: PaymentDetails = new PaymentDetails();
  //Constructor with DI
  constructor(private api: APIHandlerService) { }
  //creates Layout when Page Loads
  ngOnInit(): void {
    //This fuction creates a 3D a Layout based on the rows and cols specified in backend
    if (this.busData) {
      this.rowCount = this.busData.SeatLayout.Rows;
      this.colCount = this.busData.SeatLayout.Colums;
      this.halfValue = Math.ceil(this.busData.SeatLayout.Colums / 2);
      for (let i = this.busData.SeatLayout.Rows; i > 0; i--) {
        if (this.row[this.busData.SeatLayout.Rows - i] === undefined) this.row[this.busData.SeatLayout.Rows - i] = [[], []]
        for (let j = this.busData.SeatLayout.Colums; j > 0; j--) {

          var index = (i - 1) * (this.busData.SeatLayout.Colums) + j

          this.Availability[index - 1] = !this.busData.SeatLayout.FilledSeats.includes(index);
          if (j <= Math.ceil(this.busData.SeatLayout.Colums / 2))
            this.row[this.busData.SeatLayout.Rows - i][0].unshift(this.busData.SeatLayout.FilledSeats.includes(index));
          else this.row[this.busData.SeatLayout.Rows - i][1].unshift(this.busData.SeatLayout.FilledSeats.includes(index));
        }
      }
    }
  }
  //Updates appropriate variable while a seat is selected
  SelectSeat(value: number) {
    this.Availability[value] = !this.Availability[value];
    if (this.updatedSeats.includes(value + 1)) {
      this.updatedSeats = this.updatedSeats.filter((v) => {
        if (v === value + 1) return false;
        else return true;
      })
      // console.log(this.updatedSeats);      
    }
    else {
      this.updatedSeats.push(value + 1);
      // console.log(this.updatedSeats);
    }
    this.fare = (this.busData && this.updatedSeats) ? this.busData.Fare * this.updatedSeats.length : 0;
    this.tax = Math.floor(this.fare * 0.1);
    this.totalFare = Math.floor(this.fare * 1.1);
    this.enableSubmit = this.updatedSeats.length > 0;
  }
  //concatinates updateupdatedSeats with this.busData.SeatLayout.FilledSeats
  //decrements this.busData.AvailableSeats-=updatedSeats.length
  //from the form data get user Data and create an arrray of objects of type SeatData
  submit(f: any) {
    if (f.valid) {
      // populating this.seatDataExport
      for (let i of this.updatedSeats) {
        if (f.value["Gender_" + i] && f.value["Name_" + i]) {
          var newObj = {
            Name: f.value["Name_" + i],
            Gender: f.value["Gender_" + i]
          }
          this.seatDataExport.push(newObj)
        }
      }
      // console.log(this.seatDataExport);
      if (this.busData) {
        this.busData.AvailableSeats -= this.updatedSeats.length;
        this.busData.SeatLayout.FilledSeats = this.busData.SeatLayout.FilledSeats.concat(this.updatedSeats);
        this.busData.SeatData = this.busData.SeatData.concat(this.seatDataExport);
        this.PaymentDataExport.NumberOfSeats = this.updatedSeats.length;
        this.PaymentDataExport.Paid = false;
        this.PaymentDataExport.ServiceTax = this.tax;
        this.PaymentDataExport.ActualFare = this.fare;
        this.PaymentDataExport.TotalFare = this.totalFare;
        this.PaymentDataExport.PassengerDetails = { seatNumbers: this.updatedSeats, SeatData: this.seatDataExport };
        // console.log(this.busData);
        // this.api.updateBusData(this.busData)
        // .subscribe((res)=>{
        //   console.log(res);          
        // });
        this.paymentData.emit(this.busData);
        this.PaymentDataFinalPage.emit(this.PaymentDataExport)

      }
    }
  }


}
