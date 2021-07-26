var jwt =require('jsonwebtoken');
//checks if a req has berer string in authorization of header
const authenticate = (req,res,next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,"3HD71q2k");
        req.user=decode;
        next();
    }
    catch(err){
        res.json({success:false, message: "Authentication Failed"});
    }
}
module.exports={authenticate};