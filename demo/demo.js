import NovicellOverlay from '../dist/novicell-overlay.esm.js';
document.addEventListener("DOMContentLoaded", function () {

    // Select your overlay trigger
    var trigger = document.querySelector('#js-overlay-trigger');

    trigger.addEventListener('click', function (e) {
        e.preventDefault();

        let overlayOne = new NovicellOverlay({
            selector: trigger.getAttribute('data-element'),
            className: 'selector-overlay',
            onCreate: function () {
                console.log('created');
            },
            onLoaded: function () {
                console.log('loaded');
            },
            onDestroy: function () {
                console.log('Destroyed');
            }
        })
        overlayOne.create();

        // novicell.overlay.create({
        //   'selector': trigger.getAttribute('data-element'),
        //   'class': 'selector-overlay',
        //   "onCreate": function() { console.log('created'); },
        //   "onLoaded": function() { console.log('loaded'); },
        //   "onDestroy": function() { console.log('Destroyed'); }
        // });

    });

    // Video overlay
    var videoOverlayTriggers = document.querySelectorAll('.js-video-overlay-trigger');

    for (var i = 0; i < videoOverlayTriggers.length; i++) {
        videoOverlayTriggers[i].addEventListener('click', function (e) {
            e.preventDefault();

            var currentTrigger = e.target;

            novicell.overlay.create({
                'videoId': currentTrigger.getAttribute('data-video-id'),
                'type': currentTrigger.getAttribute('data-type'),
                'autoplay': 1,
                'class': 'video-overlay'
            });


        });
    }

});