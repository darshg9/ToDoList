function View() {

    EventEmitter.call(this);

    nouvelleBtn = document.getElementById("nouvelle");
    nouvelleBtn.addEventListener("click", this.emit.bind(this, "nouvelle"));
    nettoyerBtn = document.getElementById("nettoyer");
    nettoyerBtn.addEventListener("click", this.emit.bind(this, "nettoyer"));
    viderBtn = document.getElementById("vider");
    viderBtn.addEventListener("click", this.emit.bind(this, "vider"));

};

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

View.prototype.afficherListe = function(taches) {

    table = document.getElementById("liste");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    };
    if(taches != null && taches.length > 0) {

        taches.forEach(function (tache, numero) {

            ligne = document.createElement("tr");
            contenu = document.createElement("td");
            texte = document.createElement("span");
            texte.innerHTML = tache.getContenu();
            texte.addEventListener("click", function() {ctrl.checkTache(numero)}.bind(this));
            crayonIcone = document.createElement("img");
            checkboxIcone = document.createElement("img");
            tache.todo ? checkboxIcone.setAttribute("src", "resources/checkbox-vide.png") : checkboxIcone.setAttribute("src", "resources/checkbox-cochee.png");
            tache.todo ? ligne.setAttribute("style", "background-color: tomato;") : ligne.setAttribute("style", "background-color: lightgreen;");
            checkboxIcone.addEventListener("click", function() {ctrl.checkTache(numero)}.bind(this));
            crayonIcone.setAttribute("src", "resources/crayon.png");
            crayonIcone.addEventListener("click", function() {ctrl.editerTache(numero)}.bind(this));
            poubelleIcone = document.createElement("img");
            poubelleIcone.setAttribute("src", "resources/poubelle.png");
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

        contenu = document.createElement("td");
        contenu.innerHTML = "Aucune tâche pour l'instant.";
        table.appendChild(contenu);

    };

};

View.prototype.nouvelleTache = function() {

    texte = window.prompt("Veuillez entrer la tâche à ajouter:");
    return texte;

}

View.prototype.editerTache = function(numero) {

    texte = window.prompt("Modifier une tâche:", ctrl.liste[numero].getContenu());
    return texte;

}

//exports.start = View;
