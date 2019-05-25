function showPage(){
	let tags = [
		"<head>",
		"<title>くろんのへや</title>",
		"</head>",
		"<body>",
		"<a style='text-align:center' href='https://www.twitter.com/lotus_darkness/'>Go Twitter</a>",
		"</body>",
	];
					
	document.write(tags.join(""));
}


(function(){
	let href = location.href;
	let ref = document.referrer;
	
	if(href == "https://furan0004.github.io/"){
		let spl = ref.split("/"); 
		if(spl[2] == "gloyah.net" && spl[4].split("?")[0] =="E0an"){
			showPage();
			alert("complete");
		}else{
			document.write("Wrong Referrer\n<a href='http://evassmat.com/E0an'>Go through the correct route</a>");
		}
	}else{
		alert(href);
	}
})();
