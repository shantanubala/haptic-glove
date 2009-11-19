/* Vermont-12.4.0-611 */
rsinetsegs=['K05540_10276','K05540_10180','K05540_10183','K05540_10203','K05540_10206','K05540_10208','K05540_10225','K05540_10249','K05540_10279','K05540_10283'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
var i=0;
for(x=0;x<rsinetsegs.length&&i<100;++x){if(!rsiPat.test(rsinetsegs[x])){rsiSegs+="&AS"+rsinetsegs[x];++i;}}
document.cookie="mad_rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['K05540_10276','K05540_10180','K05540_10183','K05540_10203','K05540_10206','K05540_10208','K05540_10225','K05540_10249','K05540_10279','K05540_10283'],'k05540');}