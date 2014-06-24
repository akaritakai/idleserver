/*
 * countup.js created from countdown.js at https://github.com/PragmaticMates/jquery-final-countdown
 */

(function ($) {
    var settings;
    var timer;

    var circleSeconds;
    var circleMinutes;
    var circleHours;
    var circleDays;

    var layerSeconds;
    var layerMinutes;
    var layerHours;
    var layerDays;

    var element;
    var callbackFunction;

    $.fn.countup = function(options) {
        element = $(this);        

        var defaults = $.extend({
            selectors: {
                value_seconds: '.clock-seconds .val',
                canvas_seconds: 'canvas-seconds',
                value_minutes: '.clock-minutes .val',
                canvas_minutes: 'canvas-minutes',
                value_hours: '.clock-hours .val',
                canvas_hours: 'canvas-hours',
            },
            seconds: {
                borderColor: '#7995D5',
                borderWidth: '6'
            },
            minutes: {
                borderColor: '#ACC742',
                borderWidth: '6'
            },
            hours: {
                borderColor: '#ECEFCB',
                borderWidth: '6'
            },
            days: {
                borderColor: '#FF9900',
                borderWidth: '6'
            }
        }, options);

        settings = $.extend({}, defaults, options);

        if (element.data('border-color')) {
            settings.seconds.borderColor = settings.minutes.borderColor = settings.hours.borderColor = settings.days.borderColor = element.data('border-color');
        }

        if (settings.idle === undefined) {
          window.location.href = "error.html";
        }

        responsive();
        dispatchTimer();
        prepareCounters();
        startCounters();
    };

    function responsive() {
        $(window).load(updateCircles);

        $(window).on('redraw', function() {
            switched = false;
            updateCircles();
        });
        $(window).on('resize', updateCircles);
    }

    function updateCircles() {     
        layerSeconds.draw();
        layerMinutes.draw();
        layerHours.draw();
    }

    function convertToDeg(degree) {
        return (Math.PI/180)*degree - (Math.PI/180)*90
    }

    function dispatchTimer() {
        var diff = Math.floor((new Date().getTime() - settings.idle) / 1000);
        timer = {
          hours: Math.floor(diff / 3600),
          minutes: Math.floor(diff / 60) % 60,
          seconds: Math.floor(diff) % 60
        };
    }

    function prepareCounters() {
        // Seconds
        var seconds_width = $('#' + settings.selectors.canvas_seconds).width()
        var secondsStage = new Kinetic.Stage({
            container: settings.selectors.canvas_seconds,
            width: seconds_width,
            height: seconds_width
        });

        circleSeconds = new Kinetic.Shape({
            drawFunc: function(context) {
                var seconds_width = $('#' + settings.selectors.canvas_seconds).width()
                var radius = seconds_width / 2 - settings.seconds.borderWidth / 2;
                var x = seconds_width / 2;
                var y = seconds_width / 2;

                context.beginPath();
                context.arc(x, y, radius, convertToDeg(0), convertToDeg(timer.seconds * 6));
                context.fillStrokeShape(this);

                $(settings.selectors.value_seconds).html(timer.seconds);
            },
            stroke: settings.seconds.borderColor,
            strokeWidth: settings.seconds.borderWidth
        });

        layerSeconds = new Kinetic.Layer();
        layerSeconds.add(circleSeconds);
        secondsStage.add(layerSeconds);

        // Minutes
        var minutes_width = $('#' + settings.selectors.canvas_minutes).width();
        var minutesStage = new Kinetic.Stage({
            container: settings.selectors.canvas_minutes,
            width: minutes_width,
            height: minutes_width
        });

        circleMinutes = new Kinetic.Shape({
            drawFunc: function(context) {
                var minutes_width = $('#' + settings.selectors.canvas_minutes).width();
                var radius = minutes_width / 2 - settings.minutes.borderWidth / 2;
                var x = minutes_width / 2;
                var y = minutes_width / 2;

                context.beginPath();
                context.arc(x, y, radius, convertToDeg(0), convertToDeg(timer.minutes * 6));
                context.fillStrokeShape(this);

                $(settings.selectors.value_minutes).html(timer.minutes);

            },
            stroke: settings.minutes.borderColor,
            strokeWidth: settings.minutes.borderWidth
        });

        layerMinutes = new Kinetic.Layer();
        layerMinutes.add(circleMinutes);
        minutesStage.add(layerMinutes);

        // Hours
        var hours_width = $('#' + settings.selectors.canvas_hours).width();
        var hoursStage = new Kinetic.Stage({
            container: settings.selectors.canvas_hours,
            width: hours_width,
            height: hours_width
        });

        circleHours = new Kinetic.Shape({
            drawFunc: function(context) {
                var hours_width = $('#' + settings.selectors.canvas_hours).width();
                var radius = hours_width / 2 - settings.hours.borderWidth/2;
                var x = hours_width / 2;
                var y = hours_width / 2;

                context.beginPath();
                context.arc(x, y, radius, convertToDeg(0), convertToDeg((timer.hours % 24) * 360 / 24));
                context.fillStrokeShape(this);

                $(settings.selectors.value_hours).html(timer.hours);

            },
            stroke: settings.hours.borderColor,
            strokeWidth: settings.hours.borderWidth
        });

        layerHours = new Kinetic.Layer();
        layerHours.add(circleHours);
        hoursStage.add(layerHours);
    }

    function startCounters() {        
        var interval = setInterval( function() {
            var oldMinutes = timer.minutes;
            var oldHours = timer.hours;
            dispatchTimer();
            if (oldHours != timer.hours)
              layerHours.draw();
            if (oldMinutes != timer.minutes)
              layerMinutes.draw();
            layerSeconds.draw();                  
        }, 1000);
    }
})(jQuery);
