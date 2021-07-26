const mongoo=require("mongoose");
var schema = new mongoo.Schema({
    PhoneNumber:{type: Number, required:true,unique:true},
    Name:{type:String, required:true},
    EmailId:{type:String, required:true,unique:true},
    Password:{type: String, required:true},
    DOB:{type:String, required:true},
    Gender:{type:String, Default:"Male"},
    SuperUser:{type:Boolean, Default:false}
});
module.exports=mongoo.model('Users',schema)