var app = {
    today: []
};
function getDate(){
     var date = new Date();
     var day = date.getDate();
     var monthIndex = date.getMonth() + 1;
     var year = date.getFullYear();
     console.log(date);
     var currentDate = monthIndex + '/' + day + '/' + year;
     return currentDate;
}

$(document).ready(function() {

    $.getJSON("/365gainz", function(items) {
        var workouts = '<ul class="workoutTypes">';
        items.data.forEach(function(obj, index) {
            //workouts += '<li>Workout ' + (index + 1);
            for (var property in obj) {
                workouts += '<li class="workout-items">' + property;
                for (var exercise in obj[property]) {
                    workouts += '<ul><li class="exercises">' + exercise  + ': ' + obj[property][exercise].reps +' reps at ' + obj[property][exercise].weight + 'lbs' + '<a href="#"><i class="fa fa-check" aria-hidden="true"></i></a></li></ul>';
                }
                workouts += '</li>';
            }
        });
        
        //console.log(items); 
    workouts += '</ul>';
    //console.log(workouts);
    $(".workouts").append(workouts);
    });


    // $('.button').click(function(){
    //     var obj = {workoutType:$('#workout-name').val()};
    //     console.log(obj);
    //     $.ajax( "/365gainz",{
    //         type: "POST",
    //         dataType: "json",
    //         data: JSON.stringify(obj), 
    //         contentType: 'application/json',
    //         success: function(data){
    //         }
    //     });
    // });
    
    $('#exercise-form').hide();
    $('.workouts').hide();
    $('#history').hide();
    $('#completed-routine').hide();

    $('#show-workout').on('click', '.completed-workout', function(e){
        e.preventDefault();
        var parent = $(this).parent();
        console.log(parent);
        app.today.push(parent[0].innerText);
        $(parent).addClass('strike-through');
        console.log('tennis');
    });
    
    $('#complete-routine').click(function(){
        var obj = {
            workouts: app.today,
            routineName: 'Routine 1',
            date: getDate()
        };
        console.log(obj);
        $.ajax( "/today",{
            type: "POST",
            dataType: "json",
            data: JSON.stringify(obj), 
            contentType: 'application/json',
            success: function(data, textStatus, xhr){
                console.log(data);
                console.log(xhr.status);
                if (xhr.status == 201) {
                    $('#show-workout').hide();
                    $('#completed-routine').show();
                }
            }
        });
        
    });
    
    $('#history').click(function(){
        $.getJSON("/history", function(data) {
            console.log(data);
        });
    });
    
    $('#new-routine').hide();
    $('#routines').click(function(){
        $('#new-routine').show();
    });
    
    $('#routine-title').click(function() {
        var obj = {
            routineName: $('#routine-name').val()
        };
       $.ajax("/routines", {
           type: "POST",
           dataType: "json",
           data: JSON.stringify(obj),
           contentType: 'application/json',
           success: function(data){
               if (data){
                   toastr.success('Routine name has been created');
                   $('#routine-name').val('');
               }
               else { 
                   toastr.error('Routine name was not able to be saved');
                }
           }
       }); 
    });
    
    $('#today').click(function(){
        $.getJSON('/today', function(data){
            //console.log('test');
            console.log(data);
            
            var exercisesforToday = '<ul class="todays-workout">';
            data.forEach(function(obj, index) {
                for (var exercise in obj) {
                    exercisesforToday += '<li class="todays-exercises">' + exercise + obj[exercise].reps + ' reps' + obj[exercise].weight + 'lbs ' +'<a href="#" class="completed-workout"><i class="fa fa-check" aria-hidden="true"></i></a>';
                    //exercisesforToday += '<a href="#" class="remove-workout"><i class="fa fa-times" aria-hidden="true"></i></a></li>';
                }
                //exercisesforToday += '</li>';
            });
        exercisesforToday += "</ul>";
        $('#show-workout').append(exercisesforToday);
            
       
        });
        $('#exercise-form').hide();
        $('.workouts').hide();
        $('#history').hide();
        $('#show-workout').show();
        $('#new-workout').click(function(e){
            e.preventDefault();
            $('#workout-name').html(); //need to have this also show up on screen and not refresh page
         });

    });
    
    $('#routines').click(function(){

    });    
    
     $('.datepicker').datepicker();

     $('#date').attr("value", getDate());
     
     
     $('.workouts').on('click', '.exercises', function(e){
         console.log("test");
        e.preventDefault();
            $.getJSON("/routines", function(data) {
            console.log(data);
            var html = '<option value="'+ data.routineName +'">' + data.routineName + '</option>';
            var arr = [$('#routine-selector').value()];
            console.log(arr);
            $('#routine-selector').append(html);
        });
        
        
        
        var str = $(this).html();
        var re = /[:]/;
        var exerciseNamePosition = re.exec(str).index;
        re = /reps/;
        var repsPosition = re.exec(str).index;
        re = /lbs/;
        var weightPosition = re.exec(str).index;
        var ex = (str.slice(0, exerciseNamePosition));
        $('#workoutName').val(ex);
        var rep = (str.slice(exerciseNamePosition + 2, repsPosition));
        $('#reps').val(rep);
        var x = str.slice(repsPosition, weightPosition);
        var weight = /\d+/g.exec(x);
        $('#weight').val(weight);

        //$('#workoutName').val($(this).html());
        //console.log($(this).html());
        $('#exercise-form').show();
        $('.workouts').hide();
        
    });
    
    $('#complete-form').click(function(e){
        e.preventDefault();
        if ($('.textbox').val != null){
         var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth() + 1;
            var year = date.getFullYear();
            console.log(date);
            var currentDate = monthIndex + '/' + day + '/' + year;
            var date = currentDate, 
            exercise = $('#workoutName').val(), 
            reps= $('#reps').val(),
            weight = $('#weight').val(),
            obj = {};
            //do validation here
            obj.date = date;
            obj.exercise = exercise;
            obj.reps = Number(reps);
            obj.weight = Number(weight);
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
    
    $('#today').click(function(){
        $('<div><p>Hiiii</p></div>');
    });
    
    $('#workout').click(function(){
        $('#exercise-form').show();
        $('.workouts').show();
        $('#history').hide();
        $('.exercises').hide();
        $('.workout-items').click(function(){
            $('.exercises').show();
        });
    });
    
    $('#history-header').click(function(){
        $('#history').show();
        $('.workouts').hide();
        $('#exercise-form').hide();
    });
    

    
   /* $('#submit-set').click(function(e){
        e.preventDefault();
        e.preventPropogation();
        //var sets = document.getElementById('reps').value + document.getElementById('weight');
        $('#sets-shown').append('<h5> SET:' + document.getElementById('reps').value + 'reps at' + document.getElementById('weight') + 'lbs</h5>')
    }) */
    
});