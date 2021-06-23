window.onload = () => {
    // Все связаное с поиском
    const searchINP = document.getElementById('searchINP');
    const searchBTN = document.getElementById('searchBTN');
    const list = document.querySelectorAll('li');

    const search = () => {
        var value = searchINP.value.trim().toLowerCase();
        if (value != '') {
            list.forEach(elem => {
                if (elem.innerText.toLowerCase().search(value) == -1) {
                    elem.classList.add('hide');
                } else {
                    elem.classList.remove('hide');
                }
            });
        } else {
            list.forEach(elem => {
                elem.classList.remove('hide');
            })
        }
    }
    
    searchBTN.addEventListener('click', search);
    searchINP.addEventListener('search', search);
    // searchINP.addEventListener('keydown', e => {
    //     if (searchINP.value == "" && e.key == "Backspace") {
    //         list.forEach(elem => {
    //             elem.classList.remove('hide');
    //         })
    //     }
    // })


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


    // Смена темы
    document.getElementById("theme").addEventListener("click", () => {
        if (localStorage.getItem("theme") != "dark") {
            localStorage.setItem("theme", "dark");
            document.body.classList.toggle("dark");
        } else {
            localStorage.removeItem("theme");
            document.body.classList.toggle("dark");
        }
    })
    localStorage.getItem("theme") == "dark" ? document.body.classList.toggle("dark") : null;
}