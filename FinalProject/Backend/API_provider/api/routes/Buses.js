const buses=require('../../models/Buses');
const authenticate=require("../../middleware/authenticate")

module.exports= function(router){
    //Get method returns all the buses data 
    router.get("/Buses",(req,res)=>{
        buses.find({},(err,bus)=>{
            if(err) res.json({success:false, message:err});
            else{
                if(bus) res.json({success:true, message:bus});
                else res.json({success:false, message:"Bus not found"});
            }
        });
    });
    //method extracts the bus data based on from to date data sent in req
    //notr that this method requires authentication
    router.post("/BusesQuery",authenticate.authenticate,(req,res)=>{
        buses.find({From:req.body.From,To:req.body.To,DateOfJourney:req.body.DateOfJourney},(err,bus)=>{
            if(err) res.json({success:false, message:{length:bus.length,message:"Buses Not Found",data:[]}});
            else{
                if(bus.length>0) res.json({success:true, message:{length:bus.length,message:"Buses Found",data:bus}});
                else res.json({success:false, message:{length:bus.length,message:"Buses Not Found",data:[]}});
            }
        });
    });
    //posts new bus details
    router.post('/Buses',(req,res)=>{
        let itr= new buses(req.body);
        itr.save(function(err,bus){
            if(err) return res.status(400).json(err);
            return res.status(200).json(bus);
        })

    });
//updates details of a bus
    router.put('/UpdateBuses',authenticate.authenticate,(req,res)=>{
        if(!req.body._id) res.json({success:false,message:"No ID provided in the Body"});
        
        else {
            buses.findOne({_id: req.body._id},(err,bus)=>{
                if(err) res.json({success:false,message:"_id not found!"});
                else{
                    bus.BusId=req.body.BusId;
                    bus.BusType=req.body.BusType;
                    bus.Departure=req.body.Departure;
                    bus.Arraival=req.body.Arraival;
                    bus.DateOfJourney=req.body.DateOfJourney;
                    bus.From=req.body.From;
                    bus.To=req.body.To;
                    bus.TotalSeats=req.body.TotalSeats;
                    bus.AvailableSeats=req.body.AvailableSeats;
                    bus.Fare=req.body.Fare;
                    bus.SeatLayout=req.body.SeatLayout;
                    bus.SeatData=req.body.SeatData;
                    bus.save((err)=>{
                        err?res.json({success:false, message:"couldnot save"}):res.json({success:true, message:"Updated!"});
                    });
                }
        
            })
        }
    });
    //Deletes  bus details
    router.delete('/DeleteBuses/:id',authenticate.authenticate, (req, res) => {
        if (!req.params.id) {
          res.json({ success: false, message: 'No id provided' }); 
        } else {
          buses.findOne({ _id: req.params.id }, (err, bus) => {
            if (err) {
              res.json({ success: false, message: 'Invalid id' }); 
            } else {              
                bus.remove((err) => {
                if (err) {
                res.json({ success: false, message: err }); 
                } else {
                res.json({ success: true, message: 'Bus Route deleted!' });
                }
            });
            }
          });
        }
      });

}