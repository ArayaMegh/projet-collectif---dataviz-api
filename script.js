let html = document.getElementById("time");

setInterval(function(){
    let time = new Date();

    heu = time.getHours();
    min = time.getMinutes();
    seg = time.getSeconds();

    if (heu<10) {
        heu = "0" + heu
    }
    if (min<10){
        min = "0" + min
    }
    if (seg<10) {
        seg = " 0" + seg
    }
html.innerHTML = heu+ " : " + min + " : " + seg;
},1000);