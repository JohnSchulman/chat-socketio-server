let db = require("../models");

module.exports = function websocket(io, sequelize) {
    io.on('connection', socket => {
        // Tu fait ta requête pour recuperer la discsuiion
        // Deuxièmement tu extrait les messages
        console.log('user connected');
        sequelize.authenticate().then(() => {
            return db.Discussion.findOne({ where: { id: 1 } }).then(discussion => {
                return discussion.Messages
            }).then(async messages => {
                let messagesJson = [];
                for(let m of messages) {
                    messagesJson.push(await m.JSON);
                }
                return messagesJson;
            }).then(json => {
                socket.emit('messages', JSON.stringify(json));
            });
        });

        // Recoit le message grâce à la fonction "on" de chatService
        // et puis le renvoi avec la fonction "emit" chatService
        // Grâce au channel "broadcast" il est censé le renvoyer à tous
        // detecte l'evenement discussion mais l'evement doit etre la meme pour discussion sur l'autre coté
        socket.on('discussion', message => {
            let jsonMessage = JSON.parse(message);
            sequelize.authenticate().then(() => {
                return db.Message.create({
                    text: jsonMessage.message,
                    author: jsonMessage.userId,
                    discussion: 1
                });
            }).then(() => {
                socket.broadcast.emit('broadcast', message);
            }).catch(e => {
                socket.emit('error', e);
            });
        });

        socket.on('IWrite', message => {
            socket.broadcast.emit('IWrite', message);
        });

        socket.on('IDontWrite', message => {
            socket.broadcast.emit('IDontWrite', message);
        });
    })
};
