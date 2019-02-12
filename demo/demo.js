import {overlay} from '../js/novicell.overlay.js';

document.addEventListener("DOMContentLoaded", function () {

    // Select your overlay trigger
    var trigger = document.querySelector('#js-overlay-trigger');
      
    trigger.addEventListener('click', function(e){
      e.preventDefault();

      overlay.create({
        'selector': trigger.getAttribute('data-element'),
        'class': 'selector-overlay',
        "onCreate": function() { console.log('created'); },
        "onLoaded": function() { console.log('loaded'); },
        "onDestroy": function() { console.log('Destroyed'); }
      });
    });

    // Video overlay
    var videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');

    for (var i = 0; i < videoOverlayTriggers.length; i++) {
      videoOverlayTriggers[i].addEventListener('click', function(e){
        e.preventDefault();

        var currentTrigger = e.target;

        overlay.create({
          'videoId': currentTrigger.getAttribute('data-video-id'),
          'type': currentTrigger.getAttribute('data-type'),
          'autoplay': 1,
          'class': 'video-overlay'
        });


      });
    }

  });