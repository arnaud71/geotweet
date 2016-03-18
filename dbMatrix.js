var solr = {
  host		: 'http://sibtex.hesge.ch',
  path		: '/solr/geotweet/select?',
  port		: '8968',
  query		: '*:*',
  indent	: 'true',
  rows		: '100',
  wt		  : 'json',
  fl		  : 'text_t,created_at_dt',
  fq      : '%2Bcreated_at_dt:[2016-03-03T00:00:00.000Z TO 2016-03-14T00:00:00.000Z] %2Bextra_filter_s:(track) %2Blang_s:fr',
};



function getTweets(nb,start,callback) {

  var theUrl = solr.host+':'+solr.port+solr.path
  	+'q='+solr.query
  	+'&fl='+solr.fl
    +'&start='+start
  	+'&wt='+solr.wt
  	+'&indent='+solr.indent
  	+'&fq='+solr.fq
  	+'&rows='+nb
    +'&sort=created_at_dt asc';



    $.ajax({
        type: 'GET',
        url: theUrl,
      }).done(function (data) {
        var resJSON = JSON.parse(data);
        var docs = resJSON.response.docs;
        callback(docs);
      } );
}
