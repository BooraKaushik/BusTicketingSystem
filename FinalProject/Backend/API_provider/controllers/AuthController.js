const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//for user creation
const UserRegistration = function(req,res,next){
    // 10 here is salt nuber its number of cycles of encryption(salt makes hash unpredictable)
    bcrypt.hash(req.body.Password,10,function (err,encryptedPassword){
        if(err)res.json({success:false, message:{user:{},error}})
        let user=new User({
            Name:req.body.Name,
            EmailId:req.body.EmailId,
            PhoneNumber:req.body.PhoneNumber,
            Password: encryptedPassword,
            DOB:req.body.DOB,
            Gender:req.body.Gender
        })
        // console.log(req.body);
        user.save()
        .then((user)=>{
            res.json({success:true, message:{user,error:{}}})
        })
        .catch((error)=>{
            res.json({success:false, message:{user:{},error}})
        });
    })
}
//Updates an existing user
const UserDataUpdate = function(req,res,next){
    if(!req.body._id) res.json({success:false,message:"No ID provided in the Body"});
    else {
        User.findOne({_id: req.body._id},(err,user)=>{
            if(err) res.json({success:false,message:"_id not found!"});
            else{
                // 10 here is salt nuber its number of cycles of encryption
                bcrypt.hash(req.body.Password,10,function (err,encryptedPassword){
                    if(err){res.json({
                        success:false,
                        message:err
                        });
                    }
                    user.Name=req.body.Name;
                    user.EmailId=req.body.EmailId;
                    user.PhoneNumber=req.body.PhoneNumber;
                    user.Password= encryptedPassword;
                    user.DOB=req.body.DOB;
                    user.Gender=req.body.Gender;
                    user.save()
                    .then((user)=>{
                        res.json({success:true, message:user})
                    })
                    .catch((error)=>{
                       res.json({success:false, message:error})
                    });
                });
            }
        });
    }
}
//login method compares usernames and password with the encrypted password saved on databases
const login = function(req,res,next){
    var UserName=req.body.UserName;
    var Password=req.body.Password;
    // console.log(typeof(UserName));
    User.findOne({$or:[{EmailId:UserName},{PhoneNumber:(typeof(UserName)==="number"?Number(UserName):0)}]})
    .then((user)=>{
        if(user){
            bcrypt.compare(Password,user.Password,function(err,result){
                if(err) res.json({success:false, message:err});
                if(result){
                    let token=jwt.sign({name:User.Name},"3HD71q2k", {expiresIn:'2h'})
                    res.json(
                        {
                            success:true,
                            message:"Login Successful!",
                            userData:{
                                Name:user.Name,
                                Gender:user.Gender
                            },
                            token:token
                        });
                }
                else    res.json({success:false, message:"Password Doesnt Match!",userData:{}, token:""});
            })
        }
        else    res.json({success:false, message:"User Not Found!",userData:{}, token:""});

    })

}
module.exports={UserRegistration,UserDataUpdate,login};