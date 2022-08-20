import topbar from "../scripts/index.js";
import { getQuery } from "../scripts/queryString.js";

var query = getQuery(location.href);
var queries = decodeURIComponent(query["q"]).replaceAll("　", " ").split(" ");
console.log(queries);

topbar.setTitle(document.title);
topbar.load();
topbar.setSearchQuery(queries);

var line = document.getElementsByClassName("line")[0];