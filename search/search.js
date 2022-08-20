import topbar from "../scripts/index.js";
import { getQuery } from "../scripts/queryString.js";
import { restrictLength } from "https://utils.kurosaki.love/scripts/functions.js";
import pageData from "../data/pages.json" assert {type: "json"};

import itemStyle from "" assert {type: "css"};
//document.adoptedStyleSheets.push(itemStyle);

var line = document.getElementsByClassName("line")[0];

var query = getQuery(location.href);
var queries = decodeURIComponent(query["q"]).replaceAll("　", " ");

(function(){
    topbar.setTitle(document.title);
    topbar.setMenu([]);
    topbar.load();
    topbar.setSearchQuery(queries);

    for(let i = 0; i < pageData.length; i++){
        let item = createItem(pageData[i]);

        let p = document.createElement("p");
        let keys = Object.keys(pageData[i]);
        for(let j = 0; j < keys.length; j++){
            p.innerHTML += `${(j == 0 ? "" : "<br>")} ${keys[j]}: ${pageData[i][keys[j]]}`;
        }

        line.appendChild(p);
    }
})();

function createItem(info){
    let back = docment.createElement("div");

    return back;
}