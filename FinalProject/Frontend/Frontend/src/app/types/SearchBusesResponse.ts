import { SearchBusesData } from './SearchBusesData';

export interface SearchBusesResponse{
    success:boolean;
    message:{
        length:number,
        message:string,
        data:SearchBusesData[];
    }
}