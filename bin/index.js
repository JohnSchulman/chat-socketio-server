let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let {sequelize} = require('../modules/sequelize');
let db = require('../models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userRoute = require('../routes/api/users');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user', userRoute);

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
let websocket = require('./websocket');

const port = process.env.PORT || 3000;
// listenner propre a une serveur websocket
// detecte la connexion d'un nouvelle utilisateur

websocket(io, sequelize);

// pour écouter le port. Demarre le serveur sur un telle port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
