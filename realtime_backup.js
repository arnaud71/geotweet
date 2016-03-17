

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
  //fq1     : '((+geo_s:[* TO *]) OR (+extra_filter_s:track))',
  fq1     : '+extra_filter_s:(track)',
  //fq2		 : '{!bbox sfield=geo_p}',
  //fq3		 : '-user_screen_name_t:(genevemeteo lhcstatus _GenevaCH  TrendsSwitz Map_Game AcidMoto PGJobs tmj_sws_energy tmj_sws_acct tmj_sws_sales tmj_sws_mgmt kartenquizde tmj_sws_purch tmj_sws_jobs1 tmj_sws_adv tmj_sws_finance tmj_sws_hr tmj_sws_cstsrv BustedGENEVE)',
  //fq4		: '+lang_s:(fr)',
  //fq4		: ''
};

var lastTweetId = '';



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
  }
  else {
    lastTweetId = tweet.id;
    $(function () {
        $('.tlt').find('.texts li:first').text(tweet.created_at_dt+': '+tweet.user_screen_name_t+': '+tweet.text_t+' ('+tweet.lang_s+')');
        $('.tlt').textillate({

          in:{
            delay: 10,
            effect: 'fadeInRightBig',
          }});
        $('.tlt').textillate('start');
    })
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

querySolr();
