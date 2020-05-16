let express = require('express');
let app = express();

let route1 = require('../routes/index');

app.use('/', route1);

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
// listenner propre a une serveur websocket
// detecte la connexion d'un nouvelle utilisateur
io.on('connection', socket => {
    // but ici c'est verifier que socket.id n'est pas deja dans le tableau
    // première partie c'est que tu grace a map selectionne une partie de l'ancien tableau
    // si il trouve un id du socket du socket il renvoie la position --- 1, 2, 3
    // s'il ne trouve pas il renvoie -1
    // map n'est pas persistant donc il est efface juste après au contraire d'un tableau temporaire
    // if (io.sockets.rooms.map(r => r.id).indexOf(socket.id) === -1) {
    //     io.sockets.rooms.push(socket);
    //     socket.emit('client_id', socket.id);
        console.log('user connected');
    // }
// detecte l'evenement discussion mais l'evement doit etre la meme pour discussion sur l'autre coté

    // Recoit le message grâce à la fonction "on" de chatService
    // et puis le renvoi avec la fonction "emit" deatService
    // Grâce au channel "broadcast" il est censé le renvoyer à tous
    socket.on('discussion', message => {
        socket.broadcast.emit('broadcast', message);
    });
});

// pour écouter le port. Demarre le serveur sur un telle port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
