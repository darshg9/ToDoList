function EventEmitter(){

    this.events = [];

}

EventEmitter.prototype.on = function(eventName, fn){

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);

};

EventEmitter.prototype.emit = function(eventName, data){

    if(this.events[eventName]){

        this.events[eventName].forEach(function(fn){

            fn(data);

        });

    }

};
