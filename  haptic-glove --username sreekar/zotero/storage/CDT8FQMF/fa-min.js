function usrActionReg(b,a){if(a==20){window.print()}else{if(a==19){location.href="mailto:?subject="+encodeURIComponent(document.title)+"&body="+encodeURIComponent(location.href)}}}function showAcrobat(){var a=document.getElementById("acrobat");if(a.className=="bury static"){a.className="drill"}}function rmAcrobat(){var a=document.getElementById("acrobat");if(a.className=="drill"){a.className="bury static"}}function toolbar(){if($$(".social")){var c=$$(".social");c.each(function(e,d){e.addEvent("mouseenter",function(f){c[d].addClass("drill")});e.addEvent("mouseleave",function(f){c[d].removeClass("drill")})})}if($("embed")){var b=$$("#embed a");var a=$("embed");b.addEvent("click",function(d){d=new Event(d).stop();a.toggleClass("drill")})}}function selector(){var a=$$(".selector");var c=$$(".selectBox");var d=true;var b=[];a.each(function(k,h){var e=k.getElements("li");var g=e[0].get("text").slice(0,10).replace(/[ \t]/g,"")+"_"+document.URL.slice(document.URL.length-15,document.URL.length-5);var l=0;var f=[];b.push(f);if(k.getElements(".external")!=""){d=false}e.each(function(i,m){f.push(c[0]);c.splice(0,1);i.addEvent("click",function(n){n=new Event(n).stop();e[l].removeClass("on");b[h][l].removeClass("on");e[m].addClass("on");b[h][m].addClass("on");l=m;if(d){Cookie.write(g,m,{duration:12})}})});if(d){var j=Cookie.read(g);if(j){l=j;e[0].removeClass("on");e[l].addClass("on");b[h][0].removeClass("on");b[h][l].addClass("on")}}})}function sideBox(){var a=$$(".post");a.each(function(c){var b=c.getElements("p");$("sideBox").inject(b[0],"after")})}function acrobat(){var b=$("acrobat");var a=$$(".river");b.addEvent("mouseenter",function(){b.addClass("on");a.each(function(c){c.setStyle("position","static")})});b.addEvent("mouseleave",function(){b.removeClass("on");a.each(function(c){c.setStyle("position","relative")})})}var CustomTags={truncate:function(a){$$(".tags").each(function(f){var d=f.get("html").split(",");if(d.length>a){var e=d.splice(a,d.length-a);e=e.join(", ");d=d.join(", ");f.set("html",d);var c=new Element("span",{"class":"ellipsis"}).set("html","...").inject(f,"bottom");var b=new Element("span",{"class":"more"}).set("html",","+e).inject(f,"bottom");f.addEvents({mouseenter:function(){c.setStyle("display","none");b.setStyle("display","inline")},mouseleave:function(){c.setStyle("display","inline");b.setStyle("display","none")}})}})}};var SearchSwitcher={init:function(a){this.bnetSearch=$("bnetSearch");this.searchoptions=$$("#search ul li");this.querybox=$("searchbox");this.fa=false;this.faSearch=$("faSearch");this.faSearch.addEvent("submit",function(d){d.stop();var b;var c=this.faSearch.toQueryString();if(location.hostname.contains("c13-b2b")){b="http://"+location.hostname+":"+location.port+"/fa_dev.php/p/search/"}else{if(location.hostname.contains("b2buat")){b="http://b2buat.findarticles.com/p/search/"}else{b="http://findarticles.com/p/search/"}}window.location=b+"?"+c.replace("%20","+")+"&x=0&y=0"}.bind(this));if(a=="fa"){this.fa=true;this.bnetSearch.setStyle("display","none")}else{this.faSearch.setStyle("display","none")}this.searchoptions.each(function(c,b){c.addEvent("click",function(d){d=new Event(d).stop();this.setOff();this.setOn(c)}.bind(this))}.bind(this))},setOn:function(a){a.addClass("on");this.setParams(a.get("id"));if(!this.fa){this.bnetSearch.set({styles:{display:"block"},action:this.action});this.querybox.set("name",this.query)}},setOff:function(){this.searchoptions.each(function(b,a){b.removeClass("on")}.bind(this));if($chk(this.hidden)){this.hidden.destroy()}if(this.fa){this.faSearch.setStyle("display","none");this.fa=false}},setParams:function(a){switch(a){case"srchAll":this.action="http://resources.bnet.com/index.php";this.query="q";break;case"srchArt":this.fa=true;this.bnetSearch.setStyle("display","none");this.faSearch.setStyle("display","block");break;case"srchLib":this.action="http://jobfunctions.bnet.com/search.aspx";this.query="q";break;case"srchStks":this.action="http://finance.bnet.com/bnet";this.query="q";this.hidden=new Element("input",{type:"hidden",name:"Page",value:"Quote"}).inject(this.bnetSearch,"bottom");break;case"srchDict":this.action="http://dictionary.bnet.com/index.php";this.query="d";break}}};var Pillars={init:function(){this.handles=$$("#pillars h5");this.contents=$$("#pillars .inner");var a=new CNBTruncate($$("#pillars h5 span"),{length:38});this.handles.each(function(d,c){var b=new Dropdown(this.contents[c]);d.addEvent("click",function(f){f=new Event(f).stop();if(!this.contents[c].hasClass("on")){this.closeAll()}b.chain(function(){d.toggleClass("on")});b.toggle()}.bind(this))}.bind(this))},closeAll:function(){this.contents.each(function(c,b){if(c.hasClass("on")){var a=new Dropdown(c);this.handles[b].removeClass("on");a.close()}}.bind(this))}};var Dropdown=new Class({Implements:[Chain,Options],options:{speed:300},initialize:function(b,a){this.setOptions(a);this.element=b;this.height=this.element.getScrollSize().y;if(!this.options.open&&this.element.get("height")!="0"){this.element.setStyles({visibility:"hidden",height:0,overflow:"hidden"})}this.fx=new Fx.Morph(this.element,{duration:this.options.speed,link:"ignore"})},toggle:function(){(this.element.hasClass("on"))?this.close():this.open()},open:function(){this.element.setStyle("visibility","visible");this.callChain();this.fx.start({height:this.height});this.element.addClass("on")},close:function(){this.fx.start({height:0}).chain(function(){this.element.setStyle("visibility","hidden");this.callChain()}.bind(this));this.element.removeClass("on")}});CNBTruncate=new Class({Implements:Options,options:{format:"characters",length:100,showMore:false,truncEnd:"...",moreText:{more:"+more",less:"-less"}},initialize:function(b,a){this.setOptions(a);if($type(b)!="array"){b=[b]}b.each(function(c){var e=c.get("text");if(e.length>this.options.length){var d=e.substring(0,this.options.length).replace(/\w+$/,"").replace(/\s+$/,"");this.replaceText(c,d)}}.bind(this))},replaceText:function(a,b){a.set("html",b+this.options.truncEnd)}});InputFocus=new Class({Implements:Options,options:{container:null,className:"focus"},initialize:function(a){this.setOptions(a);$$("."+this.options.className).each(function(d,c){d.addClass("unfocus");d.removeClass("focus");var b=d.get("value");d.addEvent("focus",function(f){if(d.hasClass("unfocus")){d.removeClass("unfocus");d.set("value","")}}.bind(this));d.addEvent("blur",function(f){if(!$chk(d.get("value"))){d.addClass("unfocus");d.set("value",b)}}.bind(this))}.bind(this))}});function feedbackPop(a){var b=window.open("http://blogs.zdnet.com/emailform.php?email="+a,"","scrollbars=no,menubar=no,height=640,width=400,resizable=no,toolbar=no,location=no,status=no");b.document.close()}function viewChanger(){$$(".view-changer").each(function(d,c){var b=d.getElements("li");var e=d.get("rel");var a=$$("'."+e+"'");b.each(function(g){var h=g.get("class").replace("changer","view");g.addEvent("click",function(i){i=new Event(i).stop();b.each(function(j){j.getElements("a").removeClass("on")});g.getElements("a").addClass("on");a.each(function(j){var k=j.get("class").split(" ");k.each(function(l){if(l.contains("view")){j.removeClass(l)}});j.addClass(h)});Cookie.write("viewChanger",h,{duration:5})})});var f=Cookie.read("viewChanger");if(f){b.each(function(g){g.getElements("a").removeClass("on");if(g.get("class").replace("changer","view")==f){g.getElements("a").addClass("on")}});a.each(function(g){var h=g.get("class").split(" ");h.each(function(i){if(i.contains("view")){g.removeClass(i)}});g.addClass(f)})}})}function explapse(b){var c=$(b);var a=$(b+"Explapse");if(!c.hasClass("on")){a.addEvent("click",function(){a.set("src","http://i.bnet.com/images/fa/btn-bar-cthide.gif");a.set("alt","click to hide")});c.toggleClass("on")}else{a.addEvent("click",function(){a.set("src","http://i.bnet.com/images/fa/btn-bar-ctview.gif");a.set("alt","click to view")});c.toggleClass("on")}}function setAll(){document.advanced.elements.qc.disabled=true;document.advanced.elements["qp[]"].disabled=true;document.advanced.oi[0].checked=true;$("oi_all").addClass("advOccursOn");$("oi_pub").removeProperty("class");$("oi_top").removeClass("class");return true}function setPub(){document.advanced.elements.qc.disabled=true;document.advanced.elements["qp[]"].disabled=false;document.advanced.oi[1].checked=true;$("oi_all").removeProperty("class");$("oi_pub").addClass("advOccursOn");$("oi_top").removeClass("class");return true}function setTop(){document.advanced.elements.qc.disabled=false;document.advanced.elements["qp[]"].disabled=true;document.advanced.oi[2].checked=true;$("oi_all").removeClass("class");$("oi_pub").removeProperty("class");$("oi_top").addClass("advOccursOn");return true}function rss_faSearch(){var a=document.rss_searching.rss_qt.value;var c=document.rss_searching.qf.value;var b=document.rss_searching.rss_tb.value;a=rss_urlsetup(a);window.location="http://findarticles.com/p/search?qt="+a+"&qf="+c+"&qta=1&tb="+b+"art&pi=rss"}function popupPage(f,c,e,a){if(window.screen){ah=window.screen.availHeight;aw=window.screen.availWidth}else{ah=480;aw=640}var d=c;var b=e;winprops="scrollbars="+a+",width="+b+",height="+d+",location=no,left=";winprops+=parseInt(aw-b-35)+",sceenX="+parseInt(aw-b-35)+",top=0,sceenY=0,menubars=no,toolbars=no,resizable=yes";window.open(f,"newPage"+(Math.round((Math.random()*9)+1)),winprops)}function CNBAccordion(){var a=new Accordion($("accordion"),"h3.toggler","div.element",{opacity:0,alwaysHide:false,show:0,onActive:function(c,b){c.addClass("accordshow")},onBackground:function(c,b){c.removeClass("accordshow")}})}function rotoCop(){var e=$("rotoCop");var f=$$(".roto-items li");var k=0;var g=f.length-1;var c=4000;var h;var i=false;var d=function(){f[k].removeClass("on");a[k].removeClass("on");(k!=g)?k++:k=0;f[k].addClass("on");a[k].addClass("on")};function b(){h=d.periodical(c)}var j=new Element("ul",{"class":"roto-nav"}).injectInside(e);f.each(function(o){o.addEvent("mouseenter",function(p){$clear(h)});o.addEvent("mouseleave",function(p){b()});var n=new Element("li");var m=new Element("a",{href:"#",html:""});var l=n.grab(m);l.inject(j)});var a=$$(".roto-nav li");a[0].addClass("on");a.each(function(m,l){m.addEvent("click",function(n){n=new Event(n).stop();$clear(h);a[k].removeClass("on");f[k].removeClass("on");k=l;f[l].addClass("on");a[l].addClass("on");i=true});m.addEvent("mouseenter",function(n){$clear(h)});m.addEvent("mouseleave",function(n){if(!i){b()}})});b()}window.addEvent("domready",function(){if($("advanced")){setAll()}if($("accordion")){CNBAccordion()}if($$(".toolbar")&&$$(".toolbar")!=""){toolbar()}if($$(".selector")&&$$(".selector")!=""){selector()}if($("sideBox")){sideBox()}if($("acrobat")){acrobat()}if($$(".focus")!=""){new InputFocus()}if($$(".tags")!=""&&typeof(Tags)=="undefined"){CustomTags.truncate(5)}if($("pillars")&&typeof(CNB)=="undefined"){Pillars.init()}if($$(".view-changer")!=""){viewChanger()}if($("rotoCop")){rotoCop()}});