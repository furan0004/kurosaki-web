const titleBar = getElement("title");
let downCount = -1;

function count(){
	if(downCount != -1){
		if(downCount >= 2){
			location.reload();
		}
		downCount++;
		
		setTimeout(count,1000);
	}
}

titleBar.addEventListener("click",function(){
	downCount = -1;
	alert("Clicked!");
},false);

titleBar.addEventListener("mousedown",function(){
	downCount = 0;
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
	let url = "https://www.twitter.com/furan0004";
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
