var request = require('request');

function getMostRecentArticles(callback){
    request('http://madgalaxy.herokuapp.com/api/v1/articles/mostRecent', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

function getArticlesByID(id, callback){
    request('http://madgalaxy.herokuapp.com/api/v1/articles/id/' + id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

function getArticlesByTag(tag, callback){
    request('http://madgalaxy.herokuapp.com/api/v1/articles/' + tag, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

function getArticlesBySearch(searchParam, callback){
    request('http://madgalaxy.herokuapp.com/api/v1/search/?searchString=' + searchParam, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

exports.getArticlesByTag = getArticlesByTag;
exports.getArticlesByID  = getArticlesByID;
exports.getMostRecentArticles = getMostRecentArticles;
exports.getArticlesBySearch = getArticlesBySearch;