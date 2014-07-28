var express = require('express');
var router = express.Router();
var getArticles = require('../lib/getArticles.js');
var config = require('../config.json');
var planetName = process.env.PLANET_NAME;

var planetSpecificData = config.planetOptions[planetName];
console.log('########This site is being built as: ' + planetName + ' ########');

//validating all the parameters
router.use(function(req, res, next) {

    //validating pageNum
    if (req.query.pageNum && /^[0-9]+$/.test(req.query.pageNum)) {
        req.pageNum = req.query.pageNum;
    } else {
        console.log('no pageNum provided, or not a valid pageNum - defaulting to 1');
        req.pageNum = 1;
    }
    if (req.query.searchString) {
        req.searchString = req.query.searchString;
    }
    next();
});

router.get('/', function(req, res) {
    getArticles.getArticlesByTag(req.pageNum, planetSpecificData.feed_tag, function(err, posts) {
        res.render(
            'index', {
                planetSpecificData: planetSpecificData,
                data: posts,
                uri: '',
                pageNum: req.pageNum
            }
        );

    });
});

router.get('/search', function(req, res) {
    getArticles.getArticlesBySearch(req.pageNum, req.searchString, function(err, posts) {
        res.render(
            'index', {
                planetSpecificData: planetSpecificData,
                data: posts,
                uri: '',
                pageNum: req.pageNum
            }
        );

    });
});

router.get('/:article_id/:title', function(req, res) {
    getArticles.getArticlesByID(req.pageNum, req.params.article_id, function(err, posts) {
        res.render(
            'singleArticle', {
                planetSpecificData: planetSpecificData,
                data: posts,
                uri: '',
                pageNum: req.pageNum
            }
        );

    });
});

module.exports = router;