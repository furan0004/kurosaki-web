function goPage(url){
	Location.href = url.toString();
}

function openWindow(url){
	window.open(url.toString());
}

function getElement(id){
	return document.getElementById(id.toString());
}