
async function fetchAPI(url) {
    let response = await fetch(url)
    return await response.json()
}

//fonction appelée si l'utilisateur autorise la géolocalisation du navigateur et reçoit en paramètres
// la localisation
async function onAuthorize(locationResult) {
    map.setView([locationResult.coords.latitude, locationResult.coords.longitude], 15)
    // Ajout du marker de position de l'utilisateurice
    var circle = L.circle([locationResult.coords.latitude, locationResult.coords.longitude], { color: 'red', fillOpacity: 1, radius: 10 }).addTo(map);
    console.log("User is at " + locationResult.coords.latitude + ":" + locationResult.coords.longitude)
    // stations est le résultat de la fonction getStations()
    let stations = await getStations(locationResult.coords)
    console.log(stations)

    // boucle qui permet de parcourir le tableau "stations" et de sortir tous les arrêts
    // qui sont à proximité de l'utilisateur et de l'afficher sur html
    for (let arret of stations){
        let stationInfo = allStations.find((element) => element["fields"]["stop_id"] == arret["codeLieu"])
        console.log(stationInfo)
        L.marker(stationInfo["fields"]["stop_coordinates"])
            .on('click', clickEvent => displayStationDetails(stationInfo, arret))
            .addTo(map);

        // Creer le html contenant les infos de la station
        let arretNode = createArretNodeFrom(arret)
        document.getElementById("stations").appendChild(arretNode)
    }

}

// Creer et retourne du html contenant les infos de la station
function createArretNodeFrom(arret) {
    // création d'un "noeud liste" <li></li> qui contiendra les infos de l'arrêt
    let arretNode = document.createElement("h3")
    //ajout du nom de l'arrêt dans le noeud liste 
    arretNode.innerHTML += "<b>" + arret["libelle"] + "</b>"
    // permet de parcourir le tableau "arret" et de sortir les numéros de ligne de bus/trams
    // qui sont à proximité et l'afficher sur html
    for (let ligne of arret["ligne"] ){
        arretNode.innerHTML += "<br/>" + ligne["numLigne"] 
    }
    //permet de cliquer sur un arrêt et de voir le temps d'attente à l'arrêt sélectionné
    //qui est à proximité (dans la console)
    arretNode.addEventListener("click", async () => await displayWaitingTimeAt(arret))  
    return arretNode
}

// Affiche le detail d'une station
function displayStationDetails(stationInfo, arret) {
    document.getElementById("stations").hidden = true
    let stationNode = document.getElementById("stationDetails")
    
    stationNode.hidden = false
    stationNode.innerHTML = ""
    stationNode.appendChild(createArretNodeFrom(arret))
    
    // TODO: Afficher les infos de stationInfo dans du html propre
    let title = document.createElement("h2")
    title.innerText = stationInfo["fields"]["stop_name"]
    
    let coordinates = document.createElement("p")
    coordinates.innerHTML = "<b>Coordinates</b>: " + stationInfo["fields"]["stop_coordinates"]
    
    stationNode.appendChild(title)
    stationNode.appendChild(coordinates)
}

//permet de recevoir les données d'une station en particulier
async function displayWaitingTimeAt(station){
    console.log("Interaction avec " + station["libelle"])
    let tpsDattente = await fetchAPI("https://open.tan.fr/ewp/tempsattente.json/" + station["codeLieu"])

    //affiche le temps d'attente + sens + terminus + numéro de la ligne dans la console de la station 
    console.log(tpsDattente.map((element) => element["temps"]+ " sens " + element["terminus"] + " ligne " + element["ligne"]["numLigne"]))
}

//permet de faire une requête API avec la localisation reçue grâce à la fonction onAuthorize 
//et de retourner la liste des arrêts à proximité
async function getStations(coords) {
	let url = "https://open.tan.fr/ewp/arrets.json/" + coords.latitude + "/" + coords.longitude
    console.log(url)    

    //contient la réponse en format .json 
	const arrets = await fetchAPI(url)
    return arrets
}

// Actions faites au chargement de la page
async function loadPage() {
    // Initialisation de la map    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Chargement des stations de la tan
    let stationResults = await fetchAPI("https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&q=&rows=9900")
    allStations = stationResults["records"]
    console.log(allStations)

    // permet au navigateur de demander à l'utilisateur sa localisation
    navigator.geolocation.getCurrentPosition(onAuthorize, (error) => alert("Vous devez autoriser la géolocalisation pour utiliser la page"), geolocationOptions);
}

//
// Début du script
//

let map = L.map('map')
    .setView([47.218, -1.553], 13);

let allStations = []
//options de geolocalisation
let geolocationOptions = {
    //donne une plus grande précision dans ta localisation
    enableHighAccuracy : true,
    //dit au navigateur de garder ta position durant un temps donné (ici, 0seconde)
    maximumAge : 0 
}
loadPage()



