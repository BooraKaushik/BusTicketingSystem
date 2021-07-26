export interface verifyEmail{
    success:boolean, 
    message:{
        uniqueEmail: boolean,
        err: {}
    }
}