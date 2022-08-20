import topbar from "../scripts/index.js";
import { getQuery } from "../scripts/queryString.js";
import pageData from "../data/pages.json" assert {type: "json"};

var line = document.getElementsByClassName("line")[0];

var query = getQuery(location.href);
var queries = decodeURIComponent(query["q"]).replaceAll("　", " ").split(" ");

(function(){
    topbar.setTitle(document.title);
    topbar.setMenu([]);
    topbar.load();
    topbar.setSearchQuery(queries);

    for(let i = 0; i < pageData.length; i++){
        let p = document.createElement("p");
        let keys = Object.keys(pageData[i]);
        for(let j = 0; j < keys.length; j++){
            p.innerHTML += `${(j == 0 ? "" : "<br>")} ${keys[j]}: ${pageData[i][keys[j]]}`;
        }

        line.appendChild(p);
    }
})();
