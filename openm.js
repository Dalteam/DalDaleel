
menu = document.querySelector('.open-menu');

menu.onclick = function(){
    navlist = document.querySelector('.nav-links');
    navlist.classList.toggle("open");
}