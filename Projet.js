
//fonction appelée si l'utilisateur autorise la géolocalisation du navigateur et reçoit en paramètres
// la localisation
async function onAuthorize(locationResult) {
    console.log("User is at " + locationResult.coords.latitude + ":" + locationResult.coords.longitude)
    // stations est le résultat de la fonction getStations()
    let stations = await getStations(locationResult.coords)
    console.log(stations)

    // boucle qui permet de parcourir le tableau "stations" et de sortir tous les arrêts
    // qui sont à proximité de l'utilisateur et de l'afficher sur html
    for (let arret of stations){
        // création d'un "noeud liste" <li></li> qui contiendra les infos de l'arrêt
        let arretNode = document.createElement("li")
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
        //ajout du "noeud liste" dans le "noeud" avec l'id "stations"
        document.getElementById("stations").appendChild(arretNode)
    }

}
//permet de recevoir les données d'une station en particulier
async function displayWaitingTimeAt(station){
    console.log("Interaction avec " + station["libelle"])
    let response = await fetch("https://open.tan.fr/ewp/tempsattente.json/" + station["codeLieu"])
    let tpsDattente = await response.json()
    //affiche le temps d'attente + sens + terminus + numéro de la ligne dans la console de la station 
    console.log(tpsDattente.map((element) => element["temps"]+ " sens " + element["terminus"] + " ligne " + element["ligne"]["numLigne"]))
}

//permet de faire une requête API avec la localisation reçue grâce à la fonction onAuthorize 
//et de retourner la liste des arrêts à proximité
async function getStations(coords) {
	let url = "https://open.tan.fr/ewp/arrets.json/" + 47.205376 + "/" + -1.503103

    console.log(url)    
    //contient la réponse de la requête (ici localisation)
    const response = await fetch (url)
    //contient la réponse en format .json 
	const arrets = await response.json()
    return arrets
}

//options de geolocalisation
let geolocationOptions = {
    //donne une plus grande précision dans ta localisation
    enableHighAccuracy : true,
    //dit au navigateur de garder ta position durant un temps donné (ici, 0seconde)
    maximumAge : 0 
}

// permet au navigateur de demander à l'utilisateur sa localisation
navigator.geolocation.getCurrentPosition(onAuthorize, null, geolocationOptions);