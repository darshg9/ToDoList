http = require("http");
fs = require("fs");

const PORT=8080;

// Gestionnaire de requêtes
function handleRequest(request, response) {

    if(request.url == "/") {
        data = fs.readFileSync("./ToDoList.html");
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    }
    else if(request.url.indexOf('.css') != -1) {
        data = fs.readFileSync("." + request.url);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
    }
    else if(request.url.indexOf('.js') != -1) {
        data = fs.readFileSync("." + request.url);
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.write(data);
        response.end();
    }
    else if(request.url.indexOf('.css') != -1) {
        data = fs.readFileSync("." + request.url);
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(data);
        response.end();
    }
    else if(request.url.indexOf('.png') != -1) {
        data = fs.readFileSync("." + request.url);
        response.writeHead(200, {'Content-Type': 'image/png'});
        response.write(data);
        response.end();
    }

}

// Démarrage du serveur
serveur = http.createServer(handleRequest);
serveur.listen(PORT, function(){
    console.log("Le serveur a démarré et surveille http://localhost:%s", PORT);

});
