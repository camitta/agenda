const sequelize = require('sequelize');
const db = require('../db');

const Board = db.define('board', {
	name: {
		type: Sequelize.STRING,
		defaultValue: 'Board',
		validate: {
			len: [ 1, 150 ]
		}
	},
	type: {
		type: Sequelize.ENUM({
			values: [ 'personal', 'team' ]
		}),
		allowNull: false
	}
});

module.exports = Board;
