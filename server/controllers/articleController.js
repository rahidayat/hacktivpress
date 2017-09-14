const Article = require('../models/Article');
const jwt = require('jsonwebtoken')
require('dotenv').config()

let createArticle = (req,res) => {
  if(req.headers.token == null) {
    res.send('silahkan log in untuk membuat artikel')
  } else {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    Artcle.create({
      title : req.body.title,
      content : req.body.content,
      category : req.body.category,
      author : decoded.id
    })
    .then(() => res.send('artikel berhasil dibuat'))
    .catch(err => res.send(err))
  }
}

module.exports = {
  createArticle
}
