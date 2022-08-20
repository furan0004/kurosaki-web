import topbar from "../scripts/index.js";
import { getQuery } from "../scripts/queryString.js";
import { restrictLength } from "https://utils.kurosaki.love/scripts/functions.js";
import pageData from "../data/pages.json" assert {type: "json"};

import itemStyle from "./item.css" assert {type: "css"};
document.adoptedStyleSheets.push(itemStyle);

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

        line.appendChild(item);
    }
})();

function createItem(info){
    let back = document.createElement("div");
    back.classList.add("item");

    let urlRow = document.createElement("div");
    urlRow.classList.add("item-row");
    urlRow.classList.add("item-url");
    urlRow.innerText = restrictLength(info.url, 40, "...");

    let titleRow = document.createElement("div");
    titleRow.classList.add("item-row");

    let anchor = document.createElement("a");
    anchor.classList.add("item-title");
    anchor.innerText = restrictLength(info.title, 30, "...");
    anchor.href = info.url;
    titleRow.appendChild(anchor);

    let descriptionRow = document.createElement("div");
    descriptionRow.classList.add("item-row");
    descriptionRow.classList.add("item-description");
    descriptionRow.innerText = restrictLength(info.description.replaceAll("\n", " "), 200, "...");

    back.appendChild(urlRow);
    back.appendChild(titleRow);
    back.appendChild(descriptionRow);

    return back;
}