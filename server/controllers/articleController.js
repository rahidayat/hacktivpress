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
  .then(article => {
    if(article == null) {
      res.send('artikel tidak ditemukan atau sudah dihapus')
    } else {
      res.send(article)
    }
  })
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

let deleteArticle = (req,res) => {
  if(req.headers.token == null) {
    res.send('silahkan log in untuk menghapus artikel')
  } else {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
    Article.findOne({_id : req.params.id})
    .then(article => {
      if(article.author == decoded.id) {
        Article.remove({_id : req.params.id})
        .then(() => res.send('delete artikel berhasil'))
      } else {
        res.send('user tidak punya otoritas')
      }
    })
    .catch(err => res.send(err))
  }
}

let getArticleByCategory = (req,res) => {
  Article.find({category : req.params.cat}).populate('author')
  .then(articles => {
    if(articles.length == 0) {
      res.send('kategori tidak ditemukan')
    } else {
      // console.log('masuk');
      res.send(articles)
    }
  })
  .catch(err => res.send(err))
}

let getArticleByAuthor = (req,res) => {
  Article.find({author : req.params.author_id}).populate('author')
  .then(articles => {
    if(articles.length == 0) {
      res.send('artikel tidak ditemukan')
    } else {
      // console.log('masuk');
      res.send(articles)
    }
  })
  .catch(err => res.send(err))
}

module.exports = {
  createArticle,
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  getArticleByCategory,
  getArticleByAuthor
}
