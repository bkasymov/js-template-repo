const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
});

const User = require('./User')(sequelize);
const Note = require('./Note')(sequelize);

module.exports = {
    sequelize,
    User,
    Note
};
