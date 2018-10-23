const express = require("express");
const router = express.Router();

const Timesheet = require("../../models").Timesheet;
const LineItem = require("../../models").LineItem;

router.use("/", function(req, res, next) {
  next();
});

router.post("/save_timesheet", function(req, res) {
    Timesheet
        .build({
                description: req.body.description,
                rate: req.body.rate
            })
        .save()
        .then(timesheet => res.send(timesheet))
});

router.get("/all_timesheets", function(req, res) {
    Timesheet.findAll()
        .then(timesheets => res.send(timesheets))
});

router.get("/get_line_items", function(req, res) {
    LineItem.findAll({
        where: {
            TimesheetId: req.query.id
        },
        attributes: ['id', 'minutes', 'date']
    })
    .then(response => res.send(response));
});

router.post("/save_line_item", function(req, res) {
    LineItem.create({
            TimesheetId: req.body.parent_id,
            minutes: req.body.minutes,
            date: new Date(req.body.date)
    }).then(lineItem => res.send(lineItem.dataValues))
});

module.exports = router;
