const BASE_CLASS_NAME = "topbar";

var urls = [
    [
        "Twitter Main",
        "https://twitter.com/KuronKurosaki",
    ],
    [
        "Twitter Sub",
        "https://twitter.com/kuron_nano",
    ],
    [
        "YouTube 1",
        "https://www.youtube.com/channel/UCArGke6099LSxDdHbzJOFnQ",
    ],
    [
        "YouTube 2",
        "https://www.youtube.com/channel/UCrjrRi8XRbQ03j_YlvVVKmA",
    ],
];

class TopBar {
    #back;
    #background = "url('res/images/flower5544.jpg')";

    #title = "No Title";

    constructor(title){
        this.renew();
        this.#title = title;
    }

    renew(){
        if(this.#back != null) this.#back.remove();
        this.#back = document.createElement("div");
        this.#back.className = BASE_CLASS_NAME + "_back";

        let cover = document.createElement("div");
        cover.className = BASE_CLASS_NAME + "_cover";

        let topMenu = document.createElement("div");
        topMenu.className = BASE_CLASS_NAME + "_top_menu";

        let blank = document.createElement("div");
        blank.className = BASE_CLASS_NAME + "_blank";

        let titleBar = document.createElement("p");
        titleBar.innerText = this.#title;
        titleBar.className = BASE_CLASS_NAME + "_title";

        blank.appendChild(titleBar);

        let bottomMenu = document.createElement("div");
        bottomMenu.className = BASE_CLASS_NAME + "_bottom_menu";

        let bottomMenuBtns = [];
        for(let i = -1; i < 4; i++){
            let btn = document.createElement("div");
            let label = document.createElement("p");

            btn.className = bottomMenu.className + "_button";
            if(i < 0) btn.classList.add(bottomMenu.className + "_toggle");

            label.className = btn.classList[0]+ "_label";
            label.innerText = (i < 0) ? "Open" : urls[i][0];

            btn.onclick = (i < 0) ? function(){
                let _label = btn.children[0];
                let classes = [
                    BASE_CLASS_NAME + "_bottom_menu_shown",
                    BASE_CLASS_NAME + "_bottom_menu_hiddden",
                ];

                if(_label.innerText == "Open"){
                    bottomMenu.classList.add(classes[0]);
                    bottomMenu.classList.remove(classes[1]);

                    _label.innerText = "Close";
                }else{
                    bottomMenu.classList.add(classes[1]);
                    bottomMenu.classList.remove(classes[0]);

                    _label.innerText = "Open";
                }             

                for(let j = 0; j < bottomMenuBtns.length; j++){
                    bottomMenuBtns[j].classList.add("");
                }
            } : function(){
                window.open(urls[i][1]);
            };

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
}

var TopBars = [];
var elements = document.getElementsByClassName(BASE_CLASS_NAME);
for(let i = 0; i < elements.length; i++){
    TopBars.push(new TopBar());
    elements[i].appendChild(TopBars[i].build());
}