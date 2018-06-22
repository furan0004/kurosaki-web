function goPage(url){
	location.href = url.toString();
}

function openWindow(url){
	window.open(url.toString());
}

function getElement(id){
	return document.getElementById(id.toString());
}

alert("functions.js loaded!");