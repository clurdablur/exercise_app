$(document).ready(function() {

    $.getJSON("/365gainz", function(items) {
        var workouts = '<ul class="workoutTypes">';
        items.data.forEach(function(obj, index) {
            //workouts += '<li>Workout ' + (index + 1);
            for (var property in obj) {
                workouts += '<li class="workout-items">' + property;
                for (var exercise in obj[property]) {
                    workouts += '<ul><li class="exercises">' + exercise  + ': ' + obj[property][exercise].reps +' reps at ' + obj[property][exercise].weight + 'lbs</li></ul>';
                }
                workouts += '</li>';
            }
        });
        
        //console.log(items); 
    workouts += '</ul>';
    console.log(workouts);
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
    
    $('#exercise-form').show();
    $('.workouts').hide();
    $('#history').hide();

    
    $('#today').click(function(){
        $('#exercise-form').show();
        $('.workouts').hide();
        $('#history').hide();
        $('#show-workout').hide();
        $('#new-workout').click(function(){
            $('#workout-name').html(); //need to have this also show up on screen and not refresh page
         });

    });
    
     $('.datepicker').datepicker();
     var date = new Date();
     var day = date.getDate();
     var monthIndex = date.getMonth();
     var year = date.getFullYear();

     var currentDate = monthIndex + '/' + day + '/' + year;
     $('#date').attr("value", currentDate);
     
     
     $('.workouts').on('click', '.exercises', function(e){
        e.preventDefault();
        $('#workoutName').val($(this).html());
        console.log($(this).html());
        $('#exercise-form').show();
        $('.workouts').hide();
    });
    
    $('#complete-form').click(function(e){
        e.preventDefault();
        if ($('.textbox').val != null){
            var date = $('#date').val(), 
            exercise = $('#workoutName').val(), 
            reps= $('#reps').val(),
            weight = $('#weight').val(),
            obj = {};
            //do validation here
            obj.date = date;
            obj.exercise = exercise;
            obj.reps = reps;
            obj.weight = weight;
            console.log(JSON.stringify(obj));
            
            
            $.ajax( "/365gainz",{
                type: "POST",
                dataType: "json",
                data: JSON.stringify(obj), 
                contentType: 'application/json',
                success: function(data){
                    console.log(data);
                }
        });
            
            
            $('#show-workout').append()
        }
        else {
            alert('Complete Form');
        }
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
        $('#exercise-form').hide();
    })
    

    
   /* $('#submit-set').click(function(e){
        e.preventDefault();
        e.preventPropogation();
        //var sets = document.getElementById('reps').value + document.getElementById('weight');
        $('#sets-shown').append('<h5> SET:' + document.getElementById('reps').value + 'reps at' + document.getElementById('weight') + 'lbs</h5>')
    }) */
    
});