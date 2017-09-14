var express = require('express');
var router = express.Router();
var articleController = require ('../controllers/articleController')

router.post('/article', articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.get('/article/:id', articleController.getSingleArticle);
router.put('/article/:id', articleController.updateArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.get('/articles/:cat', articleController.getArticleByCategory);





module.exports = router;
