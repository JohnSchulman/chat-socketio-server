let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;
// listenner propre a une serveur websocket
// detecte la connexion d'un nouvelle utilisateur
io.on('connection', socket => {
    io.sockets.rooms.push(socket);
    socket.emit('client_id', socket.id);
    console.log('user connected');
// detecte l'evenement discussion mais l'evement doit etre la meme pour discussion sur l'autre coté

    // Recoit le message grâce à la fonction "on" de chatService
    // et puis le renvoi avec la fonction "emit" de chatService
    // Grâce au channel "broadcast" il est censé le renvoyer à tous
    socket.on('discussion', ({id, message}) => {
        // console.log(message);
        io.sockets.rooms.forEach((v, i) => {
            if (v.id !== id) {
                v.emit('broadcast', message);
            }
        })

    });
});

// pour écouter le port. Demarre le serveur sur un telle port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
