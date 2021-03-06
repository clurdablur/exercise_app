var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
    routineName: { type: String, required: true},
    workouts: { type: String, required: true },
    date: { type: String, required: true } //change date from string to date
});

var History = mongoose.model('History', HistorySchema);

module.exports = History;