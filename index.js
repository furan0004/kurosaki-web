import topbar from "./scripts/index.js";
import menuItems  from "./data/menuItems.json" assert { type: "json" };

import serchPaneStyle from "./styles/searchPane.css" assert {type: "css"};
document.adoptedStyleSheets.push(serchPaneStyle);

var searchInput = document.getElementById("searchQuery");

(function(){
    topbar.setHome("https://pages.kurosaki.love");
    topbar.setMenu(menuItems);
    topbar.load();

    searchInput.addEventListener("keypress", function(event){
        if(event.keyCode == 13){
            let text = event.target.value.replaceAll("　", " ");
            location.href = "https://pages.kurosaki.love/search?q=" + text;

            event.preventDefault();
        }
    });
})();