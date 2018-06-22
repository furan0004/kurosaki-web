const plusClover = document.getElementById("clover1");
const twitterClover = document.getElementById("clover2");

plusClover.addEventListener("click",function(){
	let url = "https://plus.google.com/+DarknessLotus";
	window.open(url);
},false);

twitterClover.addEventListener("click",function(){
	let url = "https://www.twitter.com/furan0004";
	goPage(url);
},false);