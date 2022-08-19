import { TopBar } from "./topbar.js";
import menuItems  from "../data/menuItems.json" assert { type: "json" };
import indexSheet from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets.push(indexSheet);


var elements = document.getElementsByClassName(TopBar.CLASS.BASE);

export var topbar;
topbar = new TopBar();
topbar.setHome("https://pages.kurosaki.love");
topbar.setMenu(menuItems);

elements[0].appendChild(topbar.build());