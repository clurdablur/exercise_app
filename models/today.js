var mongoose = require('mongoose');

var TodaySchema = new mongoose.Schema({
    routineName: { type: String, required: true},
    workouts: { type: String, required: true },
    date: { type: String, required: true } //change date from string to date
});

var Today = mongoose.model('Today', TodaySchema);

module.exports = Today;