'use strict';
// une fonction qui permet de definir le model user
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    // la jointure pour chercher les discussion de chaque user
    MyDiscussions: {
      type: DataTypes.VIRTUAL,
      async get() {
        // tu te recupère toutes te models
        const db = require('../models');
        // tu recupère toute tes discussions
        let discussions = await db.Discussion.findAll();
        // tu boucle sur les discussion et puis tu les affecte au tableau
        let myDiscussions = [];
        for(let discussion of discussions) {
          // on met toutes l'objets courant  dans message
          let messages = await discussion.Messages;
          // tableau temporaire
          let myMessagesForThisDiscussion = [];
          // je boucle sur message et
          // s'ils m'appartient
          if(messages.length > 0) {
            for(let message of messages) {
              const author = await message.Author;
              // si l'id de l'auteur est bien l'id en parmaetre j'enregistre messaage dans myMessagesForThisDiscussion
              // tu compare l'auteur du message avec l'id du BDD
              if (author.id === this.id) myMessagesForThisDiscussion.push(message);
            }
          }
          // si myMessagesForThisDiscussion est pas vide je met discussion dans le tableau myDiscussions
          if(myMessagesForThisDiscussion.length > 0) myDiscussions.push(discussion);
        }
        return myDiscussions;
      },
      set(discussions) {
        const db = require('../models');
      }
    },
    // getter du json pour l'utilisateur
    // getter sans setter readonly
    JSON: {
      type: DataTypes.VIRTUAL,
      async get() {
        return {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          avatar: this.avatar,
          email: this.email,
          // les tableau les id des discussions de l'utilisateur
          // pour eviter le reference circulaire c'est à dire une discussion appel des messages qui appellent des users qui appellent des discussion ...
          // On a un tableau mydiscussion et puis
          // on creer une deuxième tableau grace a map qui renvoit juste un tableau des id de mydiscussion
          my_discussions: (await this.MyDiscussions).map(d => d.id),
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        }
      }
    }
    // InnoDB moteur de stockage
    // encodage particulier de données
  }, {engine: 'InnoDB'});
  User.associate = function(models) {};
  return User;
};
