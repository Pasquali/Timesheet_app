'use strict';
module.exports = (sequelize, DataTypes) => {
    const LineItem = sequelize.define('LineItem', {
            minutes: DataTypes.DECIMAL,
            date: DataTypes.DATE
        }, {});
            LineItem.associate = function(models) {
            LineItem.belongsTo(models.Timesheet, {foreignKey: 'TimesheetId'});
        };
    return LineItem;
};