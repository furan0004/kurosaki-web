var menuItems= [
    {
        text: "Twitter Main",
        url: "https://twitter.com/KuronKurosaki",
        icon: "res/images/twitter.svg",
    },
    {
        text: "Twitter Sub",
        url: "https://twitter.com/kuron_nano",
        icon: "res/images/twitter.svg",
    },
    {
        text: "YouTube 1",
        url: "https://www.youtube.com/channel/UCArGke6099LSxDdHbzJOFnQ",
        icon: "res/images/youtube.svg",
    },
    {
        text: "YouTube 2",
        url: "https://www.youtube.com/channel/UCrjrRi8XRbQ03j_YlvVVKmA",
        icon: "res/images/youtube.svg",
    },
];


class TopBar {
    static ROOT_PATH = (location.href == "https://pages.kurosaki.love" || location.href ==  "https://pages.kurosaki.love/index.html") ? "" : "https://pages.kurosaki.love";
    static DEFAULT_RESOURCES = {
        BACKGROUND: TopBar.ROOT_PATH + "res/images/flower5544.jpg",
        ICON: {
            HOME: TopBar.ROOT_PATH + "res/images/home.svg",
            TWITTER: TopBar.ROOT_PATH + "res/images/twitter.svg",
            YOUTUBE: TopBar.ROOT_PATH + "res/images/youtube.svg",
        },
    };

    static CLASS = {
        BASE: "topbar",
        BACK: "topbar_back",
        COVER: "topbar_cover",

        TOP_MENU: "topbar_top_menu",
        HOME_BUTTON: "topbar_top_menu_home",

        BLANK: "topbar_blank",
        TITLEBAR: "topbar_title",

        BOTTOM_MENU: "topbar_bottom_menu",
        BOTTOM_MENU_BUTTON: "topbar_bottom_menu_button",
        BOTTOM_MENU_BUTTON_LABEL: "topbar_bottom_menu_button_label",
        BOTTOM_MENU_BUTTON_LABEL_TEXT: "topbar_bottom_menu_button_label_text",
        BOTTOM_MENU_BUTTON_LABEL_ICON: "topbar_bottom_menu_button_label_icon",
    };

    #elements = {
        back: null,
        cover: null,
        topMenu: null,
        homeButton: null,
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


    #background = `url('${TopBar.DEFAULT_RESOURCES.BACKGROUND}')`;

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
        if(this.#elements.cover != null) this.#elements.cover.remove();
        this.#elements.cover = document.createElement("div");
        this.#elements.cover.classList.add(TopBar.CLASS.COVER);

        this.#elements.topMenu = document.createElement("div");
        this.#elements.topMenu.classList.add(TopBar.CLASS.TOP_MENU);

        let home = this.getHome();
        if(home != null){
            this.#elements.homeBtn = document.createElement("img");
            this.#elements.homeBtn.classList.add(TopBar.CLASS.HOME_BUTTON);
            this.#elements.homeBtn.src =  this.getHomeIcon();
            this.#elements.homeBtn.onclick = function(){
                location.href = home;
            };

            this.#elements.topMenu.appendChild(this.#elements.homeBtn);
        }

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
            let btn = document.createElement("div");
            let label = document.createElement("div");
            let labelText = document.createElement("p");
            let icon = document.createElement("img");

            btn.className = TopBar.CLASS.BOTTOM_MENU_BUTTON;
            btn.onclick = function(){
                window.open(this.#bottomMenuItems[i].url);
            };

            label.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL);

            labelText.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL_TEXT);
            labelText.innerText = this.#bottomMenuItems[i].text;

            icon.classList.add(TopBar.CLASS.BOTTOM_MENU_BUTTON_LABEL_ICON);
            icon.src = this.#bottomMenuItems[i].icon;

            label.appendChild(icon);
            label.appendChild(labelText);
            btn.appendChild(label);
            this.#elements.bottomMenu.appendChild(btn);

            this.#elements.bottomMenuBtns.push({
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

    #load(){
        this.#elements.back.style.background = this.#background;
        this.renew();
    }

    build(){
        this.#load();
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
}

var TopBars = [];
var elements = document.getElementsByClassName(TopBar.CLASS.BASE);
for(let i = 0; i < elements.length; i++){
    let topbar = new TopBar();
    topbar.setHome("https://pages.kurosaki.love");
    topbar.setMenu(menuItems);

    elements[i].appendChild(topbar.build());
    TopBars.push(topbar);
}