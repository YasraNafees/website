// Header Scroll
let nav=document.querySelector(".navbar");
window.onscroll=function(){
    if(document.documentElement.scrollTop>50){
        nav.classList.add("header-scrolled");
    }else{
        nav.classList.remove("header-scrolled"); 
    }
}
let navBar=document.querySelectorAll(".nav-link");
let navCollpase=document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function(e){
    e.addEventListener("click",function(){
        navCollpase.classList.remove("show");
    })
})
