function ebCInteractionStd(strName,nType){this.strName=strName;this.nType=nType;this.strIntData="";this.nValue=0;this.testStartTime=0;this.testEndTime=0;this.nStartTime=0;this.handleCounterInt=handleCounterInt;this.handleTimer=handleTimer;this.numLeftToReport=10;this.fReportImmediatly=false;this.getReportData=getReportData;function getReportData(objRef){var dataSeperator="~";var interSeperator="^";var strIntName=this.strName;strIntName=strIntName.replace(/\~/ig,"_");strIntName=strIntName.replace(/\^/ig,"_");strIntName=strIntName.replace(/\|/ig,"_");var val=parseInt(this.nValue/1000);var parsedVal=val;if(isNaN(val))val=0;if((this.nType==1)&&(parsedVal<=0)||(parsedVal>(gEbnMaxTimerTime/1000))){return("");}var strIsClick="0";var strIsUnique="0";var strIsUserInit="0";var isfDefaultClick=(this.strName=="_eyeblaster");if(isfDefaultClick){strIsUserInit="1";if(objRef.fClicked){strIsClick="1";strIsUnique="1";}}else {strIsUnique="1";}var interParams=parsedVal+dataSeperator+strIsClick+dataSeperator+strIsUnique+dataSeperator+strIsUserInit+dataSeperator+"2"+dataSeperator+"0"+dataSeperator+"0";if(this.fReportImmediatly){var reportURL=ebStrProtocol+ebBS+"/BurstingPipe/BurstingInteractionsPipe.asp";var strFinalPage=objRef.getReportingPage(objRef.strPage);var reportParams=objRef.nAdID+dataSeperator+strFinalPage+dataSeperator+ebPluID;intName=this.strName;if(objRef.nType&&isfDefaultClick)intName="ebDefaultClick";var reportURL=ebStrProtocol+ebBS+"/BurstingPipe/BurstingInteractionsPipe.asp";reportParams+=interSeperator+intName+dataSeperator+interParams;reportURL+="?interactionsStr=" + escape(reportParams) + "&ebRandom="+Math.random();var reportingImg=new Image();reportingImg.src=reportURL;}return (interSeperator+this.strName+dataSeperator+interParams);}function handleCounterInt(objRef){if(this.numLeftToReport==0)return ;this.numLeftToReport--;objRef.strPendingInteractions+=this.getReportData(objRef);}function handleTimer(command,nValue){switch(command){case 1:if(this.nStartTime!=0){return;}this.testStartTime=new Date();this.nStartTime=this.testStartTime.getTime();break;case 2:if(this.nStartTime==0){if(this.nValue==0){}else{}return;}this.testEndTime=new Date();var dtNow=this.testEndTime.getTime();this.nValue+=(dtNow-this.nStartTime);this.nStartTime=0;break;case 3:if((typeof(nValue)!="undefined")&&!isNaN(nValue)){this.nValue+=nValue;}else{}break;}}}if(typeof(gEbFlyLocal)=="undefined")gEbFlyLocal=false;ebBS=unescape(ebO.bs);ebIntTimeVer=gEbFlyLocal?"" : "V62_12";ebConduitVer=gEbFlyLocal?"" : "54";ebBigS=unescape(ebO.bgs);ebResourcePath=unescape(ebO.rp);ebPluID=ebO.pi;var ebStrProtocol=ebResourcePath.substr(0,ebResourcePath.indexOf(":")+3);var browserTypes={notSupported:0,IE:1,NN:2,FF:3,Safari:4,Chrome:5};function ebCStdBanner(nID){this.fAboveTheFoldSupported=((typeof(ebO.btf)!="undefined")&&ebO.btf);if(this.fAboveTheFoldSupported){this.temp=ebCAboveTheFoldManager;this.temp(gEbStdGlobals.TIBase,true);delete this.temp;}if(this.fAboveTheFoldSupported){this.temp=ebCTimerManager;this.temp();delete this.temp;}this.nAdID=-1;this.strRand="";this.fClicked=true;this.strWmode="opaque";this.strRef="gEbStdBanners[" + nID + "]";this.nType=0;this.title="";this.strFlashObjID="";this.strJumpURL="";this.strJumpTarget="_blank";this.strWinAttr="";this.strClickAURL="";this.strClickNURL="";this.clickAImg=new Image(1,1);this.clickNImg=new Image(1,1);this.InterPipeImg=new Image(1,1);this.handleInteraction=handleInteraction;this.redirect=redirect;this.interactions=new Array();this.getReportingPage=getReportingPage;this.strPendingInteractions="";this.doOnLoad=doOnLoad;this.doOnUnload=doOnUnload;this.doOnResize=doOnResize;this.doOnScroll=doOnScroll;init(this);function handleInteraction(){try{if(ebIsPreview()&&(typeof(window.parent.ebHandleFsCommandsPrev)=="function"))window.parent.ebHandleFsCommandsPrev("ebClickthrough", "", "Banner");}catch(e){}if(this.strJumpURL=="")return;if(this.strJumpTarget!="_blank"){Report(this);if(this.fClicked){reportRS(this.strClickNURL,this.clickNImg,this.strRand);reportRS(this.strClickAURL,this.clickAImg,this.strRand);this.fClicked=false;}window.setTimeout(this.strRef+".redirect();",1000);}else {this.redirect();if(!ebIsPreview()){Report(this);if(this.fClicked){reportRS(this.strClickNURL,this.clickNImg,this.strRand);reportRS(this.strClickAURL,this.clickAImg,this.strRand);this.fClicked=false;}}}}function redirect(){if((this.strFlashObjID=="")||!useFlashRedirect(this.strFlashObjID,this.strJumpURL,this.strJumpTarget))window.open(this.strJumpURL,this.strJumpTarget,this.strWinAttr);}function init(objRef){copyServerData(objRef);setInteractions(objRef);if(objRef.fAboveTheFoldSupported)setEvents();addBanner(objRef);}function doOnLoad(){if(this.fAboveTheFoldSupported)this.checkIfAboveTheFold(this.strFlashObjID);}function doOnUnload(){gEbStdGlobals.TIBase.clearAllEvents();}function doOnResize(){if(this.fAboveTheFoldSupported)this.checkIfAboveTheFold(this.strFlashObjID);}function doOnScroll(){if(this.fAboveTheFoldSupported)this.checkIfAboveTheFold(this.strFlashObjID);}function setEvents(){gEbStdGlobals.TIBase.addEventHandler("load","ebOnLoadHandlerStd");gEbStdGlobals.TIBase.addEventHandler("scroll","ebOnScrollStd");gEbStdGlobals.TIBase.addEventHandler("resize","ebOnResizeStd");gEbStdGlobals.TIBase.addEventHandler("unload","ebOnUnloadHandlerStd");if(!ebIsPreview()){gEbStdGlobals.TIBase.addEventHandler("beforeunload","ebReportAllInteractionsStd");gEbStdGlobals.TIBase.addEventHandler("unload","ebReportAllInteractionsStd");}}function copyServerData(objRef){objRef.nAdID=ebO.ai;objRef.strPage=ebO.p;objRef.strRand=ebO.rnd;if(typeof(ebO.wm)!="undefined")objRef.strWmode=ebO.wm;if(typeof(ebO.title)!="undefined")objRef.title=ebO.title;copyServerClickData(objRef);}function setInteractions(objRef){var inter;inter=objRef.interactions["_eyeblaster"] = new ebCInteractionStd("_eyeblaster",0);inter.fReportImmediatly=true;inter.numLeftToReport=-1;if(objRef.fAboveTheFoldSupported){inter=objRef.interactions["ebabovethefold"] = new ebCInteractionStd("ebAboveTheFold",0);inter.numLeftToReport=1;objRef.interactions["ebabovethefoldduration"] = new ebCInteractionStd("ebAboveTheFoldDuration",1);inter=objRef.interactions["ebbelowthefold"] = new ebCInteractionStd("ebBelowTheFold",0);inter.numLeftToReport=1;}}function copyServerClickData(objRef){if(typeof(ebO.ju)=="undefined")return;objRef.strJumpURL=unescape(ebO.ju);if(ebIsPreview())objRef.strJumpTarget="_blank";else {switch(ebO.jt){case 0:objRef.strJumpTarget="_self";break;case 1:objRef.strJumpTarget="_blank";break;case 2:objRef.strJumpTarget="_top";break;}}objRef.strWinAttr="titlebar=1,resizable=1,scrollbars=1,directories=0,toolbar=1,status=1,";objRef.strWinAttr+="location="+ebO.jwloc+",menubar="+ebO.jwmb+",left="+ebO.jwl+",top="+ebO.jwt;if(ebO.jww>0)objRef.strWinAttr+=",width="+ebO.jww;if(ebO.jwh>0)objRef.strWinAttr+=",height="+ebO.jwh;if(typeof(ebO.acu)!="undefined")objRef.strClickAURL=unescape(ebO.acu);if(typeof(ebO.ncu)!="undefined")objRef.strClickNURL=unescape(ebO.ncu);}function addBanner(objRef){if(typeof(ebO.op)!="undefined")eval(unescape(ebO.op));collectURL(objRef);var fShowFlash=false;if((typeof(ebO.fv)!="undefined")&&(gEbStdGlobals.flFlashVer>=ebO.fv))fShowFlash=(gEbStdGlobals.fIsMac)?isMacFlashSupported(objRef):true;if(fShowFlash)addBannerFlash(objRef);else {addBannerImg(objRef);objRef.nType=1;}if(objRef.fAboveTheFoldSupported){if(ebO.fv>=6){var objProp=new Object();objProp.id="ebReportingFlash";objProp.name="ebReportingFlash";objProp.url=ebBigS+"/Res/Empty_Movie.swf";;objProp.fv=ebO.fv;objProp.w="0";objProp.h="0";objProp.play="false";objProp.strFlashParams="";objProp.strWmode="window";objProp.title="";objProp.position="absolute";var strBannerTags=buildFlashTags(objProp);document.write(strBannerTags);}}}function addBannerFlash(objRef){objRef.strFlashObjID="ebStdBanner"+gEbStdBanners.length;var strFlashUrl=unescape(ebO.fu);if(!gEbFlyLocal)strFlashUrl=ebResourcePath+"/"+strFlashUrl;var handler=objRef.strFlashObjID+'_DoFSCommand(command,args)';var strBannerTags='<scr'+'ipt>function ' + handler + '{try{command = command.replace(/FSCommand:/ig,"");if((command.toLowerCase()=="ebinteraction") || (command.toLowerCase()=="ebclickthrough"))' + objRef.strRef + '.handleInteraction();}catch(e){}}function ebIsFlashExtInterfaceExist(){return true;}</scr'+'ipt>';var objProp=new Object();objProp.id=objRef.strFlashObjID;objProp.name=objRef.strFlashObjID;objProp.url=strFlashUrl;objProp.fv=ebO.fv;objProp.w=ebO.w;objProp.h=ebO.h;objProp.strFlashParams=getFlashParams(objRef);objProp.strWmode=objRef.strWmode;objProp.title=objRef.title;strBannerTags+=buildFlashTags(objProp,handler);document.write(strBannerTags);}function buildFlashTags(objProp,handler){var strBannerTags="";if(typeof(objProp.play)=="undefined")objProp.play="true";if(typeof(objProp.strWmode)=="undefined")objProp.strWmode="opaque";if(gEbStdGlobals.isIE()){if(typeof(handler)!="undefined")strBannerTags+='<scr'+'ipt for="' + objProp.id + '" event="FSCommand(command,args)">try{'+handler+';}catch(e){}</scr'+'ipt>';strBannerTags+='<object id="'+ objProp.id +'" name ="'+objProp.name;strBannerTags+='" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase='+ebStrProtocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#';strBannerTags+='version=' + objProp.fv +',0,0,0 ';if(typeof(objProp.position)!="undefined")strBannerTags+='style="width:' + objProp.w + 'px;height:' + objProp.h + 'px;position:' + objProp.position + '"';else strBannerTags+='style="width:' + objProp.w + 'px;height:' + objProp.h + 'px"';strBannerTags+=' title="' + objProp.title + '"';strBannerTags+='><PARAM NAME="movie" VALUE="'+objProp.url;if(objProp.fv>=6&&objProp.strFlashParams!="")strBannerTags+='">'+'<PARAM NAME="FlashVars" VALUE="'+objProp.strFlashParams+'">';else {if(objProp.strFlashParams!="")strBannerTags+='?' + objProp.strFlashParams + '">';else strBannerTags+='">';}strBannerTags+='<PARAM NAME="play" VALUE=' + objProp.play + '>';strBannerTags+='<PARAM NAME="wmode" VALUE="' + objProp.strWmode +'"><PARAM NAME="menu" VALUE=false><PARAM NAME="allowScriptAccess" value="always"></object>';}else {strBannerTags+='<EMBED src="'+objProp.url;if(objProp.fv>=6&&objProp.strFlashParams!="")strBannerTags+='" FlashVars="' + objProp.strFlashParams + '" ';else {if(objProp.strFlashParams!="")strBannerTags+='?'+ objProp.strFlashParams +'"';else strBannerTags+='"';}if(typeof(objProp.position)!="undefined")strBannerTags+='style="width:' + objProp.w + 'px;height:' + objProp.h + 'px;position:' + objProp.position + '"';else strBannerTags+='style="width:' + objProp.w + 'px;height:' + objProp.h + 'px"';strBannerTags+=' play=' + objProp.play + ' '+'id="' + objProp.id + '"name="' + objProp.name + '" quality=high ';strBannerTags+='wmode="' + objProp.strWmode + '" menu=false TYPE="application/x-shockwave-flash" PLUGINSPAGE="' + ebStrProtocol + 'www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" ';strBannerTags+='allowScriptAccess="always"' + ' title="' + objProp.title + '"' + '></EMBED>';}return strBannerTags;}function addBannerImg(objRef){var strImgUrl=unescape(ebO.iu);if(!gEbFlyLocal)strImgUrl=ebResourcePath+"/"+strImgUrl;strBannerTags="";var fNoFlashRes=(typeof(ebO.fv)=="undefined");var strImgSrc=((ebIsPreview())||fNoFlashRes)?strImgUrl:ebStrProtocol+ebBS+'/BurstingPipe/adServer.bs?cn=cdi&ai=' + ebO.ai + '&p=' + objRef.strPage + '&pi=' + ebPluID + '&ru=' + strImgUrl + '&ord='+objRef.strRand;var strCursor=(objRef.strJumpURL!="") ? "cursor:pointer;cursor:hand;" : "cursor:auto;";strBannerTags+='<img src="' + strImgSrc + '" width=' + ebO.w +' height=' + ebO.h + ' title="' + objRef.title + '"' + ' onclick="' + objRef.strRef + '.handleInteraction()" style="'+strCursor+'"></img>';document.write(strBannerTags);}function getFlashParams(objRef){var strDomain=gEbStdGlobals.getHostName();var conduitPath=ebBigS+"/res/ebV" + ebConduitVer + "_";var interactionTime=ebBigS+"/Res/ebInteractionTime" + ebIntTimeVer + ".swf";var clickTagHandler=getClickTagURL(objRef);var strFSCmdHandler="";if(!gEbStdGlobals.isIE())strFSCmdHandler=objRef.strFlashObjID+"_DoFSCommand";var strUrl="ebDomain="+strDomain+"&ebAdID="+objRef.nAdID+"&cp="+conduitPath+"&clickTag="+escape(clickTagHandler)+"&clickTAG="+escape(clickTagHandler)+"&ebIntTime="+interactionTime+"&ebFSCmdHandler="+strFSCmdHandler;strUrl+=setSmartVersioningFlashVars(objRef);return strUrl;}function setSmartVersioningFlashVars(objRef){var xmlPath="";var smartFlashVars="";var tempAd;eval('try{tempAd=new ebAd_' +objRef.nAdID+ '()}catch(e){tempAd=null;ebDebug("setXMLPathFlashVars: No AdJS was Loaded","blue");}');if(tempAd!=null){xmlPath=tempAd.strXML;if(xmlPath!=""){if((typeof(ebAdXmlPath)!="undefined") && (ebAdXmlPath != ""))xmlPath=ebAdXmlPath;else if(!gEbFlyLocal)xmlPath=ebResourcePath+xmlPath;smartFlashVars="&ebAdXML=" + xmlPath + "&"+buildAdditionalResStr(tempAd);}}return smartFlashVars;}function buildAdditionalResStr(objRef){var strAdditionalRes="";var assets=objRef.additionalAssets;for(var strName in assets){try{if(!(assets[strName] instanceof Array))continue;var asset=assets[strName];strAdditionalRes=getNameAsset(strName,strAdditionalRes);var info=getAssetProperties(objRef,strName);strAdditionalRes+=getUrlAsset(info.strURL);}catch(e){}}for(var name in objRef.nonVideoAssets){try{strAdditionalRes=getNameAsset(name,strAdditionalRes);strAdditionalRes+=getUrlAsset(objRef.nonVideoAssets[name].url);}catch(e){}}return strAdditionalRes;}function getAssetProperties(objRef,strMovieName){try{var asset=objRef.additionalAssets[strMovieName];var info;if(asset[0].length)info=asset[0][0];else if(asset[1].length)info=asset[1][0];else if(asset[2].length)info=asset[2][0];else if(asset[3].length)info=asset[3][0];else if(asset[4].length)info=asset[4][0];return info;}catch(e){}}function getNameAsset(name,additionalRes){if(additionalRes!="")additionalRes+="&";additionalRes+=name+"=";return additionalRes;}function getUrlAsset(urlAdditionalAsset){var additionalRes="";additionalRes+=(gEbFlyLocal)?urlAdditionalAsset:ebResourcePath+urlAdditionalAsset;return additionalRes;}function Report(objRef){objRef.interactions["_eyeblaster"].getReportData(objRef);}function reportRS(strURL,reportImg,strRand){if(strURL=="")return;strURL=strURL.replace(/\[ebRandom\]/ig,strRand);strURL=strURL.replace(/\[timestamp\]/ig,strRand);reportImg.src=strURL;}function getClickTagURL(objRef){var strURL;if(ebIsPreview()){strURL=gEbFlyLocal?"ReportPage_" + HTMLPageVer + ".html":objRef.strJumpURL;}else{var strReportUrl=ebStrProtocol+ebBS+'/BurstingPipe/BannerRedirect.asp?Page=' + objRef.strPage + '&PluID=' + ebPluID + '&Pos=[ebRandom]&EyeblasterID=' + objRef.nAdID + '&di=0';var strAReportUrl=objRef.strClickAURL;var strNReportUrl=objRef.strClickNURL;strURL=ebBigS+"/ReportPage" + ebReportPageVer + ".html"+"?ebReportURL="+escape(strReportUrl)+"$$ebNReportURL="+escape(strNReportUrl)+"$$ebAReportURL="+escape(strAReportUrl)+"$$ebImpressionID="+objRef.strRand;}return strURL;}function isMacFlashSupported(objRef){var fSupported=true;var nMinAdIDNoNeedVer8=0;if(ebBS.indexOf("dev")!=-1)nMinAdIDNoNeedVer8=48440;else if(ebBS.indexOf("int")!=-1)nMinAdIDNoNeedVer8=180990;else if(ebBS.indexOf("pilot")!=-1)nMinAdIDNoNeedVer8=227853;else nMinAdIDNoNeedVer8=260500;if((objRef.nAdID<nMinAdIDNoNeedVer8)&&(gEbStdGlobals.flFlashVer<8)){fSupported=false;}return fSupported;}function collectURL(objRef){try{if(ebIsPreview())return;var fCollectURL=(typeof(ebO.cu)!="undefined");if(fCollectURL){var adId=objRef.nAdID;var url=gEbStdGlobals.getMainPageURL();var img=new Image();img.src=ebStrProtocol+ebBS+'/BurstingPipe/adServer.bs?cn=curl&ai='+adId+'&url=$$'+url+'$$';}}catch(e){}}function useFlashRedirect(flashObjID,strJumpURL,strJumpTarget){var flashObj=document.getElementById(flashObjID);if(!flashObj)return false;var redirectFunc="ebOpenJumpURL";var fIsAS3=(typeof(flashObj[redirectFunc])!="undefined");var fUseFlash=false;if((gEbStdGlobals.isSafari())&&fIsAS3){try{fUseFlash=flashObj[redirectFunc](strJumpURL,strJumpTarget);}catch(e){fUseFlash=false;}}return fUseFlash;}function getReportingPage(strPage){var strFinalPage=strPage;strFinalPage=strFinalPage.replace(/\~/ig,"_");strFinalPage=strFinalPage.replace(/\^/ig,"_");strFinalPage=strFinalPage.replace(/\|/ig,"_");return strFinalPage;}}function ebCStdGlobals(){this.nBrowser=browserTypes.notSupported;this.fIsMac=false;this.flFlashVer=0;this.nDbgLvl=0;this.fPreview=false;this.debugWin=null;this.init=init;this.getHostName=getHostName;this.getMainPageURL=getMainPageURL;this.isIE=function(){return this.nBrowser==browserTypes.IE;};this.isFF=function(){return this.nBrowser==browserTypes.FF;};this.isSafari=function(){return this.nBrowser==browserTypes.Safari||this.nBrowser==browserTypes.Chrome;};this.isChrome=function(){return this.nBrowser==browserTypes.Chrome;};function init(){this.fPreview=((typeof(ebO.pr)!="undefined")&&ebO.pr);this.nDbgLvl=ebO.d;detection(this);flashDetection(this);}function detection(objRef){var agt=navigator.userAgent.toLowerCase();objRef.nBrowser=browserTypes.notSupported;if((agt.indexOf("msie") != -1) && (agt.indexOf("opera")==-1))objRef.nBrowser=browserTypes.IE;else if(agt.indexOf("netscape/")!=-1)objRef.nBrowser=browserTypes.NN;else if(agt.indexOf('firefox/')!=-1)objRef.nBrowser=browserTypes.FF;else if(agt.indexOf('chrome')!=-1)objRef.nBrowser=browserTypes.Chrome;else if(agt.indexOf('safari/')!=-1)objRef.nBrowser=browserTypes.Safari;if(agt.indexOf("mac os x")!=-1)objRef.fIsMac=true;if(objRef.nBrowser==browserTypes.notSupported){}}function flashDetection(objRef){var flFlashVer;try{var flashDetector=new ebCFlashDetector();flFlashVer=(objRef.isIE())?flashDetector.getIEFlash():flashDetector.getMozillaFlash();gEbStdGlobals.flFlashVer=flFlashVer;}catch(e){gEbStdGlobals.flFlashVer=0;}}function getHostName(){var strPage="";if(document.location.toString().indexOf("javascript:")==0)eval('try{strPage = parent.document.location.hostname;}catch(e){strPage = "";}');else eval('try{strPage = document.location.hostname;}catch(e){strPage = "";}');return strPage;}function getMainPageURL(){var url="";try{url=top.document.URL;}catch(e){}return url;}}function ebIsPreview(){return (gEbStdGlobals.fPreview);}function ebLoadScript(strScriptID,strScriptSrc){document.write("<scr"+"ipt id="+ strScriptID + " src=" + strScriptSrc +"></scr"+"ipt>");}function ebLoadIframe(strIframeSrc){document.write("<iframe src="+ strIframeSrc +" width=0 height=0 frameborder=0></iframe>");}function ebDebug(msg,color){}if(typeof(ebO.osd)!="undefined")eval(unescape(ebO.osd));if(typeof(gEbStdGlobals)=="undefined"){gEbStdGlobals=new ebCStdGlobals();gEbStdGlobals.init();}if((typeof(ebCTagInsertorBase)!="undefined") && (typeof(gEbStdGlobals.TIBase) == "undefined"))gEbStdGlobals.TIBase=new ebCTagInsertorBase();if(typeof(gEbStdBanners)=="undefined")gEbStdBanners=new Array();gEbStdBanners[gEbStdBanners.length]=new ebCStdBanner(gEbStdBanners.length);gEbnMaxTimerTime=15*1000*60;if(typeof(gEbfIntReported)=="undefined")gEbfIntReported=false;if(typeof(ebMaxTimePassed)=="undefined")ebMaxTimePassed=false;if(!ebIsPreview()&&(gEbStdBanners[gEbStdBanners.length-1].fAboveTheFoldSupported))window.setTimeout("ebMaxTimeStd()",gEbnMaxTimerTime);ebO=null;function ebCFlashDetector(){this.getIEFlash=getIEFlash;this.getMozillaFlash=getMozillaFlash;function getIEFlash(){var strFlashVersion=getMajorMinorFlashVersion(7);var activeX;if(!strFlashVersion){try{activeX=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");strFlashVersion="WIN 6,0,21,0";activeX.AllowScriptAccess="always";strFlashVersion=activeX.GetVariable("$version");}catch(e){if(!activeX)strFlashVersion=getMajorMinorFlashVersion(3);}}strFlashVersion=splitFlashMajorMinorVersions(strFlashVersion);var nFlashVer=Number(strFlashVersion);return isNaN(nFlashVer)?0:nFlashVer;}function getMajorMinorFlashVersion(nVersion){try{var activeX=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+nVersion);return activeX.GetVariable("$version");}catch(e){return "";}}function splitFlashMajorMinorVersions(strFlashVersion){if(strFlashVersion){var tempArray=strFlashVersion.split(" ");var tempString=tempArray[1];var versionArray=tempString.split(",");var versionMajor=versionArray[0];var versionMinor=versionArray[1];var versionRevision=versionArray[2];return versionMajor+"."+versionMinor+versionRevision;}return 0;}function getMozillaFlash(){var ver=0;var releaseVer=0;var versionMajor=0;var versionMinor=0;var versionRevision=0;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash"]){var flashDescription=navigator.plugins["Shockwave Flash"].description;var descArray=flashDescription.split(" ");var tempArrayMajor=descArray[2].split(".");versionMajor=tempArrayMajor[0];versionMinor=tempArrayMajor[1];versionRevision=descArray[3];if(versionRevision=="")versionRevision=descArray[4];if(isNaN(versionRevision[0]))versionRevision=versionRevision.substring(1);if(versionRevision.indexOf("d")>0)versionRevision=versionRevision.substring(0,versionRevision.indexOf("d"));}}var nFlashVer=Number(versionMajor+"."+versionMinor+versionRevision);if(isNaN(nFlashVer))return 0;if(((versionMajor==6)&&(versionRevision>=40))||(versionMajor>6))return nFlashVer;else return 0;}}