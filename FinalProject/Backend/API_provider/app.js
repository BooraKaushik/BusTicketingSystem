const express=require("express");
const api=require("./api");
const morgan=require("morgan");
const bodyparser=require("body-parser");
const cors= require("cors");

const app=express();
const port = 4300;
app.set("port",port);

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use("/api",api);
app.use(express.static("static"))
app.use(morgan("dev"))
app.use( (req,res)=>{
  const err=new Error('Not Found');
  err.status=404;
  res.json(err);
});

const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/BusTicketBookingSystem',{useNewUrlParser:true})
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Connection Error:"))
db.once('open',function(){
    console.log("Connected to MongoDB");
    app.listen(port,()=> console.log(`Hello world app listening on port ${port}!`))
})
