function showPage(){
	let tags = [
		"<head>",
		"<title>くろんのへや</title>",
		"</head>",
		"<body>",
		"",
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
			document.write("Wrong Referrer");
		}
	}else{
		alert(href);
	}
})();
