export interface verifyPhone{
    success:boolean, 
    message:{
        uniquePhoneNumber: boolean,
        err: {}
    }
}