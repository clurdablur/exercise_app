var express = require('express');
var app = express();
var data = require('./mock-data.js');
var bodyParser = require('body-parser');
var config = require('./config.js');
var history = require('./history-mock-data.js');
var mongoose = require('mongoose');
var Workout = require('./models/workouts.js');
var moment = require('moment');
//moment().format();

var jsonParser = bodyParser.json();

app.use(express.static('public'));

app.get('/365gainz', function(req, res){
    console.log(data);
    res.json(data);
});



app.post('/365gainz',jsonParser, function(req, res){
    if(!('exercise' in req.body)) {
        return res.sendStatus(400);
    } 
    console.log(req.body);
    Workout.create({
        exercise: req.body.exercise,
    	reps: req.body.reps,
    	weight: req.body.weight,
    	date: req.body.date
    }, function(error, workout){
    	if (error){
    		return res.status(500).json({message: 'server error'});
    	}
    	res.status(201).json(workout);
    });
});

var History = {
  add: function(name) {
    var user = {username: name, id: this.setId};
    this.users.push(user);
    this.setId += 1;
    return user;
  } 
};

var createHistory = function() {
  var history = Object.create(History);
  history.users = [];
  history.setId = 1;
  return history;
};

var history = createHistory();

history.add('Sarah');

app.get('/history', function(request, response) {
    response.json(history.users);
});


app.put('/365gainz/id', function(req, res) {

});

app.delete('/365gainz/id', function(req, res){
    
});
/*
// As a user, I should be able to sign up.
// As a user, I should be able to login.
var User = {
	username: '',
	password: '',
	id: '',
	workoutHistory: {
		date: '10/31/2016',
		workoutTypes: {}
	}
};

//As a user, I should be able to select a workout plan.
//As a user, I should be able to edit my selected workout plan.
//The user can select the type of workout either amrs, legs or abs. Then a premade workout set appears which the user can then edit the
var workoutTypes = {
	arms: {
		triceps: 15,
		pushpress: 10
	},
	legs: {
		squats: 20
	},
	abs: {
		russianTwists: 30,
		crunches: 50
	}

};
//console.log(Object.keys(workoutTypes));


//As a user, I should be able to select different workouts for each day.
//https://fullcalendar.io/docs/usage/
//As a user, I should be able to go back and look at previous workouts.

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

exports.app = app;
exports.runServer = runServer; */
app.listen(process.env.PORT || 8080);