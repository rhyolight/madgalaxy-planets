var request     = require('request');
var RSS         = require('rss');
var config = require('../config.json');
var planetName = process.env.PLANET_NAME;

var planetSpecificData = config.planetOptions[planetName];

function getMostRecentArticles(pageNum, callback) {
    request('http://madgalaxy.herokuapp.com/api/v1/articles?pageNum=' + pageNum, function(error, response, body) {
        console.log('making a request for: ' + 'http://madgalaxy.herokuapp.com/api/v1/articles?pageNum=' + pageNum);
        if (!error && response.statusCode == 200) {
            callback(error, JSON.parse(body));
        }
    });
}

//I will leave in parameter 'pageNum' only to keep consistency
function getArticlesByID(pageNum, id, callback) {
    request('http://madgalaxy.herokuapp.com/api/v1/articles/id/' + id, function(error, response, body) {
        console.log('making a request for: ' + 'http://madgalaxy.herokuapp.com/api/v1/articles/id/' + id);
        if (!error && response.statusCode == 200) {
            callback(error, JSON.parse(body));
        }
    });
}

function getArticlesByTag(pageNum, tag, callback) {
    request('http://madgalaxy.herokuapp.com/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum, function(error, response, body) {
        console.log('making a request for: ' + 'http://madgalaxy.herokuapp.com/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum);
        if (!error && response.statusCode == 200) {
            callback(error, JSON.parse(body));
        }
    });
}

function getArticlesBySearch(pageNum, searchParam, callback) {
    request('http://madgalaxy.herokuapp.com/api/v1/search/?searchString=' + searchParam + '&searchTag=' + planetSpecificData.feed_tag + '&pageNum=' + pageNum, function(error, response, body) {
        console.log('making a request for: ' + 'http://madgalaxy.herokuapp.com/api/v1/search/?searchString=' + searchParam + '&searchTag=' + planetSpecificData.feed_tag + '&pageNum=' + pageNum);
        if (!error && response.statusCode == 200) {
            callback(error, JSON.parse(body));
        }
    });
}

function getRssFeedWithTag(pageNum, tag, callback) {
    request('http://madgalaxy.herokuapp.com/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum, function(error, response, body) {
        console.log('making a request for: ' + 'http://madgalaxy.herokuapp.com/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum);
        if (error) throw error;
        var posts = JSON.parse(body);
        var feed = new RSS({
            title: planetSpecificData.title,
            description: planetSpecificData.description,
            feed_url: planetSpecificData.feed_url,
            site_url: planetSpecificData.site_url,
            image_url: '',
            author: 'All Rights Reserved by <a href="madglory.com">MadGlory</a> Interactive 2014'
        });
        for (var i = 0; i < posts.length; i++) {
            feed.item({
                title: posts[i].title,
                description: posts[i].content,
                url: posts[i].link,
                author: posts[i].author,
                pubdate: posts[i].displayDate
            });
        };
        callback(error, feed.xml());
        console.log('RSS feed built for: ' + tag);
    });
}

exports.getArticlesByTag = getArticlesByTag;
exports.getRssFeedWithTag = getRssFeedWithTag;
exports.getArticlesByID = getArticlesByID;
exports.getMostRecentArticles = getMostRecentArticles;
exports.getArticlesBySearch = getArticlesBySearch;