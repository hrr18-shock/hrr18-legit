var Sequelize = require('sequelize');

if (process.env.NODE_ENV !== 'production') {

  // config.js is ignored by Git
  var config = require('../../config.js');
}

var connection = process.env.HEROKU_POSTGRESQL_BLACK_URL || config.connection;
//var connection = process.env.DATABASE_URL;

var sequelize = new Sequelize(connection,
  {
    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;