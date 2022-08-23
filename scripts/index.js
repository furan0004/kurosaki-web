import { TopBar } from "./topbar.js";

import indexStyle from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets.push(indexStyle);

import itemStyle from "../styles/elementItems.css" assert {type: "css"};
document.adoptedStyleSheets.push(itemStyle);

var topbar = new TopBar();

(function(){
    document.getElementsByClassName(TopBar.CLASS.BASE)[0].appendChild(topbar.build());
})();

export default topbar;