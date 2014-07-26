var request = require('request');

function getMostRecentArticles(pageNum, callback){
    request('http://localhost:3000/api/v1/articles?pageNum='+ pageNum, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

//I will leave in parameter 'pageNum' only to keep consistency
function getArticlesByID(pageNum, id, callback){
    request('http://localhost:3000/api/v1/articles/id/' + id, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

function getArticlesByTag(pageNum, tag, callback){
    request('http://localhost:3000/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum, function (error, response, body) {
      console.log('request for: ' + 'http://localhost:3000/api/v1/articles/tags/' + tag + '?pageNum=' + pageNum);
      console.log(error);
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

function getArticlesBySearch(pageNum, searchParam, callback){
    request('http://localhost:3000/api/v1/search/?searchString=' + searchParam + '&pageNum=' + pageNum, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      }
    });
}

exports.getArticlesByTag = getArticlesByTag;
exports.getArticlesByID  = getArticlesByID;
exports.getMostRecentArticles = getMostRecentArticles;
exports.getArticlesBySearch = getArticlesBySearch;