import { importStyles } from "https://utils.kurosaki.love/lib/functions/first.js";
import { TopBar } from "./topbar.js";

var topbar = new TopBar();

(function(){
    importStyles(["https://pages.kurosaki.love/styles/index.css", "https://pages.kurosaki.love/styles/elementItems.css"]);
    document.getElementsByClassName(TopBar.CLASS.BASE)[0].appendChild(topbar.build());
})();

export default topbar;