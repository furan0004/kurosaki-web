import { TopBar } from "./topbar.js";
import { getQuery } from "./queryString.js";
import menuItems  from "../data/menuItems.json" assert { type: "json" };

import indexSheet from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets.push(indexSheet);

var elements = document.getElementsByClassName(TopBar.CLASS.BASE);

var topbar;
topbar = new TopBar();
topbar.setHome("https://pages.kurosaki.love");
topbar.setMenu(menuItems);

elements[0].appendChild(topbar.build());
export default topbar;

var query = getQuery(location.href);
console.log(decodeURIComponent(query["q"]));
