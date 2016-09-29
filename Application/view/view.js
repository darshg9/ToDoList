function View() {

    EventEmitter.call(this);

    // Définition des évènements à émettre à l'intention du controller
    nouvelleBtn = document.getElementById("nouvelle");
    nouvelleBtn.addEventListener("click", this.emit.bind(this, "nouvelle"));
    nettoyerBtn = document.getElementById("nettoyer");
    nettoyerBtn.addEventListener("click", this.emit.bind(this, "nettoyer"));
    viderBtn = document.getElementById("vider");
    viderBtn.addEventListener("click", this.emit.bind(this, "vider"));

};

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

// Méthode permettant d'arricher la liste des tâches
View.prototype.afficherListe = function(taches) {

    table = document.getElementById("liste");

    // Vidage de la table existante
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    };

    // Si la liste exise et n'est pas vide elle est affichée, sinon un message annonce que la liste est vide
    if(taches != null && taches.length > 0 && taches != []) {

        // Génération des différents éléments à afficher pour chaque tâche
        taches.forEach(function (tache, numero) {

            ligne = document.createElement("tr");
            contenu = document.createElement("td");
            texte = document.createElement("span");
            texte.innerHTML = tache.contenu;
            // La tâche peut être signalée comme effectuée en cliquant sur son ennoncé
            texte.addEventListener("click", function() {ctrl.checkTache(numero)}.bind(this));
            crayonIcone = document.createElement("img");
            checkboxIcone = document.createElement("img");
            // Ternaires gérant la couleur de la tâche et l'icône de checkbox en fonction du status de la tâche
            tache.todo ? checkboxIcone.setAttribute("src", "resources/checkbox-vide.png") : checkboxIcone.setAttribute("src", "resources/checkbox-cochee.png");
            tache.todo ? ligne.setAttribute("style", "background-color: tomato;") : ligne.setAttribute("style", "background-color: lightgreen;");
            // La tâche peut aussi être signalée comme effectuée en cliquant sur la checkbox
            checkboxIcone.addEventListener("click", function() {ctrl.checkTache(numero)}.bind(this));
            crayonIcone.setAttribute("src", "resources/crayon.png");
            // Cliquer sur l'icône "crayon" permet d'éditer la tâche correspondante
            crayonIcone.addEventListener("click", function() {ctrl.editerTache(numero)}.bind(this));
            poubelleIcone = document.createElement("img");
            poubelleIcone.setAttribute("src", "resources/poubelle.png");
            // Cliquer sur l'icône "poubelle" permet de supprimer la tâche correspondante
            poubelleIcone.addEventListener("click", function() {ctrl.supprimerTache(numero)}.bind(this));
            contenu.appendChild(texte);
            contenu.appendChild(checkboxIcone);
            contenu.appendChild(crayonIcone);
            contenu.appendChild(poubelleIcone);
            ligne.appendChild(contenu);
            table.appendChild(ligne);

        });

    }
    else {

        contenu = document.createElement("p");
        contenu.innerHTML = "Aucune tâche pour l'instant.";
        table.appendChild(contenu);

    };

};

// Ouvre une pop-up pour saisir une nouvelle tâche et renvoie les données saisies
View.prototype.nouvelleTache = function() {

    texte = window.prompt("Veuillez entrer la tâche à ajouter:");
    return texte;

}

// Ouvre une pop-up pour éditer une tâche et renvoie les données saisies
View.prototype.editerTache = function(numero) {

    texte = window.prompt("Modifier une tâche:", ctrl.liste[numero].contenu);
    return texte;

}
