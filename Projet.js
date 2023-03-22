

async function onAuthorize(locationResult) {
    console.log("User is at " + locationResult.coords.latitude + ":" + locationResult.coords.longitude)
    let stations = await arretsStations(locationResult.coords)

    console.log(stations)
    for (let arret of stations){
        document.getElementById("stations").innerHTML += "<li>"
        document.getElementById("stations").innerHTML += "<b>" + arret["libelle"] + "</b>" 
        for (let ligne of arret["ligne"] ){
            document.getElementById("stations").innerHTML += "<br/>" + ligne["numLigne"] 
        }
        document.getElementById("stations").innerHTML += "</li>"
    }

}

async function arretsStations(coords) {
	let url = "https://open.tan.fr/ewp/arrets.json/" + coords.latitude + "/" + coords.longitude
    console.log(url)    
    const response = await fetch (url)
	const arrets = await response.json()
    return arrets
}

let geolocationOptions = {
    enableHighAccuracy : true,
    maximumAge : 0 
}
navigator.geolocation.getCurrentPosition(onAuthorize, null, geolocationOptions);

