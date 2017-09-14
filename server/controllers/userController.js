const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()

let signup = (req, res) => {
  const password = req.body.password
  bcrypt.genSalt(10, (errSalt, salt) => {
    bcrypt.hash(password, salt, (errHash, hash) => {
      req.body.password = hash;
      User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
      .then(() => {
        res.send(`Signup Success!`)
      })
      .catch(err => {
        return res.status(400).send({message: err.message})
      })
    })
  })
};


let signin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!req.body.username || !req.body.password){
    res.send('Please input username and password!')
  } else {
    User.findOne({
      username: req.body.username
    })
    .then(user => {
      console.log('ini user data', user);
      bcrypt.compare(password, user.password)
      .then(bcryptResult => {
        console.log('ini hasil compare',bcryptResult);
        if(bcryptResult){
          const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY);
          res.json({token: token})
        } else {
          res.send('Wrong Password')
        }
      })
    })
    .catch(err => {
      res.send('user tidak ditemukan')
    })
  }
}

let getAllUsers = (req,res) => {
  User.find({})
  .then(data => {
    res.send(data)
  })
}

module.exports = {
  signup,
  signin,
  getAllUsers
};
