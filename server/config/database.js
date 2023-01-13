const sequelize = require('sequelize')

const database = new sequelize('CapstoneProject', 'adrinkill', 'capstone123!', {
    host: 'capstoneprojectad.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true
        }
    },
    pool: {acquire: 30000}
});

const db = {};

db.db = database;

db.reports = require('../models/report')(db.db);
db.numbers = require('../models/number')(db.db, db.reports);

module.exports = db;

