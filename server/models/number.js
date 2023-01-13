const Sequelize = require('sequelize');

module.exports = (db, Report) => {
  const Number = db.define('Number', {
    //Attributes
    number: { type: Sequelize.INTEGER }
  });

  Number.belongsTo(Report);

  return Number;
}