const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hacktivepress', (err) => {
  err ? console.log('Can\'t connect to database') : console.log('Database connected')
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user = require ('./routes/userRouter');
var article = require ('./routes/articleRouter');

app.use('/api', user);
app.use('/api', article)

app.listen(process.env.PORT || 3000, function(){
  console.log('I am listening port 3000');
})
