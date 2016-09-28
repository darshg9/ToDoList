function EventEmitter(){

    this.events = []; // associative array : event => functions to call

}

// Add a function to the event
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

//exports.start = EventEmitter;
