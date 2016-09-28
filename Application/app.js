//server = require("./server.js");
//server.start();

//require("./eventEmitter.js")
eventEmitter = new EventEmitter();

//require("./view/view.js");
view = new View();

//require("./controller/controller.js");
ctrl = new Controller(view);
