// #Task route solution
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const secret = process.env.JWT_SECRET;

exports.addUser = async (req, res) => {

  const user = req.body
  const email = await User.findOne({
    Email: user.Email
  });
  console.log(email);
  if (email) {
    res.json({message:"Email already registered"});
  } else {
    user.Password = await bcrypt.hash(req.body.Password, 10)
    const dbUser = new User(user);
    dbUser.save()
      .then(result => {
        res.send("added");
        console.log("added");
      })
      .catch(err => {
        console.log(err);
      });
    res.json({message:"Registration Successful"});
  }
};
// getting all the users

exports.viewUsers = (req, res) => {
  ``
  User.find({})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getUser = (req, res) => {
  User.find({
      Name: req.params.name
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(result => {
    res.status(200).send("User updated ");
    console.log('The User is Updated successfully !');
  }).catch(err => {
    console.log(err);
  });
};

//Deleting an existing user
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id).then(result => {
    res.status(200).send("User Deleted ");
    console.log("The User is deleted successfully !");
  }).catch(err => {
    console.log(err);
  });

};


exports.login = (req,res) => {
  const userLoggingIn = req.body;

  User.findOne({Email : userLoggingIn.Email}).then(dbUser => {
    if(!dbUser){
      return res.json({
        message: "Invalid Username or Password"
      })
    }
    console.log(dbUser)
    bcrypt.compare(userLoggingIn.Password, dbUser.Password)
    .then(isCorrect => {
      if(isCorrect){
        const payload = {
          id: dbUser._id,
          email: dbUser.Email,
        }
        console.log(secret);
        jwt.sign(
          payload,
          secret,
          {expiresIn: 86400},
          (err, token) => {
            if(err) return res.json({message: err})
            return res.json({
              message: "Success",
              token: "Bearer " + token
            })
          }
        )
      } else{
        return res.json({message: "Invalid Email or Password"})
      }
    })
  })
}