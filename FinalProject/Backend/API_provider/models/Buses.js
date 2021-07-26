const mongoose=require("mongoose");
var schema = new mongoose.Schema({
    BusId:{type: String},
    BusType:{type:String,required:true},
    Departure:{type:String,required:true},
    Arraival:{type: String,required:true},
    DateOfJourney:{type:Date,required:true},
    From:{type:String,required:true},
    To:{type:String,required:true},
    TotalSeats:{type: Number,required:true},
    AvailableSeats:{type: Number},
    Fare:{type: Number,required:true},
    SeatLayout:{
        type:{
            Rows:{type:Number,required:true},
            Colums:{type:Number,required:true},
            FilledSeats:[Number]
        }
    },
    SeatData:[{
            Name:{type:String,required:true},
            Age:{type:String},
            Gender:{type:String,required:true},
            Preference:{type:String, Default:"ANY"}
        }]

});
module.exports=mongoose.model('BusesTable',schema)