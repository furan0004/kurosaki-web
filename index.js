const titleBar = getElement("title");

titleBar.addEventListener("click",function(){
	downCount = -1;
	alert("Clicked!");
},false);

const plusClover = getElement("clover1");
const twitterClover = getElement("clover2");
const contentsClover = getElement("clover3");
const linksClover = getElement("clover4");

plusClover.addEventListener("click",function(){
	let url = "https://plus.google.com/+DarknessLotus";
	openWindow(url);
},false);

twitterClover.addEventListener("click",function(){
	let url = "https://www.twitter.com/lotus_darkness";
	openWindow(url);
},false);

contentsClover.addEventListener("click",function(){
	let url = "/pages/contents/contents.html";
	goPage(url);
},false);

linksClover.addEventListener("click",function(){
	let url = "/pages/links/links.html";
	goPage(url);
},false);
