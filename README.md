# projet-collectif---dataviz-api-thebestgroup
projet-collectif---dataviz-api-thebestgroup created by GitHub Classroom

Projet collectif avec Alissia, Meghan et Edward pour l'école AdaTechSchool à Nantes.
Fait au bout de 2 mois de formation.
Nous avions 6 jours pour le faire.
Promotion Doria Shafik, 2023-2024.


Le but du projet est de récupérer des données via des API et les visualiser sur une page html. 
Nous avons fait ce projet avec les API de la TAN (transport Nantais) et de Nantes métropole. 

Nous avons fait une page d'accueil avec un bandeau qui donne la météo sur les 5 prochains jours, il y a l'heure qui s'actualise 
toutes les secondes ainsi qu'une barre de recherche (qui ne fonctionne pas pour le moment, nous n'avions pas eu le temps de la faire fonctionner).

Dans l'onglet "services", le navigateur demande notre géolocalisation (si on refuse, il y a un message d'alerte qui s'affiche et qui nous informe que
sans la localisation, ça ne fonctionnera pas).
Une fois qu'on accepte la localisation, une map (qui était déjà présente centrée sur Nantes) nous montre où nous sommes avec 
tous les arrêts de bus et de trams à proximité.
Quand on clique sur un arrêt, les informations de la station s'affiche : 
Le nom de l'arrêt, les différentes lignes (exemple : C9, 85, 1), ainsi que le terminus (dans les 2 sens) et les prochains passages en minutes.
Il y a également des boutons qui s'affichent pour voir l'entièreté des horaires de la journée.

Quand on clique sur un bouton, ça ouvre l'onglet "horaires", qui affiche un histogramme de tous les passages du bus/tram dans la journée ainsi que les horaires détaillés
(heure + minutes).

Dans l'onglet "informations", il y a toutes les infos sur la TAN, son histoire, etc.. 
