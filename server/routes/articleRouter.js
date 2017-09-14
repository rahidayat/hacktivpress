var express = require('express');
var router = express.Router();
var articleController = require ('../controllers/articleController')

router.post('/article', articleController.createArticle);


module.exports = router;
