import { importStyle } from "https://utils.kurosaki.love/lib/functions/first.js";
importStyle("https://pages.kurosaki.love/styles/topbar.css");

import topbarSheet from "../styles/topbar.css" assert {type: "css"};
//document.adoptedStyleSheets.push(topbarSheet);

const root = ["https://pages.kurosaki.love/", "https://pages.kurosaki.love/index.html"];

export class TopBar {
    static ROOT_PATH = [root[0], ""][Math.sign(1 + root.indexOf(location.href))];
    static DEFAULT_RESOURCES = {
        BACKGROUND: "aquamarine",
        ICON: {
            HOME: TopBar.ROOT_PATH + "res/images/home.svg",
            SEARCH: TopBar.ROOT_PATH + "res/images/search.svg",
            TWITTER: TopBar.ROOT_PATH + "res/images/twitter.svg",
            YOUTUBE: TopBar.ROOT_PATH + "res/images/youtube.svg",
        },
    };

    static RESOURCE_SHORT = {
        "default://icon_home": TopBar.DEFAULT_RESOURCES.ICON.HOME,
        "default://icon_search": TopBar.DEFAULT_RESOURCES.ICON.SEARCH,
        "default://icon_twitter": TopBar.DEFAULT_RESOURCES.ICON.TWITTER,
        "default://icon_youtube": TopBar.DEFAULT_RESOURCES.ICON.YOUTUBE,
    };

    static CLASS = {
        BASE: "topbar",
        BACK: "topbar_back",
        COVER: "topbar_cover",

        TOP_MENU: "topbar_top_menu",
        HOME_BUTTON_ANCHOR: "topbar_top_menu_home_anchor",
        HOME_BUTTON: "topbar_top_menu_home",

        SEARCH_MENU: "topbar_top_menu_search",
        SEARCH_MENU_FIELD: "topbar_top_menu_search_field",
        SEARCH_MENU_BUTTON: "topbar_top_menu_search_button",

        BLANK: "topbar_blank",
        TITLEBAR: "topbar_title",

        BOTTOM_MENU: "topbar_bottom_menu",
        BOTTOM_MENU_BUTTON: "topbar_bottom_menu_button",
        BOTTOM_MENU_BUTTON_ANCHOR: "topbar_bottom_menu_button_anchor",
        BOTTOM_MENU_BUTTON_LABEL: "topbar_bottom_menu_button_label",
        BOTTOM_MENU_BUTTON_LABEL_TEXT: "topbar_bottom_menu_button_label_text",
        BOTTOM_MENU_BUTTON_LABEL_ICON: "topbar_bottom_menu_button_label_icon",
    };

