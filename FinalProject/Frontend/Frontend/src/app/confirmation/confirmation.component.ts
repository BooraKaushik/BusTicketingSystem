import { PassengerData } from './../types/PassengerData';
import { SearchBusesData } from './../types/SearchBusesData';
import { PaymentDetails } from './../types/PaymentDetails';
import { Component, Input, OnInit } from '@angular/core';
import {UserOptions} from 'jspdf-autotable';
import 'jspdf-autotable'
import jsPDF from 'jspdf';

interface pdfFormat extends jsPDF{
  autoTable:(options:UserOptions)=>jsPDF;
} 

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input("TriggerSuccess") triggerSuccess:PaymentDetails|null=null;
  @Input('Confirmation') confirmation:SearchBusesData|null=null;

  a:PassengerData[]=[];
  jade:string[][]=[];
  constructor() { }

  ngOnInit(): void {
    if(this.triggerSuccess){
      this.a=this.triggerSuccess.PassengerDetails.SeatData;
      for(let i=0;i<this.triggerSuccess.PassengerDetails.SeatData.length;i++){
        this.jade.push([this.triggerSuccess.PassengerDetails.seatNumbers[i].toString(10),this.triggerSuccess.PassengerDetails.SeatData[i].Name,this.triggerSuccess.PassengerDetails.SeatData[i].Gender,"CONFIRMED"])
      }
    }
    console.log(this.confirmation);
    
     
  }
  downloadPDF(){
    const doc =new jsPDF('portrait','px','a4') as pdfFormat;
    doc.setFontSize(28);
    doc.setFont("helvetica");
    doc.text("Travel Buddy\n\n\n",35,25);
    doc.line;
    doc.text(" ",35,55);
    doc.setFontSize(9);
    doc.setFont("helvetica");
    if(this.confirmation){
      doc.text("Date:"+this.confirmation?.DateOfJourney.toString().split("T")[0],35,85);   
      doc.text("Bus Type: "+this.confirmation?.BusType,35,105);   
      doc.text("From: "+this.confirmation?.From,35,125);
      doc.text("To: "+this.confirmation?.To,35,145);
      doc.text("Departure Time: "+this.confirmation?.Departure,35,165);
      doc.text("Arraival Time: "+this.confirmation?.Arraival,35,185);
    }
    doc.autoTable({
      head:[["Seat Number","Passenger Name", "Gender","Confirmation"]],
      body:this.jade
    })
    
    doc.text("Actual Fare :  Rs."+this.triggerSuccess?.ActualFare,295,475);
    doc.text("Service Tax :  Rs."+this.triggerSuccess?.ServiceTax,295,490);
    doc.text("Total Fare  :  Rs."+this.triggerSuccess?.TotalFare,295,515);

    doc.save("Confirmation.pdf")
  }
}
