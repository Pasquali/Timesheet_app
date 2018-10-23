'use strict';
module.exports = (sequelize, DataTypes) => {
    const Timesheet = sequelize.define('Timesheet', {
        description: DataTypes.STRING,
        rate: DataTypes.INTEGER
    }, {});
        Timesheet.associate = function(models) {
        Timesheet.hasMany(models.LineItem, {targetKey: 'TimesheetId'})
    };
    return Timesheet;
};