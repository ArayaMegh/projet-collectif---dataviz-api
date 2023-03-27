// fuction horloge, heure

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


 // function map
//  cree variable map . et appelle la librerie L.map que va importe le map 
// avec les cordone de la ville , cartier , au pays 

 /* let map = L.map("map")
 map.setView([47.2173, -1.5534], 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map); */
 //let marker = L.marker([47.2173, -1.5534]).addTo(map);

// function de geolocalitation 
/* navigator.geolocation.watchPosition(success,error);

function success(pos) {

    const lati = pos.coords.latitude;
    const long = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;
    //let stations = await getStations(locationResult.coords)

   let marker = L.marker([lati,long]).addTo(map)
   let circlet= L.circle([lati,long],{ radius:accuracy}).addTo(map);

    map.fitBounds(circlet.getBounds());
}

function error (err) {
    if (err.code ===1){
        alert ( "accepte geolocalitation")
    }else{
        alert ("votre dispositive ne permet pas la geolocalition ")
    }
    
}
 */


//fonction appelée si l'utilisateur autorise la géolocalisation du navigateur et reçoit en paramètres
// la localisation

      /* navigator.geolocation.watchPosition(success,error);

     async function success(locationResult) {
         const lati = locationResult.coords.latitude;
         const long =locationResult.coords.longitude;
         const accuracy = locationResult.coords.accuracy;
             console.log("User is at " + lati + ":" + long + ":" + accuracy )
         let marker = L.marker([lati,long,accuracy]).addTo(map)
         let circlet= L.circle([lati,long,accuracy],{radius:accuracy}).addTo(map);
         //let stations = await getStations(locationResult.coords).addTo(map)
     map.fitBounds(circlet.getBounds());
             console.log(stations)
     }

     function error (err) {
         if (err.code ===1){
             alert ( "accepte geolocalitation")
         }else{
             alert ("votre dispositive ne permet pas la geolocalition ")
         }
         */
    /*  }
    

     async function getStations(coords) {
        let url = "https://open.tan.fr/ewp/arrets.json/" + coords.latitude + "/" + coords.longitude .addTo(map)
    
        console.log(url)    
        //contient la réponse de la requête (ici localisation)
        const response = await fetch (url)
        //contient la réponse en format .json 
        const arrets = await response.json()
        
        return arrets 
    }  */