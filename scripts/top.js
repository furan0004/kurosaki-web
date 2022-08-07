const BASE_CLASS_NAME = "topbar";

var urls = [
    [
        "Twitter Main",
        "https://twitter.com/KuronKurosaki",
        "res/images/twitter.svg",
    ],
    [
        "Twitter Sub",
        "https://twitter.com/kuron_nano",
        "res/images/twitter.svg",
    ],
    [
        "YouTube 1",
        "https://www.youtube.com/channel/UCArGke6099LSxDdHbzJOFnQ",
        "res/images/youtube.svg",
    ],
    [
        "YouTube 2",
        "https://www.youtube.com/channel/UCrjrRi8XRbQ03j_YlvVVKmA",
        "res/images/youtube.svg",
    ],
];

class TopBar {
    #back;
    #background = "url('res/images/flower5544.jpg')";

    #home;
    #HOME_ICON = "res/images/home.svg";

    #title = "No Title";

    constructor(title){
        this.renew();
        if(title != null) this.#title = title;
    }

    renew(){
        if(this.#back != null) this.#back.remove();
        this.#back = document.createElement("div");
        this.#back.className = BASE_CLASS_NAME + "_back";

        let cover = document.createElement("div");
        cover.className = BASE_CLASS_NAME + "_cover";

        let topMenu = document.createElement("div");
        topMenu.className = BASE_CLASS_NAME + "_top_menu";

        let home = this.getHome();
        if(home != null){
            let homeBtn = document.createElement("img");
            homeBtn.src =  this.getHomeIcon();
            homeBtn.classList.add(topMenu.classList[0] + "_home");
            homeBtn.onclick = function(){
                location.href = home;
            };

            topMenu.appendChild(homeBtn);
        }

        let blank = document.createElement("div");
        blank.className = BASE_CLASS_NAME + "_blank";

        let titleBar = document.createElement("p");
        titleBar.innerText = this.getTitle();
        titleBar.className = BASE_CLASS_NAME + "_title";

        blank.appendChild(titleBar);

        let bottomMenu = document.createElement("div");
        bottomMenu.className = BASE_CLASS_NAME + "_bottom_menu";

        let bottomMenuBtns = [];
        for(let i = 0; i < 4; i++){
            let btn = document.createElement("div");
            let label = document.createElement("div");
            let labelText = document.createElement("p");
            let icon = document.createElement("img");

            btn.className = bottomMenu.className + "_button";
            btn.onclick = function(){
                window.open(urls[i][1]);
            };

            label.classList.add(btn.classList[0]+ "_label");

            labelText.classList.add(btn.classList[0]+ "_label_text");
            labelText.innerText = urls[i][0];

            icon.classList.add(btn.classList[0]+ "_label_icon");
            icon.src = urls[i][2];

            label.appendChild(icon);
            label.appendChild(labelText);
            btn.appendChild(label);
            bottomMenu.appendChild(btn);
        }

        cover.appendChild(topMenu);
        cover.appendChild(blank);
        cover.appendChild(bottomMenu);
    
        this.#back.appendChild(cover);
    }

    #load(){
        this.#back.style.background = this.#background;
    }

    build(){
        this.#load();
        return this.#back;
    }

    setTitle(title){
        this.#title = title;
    }

    getTitle(){
        return this.#title;
    }

    setBackground(background){
        this.#background = (background.charAt(0) == "#") ? background : `url("${background}")`;
    }

    getBackground(){
        return (this.#background.charAt(0) == "#") ? this.#background : this.#background.slice(5, -2); 
    }

    getHomeIcon(){
        return this.#HOME_ICON;
    }

    setHomeIcon(path){
        this.#HOME_ICON = path;
    }

    getHome(){
        return this.#home;
    }

    setHome(path){
        this.#home = path;
    }
}

var TopBars = [];
var elements = document.getElementsByClassName(BASE_CLASS_NAME);
for(let i = 0; i < elements.length; i++){
    let topbar = new TopBar();
    topbar.setHome("https://pages.kurosaki.love");
    
    topbar.renew();

    elements[i].appendChild(topbar.build());
    TopBars.push(topbar);
}