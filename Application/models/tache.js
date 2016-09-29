function Tache(contenu, todo) {
    // Ternaire stockant les données saisies. Stocke une chaine vide si rien n'a été saisi
    contenu ? this.contenu = contenu : this.contenu  = "";
    this.todo = todo;

}

// Getters et Setters
Tache.prototype.getContenu = function() {

    return this.contenu;

}

Tache.prototype.setContenu = function(contenu) {

    this.contenu = contenu;
    return this;

}

Tache.prototype.getTodo = function() {

    return this.todo;

}

Tache.prototype.setTodo = function(todo) {

    this.todo = todo;
    return this;

}
