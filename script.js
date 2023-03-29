// function horloge, heure

let html = document.getElementById("time");

setInterval(function () {
  let time = new Date();

  heu = time.getHours();
  min = time.getMinutes();
  seg = time.getSeconds();
// condition pour reajuter le cero si est mineur 10
  if (heu < 10) {
    heu = "0" + heu;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (seg < 10) {
    seg = " 0" + seg;
    //on appelle le inner html avec te variable heu + min + seg
  }
  html.innerHTML = heu + " : " + min + " : " + seg;
}, 1000);

