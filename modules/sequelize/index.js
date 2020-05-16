// les require permet de recuperer des modules (framework, bibliotèques, fonction, package)
const Sequelize = require('sequelize');
// c'est les infos de connexion
const credentials = require('../../config/config')[process.env.NODE_ENV];

// si credentielas existe
if(credentials) {
    // on recupère la connexion de la BDD dans la constante sequelize
    // appelle juste le string avec les parametre
    // ca ne authentifie pas donc on doit dans l'index authentifier
    const sequelize = new Sequelize(`${credentials.dialect}://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`);

    module.exports = {sequelize};
} else {
    throw 'Veuillez insérer des crédentials pour la connection en base de données !!';
}

/***************************************************************************/
/********************** DB for private chat real time **********************/
/***************************************************************************/
/*        message        --        discussion        --        user        */
/***************************************************************************/
/*          id           --            id            --         id         */
/*         text          --           name           --     first_name     */
/*      discussion       --         createAt         --      last_name     */
/*       createAt        --                          --       avatar       */
/*        author         --                          --      createAt      */
/***************************************************************************/