    #elements = {
        back: null,
        cover: null,
        topMenu: null,
        homeButtonAnchor: null,
        homeButton: null,
        searchMenu: null,
        searchButton: null,
        searchField: null,
        blank: null,
        bottomMenu: null,
        bottomMenuBtns: [],
    };

    #bottomMenuItems = [];
    /*
    item example:
        {
            text: "Google",
            icon: ".../google.png",
            url: "https://google.co.uk",
        }
    */


    #background = TopBar.DEFAULT_RESOURCES.BACKGROUND;

    #home;
    #homeIcon = TopBar.DEFAULT_RESOURCES.ICON.HOME;

    #title;

    constructor(title){
        this.#elements.back = document.createElement("div");
        this.#elements.back.classList.add(TopBar.CLASS.BACK);

        this.renew();
        this.#title = title || "No Title";
    }

    renew(){
        let self = this;

        if(this.#elements.cover != null) this.#elements.cover.remove();
        this.#elements.cover = document.createElement("div");
        this.#elements.cover.classList.add(TopBar.CLASS.COVER);

        this.#elements.topMenu = document.createElement("div");
        this.#elements.topMenu.classList.add(TopBar.CLASS.TOP_MENU);


        let home = this.getHome();
        if(home != null){
            this.#elements.homeButtonAnchor = document.createElement("a");
            this.#elements.homeButtonAnchor.href = home;

            this.#elements.homeButton = document.createElement("img");
            this.#elements.homeButton.classList.add(TopBar.CLASS.HOME_BUTTON);
            this.#elements.homeButton.src =  this.getHomeIcon();

            this.#elements.homeButtonAnchor.appendChild(this.#elements.homeButton);
            this.#elements.topMenu.appendChild(this.#elements.homeButtonAnchor);
        }


        this.#elements.searchMenu = document.createElement("div");
        this.#elements.searchMenu.classList.add(TopBar.CLASS.SEARCH_MENU);
        
        this.#elements.searchButton = document.createElement("img");
        this.#elements.searchButton.classList.add(TopBar.CLASS.SEARCH_MENU_BUTTON);
        this.#elements.searchButton.src = TopBar.DEFAULT_RESOURCES.ICON.SEARCH;
        this.#elements.searchButton.addEventListener("click", function(event){
            let field = self.#elements.searchField;

            if(field.style.display == "none"){
                field.style.display = "block";
                field.focus();
            }else{
                let text = field.value;
                text = text.replaceAll("　", " ");

                location.href = "https://pages.kurosaki.love/search?q=" + text;
            }
        });

        this.#elements.searchField = document.createElement("textarea");
        this.#elements.searchField.classList.add(TopBar.CLASS.SEARCH_MENU_FIELD);
        this.#elements.searchField.style.display = "none";
        this.#elements.searchField.rows = 1;
        this.#elements.searchField.addEventListener("blur", function(event){
            setTimeout(function(){
                self.#elements.searchField.style.display = "none";
            }, 100);
        });
        this.#elements.searchField.addEventListener("keypress", function(event){
            if(event.keyCode == 13){
                self.#elements.searchButton.click();
                event.preventDefault();
            }
        });

        this.#elements.searchMenu.appendChild(this.#elements.searchField);
        this.#elements.searchMenu.appendChild(this.#elements.searchButton);
        this.#elements.topMenu.appendChild(this.#elements.searchMenu);

        this.#elements.blank = document.createElement("div");
        this.#elements.blank.classList.add(TopBar.CLASS.BLANK);

        this.#elements.titleBar = document.createElement("p");
        this.#elements.titleBar.classList.add(TopBar.CLASS.TITLEBAR);
        this.#elements.titleBar.innerText = this.getTitle();

        this.#elements.blank.appendChild(this.#elements.titleBar);

        this.#elements.bottomMenu = document.createElement("div");
        this.#elements.bottomMenu.classList.add(TopBar.CLASS.BOTTOM_MENU);

        this.#elements.bottomMenuBtns = [];
        for(let i = 0; i < this.#bottomMenuItems.length; i++){
            let anchor = document.createElement("a");
            anchor.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_ANCHOR);
            anchor.style.width = `${100 / this.#bottomMenuItems.length}%`;
            anchor.href = this.#bottomMenuItems[i].url;

            let btn = document.createElement("div");
            btn.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON);

            let label = document.createElement("div");
            label.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL);

            let labelText = document.createElement("p");
            labelText.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL_TEXT);
            labelText.innerText = this.#bottomMenuItems[i].text;

            let icon = document.createElement("img");
            icon.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL_ICON);
            icon.src = (Object.keys(TopBar.RESOURCE_SHORT).indexOf(this.#bottomMenuItems[i].icon) != -1) ? TopBar.RESOURCE_SHORT[this.#bottomMenuItems[i].icon] : this.#bottomMenuItems[i].icon;

            label.appendChild(icon);
            label.appendChild(labelText);
            btn.appendChild(label);
            anchor.appendChild(btn);
            this.#elements.bottomMenu.appendChild(anchor);

            this.#elements.bottomMenuBtns.push({
                anchor: anchor,
                btn: btn,
                label: label,
                labelText: labelText,
                icon: icon,
            });
        }

        this.#elements.cover.appendChild(this.#elements.topMenu);
        this.#elements.cover.appendChild(this.#elements.blank);
        this.#elements.cover.appendChild(this.#elements.bottomMenu);
    
        this.#elements.back.appendChild(this.#elements.cover);
    }

    load(){
        this.#elements.back.style.background = this.#background;
        this.renew();
    }

    build(){
        this.load();
        return this.#elements.back;
    }

    setTitle(title){
        this.#title = title;
    }

    getTitle(){
        return this.#title;
    }

    setBackground(background){
        this.#elements.background = (background.charAt(0) == "#") ? background : `url("${background}")`;
    }

    getBackground(){
        return (this.#elements.background.charAt(0) == "#") ? this.#elements.background : this.#elements.background.slice(5, -2); 
    }

    getHomeIcon(){
        return this.#homeIcon;
    }

    setHomeIcon(path){
        this.#homeIcon = path;
    }

    getHome(){
        return this.#home;
    }

    setHome(path){
        this.#home = path;
    }

    setMenu(arr){
        this.#bottomMenuItems = arr;
    }

    addMenu(item){
        this.#bottomMenuItems.push(item);
    }

    getMenu(){
        return this.#bottomMenuItems;
    }

    setSearchQuery(str){
        this.#elements.searchField.value = str;
    }

    getSearchQuery(){
        return this.#elements.searchField.value;
    }
}