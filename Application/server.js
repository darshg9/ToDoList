http = require("http");
fs = require("fs");

const PORT=8080;


function start() {

    fs.readFile('./index.html', function (err, html) {

        if (err) {
            throw err;
        };

        function handleRequest(request, response) {

            response.write("ToDoList.html");
            response.end();

        }

        serveur = http.createServer(handleRequest);
        serveur.listen(PORT, function(){

            console.log("Le serveur a démarré et surveille http://localhost:%s", PORT);

        });

    });

};

exports.start = start;
