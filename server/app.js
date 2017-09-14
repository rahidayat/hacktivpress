const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktivepress', (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var signup = require ('./routes/userRouter')

app.use('/api', signup)

app.listen(process.env.PORT || 3000, function(){
  console.log('I am listening port 3000');
})
