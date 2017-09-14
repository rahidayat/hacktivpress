const Article = require('../models/Article');
const jwt = require('jsonwebtoken')
require('dotenv').config()

let createArticle = (req,res) => {
  if(req.headers.token == null) {
    res.send('silahkan log in untuk membuat artikel')
  } else {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    Article.create({
      title : req.body.title,
      content : req.body.content,
      category : req.body.category,
      author : decoded.id
    })
    .then(() => res.send('artikel berhasil dibuat'))
    .catch(err => res.send(err))
  }
}

let getArticles = (req,res) => {
  Article.find({}).populate('author')
  .then(articles => res.send(articles))
  .catch(err => res.send(err))
}

let getSingleArticle = (req,res) => {
  Article.findOne({_id : req.params.id}).populate('author')
  .then(article => res.send(article))
  .catch(err => res.send(err))
}

let updateArticle = (req,res) => {
  if(req.headers.token == null) {
    res.send('silahkan log in untuk mengupdate artikel')
  } else {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    Article.findOne({_id : req.params.id})
    .then(article => {
      if(article.author == decoded.id) {
        Article.update({_id : req.params.id}, req.body)
        .then(() => res.send('update artikel berhasil'))
      } else {
        res.send('user tidak punya otoritas')
      }
    })
    .catch(err => res.send(err))
  }
}


module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle
}
