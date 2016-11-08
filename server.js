var express = require('express');
var app = express();
var data = require('./mock-data.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

app.use(express.static('public'));

app.get('/365gainz', function(req, res){
    console.log(data);
    res.json(data);
});

app.post('/365gainz', jsonParser, function(req, res){
    if(!('username' in req.body)) {
        return res.sendStatus(400);
    }
    var item = data.add(req.body.name);
    res.status(201).json(item);
});

app.put('/365gainz/id', function(req, res) {

});

app.delete('/365gainz/id', function(req, res){
    
})

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

exports.app = app;

app.listen(process.env.PORT || 8080);