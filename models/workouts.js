var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
    workoutType: { type: String, required: true }
});

var Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;