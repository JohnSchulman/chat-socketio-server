var express = require('express');
var router = express.Router();
let {sequelize} = require('../../modules/sequelize');
let db = require('../../models');

router.get('/login', function (req, res) {
    // requette sql pour récupérer dans la table users, le user qui cherche à s'identifier
    sequelize.authenticate().then(() => {
        db.User.findOne({
            where: {
                email: req.query.email,
                password: req.query.password
            }
        }).then(user => {
            if (user) {
                user.JSON.then(user => {
                    res.json({user});
                });
            } else {
                res.json({
                    error: true,
                    message: 'Les identifiants utilisés sont incorrects'
                });
            }
        }).catch(e => {
            res.json({
                error: true,
                message: e
            });
        })
    });
});

router.get('/register', function (req, res) {
    sequelize.authenticate().then(async () => {
        return await db.User.findOne({ where: { email: req.query.email } }) ? true : false;
    }).then(userFinded => {
        if (userFinded) {
            res.json({
                error: true,
                message: 'Cet email est déjà utilisé !!'
            });
        }

        req.query.avatar = '';
        return db.User.create({
            first_name: req.query.first_name,
            last_name: req.query.last_name,
            avatar: req.query.avatar,
            email: req.query.email,
            password: req.query.password
        })
       /* db.User.create({first_name: user.firstName, last_name: user.lastName, avatar: user.avatar,
                        address: user.address, email: user.email, password: user.password})*/

    }).then(user => {
        console.log(`L'utilisateur '${user.first_name} ${user.last_name}' à été créé !!`);
        if (user) {
            user.JSON.then(user => {
                res.json({user});
            });
        } else {
            res.json({
                error: true,
                message: 'les identifiants sont incorrecte'
            });
        }
    }).catch(e => {
        res.json({
            error: true,
            message: e
        });
    });
});

module.exports = router;
