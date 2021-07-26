import { SeatData } from './SeatData';
export interface SearchBusesData{
    _id: string,
    BusId: string,
    BusType: string,
    Departure: string,
    Arraival: string,
    DateOfJourney: Date,
    From: string,
    To: string,
    TotalSeats: number,
    AvailableSeats: number,
    Fare: number,
    SeatLayout: {
        Rows: number,
        Colums: number,
        FilledSeats:number[]
        },
    SeatData:SeatData[]
}