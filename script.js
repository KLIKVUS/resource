window.onload = () => {
    // Смена темы
    const themeReplace = (color, background) => {
        document.documentElement.style.setProperty("--text-color", color)
        document.documentElement.style.setProperty("--background-color", background)
    }

    document.getElementById("theme").addEventListener("click", () => {
        if (localStorage.getItem("theme") != "dark") {
            localStorage.setItem("theme", "dark");
            themeReplace("#fff", "#222");
        } else {
            localStorage.removeItem("theme");
            themeReplace("#333", "#fff");
        }
    })
    localStorage.getItem("theme") == "dark" ? themeReplace("#fff", "#222") : null;


    // Плавное появление текста
    let i = 0;
    const drawElement = () => {
        i == list.length ? clearInterval(LoadTimer) : list[i].style = `left: 0;`
        i++;
    }
    var LoadTimer = setInterval(drawElement, 25);


    // Все связаное с поиском
    const searchINP = document.getElementById('searchINP');
    const searchBTN = document.getElementById('searchBTN');
    const list = document.querySelectorAll('li');
    const unHide = (el) => {
        el.style.display = "list-item";
        setTimeout(() => {
            el.style = `left: 0;`
        }, 1);
    }
    const errorMsg = document.createElement("li")
    const error = () => {
        if (error.isRun) {
            console.log("Awd");
            return false;
        }

        errorMsg.style = `left: 0;`
        errorMsg.textContent = "Я не смог найти твой запрос 😭";
        list[0].parentElement.appendChild(errorMsg);

        error.isRun = true;
    }
    const removeError = () => {
        if (error.isRun == true) {
            list[0].parentElement.removeChild(errorMsg);
            error.isRun = false;
        }
    }
    

    const search = () => {
        clearInterval(LoadTimer);
        
        var value = searchINP.value.trim().toLowerCase();
        if (value != '') {
            let i = 0;
            list.forEach(elem => {
                if (elem.innerText.toLowerCase().search(value) == -1) {
                    // elem.classList.add('hide');
                    elem.style = `left: -100%; font-size: 0;`
                    setTimeout(() => { elem.style.display = "none" }, 500);

                    i++; i == list.length ? error() : null;
                } else {
                    // elem.classList.remove('hide');
                    removeError(); unHide(elem);
                }
            });
        }
    }
    
    searchBTN.addEventListener('click', search);
    searchINP.addEventListener('search', search);
    searchINP.addEventListener('input', (e) => {
        if (e.target.value == "") {
            list.forEach(elem => {
                // elem.classList.remove('hide');
                removeError(); unHide(elem);
            })
        }
    });


    // Плавная прокрутка вверх
    const upBTN = document.getElementById("upBTN")
    var t = null;
    var scroll = Math.floor(document.body.offsetHeight / (window.outerHeight / 100));

    function up() {
        var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        if(top > 0) {
            window.scrollBy(0, -scroll);
            t = setTimeout(up, 20);
        } else clearTimeout(t);
        return false;
    }
    upBTN.addEventListener("click", up);

    // Появление прокрутки
    document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop >= 500) {
            upBTN.style = (
                `display: block; 
                opacity: 1;`
            )
        } else {
            upBTN.style = (
                `display: none; 
                opacity: 0;`
            ) 
        }
    })
}