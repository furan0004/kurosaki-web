import topbar from "../scripts/index.js";
import { getQuery } from "./queryString.js";

var query = getQuery(location.href);
var queries = decodeURIComponent(query["q"]).replaceAll("　", " ").split(" ");
console.log(queries);

topbar.setSearchQuery(queries);

var line = document.getElementsByClassName("line")[0];