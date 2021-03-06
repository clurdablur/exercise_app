var mongoose = require('mongoose');

var WorkoutSchema = new mongoose.Schema({
    routineName: { type: String, required: true},
    exercise: { type: String, required: true },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
    date: { type: String, required: true }
});

var Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;