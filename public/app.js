$(document).ready(function() {

    $.getJSON("/365gainz", function(items) {
        var workouts = '<ul>';
        items.data.forEach(function(obj, index) {
            console.log(obj);
            //workouts += '<li>Workout ' + (index + 1);
            for (var property in obj) {
                workouts += '<li class="workout-items">' + property;
                for (var exercise in obj[property]) {
                    workouts += '<ul><li class="exercises">' + exercise  + ' - ' + obj[property][exercise][0] +' reps at ' + obj[property][exercise][1] + 'lbs</li></ul>';
                }
                workouts += '</li>';
            }


        });
        //console.log(items); 
    workouts += '</ul>';
    $(".workouts").append(workouts);
    });

    $('.button').click(function(){
        var obj = {workoutType:$('#workout-name').val()};
        $.ajax( "/365gainz",{
            type: "POST",
            dataType: "json",
            data: JSON.stringify(obj), 
            contentType: 'application/json',
            success: function(data){
                console.log(data);
            }
        });
    });
    
    $('#exercise-form').hide();
    $('.workouts').hide();
    $('#history').hide();

    
    $('#today').click(function(){
        $('#exercise-form').show();
        $('.workouts').hide();
        $('#history').hide();
        $('#new-workout').click(function(){
            $('#workout-name').html(); //need to have this also show up on screen and not refresh page
         });
        $('#date').attr("value", Date());
    });
    

    
    $('#workout').click(function(){
        $('#exercise-form').hide();
        $('.workouts').show();
        $('#history').hide();
        $('.exercises').hide();
        $('.workout-items').click(function(){
            $('.exercises').show();
        })
    });
    
    $('#history-header').click(function(){
        $('#history').show();
        $('.workouts').hide();
        $('#exercis-form').hide;
    })
    
    $('#calendar').fullCalendar({
        dayClick: function() {
            alert('a day has been clicked!');
        }
    });
    
    $('#submit-set').click(function(e){
        e.preventDefault();
        e.preventPropogation();
        //var sets = document.getElementById('reps').value + document.getElementById('weight');
        $('#sets-shown').append('<h5> SET:' + document.getElementById('reps').value + 'reps at' + document.getElementById('weight') + 'lbs</h5>')
    })
    
});