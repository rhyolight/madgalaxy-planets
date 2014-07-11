var express      = require('express');
var router       = express.Router();
var getArticles  = require('../lib/getArticles.js');
var config       = require('../config.json');
var planetName   = process.env.PLANET_NAME;

var planetSpecificData = config.planetOptions[planetName];

console.log(planetSpecificData);
console.log('########This is: ' + planetName + ' ########');

// else if (req.query.page){
//   console.log('Here is the page the user is requesting: ' + req.query.page);
//   feedreader.getArticlesWithPageNum(req.query.page, function(posts) {    
//     res.render(
//       'index', {planetSpecificData: planetSpecificData, data: posts, uri: 'http://www.planetnodejs.com', page: req.query.page}
//     );
      
//   });

// }

/* GET home page. */
router.get('/', function(req, res) {
    getArticles.getMostRecentArticles(function(err, posts) {

      res.render(
        'index', {planetSpecificData: planetSpecificData, data: posts, uri: '', page: 1}
      );
        
    });
});

router.get('/id/*', function(req, res) {
    getArticles.getArticlesByID(req.params[0], function(err, posts) {
      res.render(
        'singleArticle', {planetSpecificData: planetSpecificData, data: posts, uri: '', page: 1}
      );
        
    });
});

router.get('/search/*', function(req, res) {
    getArticles.getArticlesBySearch(req.query.searchString, function(err, posts) {
      res.render(
        'index', {planetSpecificData: planetSpecificData, data: posts, uri: '', page: 1}
      );
        
    });
});

router.get('/:id/:title', function(req, res) {
  console.log('TESTING');
  console.log('id: ' + req.params.id);
  console.log('title: ' + req.params.title);
    getArticles.getArticlesByID(req.params.id, function(err, post){
      console.log('you have gotten to the callback');
      console.log('here is the article title: ' + post.title);
      res.render(
        'singleArticle', {planetSpecificData: planetSpecificData, data: post, uri: 'http://www.planetnodejs.com/article/' + post.title}
      );
    });
});

module.exports = router;