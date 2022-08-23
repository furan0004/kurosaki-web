import { TopBar } from "./topbar.js";

import superIndexStyle from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets.push(superIndexStyle);

import itemStyle from "../styles/elementItems.css" assert {type: "css"};
document.adoptedStyleSheets.push(itemStyle);

var topbar = new TopBar();

(function(){
    document.getElementsByClassName(TopBar.CLASS.BASE)[0].appendChild(topbar.build());
})();

export default topbar;