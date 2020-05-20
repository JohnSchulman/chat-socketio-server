//
// const messages = [
//     {text: 'hello c\'est %name%', author: 1, discussion: 1},
//     {text: 'hello c\'est %name%', author: 2, discussion: 1},
//     {text: 'hello c\'est %name%', author: 3, discussion: 1},
//     {text: 'hello c\'est %name%', author: 4, discussion: 1}
// ];
//
// const users = [
//     {id: 1, firstName: 'Nicolas', lastName: 'Choquet', avatar: '', email: 'nchoquet@test.com', password: 'nchoquet'},
//     {id: 2, firstName: 'Yann', lastName: 'Choquet', avatar: '', email: 'ychoquet@test.com', password: 'ychoquet'},
//     {id: 3, firstName: 'André', lastName: 'Choquet', avatar: '', email: 'achoquet@test.com', password: 'achoquet'},
//     {id: 4, firstName: 'Grégory', lastName: 'Choquet', avatar: '', email: 'gchoquet@test.com', password: 'gchoquet'}
// ];
//
// for (let user of users) {
//     // reduce : permet de recuperer seulement un champs = un message grace a acculumateur et le message courant
//     let message = messages.reduce((acc, m) => {
//         // je retourne si la condition est vrai le message courant sinon le accumlateur == le derneier message enregistré
//         return m.author === user.id ? m : acc;
//     });
//     console.log(message);
// }


const {sequelize} = require("../../sequelize");
const db = require("../../../models");

sequelize.authenticate().then(() => {
    db.Message.findOne({where: {id: 1}}).then(message => {
        let discussion = message.Discussion.then(d => d.JSON).then(d => console.log(d));
    });
});
