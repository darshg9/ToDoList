function Tache(contenu, todo) {
    contenu ? this.contenu = contenu : this.contenu  = "";
    this.todo = todo;
    console.log(this.contenu);
    console.log(this.todo);

}

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
