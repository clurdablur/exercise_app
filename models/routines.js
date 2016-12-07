var mongoose = require('mongoose');

var RoutinesSchema = new mongoose.Schema({
    routineName: { type: String, required: true},
    workouts: { type: String, required: false }
});

var Routines = mongoose.model('Routines', RoutinesSchema);

module.exports = Routines;