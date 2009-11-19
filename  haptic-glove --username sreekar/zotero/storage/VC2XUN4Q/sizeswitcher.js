if(document.cookie.indexOf('style=1')>=0)
	document.write('<link rel="alternate stylesheet" type="text/css" href="/css/size11.css" title="small">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size13.css" title="large">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size14.css" title="extra large">\n' + '<link rel="stylesheet" type="text/css" href="/css/size12.css" title="medium">\n');

else if (document.cookie.indexOf('style=2')>=0)
	document.write('<link rel="alternate stylesheet" type="text/css" href="/css/size11.css" title="small">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size12.css" title="medium">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size14.css" title="extra large">\n' + '<link rel="stylesheet" type="text/css" href="/css/size13.css" title="large">\n');

else if (document.cookie.indexOf('style=3')>=0)
	document.write('<link rel="alternate stylesheet" type="text/css" href="/css/size11.css" title="small">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size12.css" title="medium">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size13.css" title="large">\n' + '<link rel="stylesheet" type="text/css" href="/css/size14.css" title="extra large">\n');

else document.write('<link rel="alternate stylesheet" type="text/css" href="/css/size12.css" title="medium">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size13.css" title="large">\n' + '<link rel="alternate stylesheet" type="text/css" href="/css/size14.css" title="extra large">\n' + '<link rel="stylesheet" type="text/css" href="/css/size11.css" title="small">\n');

function chooseStyle (newstyle){
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (1000*3600*24*365));
  	document.cookie = 'style=' + newstyle + '; expires=' + expdate.toGMTString() + '; path=/';
  	self.location = self.location;
}

