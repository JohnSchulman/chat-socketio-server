let fs = require('fs');

if(!fs.existsSync(__dirname + '/../.env')) {
    fs.writeFile(__dirname + '/../.env', `NODE_ENV=development
DB_USERNAME=jschulman
DB_PASSWORD=j7o7s7eph
DB_PORT=3000
DB_DIALECT=mysql
DB_DATABASE=sequelize
DB_HOST=mysql.host.com

PORT=80
LOGS_FORMAT=dev
AUTO_TRANSPILE=true`, () => console.log('creation du ficher .env'));
}
