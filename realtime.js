

var solr = {
  host		: 'http://sibtex.hesge.ch',
  path		: '/solr/geotweet/select?',
  port		: '8968',
  query		: '*:*',
  indent	: 'true',
  rows		: '1',
  wt		  : 'json',
  fl		  : 'id,text_t,geo_s,user_screen_name_t,lang_s,user_location_t,created_at_dt',
  pt      : '46.2,6.14',
  d			  : '20',
  fq1     : '+extra_filter_s:(track)',
};

var lastTweetId = '';

var c = 1;

function displayResult(result){
  var resJSON = JSON.parse(result);
  var doc = resJSON.response.docs[0];
  var tweetId = doc.id;

  var tweet = {};
  tweet.id = doc.id;
  if (doc.hasOwnProperty('text_t')) {
        tweet.text_t = doc.text_t[0];
  }
  if (doc.hasOwnProperty('geo_s')) {
        tweet.geo_s = doc.geo_s;
  }
  if (doc.hasOwnProperty('user_screen_name_t')) {
    tweet.user_screen_name_t = doc.user_screen_name_t[0];
  }
  if (doc.hasOwnProperty('lang_s')) {
    tweet.lang_s = doc.lang_s;
  }
  if (doc.hasOwnProperty('user_location_t')) {
    tweet.user_location_t = doc.user_location_t[0];
  }
  if (doc.hasOwnProperty('created_at_dt')) {
    tweet.created_at_dt = doc.created_at_dt;
  }
  if (lastTweetId == tweet.id) {
      // nothing to do
    console.log('nothing todo');
  }
  else {
    lastTweetId = tweet.id;
    console.log(c+':'+tweet.text_t);
    //var urlInTweet = tweet.text_t.replace(/^(.*?)(https?:\/\/.*?)( |$)(.*?)$/,"$2");
/*    if (urlInTweet.length>5) {
      console.log('ORIG:'+tweet.text_t);
      console.log('URL:'+urlInTweet+"\n");
      $('#tweetLink').html('<object data="'+urlInTweet+'"/>');
    }
    else {

    }*/
    $('.tlt'+c).find('.texts li:first').text(tweet.created_at_dt+': '+tweet.user_screen_name_t+': '+tweet.text_t+' ('+tweet.lang_s+')');
    $('.tlt'+c).textillate({

    in:{
      delay: 10,
      effect: 'fadeInLeftBig',
    },
    out:{
      delay: 10,
      effect: 'hinge',
    }});


    $('.tlt'+c).textillate('start');


    c++;
    if (c === 3) {
      c = 1;
    }
  }

}


function querySolr() {


  var theUrl = solr.host+':'+solr.port+solr.path
  	+'q='+solr.query
  	+'&fl='+solr.fl
  	+'&wt='+solr.wt
  	+'&indent='+solr.indent
  //	+'&pt='+solr.pt
  //	+'&d='+solr.d
  	//+'&fq='+solr.fq1
  	+'&fq='+solr.fq1
//  	+'&fq='+solr.fq3
//  	+'&fq='+solr.fq4
  	//+'&fq='+fq_date
  	+'&rows='+solr.rows
    +'&sort=created_at_dt desc'
  	;

    $.ajax({
        type: 'GET',
        url: theUrl,
      }).done(displayResult);
}



function initText() {
  for (i=1;i<3;i++) {
    $(function () {
      $('.tlt'+i).textillate();
      $('.tlt'+i).textillate('start');
    })
  }

}

initText();


querySolr();
