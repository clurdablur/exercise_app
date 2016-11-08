$(document).ready(function() {

    $.getJSON("https://projects-clurdablur.c9users.io/365gainz", function(items) {
        var workouts = '<ul>';
        items.data.forEach(function(obj, index) {
            console.log(obj);
            workouts += '<li>Workout ' + (index + 1);
            for (var property in obj) {
                workouts += '<li>' + property;
                for (var exercise in obj[property]) {
                    workouts += '<ul><li>' + exercise  + ' - ' + obj[property][exercise] +'</li></ul>';
                }
                workouts += '</li></li>';
            }


        });
        //console.log(items); 
    workouts += '</ul>';
    $(".workouts").append(workouts);
    });


});