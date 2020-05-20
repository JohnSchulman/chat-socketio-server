require('dotenv').config({path: __dirname + '/../../.env'});
const {sequelize} = require("../../sequelize");
const db = require("../../../models");

const users = [
    {firstName: 'John', lastName: 'Schulman', avatar: '', email: 'jschulman@test.com', password: 'jschulman'},
    {firstName: 'Barry', lastName: 'Schulman', avatar: '', email: 'bschulman@test.com', password: 'bschulman'},
    {firstName: 'Mischa', lastName: 'Schulman', avatar: '', email: 'mschulman@test.com', password: 'mschulman'},
    {firstName: 'Joseph', lastName: 'Schulman', avatar: '', email: 'joschulman@test.com', password: 'joschulman'}
];

const discussions = [{name: 'Everybody'}];

const messages = [
    {text: 'hello c\'est %name%', author: 1, discussion: 1},
    {text: 'hello c\'est %name%', author: 2, discussion: 1},
    {text: 'hello c\'est %name%', author: 3, discussion: 1},
    {text: 'hello c\'est %name%', author: 4, discussion: 1}
];

sequelize.authenticate().then(() => {
    for(let discussion of discussions)
        db.Discussion.create({name: discussion.name})
            .then(discussion => console.log(`La discussion '${discussion.name}' à été créé !!`));
});

// creation veritiable des données dans la bdd
// remplace mes requetes en code
sequelize.authenticate().then(() => {
    for(let user of users)
        db.User.create({first_name: user.firstName, last_name: user.lastName, avatar: user.avatar, email: user.email, password: user.password})
            .then(async user => {
                console.log(`L'utilisateur '${user.first_name} ${user.last_name}' à été créé !!`);
                let _user = await user.JSON;
                let message = messages.reduce((acc, m) => {
                    // je retourne si la condition est vrai le message courant sinon le accumlateur == le derneier message enregistré
                    return m.author === _user.id ? m : acc;
                });

                return db.Message.create({
                    text: message.text.replace('%name%', user.first_name),
                    author: message.author,
                    discussion: message.discussion
                })
            }).then(async message => {
                let _discussion = await message.Discussion;
                let discussion = null;
                if (_discussion) {
                    discussion = await _discussion.JSON;
                }
                if (discussion) {
                    console.log(`Le message '${message.text}' à été créé dans la discussion '${discussion.name}'`)
                }
            });
}).catch(err => console.log(err));

/*sequelize.authenticate().then(() => {
    for(let message of messages) {
        db.User.findOne({where: {id: message.author}}).then(user => {
                if (user) {
                    db.Message.create({
                        text: message.text.replace('%name%', user.first_name),
                        author: message.author,
                        discussion: message.discussion
                    }).then(message =>
                        console.log(`Le message '${message.text}' à été créé dans la discussion '${message.Discussion.name}'`)
                    )
                }
            }
        );
    }
});*/
