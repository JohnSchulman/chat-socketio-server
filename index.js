let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
// listenner propre a une serveur websocket
// detecte la connexion d'un nouvelle utilisateur
io.on('connection', socket => {
    console.log('user connected');

// detecte l'evenement discussion mais l'evement doit etre la meme pour discussion sur l'autre coté
    socket.on('discussion', message => {
        // console.log(message);
        io.sockets.emit('broadcast', message);
    });
});

// pour écouter le port. Demarre le serveur sur un telle port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
