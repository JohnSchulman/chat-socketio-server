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

const port = process.env.PORT || 3000;
// listenner propre a une serveur websocket
// detecte la connexion d'un nouvelle utilisateur
io.on('connection', socket => {
    console.log('user connected');
    sequelize.authenticate().then(() => {
    return db.Discussion.findOne({
        where: {
            Message: req.query.Message,
        }
    }).then(messages => {
        if (messages) {
            messages.JSON.then(messages => {
                res.json({messages});
                console.log(`La liste de messages '${message.Discussion.name}' à été créé'`)
            });
        } else {
            res.json({
                error: true,
                message: 'Erreur'
            }).then(() => {
                socket.emit('connection', messages);
            }).catch(e => {
                socket.emit('error', e);
            });
        }

        io.on('getMessageList', socket => {
            messages.JSON.stringify()
        });

// detecte l'evenement discussion mais l'evement doit etre la meme pour discussion sur l'autre coté

    // Recoit le message grâce à la fonction "on" de chatService
    // et puis le renvoi avec la fonction "emit" chatService
    // Grâce au channel "broadcast" il est censé le renvoyer à tous
    socket.on('discussion', message => {
        // avant de broadcaster le message je l'enregistre
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
});

// pour écouter le port. Demarre le serveur sur un telle port
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
