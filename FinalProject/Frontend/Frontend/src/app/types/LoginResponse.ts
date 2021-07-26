export interface LoginResponse{
    success:boolean, 
    message:string,
    token:string,
    userData:{
        Name:string,
        Gender:string
    }
}