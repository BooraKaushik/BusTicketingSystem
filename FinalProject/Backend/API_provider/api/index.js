const express=require("express");
const router=express.Router();
require('./routes/Buses')(router);
require("./routes/Users")(router);
module.exports = router;