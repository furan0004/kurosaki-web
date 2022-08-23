import { TopBar } from "./topbar.js";

import indexSheet from "../styles/index.css" assert {type: "css"};
document.adoptedStyleSheets.push(indexSheet);

var topbar = new TopBar();
var elements = document.getElementsByClassName(TopBar.CLASS.BASE);
elements[0].appendChild(topbar.build());

export default topbar;