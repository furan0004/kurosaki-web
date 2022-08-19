import { TopBar } from "./topbar.js";
import menuItems  from "../data/menuItems.json" assert { type: "json" };
import indexSheet from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets = [indexSheet];
ShadowRoot.adoptedStyleSheets = [indexSheet];

var TopBars = [];
var elements = document.getElementsByClassName(TopBar.CLASS.BASE);
for(let i = 0; i < elements.length; i++){
    let topbar = new TopBar();
    topbar.setHome("https://pages.kurosaki.love");
    topbar.setMenu(menuItems);

    elements[i].appendChild(topbar.build());
    TopBars.push(topbar);
}