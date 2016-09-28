function Controller(view) {

    view.on("vider", this.viderListe.bind(this));
    view.on("nettoyer", this.nettoyerListe.bind(this));
    view.on("nouvelle", this.nouvelleTache.bind(this));
    this.importerListe();
    this.liste = [];
    this.afficherListe.bind(this);

};

Controller.prototype.afficherListe = function() {

    view.afficherListe(this.liste);

};

Controller.prototype.viderListe = function() {

    this.liste.splice(0, this.liste.length);
    this.persisterListe()

};

Controller.prototype.nettoyerListe = function() {

    this.liste.forEach(function(tache, numero) {

        if (!tache.getTodo()) {

            this.liste.splice(numero,1);

        };

    }.bind(this));
    this.persisterListe()

};

Controller.prototype.nouvelleTache = function() {

    texte = view.nouvelleTache();
    if(typeof texte !== undefined) {

        tache = new Tache(texte, true);
        this.liste.push(tache);

    }
    this.persisterListe();

};

Controller.prototype.editerTache = function(numero) {

    texte = view.editerTache(numero);
    if(texte !== null) {

        tache = this.liste[numero];
        tache.setContenu(texte);
        this.liste.splice(numero, 1, tache);

    };
    this.persisterListe()

};

Controller.prototype.supprimerTache = function(numero) {

    this.liste.splice(numero,1);
    this.persisterListe()

};

Controller.prototype.checkTache = function(numero) {

    tache = this.liste[numero];
    tache.setTodo(!tache.getTodo());
    this.liste.splice(numero, 1, tache);
    this.persisterListe()

}

Controller.prototype.persisterListe = function() {

    localStorage.setItem("liste", JSON.stringify(this.liste));
    this.afficherListe();

}

Controller.prototype.importerListe = function() {

    if(localStorage.getItem("liste")) {

        this.liste = JSON.parse(localStorage.getItem("liste"));

    }
    else {

        this.liste = [];

    };

}

//exports.start = new Controller(view);
