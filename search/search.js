import topbar from "../scripts/index.js";
import { restrictLength } from "https://utils.kurosaki.love/lib/functions/stringOrder.js";
import { importStyles, importJSON} from "https://utils.kurosaki.love/lib/functions/first.js";


String.prototype.matchCount = function(str){
    if(this.length * str.length <= 0) return -1;

    let count = 0;

    let index = this.indexOf(str);
    while(index != -1){
        count++;
        index = this.indexOf(str, index + 1);
    }

    return count;
};

var line = document.getElementsByClassName("line")[0];

(function(){
    importStyles(["https://pages.kurosaki.love/search/index.css", "https://pages.kurosaki.love/search/item.css"]);
    applyList();
    
})();

async function applyList(){
    let pageData = await importJSON("https://pages.kurosaki.love/data/pages.json");

    let queryList = await import("../scripts/queryString.js").then(function(module){
        let query = module.getQuery(location.href)["q"].replaceAll("　", " ");

        topbar.setHome("../");
        topbar.setTitle(document.title);
        topbar.setMenu([]);
        topbar.load();
        topbar.setSearchQuery(query);

        return query.split(" ");
    }).catch(err => console.log(err));

    let searchItems = [];
    for(let i = 0; i < pageData.length; i++){
        let score = 0;

        let keys = Object.keys(pageData[i]);
        for(let j = 0; j < keys.length; j++){
            let data = pageData[i][keys[j]];

            for(let k = 0; k < queryList.length; k++){
                if(data == queryList[k]) score += 10**6;
                if(data.toLowerCase() == queryList[k].toLowerCase()) score += 10**3;

                score += 3 * data.matchCount(queryList[k]) + data.toLowerCase().matchCount(queryList[k].toLowerCase());
            }
        }

        if(score != 0) searchItems.push([pageData[i], score]);
    }

    if(searchItems.length > 0){
        searchItems.sort(function(a, b){
            return b[1] - a[1];
        });

        document.getElementById("emptyMessage").remove();

        let msg = document.createElement("p");
        msg.innerText = queries.length == 0 ? "List of All pages" : `search for: ${queries}`;

        line.appendChild(msg);
    }

    for(let i = 0; i < searchItems.length; i++){
        let item = createItem(searchItems[i][0]);
        line.appendChild(item);
    }
}

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

async function 