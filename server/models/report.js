const Sequelize = require('sequelize');

module.exports = (db) => {
	const Report = db.define('Report', {
		//attributes
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		sum: { type: Sequelize.INTEGER }
	});
	return Report;
}