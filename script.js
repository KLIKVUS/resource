window.onload = () => {
    // Все связаное с поиском
    const searchINP = document.getElementById('searchINP');
    const searchBTN = document.getElementById('searchBTN');

    const search = () => {
        var value = searchINP.value.trim();
        var list = document.querySelectorAll('li');
        if (value !='') {
            list.forEach(elem => {
                if (elem.innerText.search(value)== -1) {
                    elem.classList.add('hide');
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


    // Плавная прокрутка вверх
    const upBTN = document.getElementById("upBTN")
    var t;
    function up() {
        var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        if(top > 0) {
            window.scrollBy(0, -1000);
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