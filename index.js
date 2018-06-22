const plusClover = getElement("clover1");
const twitterClover = getElement("clover2");
const contentsClover = getElement("clover3");
const linksClover = getElement("clover4");

plusClover.addEventListener("click",function(){
	let url = "https://plus.google.com/+DarknessLotus";
	openWindow(url);
},false);

twitterClover.addEventListener("click",function(){
	let url = "https://www.twitter.com/furan0004";
	openWindow(url);
},false);

contentsClover.addEventListener("click",function(){
	let url = "/pages/contents.html";
	goPage(url);
},false);

linksClover.addEventListener("click",function(){
	let url = "/pages/links.html";
	goPage(url);
},false);
