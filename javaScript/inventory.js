let tabs = document.querySelectorAll('.tab')
let slates = document.querySelectorAll('.slate')
let underFill = document.querySelectorAll('.underfill')


underFill[0].style.display = "block"
slates[0].style.zIndex = "2";
tabs[0].style.backgroundColor = "#c8c8c8";
tabs[0].style.borderBottom = "none"
tabs[0].style.zIndex = "3";
tabs[0].style.height = "100px";
tabs[0].style.marginBottom = "31px";

for(let i = 0; i < tabs.length; i++){
    tabs[i].onclick = function(){

        for(let i = 0; i < 3; i++){

            slates[i].style.zIndex = "1"; 
            underFill[i].style.display = "none"
            tabs[i].style.zIndex = "0";
            tabs[i].style.backgroundColor = "#8f8f8f";
            tabs[i].style.border = "5px black solid";
            tabs[i].style.marginBottom = "0px";
            tabs[i].style.height = "69px";
            tabs[i].classList.toggle = "unclickedTab"
        }
        
        underFill[i].style.display = "block"
        slates[i].style.zIndex = "2";
        tabs[i].style.backgroundColor = "#c8c8c8";
        tabs[i].style.borderBottom = "none";
        tabs[i].style.zIndex = "3";
        tabs[i].style.height = "100px";
        tabs[i].style.marginBottom = "31px";
        tabs[i].classList.toggle = "clickedTab"
    }
}
