function Controller(view) {

    // Liste des actions à effectuer en fonction du signal émis par la vue
    view.on("vider", this.viderListe.bind(this));
    view.on("nettoyer", this.nettoyerListe.bind(this));
    view.on("nouvelle", this.nouvelleTache.bind(this));

    this.importerListe();

};

// Est exécutée systématiquement après une persistance de la liste
Controller.prototype.afficherListe = function() {

    view.afficherListe(this.liste);

};

// Supprime toutes les tâches
Controller.prototype.viderListe = function() {

    this.liste.splice(0, this.liste.length);
    this.persisterListe()

};

// Supprime les tâches signalées comme effectuées
Controller.prototype.nettoyerListe = function() {

    this.liste.forEach(function(tache, numero) {

        if (!tache.todo) {

            this.liste.splice(numero,1);

        };

    }.bind(this));
    this.persisterListe()

};

// Ajoute une nouvelle tâche à la liste grâce aux données saisies
Controller.prototype.nouvelleTache = function() {

    texte = view.nouvelleTache();
    if(typeof texte !== undefined) {

        texte = this.stripHTML(texte);
        tache = new Tache(texte, true);
        this.liste.push(tache);

    }
    this.persisterListe();

};

// Edite une tâche spécifique grâce aux données saisies
Controller.prototype.editerTache = function(numero) {

    texte = view.editerTache(numero);
    if(texte !== null) {

        tache = this.liste[numero];
        texte = this.stripHTML(texte);
        tache.contenu = texte;
        this.liste.splice(numero, 1, tache);

    };
    this.persisterListe()

};

// Supprime une tâche spécifique
Controller.prototype.supprimerTache = function(numero) {

    this.liste.splice(numero,1);
    this.persisterListe()

};

// Signale une tâche non effectuée comme effectuée et inversement
Controller.prototype.checkTache = function(numero) {

    tache = this.liste[numero];
    tache.todo = !tache.todo;
    this.liste.splice(numero, 1, tache);
    this.persisterListe()

}

// Sauvegarde la liste dans la variable localStorage sous format json
// Est exécutée systématiquement après chaque modification de la liste
Controller.prototype.persisterListe = function() {

    localStorage.setItem("liste", JSON.stringify(this.liste));
    this.afficherListe();

}

// Recrée la liste à partir des données sauvegardées sous format json dans la variable localStorage
// Est executée systématiquement à l'affichage de la page de l'application
Controller.prototype.importerListe = function() {

    if(localStorage.getItem("liste")) {

        this.liste = JSON.parse(localStorage.getItem("liste"));

    }
    else {

        this.liste = [];

    };

    this.afficherListe();

}

// Supprime les éventuelles balises html dans "texte"
Controller.prototype.stripHTML = function(texte) {

    tmp = document.createElement("div");
    tmp.innerHTML = texte;
    return tmp.textContent || tmp.innerText;

}
