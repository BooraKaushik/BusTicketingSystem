const users = require('../../models/Users');
const auth = require("../../controllers/AuthController");

module.exports = function (router) {

  //Login method defined in AuthCOntroller checks if the provided UserName and Password match
  router.post('/Login', auth.login);
  //checks if a given username is already in the DataBase
  router.post("/UniqueEmail", (req, res) => {
    users.find({ EmailId: req.body.Email }, (err, user) => {
      if (err) res.json({ success: false, message: { uniqueEmail: false, err } });
      else {
        if (user.length !== 0) res.json({ success: false, message: { uniqueEmail: false, err: {} } });
        else res.json({ success: true, message: { uniqueEmail: true, err: {} } });
      }
    });
  })
  //checks if the Given Phone Number is already present in the Data Base
  router.post("/UniquePhoneNumber", (req, res) => {
    users.find({ PhoneNumber: req.body.PhoneNumber }, (err, user) => {
      if (err) res.json({ success: false, message: { uniquePhoneNumber: false, err } });
      else {
        if (user.length !== 0) res.json({ success: false, message: { uniquePhoneNumber: false, err: {} } });
        else res.json({ success: true, message: { uniquePhoneNumber: true, err: {} } });
      }
    });
  })
  //Gets all the users and used for testinhg purpose
  router.get("/Users", (req, res) => {
    users.find({}, (err, user) => {
      if (err) res.json({ success: false, message: err });
      else {
        if (user) res.json({ success: true, message: user });
        else res.json({ success: false, message: "Bus not found" });
      }
    });
  });
  //Defined in AuthController adds a user
  router.post('/Users', auth.UserRegistration);
  //Defined in Auth COntroller updates a user
  router.put('/UpdateUsers', auth.UserDataUpdate);
  //Delets a USer Based on ID
  router.delete('/DeleteUsers/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' });
    } else {
      users.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
          res.json({ success: false, message: 'Invalid id' });
        } else {
          user.remove((err) => {
            if (err) {
              res.json({ success: false, message: err }); 
            } else {
              res.json({ success: true, message: 'User deleted!' });
            }
          });
        }
      });
    }
  });
}