menuBtn = document.getElementById("showMenu");
menuSmol = document.getElementById("listElem");
menuSmol2 = document.getElementById("listElem2");
menuSmol3 = document.getElementById("listElem3");
var showing = false;
function showMenu(){
    if(!showing){
        menuSmol.className = "showing";
        menuSmol2.className = "showing";
        menuSmol3.className = "showing";
    }else{
        menuSmol.className = "hidden";
        menuSmol2.className = "hidden";
        menuSmol3.className = "hidden";
    }
    showing = !showing;
}