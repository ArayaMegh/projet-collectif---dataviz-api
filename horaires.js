const params = (new URL(document.location)).searchParams

async function loadPage(){
    // On récupère les horaires à l'arrêt 
    let url = "https://open.tan.fr/ewp/horairesarret.json/" + params.get("arret") + "/" + params.get("ligne") + "/" + params.get("sens")
    let result = await fetchAPI(url)
    console.log(result)
    
    // On affiche l'histogramme
    createHistogramFrom(result)
    // On affiche les horaires sous fome textuelle
    createHorairesTxtFrom(result)
}

// Affiche les horaires contenues dans result sous forme textuelle dans le html
function createHorairesTxtFrom(result) {
    
    // 1ere solution
    // Pour chaque horaire
    result["horaires"].forEach(horaire => {
        let container = document.createElement("div")

        // On met l'heure en gras (% 24 car les heures >= 24 sont les heures du lendemain - 0h, 1h, ...)
        let heure = parseInt(horaire["heure"].replace(/\D/, "")) % 24 + "h"
        let header = document.createElement("h3")
        header.innerText = heure
        
        // On ajoute le paragraph dans l'élement horairesText pour l'afficher
        container.appendChild(header)

        horaire["passages"].forEach(passage => {
            let passageNode = document.createElement("p")
            passageNode.innerText = passage
            container.appendChild(passageNode)
        })

        document.getElementById("horairesTable").appendChild(container)
    })

    // 2ème solution
    /*
    result["horaires"]
        .flatMap(x => getPassagesFrom(x))
        .forEach(passage => {
            document.getElementById("horairesText").innerHTML += passage.heure % 24 + "h" + passage.minute + "<br/>"
        })
    */
}

// Affiche les horaires contenues dans le result dans l'histogramme de la page
function createHistogramFrom(result) {
    // Donne une liste exploitable de tous les passages de l'arret
    let allPassages = result["horaires"].flatMap(horaire => getPassagesFrom(horaire))
    
    // Equivalent au code suivant: 
    /*
    let allPassages = []
    for (let horaire of result["horaires"]) {
        for (let passage of horaire["passages"]) {
            allPassages.push({
                heure: parseInt(horaire["heure"].replace(/\D/, "")), 
                minute: parseInt(passage.replace(/\D/, ""))
            })
        }
    }
    console.log(passages)
    */

    // Affichage de l'histogramme
    let dataHistogram = allPassages.map(x => x.heure)
    // Les données à afficher dans l'histogramme
    let data = {
        x: dataHistogram,
        xbins: {
            size: 1
        },
        type: 'histogram',
    }

    // On récupère le terminus
    let terminus = result["ligne"]["directionSens1"]
    if (params.get("sens") != 1) {
        terminus = result["ligne"]["directionSens2"]
    }
    
    // On ajoute des élement de décoration, ici un titre
    let layout = {
        title: "Arrêt " + result["arret"]["libelle"] + " : ligne " + result["ligne"]["numLigne"] + " vers " + terminus
    }

    // On affiche l'histogramme
    Plotly.newPlot('myDiv', [data], layout);
}

// Donne une liste de passages pour un horaire donné
// La liste donne des élements sous la forme { heure: x, minute: y }
function getPassagesFrom(horaire) {
    return horaire["passages"]
        .map(passage => { 
            return {
                heure: parseInt(horaire["heure"].replace(/\D/, "")), // Garde juste l'heure sous forme d'entier (ex: "13h" => 13)
                minute: parseInt(passage.replace(/\D/, "")) // Garde juste les minutes sous forme d'entier (ex: "59s" => 59)
            }
        })
}

async function fetchAPI(url) {
    let response = await fetch(url)
    return await response.json() 
}

loadPage()


