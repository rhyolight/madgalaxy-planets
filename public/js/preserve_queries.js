function preserveTags(tagToAdd) {
    var urlParams;
    (window.onpopstate = function() {
        var match,
            pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function(s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);
    })();

    console.log('here are the current url parameters: ' + JSON.stringify(urlParams));
    var newUri = '?';
    for (paramName in urlParams) {
        if (paramName != 'pageNum') {
            newUri = newUri + paramName + '=' + urlParams[paramName] + '&';
            console.log(paramName);
        }
    }
    newUri = newUri + tagToAdd;
    console.log(newUri)
    return newUri
}
preserveTags('pageNum=1000');



$('#pageForward').click(function(event) {
    window.location.href = "/search/" + preserveTags('pageNum=' + $('#pageForward').attr('data-pageNum'));
});