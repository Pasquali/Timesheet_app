'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'LineItems',
        'TimesheetId',
        {
            type: Sequelize.INTEGER,
            references: {
                model: 'Timesheets',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'LineItems', // name of Source model
        'id' // key we want to remove
      )
  }
};