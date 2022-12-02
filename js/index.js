'use strict';

(function(){
  let setHourDigits = function(hour) {
    if (hour.length > 1) {
      $('.clock .hour-2').text(hour[1]);
    }
    $('.clock .hour-1').text(hour[0]);
  };
    let startClock = function() {
        let getHours = function() {
          return moment().format("hh");
        };
        let getMinutes = function() {
          return moment().format("mm");
        };
        
        let interval = 1;
        let hour = getHours();
        setHourDigits(hour);
        
        let minute = getMinutes();
        if (minute.length > 1) {
          $('.clock .minute-2').text(minute[1]);
        }
        $('.clock .minute-1').text(minute[0]);
        setInterval(() => {
            hour = getHours();
            setHourDigits(hour);
            
            minute = getMinutes();
            if (minute.length > 1) {
              $('.clock .minute-2').text(minute[1]);
            }
            $('.clock .minute-1').text(minute[0]);

            if (interval === 1){
                $('.clock .pulse').removeClass('black');
            }
            else if (interval === -1){
                $('.clock .pulse').addClass('black');
            }
            interval *= -1;
        }, 1000);
    };

    let toggleFullScreen = function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
       }
     }
    };

    let setBatteryLevel = function(value){
      value *= 100;
      let element = $('.clock');
      
      element.removeClass('exact-100 more-than-75 between-75-50 between-50-75 less-than-25');
      if (value === 100) {
        element.addClass('exact-100');
      }
      else if (value >= 75 && value <= 99) {
        element.addClass('more-than-75');
      }
      else if (value >= 50 && value < 75) {
        element.addClass('between-75-50');
      }
      else if (value >= 25 && value < 50) {
        element.addClass('between-50-75');
      }
      else {
        element.addClass('less-than-25');
      }
    };
    
    let setCharging = function(charging, full){
      let element = $('.clock');
      if (charging && !full){
        element.addClass('charging');
      }
      else {
        element.removeClass('charging');
      }
    };

    let getBatteeryInfo = function(){
      if (typeof navigator.getBattery === 'function') {
        navigator.getBattery().then(function(battery) {
          const onLevelChange = function(){ 
            setBatteryLevel(battery.level);
          }
          battery.removeEventListener('levelchange', onLevelChange);
          battery.addEventListener('levelchange', onLevelChange);
          
          const onChargingChange = function(){
            setCharging(battery.charging, batery.level === 1);
          };

          battery.removeEventListener('chargingchange', onChargingChange);
          battery.addEventListener('chargingchange', onChargingChange);
          
          setBatteryLevel(battery.level);
          setCharging(battery.charging, battery.level === 1);
        });
      }
    };

    let serviceWorkerInit = function(){
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
      }
    };

    $(document).off('touchend click')
    $(document).on('touchend click', function(){
      toggleFullScreen();
    });

    $('document').ready(function(){
      startClock();
      setInterval(function(){
        getBatteeryInfo();
      }, (1000 * 60));
      getBatteeryInfo();
      serviceWorkerInit();
    });
})();
